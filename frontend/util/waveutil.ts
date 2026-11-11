// Copyright 2025, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0s

import { getWebServerEndpoint } from "@/util/endpoints";
import { boundNumber, isBlank } from "@/util/util";
import { generate as generateCSS, parse as parseCSS, walk as walkCSS } from "css-tree";

function encodeFileURL(file: string) {
    const webEndpoint = getWebServerEndpoint();
    const fileUri = formatRemoteUri(file, "local");
    const rtn = webEndpoint + `/wave/stream-file?path=${encodeURIComponent(fileUri)}&no404=1`;
    return rtn;
}

export function processBackgroundUrls(cssText: string): string {
    if (isBlank(cssText)) {
        return null;
    }
    cssText = cssText.trim();
    if (cssText.endsWith(";")) {
        cssText = cssText.slice(0, -1);
    }
    const attrRe = /^background(-image)?\s*:\s*/i;
    cssText = cssText.replace(attrRe, "");
    const ast = parseCSS("background: " + cssText, {
        context: "declaration",
    });
    let hasUnsafeUrl = false;
    walkCSS(ast, {
        visit: "Url",
        enter(node) {
            const originalUrl = node.value.trim();
            if (
                originalUrl.startsWith("http:") ||
                originalUrl.startsWith("https:") ||
                originalUrl.startsWith("data:")
            ) {
                return;
            }
            // allow file:/// urls (if they are absolute)
            if (originalUrl.startsWith("file://")) {
                const path = originalUrl.slice(7);
                if (!path.startsWith("/")) {
                    console.log(`Invalid background, contains a non-absolute file URL: ${originalUrl}`);
                    hasUnsafeUrl = true;
                    return;
                }
                const newUrl = encodeFileURL(path);
                node.value = newUrl;
                return;
            }
            // allow absolute paths
            if (originalUrl.startsWith("/") || originalUrl.startsWith("~/") || /^[a-zA-Z]:(\/|\\)/.test(originalUrl)) {
                const newUrl = encodeFileURL(originalUrl);
                node.value = newUrl;
                return;
            }
            hasUnsafeUrl = true;
            console.log(`Invalid background, contains an unsafe URL scheme: ${originalUrl}`);
        },
    });
    if (hasUnsafeUrl) {
        return null;
    }
    const rtnStyle = generateCSS(ast);
    if (rtnStyle == null) {
        return null;
    }
    return rtnStyle.replace(/^background:\s*/, "");
}

export function computeBgStyleFromMeta(meta: Omit<BackgroundConfigType, "display:name">, defaultOpacity: number = null): React.CSSProperties {
    const bgAttr = meta?.["bg"];
    if (isBlank(bgAttr)) {
        return null;
    }
    try {
        const processedBg = processBackgroundUrls(bgAttr);
        const rtn: React.CSSProperties = {};
        rtn.background = processedBg;
        rtn.opacity = boundNumber(meta["bg:opacity"], 0, 1) ?? defaultOpacity;
        if (!isBlank(meta?.["bg:blendmode"])) {
            rtn.backgroundBlendMode = meta["bg:blendmode"];
        }
        return rtn;
    } catch (e) {
        console.error("error processing background", e);
        return null;
    }
}

export function formatRemoteUri(path: string, connection: string): string {
    connection = connection ?? "local";
    return `wsh://${connection}/${path}`;
}

// 旧版工作区默认色板（pkg/wcore/workspace.go 旧 WorkspaceColors，绿 #58C142 打头）。
// 这些颜色已持久化进 DB，显示时映射为玄墨系新色板对应色；自定义色原样放行，不改 DB。
const LegacyWorkspaceColorMap: Record<string, string> = {
    "#58c142": "#2bae85", // 绿 → 铜绿
    "#00ffdb": "#57c3c2", // 亮青 → 石绿
    "#429dff": "#619ac3", // 蓝 → 羽扇豆蓝
    "#bf55ec": "#c08eaf", // 紫 → 萝兰紫
    "#ff453a": "#e1505d", // 红 → 海棠红 · 降彩
    "#ff9500": "#f28e16", // 橙 → 杏黄
    "#ffe900": "#e2c027", // 黄 → 姜黄
};

export function mapLegacyWorkspaceColor(color: string): string {
    if (isBlank(color)) {
        return color;
    }
    return LegacyWorkspaceColorMap[color.toLowerCase()] ?? color;
}
