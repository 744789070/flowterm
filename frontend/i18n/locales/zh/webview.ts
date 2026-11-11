// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhWebview: DeepPartial<Dict["webview"]> = {
    mobileUserAgentIphone: "移动端 User Agent：iPhone",
    mobileUserAgentAndroid: "移动端 User Agent：Android",
    openInExternalBrowser: "在外部浏览器中打开",
    userAgentType: "User Agent 类型",
    userAgentIphone: "移动端：iPhone",
    userAgentAndroid: "移动端：Android",
    copyUrlToClipboard: "复制 URL 到剪贴板",
    setBlockHomepage: "设置区块主页",
    setDefaultHomepage: "设置默认主页",
    unHideNavigation: "显示导航栏",
    hideNavigation: "隐藏导航栏",
    setZoomFactor: "设置缩放比例",
    openDevtools: "打开开发者工具",
    closeDevtools: "关闭开发者工具",
    clearHistory: "清除历史记录",
    clearCookiesAndStorage: "清除 Cookie 和存储（所有网页组件）",
    openBookmark: "打开书签...",
    noBookmarksConfigured: "尚未配置书签",
    editBookmarksDescBefore: "编辑你的",
    editBookmarksDescAfter: "文件来配置书签。",
    openBookmarksJson: "打开 bookmarks.json",
    editBookmarksJson: "编辑 bookmarks.json",
    noMatchingBookmarks: "没有匹配的书签",
    failedToLoadUrl: "加载 {url} 失败：{msg}",
    tsunami: {
        stop: "停止 Wave App",
        restart: "重启 Wave App",
        restartForceRebuild: "重启 Wave App 并强制重新构建",
        remixInBuilder: "在 Builder 中 Remix Wave App",
        appPathOrIdRequired: "必须设置应用路径或应用 ID（tsunami:apppath 或 tsunami:appid）",
        invalidController: "控制器无效（必须为 \"tsunami\"）",
        start: "启动",
        starting: "启动中...",
    },
    vdom: {
        invalidTag: "无效标签 <{tag}>",
    },
};

export { zhWebview };
