// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

// UI 主题（界面主题）：独立于终端主题（term:theme / termthemes.json）。
// 主题定义在 uityhemes.json（fullConfig.uityhemes），colors 为 CSS 变量名 → 值的映射，
// 在 document.body 上运行时 setProperty 生效（Tailwind v4 的 --color-* token 运行时也是 CSS 变量）。
// 终端配色（--term-* / xterm theme）不属于 UI 主题，由 "term:theme" 单独控制。

import { atoms, getSettingsPrefixAtom, useSettingsKeyAtom } from "@/store/global";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

const DefaultUiTheme = "github"; // Dark Default：GitHub 风格深色 #0d1117 + 蓝 #58a6ff

function UiThemeUpdater() {
    const uiThemeSetting = useSettingsKeyAtom("app:uityheme");
    const fullConfig = useAtomValue(atoms.fullConfigAtom);
    const windowSettings = useAtomValue(getSettingsPrefixAtom("window"));
    const appliedVarsRef = useRef<string[]>([]);

    useEffect(() => {
        // 先清掉上次应用的主题变量，再应用新主题（热切换不残留）
        for (const varName of appliedVarsRef.current) {
            document.body.style.removeProperty(varName);
        }
        appliedVarsRef.current = [];

        const themeName = uiThemeSetting?.trim() || DefaultUiTheme;
        let theme = fullConfig?.uityhemes?.[themeName];
        if (theme == null && themeName !== DefaultUiTheme) {
            theme = fullConfig?.uityhemes?.[DefaultUiTheme];
        }
        const colors = { ...(theme?.colors ?? {}) };
        // window:bgcolor 是显式用户覆写，优先级高于主题背景色（此变量归本组件唯一管理）
        const bgcolorOverride = windowSettings?.["window:bgcolor"];
        if (bgcolorOverride != null) {
            colors["--main-bg-color"] = bgcolorOverride;
        }
        for (const [varName, value] of Object.entries(colors)) {
            document.body.style.setProperty(varName, value);
            appliedVarsRef.current.push(varName);
        }
    }, [uiThemeSetting, fullConfig, windowSettings]);
    return null;
}

export { DefaultUiTheme, UiThemeUpdater };
