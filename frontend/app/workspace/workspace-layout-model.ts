// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

// FlowTerm 已移除 Wave AI 面板：布局只包含左侧垂直标签栏（vtab）与主内容区。

import { globalStore } from "@/app/store/jotaiStore";
import { isBuilderWindow } from "@/app/store/windowtype";
import * as WOS from "@/app/store/wos";
import { RpcApi } from "@/app/store/wshclientapi";
import { TabRpcClient } from "@/app/store/wshrpcutil";
import { atoms, getOrefMetaKeyAtom, getSettingsKeyAtom } from "@/store/global";
import * as jotai from "jotai";
import { debounce } from "lodash-es";
import { ImperativePanelGroupHandle, ImperativePanelHandle } from "react-resizable-panels";


const VTabBar_DefaultWidth = 220;
const VTabBar_MinWidth = 110;
const VTabBar_MaxWidth = 280;

function clampVTabWidth(w: number): number {
    return Math.max(VTabBar_MinWidth, Math.min(w, VTabBar_MaxWidth));
}

class WorkspaceLayoutModel {
    private static instance: WorkspaceLayoutModel | null = null;

    vtabPanelRef: ImperativePanelHandle | null;
    outerPanelGroupRef: ImperativePanelGroupHandle | null;
    innerPanelGroupRef: ImperativePanelGroupHandle | null;
    panelContainerRef: HTMLDivElement | null;
    vtabPanelWrapperRef: HTMLDivElement | null;
    widgetsSidebarVisibleAtom: jotai.Atom<boolean>;
    // Wave AI 面板兼容成员：FlowTerm 主窗口已移除面板，恒为关闭；builder/aipanel 代码仍会读取
    panelVisibleAtom: jotai.PrimitiveAtom<boolean> = jotai.atom(false);

    private inResize: boolean;
    private vtabWidth: number;
    private vtabVisible: boolean;
    private transitionTimeoutRef: NodeJS.Timeout | null = null;
    private debouncedPersistVTabWidth: () => void;

    private constructor() {
        this.vtabPanelRef = null;
        this.outerPanelGroupRef = null;
        this.innerPanelGroupRef = null;
        this.panelContainerRef = null;
        this.vtabPanelWrapperRef = null;
        this.inResize = false;
        this.vtabWidth = VTabBar_DefaultWidth;
        this.vtabVisible = false;
        this.widgetsSidebarVisibleAtom = jotai.atom(
            (get) =>
                get(getOrefMetaKeyAtom(WOS.makeORef("workspace", this.getWorkspaceId()), "layout:widgetsvisible")) ??
                true
        );
        this.initializeFromMeta();

        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleOuterPanelLayout = this.handleOuterPanelLayout.bind(this);

        this.debouncedPersistVTabWidth = debounce(() => {
            if (!this.vtabVisible) return;
            const width = this.vtabPanelWrapperRef?.offsetWidth;
            if (width == null || width <= 0) return;
            try {
                RpcApi.SetMetaCommand(TabRpcClient, {
                    oref: WOS.makeORef("workspace", this.getWorkspaceId()),
                    meta: { "layout:vtabbarwidth": width },
                });
            } catch (e) {
                console.warn("Failed to persist vtabbar width:", e);
            }
        }, 300);
    }

    static getInstance(): WorkspaceLayoutModel {
        if (!WorkspaceLayoutModel.instance) {
            WorkspaceLayoutModel.instance = new WorkspaceLayoutModel();
        }
        return WorkspaceLayoutModel.instance;
    }

    // ---- Meta / persistence helpers ----

    private getTabId(): string {
        return globalStore.get(atoms.staticTabId);
    }

    private getWorkspaceId(): string {
        return globalStore.get(atoms.workspace)?.oid ?? "";
    }

    private getVTabBarWidthAtom(): jotai.Atom<number> {
        return getOrefMetaKeyAtom(WOS.makeORef("workspace", this.getWorkspaceId()), "layout:vtabbarwidth");
    }

    // ---- Wave AI 面板兼容 no-op（面板已移除，主窗口永远不可见）----

    getAIPanelVisible(): boolean {
        return false;
    }

    setAIPanelVisible(visible: boolean, opts?: { nofocus?: boolean }): void {
        if (visible) {
            return;
        }
        globalStore.set(this.panelVisibleAtom, false);
    }

    private initializeFromMeta(): void {
        try {
            const savedVTabWidth = globalStore.get(this.getVTabBarWidthAtom());
            if (savedVTabWidth != null && savedVTabWidth > 0) {
                this.vtabWidth = savedVTabWidth;
            }
            const tabBarPosition = globalStore.get(getSettingsKeyAtom("app:tabbar")) ?? "top";
            const showLeftTabBar = tabBarPosition === "left" && !isBuilderWindow();
            this.vtabVisible = showLeftTabBar;
        } catch (e) {
            console.warn("Failed to initialize from tab meta:", e);
        }
    }

