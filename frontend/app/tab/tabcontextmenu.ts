// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { atoms, getOrefMetaKeyAtom, globalStore, recordTEvent } from "@/app/store/global";
import { TabRpcClient } from "@/app/store/wshrpcutil";
import { DefaultUiTheme } from "@/app/uitheme";
import { t, type TranslationKey } from "@/i18n/i18n";
import { fireAndForget } from "@/util/util";
import { makeORef } from "../store/wos";
import type { RpcApiType } from "@/app/store/wshclientapi";
import type { TabEnv } from "./tab";

// 与工作区色板一致：墨观 Inkstone 玄墨系（旧默认色存量显示由 mapLegacyWorkspaceColor 映射）
const FlagColors: { labelKey: TranslationKey; value: string }[] = [
    { labelKey: "tab.flagColors.green", value: "#2bae85" }, // 铜绿
    { labelKey: "tab.flagColors.teal", value: "#57c3c2" }, // 石绿
    { labelKey: "tab.flagColors.blue", value: "#619ac3" }, // 羽扇豆蓝
    { labelKey: "tab.flagColors.purple", value: "#c08eaf" }, // 萝兰紫
    { labelKey: "tab.flagColors.red", value: "#e1505d" }, // 海棠红 · 降彩
    { labelKey: "tab.flagColors.orange", value: "#f28e16" }, // 杏黄
    { labelKey: "tab.flagColors.yellow", value: "#e2c027" }, // 姜黄
];

// 「界面主题」checkbox 子菜单（UI 主题，uityhemes.json，settings 键 app:uityheme）。
// tab 右键菜单与 block 头部 ⚙ 设置菜单共用；currentTheme 传已解析的值（null → DefaultUiTheme）。
export function buildUiThemeSubmenu(rpc: Pick<RpcApiType, "SetConfigCommand">, currentTheme: string): ContextMenuItem[] {
    const fullConfig = globalStore.get(atoms.fullConfigAtom);
    const uiThemes = fullConfig?.uityhemes ?? {};
    const uiThemeKeys = Object.keys(uiThemes).filter((k) => uiThemes[k] != null);
    uiThemeKeys.sort((a, b) => (uiThemes[a]["display:order"] ?? 0) - (uiThemes[b]["display:order"] ?? 0));
    return uiThemeKeys.map((themeKey) => ({
        label: uiThemes[themeKey]["display:name"] ?? themeKey,
        type: "checkbox" as const,
        checked: currentTheme === themeKey,
        click: () => fireAndForget(() => rpc.SetConfigCommand(TabRpcClient, { "app:uityheme": themeKey })),
    }));
}

export function buildTabBarContextMenu(env: TabEnv): ContextMenuItem[] {
    const currentTabBar = globalStore.get(env.getSettingsKeyAtom("app:tabbar")) ?? "top";
    const tabBarSubmenu: ContextMenuItem[] = [
        {
            label: t("tab.top"),
            type: "checkbox",
            checked: currentTabBar === "top",
            click: () => fireAndForget(() => env.rpc.SetConfigCommand(TabRpcClient, { "app:tabbar": "top" })),
        },
        {
            label: t("tab.left"),
            type: "checkbox",
            checked: currentTabBar === "left",
            click: () => fireAndForget(() => env.rpc.SetConfigCommand(TabRpcClient, { "app:tabbar": "left" })),
        },
    ];
    return [{ label: t("tab.tabBarPosition"), type: "submenu", submenu: tabBarSubmenu }];
}

export function buildTabContextMenu(
    id: string,
    renameRef: React.RefObject<(() => void) | null>,
    onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => void,
    env: TabEnv
): ContextMenuItem[] {
    const menu: ContextMenuItem[] = [];
    menu.push(
        { label: t("tab.renameTab"), click: () => renameRef.current?.() },
        {
            label: t("tab.copyTabId"),
            click: () => fireAndForget(() => navigator.clipboard.writeText(id)),
        },
        { type: "separator" }
    );
    const tabORef = makeORef("tab", id);
    const currentFlagColor = globalStore.get(getOrefMetaKeyAtom(tabORef, "tab:flagcolor")) ?? null;
    const flagSubmenu: ContextMenuItem[] = [
        {
            label: t("common.none"),
            type: "checkbox",
            checked: currentFlagColor == null,
            click: () =>
                fireAndForget(() =>
                    env.rpc.SetMetaCommand(TabRpcClient, { oref: tabORef, meta: { "tab:flagcolor": null } })
                ),
        },
        ...FlagColors.map((fc) => ({
            label: t(fc.labelKey),
            type: "checkbox" as const,
            checked: currentFlagColor === fc.value,
            click: () =>
                fireAndForget(() =>
                    env.rpc.SetMetaCommand(TabRpcClient, { oref: tabORef, meta: { "tab:flagcolor": fc.value } })
                ),
        })),
    ];
    menu.push({ label: t("tab.flagTab"), type: "submenu", submenu: flagSubmenu }, { type: "separator" });
    const fullConfig = globalStore.get(env.atoms.fullConfigAtom);
    const backgrounds = fullConfig?.backgrounds ?? {};
    const bgKeys = Object.keys(backgrounds).filter((k) => backgrounds[k] != null);
    bgKeys.sort((a, b) => {
        const aOrder = backgrounds[a]["display:order"] ?? 0;
        const bOrder = backgrounds[b]["display:order"] ?? 0;
        return aOrder - bOrder;
    });
    if (bgKeys.length > 0) {
        const submenu: ContextMenuItem[] = [];
        const oref = makeORef("tab", id);
        submenu.push({
            label: t("common.default"),
            click: () =>
                fireAndForget(async () => {
                    await env.rpc.SetMetaCommand(TabRpcClient, {
                        oref,
                        meta: { "bg:*": true, "tab:background": null },
                    });
                    env.rpc.ActivityCommand(TabRpcClient, { settabtheme: 1 }, { noresponse: true });
                    recordTEvent("action:settabtheme");
                }),
        });
        for (const bgKey of bgKeys) {
            const bg = backgrounds[bgKey];
            submenu.push({
                label: bg["display:name"] ?? bgKey,
                click: () =>
                    fireAndForget(async () => {
                        await env.rpc.SetMetaCommand(TabRpcClient, {
                            oref,
                            meta: { "bg:*": true, "tab:background": bgKey },
                        });
                        env.rpc.ActivityCommand(TabRpcClient, { settabtheme: 1 }, { noresponse: true });
                        recordTEvent("action:settabtheme");
                    }),
            });
        }
        menu.push({ label: t("tab.backgrounds"), type: "submenu", submenu }, { type: "separator" });
    }
    // 界面主题（与终端主题分开，定义在 uityhemes.json，settings 键 app:uityheme）
    const currentUiTheme = globalStore.get(env.getSettingsKeyAtom("app:uityheme")) ?? DefaultUiTheme;
    const uiThemeSubmenu = buildUiThemeSubmenu(env.rpc, currentUiTheme);
    if (uiThemeSubmenu.length > 0) {
        menu.push({ label: t("tab.uiTheme"), type: "submenu", submenu: uiThemeSubmenu });
    }
    menu.push(...buildTabBarContextMenu(env), { type: "separator" });
    menu.push({ label: t("tab.closeTab"), click: () => onClose(null) });
    return menu;
}