    // ---- Resolved width getters (always clamped) ----

    private getResolvedVTabWidth(): number {
        return clampVTabWidth(this.vtabWidth);
    }

    // ---- Core layout computation ----
    // outer: [vtabPct, contentPct]（vtab 隐藏时为 [0, 100]）；inner 组只剩 vtab 一个面板（[100]）。

    private computeLayout(windowWidth: number): { outer: number[]; inner: number[] } {
        const vtabW = this.vtabVisible ? this.getResolvedVTabWidth() : 0;
        const leftPct = windowWidth > 0 ? (vtabW / windowWidth) * 100 : 0;
        const contentPct = Math.max(0, 100 - leftPct);
        return { outer: [leftPct, contentPct], inner: [100] };
    }

    private commitLayouts(windowWidth: number): void {
        if (!this.outerPanelGroupRef || !this.innerPanelGroupRef) return;
        const { outer, inner } = this.computeLayout(windowWidth);
        this.inResize = true;
        this.outerPanelGroupRef.setLayout(outer);
        this.innerPanelGroupRef.setLayout(inner);
        this.inResize = false;
    }

    // ---- Drag handlers ----

    handleOuterPanelLayout(sizes: number[]): void {
        if (this.inResize) return;
        if (!this.vtabVisible) return;
        const windowWidth = window.innerWidth;
        const newVTabPx = (sizes[0] / 100) * windowWidth;
        const clampedVTab = clampVTabWidth(newVTabPx);
        if (clampedVTab !== this.vtabWidth) {
            this.vtabWidth = clampedVTab;
            this.debouncedPersistVTabWidth();
        }
        this.commitLayouts(windowWidth);
    }

    handleWindowResize(): void {
        this.commitLayouts(window.innerWidth);
    }

    // ---- Registration & sync ----

    syncVTabWidthFromMeta(): void {
        const savedVTabWidth = globalStore.get(this.getVTabBarWidthAtom());
        if (savedVTabWidth != null && savedVTabWidth > 0 && savedVTabWidth !== this.vtabWidth) {
            this.vtabWidth = savedVTabWidth;
            this.commitLayouts(window.innerWidth);
        }
    }

    registerRefs(
        outerPanelGroupRef: ImperativePanelGroupHandle,
        innerPanelGroupRef: ImperativePanelGroupHandle,
        panelContainerRef: HTMLDivElement,
        vtabPanelRef?: ImperativePanelHandle,
        vtabPanelWrapperRef?: HTMLDivElement,
        showLeftTabBar?: boolean
    ): void {
        this.vtabPanelRef = vtabPanelRef ?? null;
        this.outerPanelGroupRef = outerPanelGroupRef;
        this.innerPanelGroupRef = innerPanelGroupRef;
        this.panelContainerRef = panelContainerRef;
        this.vtabPanelWrapperRef = vtabPanelWrapperRef ?? null;
        this.vtabVisible = showLeftTabBar ?? false;
        this.syncPanelCollapse();
        this.commitLayouts(window.innerWidth);
    }

    private syncPanelCollapse(): void {
        if (this.vtabPanelRef) {
            if (this.vtabVisible) {
                this.vtabPanelRef.expand();
            } else {
                this.vtabPanelRef.collapse();
            }
        }
    }

    // ---- Transitions ----

    enableTransitions(duration: number): void {
        if (!this.panelContainerRef) return;
        const panels = this.panelContainerRef.querySelectorAll("[data-panel]");
        panels.forEach((panel: HTMLElement) => {
            panel.style.transition = "flex 0.2s ease-in-out";
        });
        if (this.transitionTimeoutRef) {
            clearTimeout(this.transitionTimeoutRef);
        }
        this.transitionTimeoutRef = setTimeout(() => {
            if (!this.panelContainerRef) return;
            const panels = this.panelContainerRef.querySelectorAll("[data-panel]");
            panels.forEach((panel: HTMLElement) => {
                panel.style.transition = "none";
            });
        }, duration);
    }

    // ---- Initial percentage helpers (used by workspace.tsx for defaultSize) ----

    getLeftGroupInitialPercentage(windowWidth: number, showLeftTabBar: boolean): number {
        const vtabW = showLeftTabBar && !isBuilderWindow() ? this.getResolvedVTabWidth() : 0;
        return (vtabW / windowWidth) * 100;
    }

    getInnerVTabInitialPercentage(windowWidth: number, showLeftTabBar: boolean): number {
        // inner 组只剩 vtab 一个面板：可见即占满 100%
        return showLeftTabBar && !isBuilderWindow() ? 100 : 0;
    }

    setShowLeftTabBar(showLeftTabBar: boolean): void {
        if (this.vtabVisible === showLeftTabBar) return;
        this.vtabVisible = showLeftTabBar;
        this.enableTransitions(250);
        this.syncPanelCollapse();
        this.commitLayouts(window.innerWidth);
    }
}

export { WorkspaceLayoutModel };
