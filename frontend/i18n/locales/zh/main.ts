// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhMain: DeepPartial<Dict["main"]> = {
    menu: {
        about: "关于 FlowTerm",
        file: "文件",
        edit: "编辑",
        view: "查看",
        window: "窗口",
        checkForUpdates: "检查更新",
        services: "服务",
        hide: "隐藏 FlowTerm",
        hideOthers: "隐藏其他",
        newWindow: "新建窗口",
        newWaveAppBuilderWindow: "新建 WaveApp Builder 窗口",
        closeWindow: "关闭窗口",
        reloadWindow: "重新加载窗口",
        reloadTab: "重新加载标签页",
        relaunchAllWindows: "重新启动所有窗口",
        clearTabCache: "清除标签页缓存",
        toggleDevTools: "切换开发者工具",
        resetZoom: "重置缩放",
        zoomIn: "放大",
        zoomInHidden: "放大（隐藏）",
        zoomOut: "缩小",
        zoomOutHidden: "缩小（隐藏）",
        launchOnFullScreen: "启动时全屏",
        on: "开",
        off: "关",
        toggleWidgetsBar: "切换组件栏",
        workspace: "工作区",
        createWorkspace: "新建工作区",
        minimize: "最小化",
        zoom: "缩放",
        front: "将所有窗口置于前",
        toggleFullScreen: "进入全屏",
        pasteAndMatchStyle: "粘贴并匹配样式",
    },
    dialogs: {
        confirmQuitTitle: "确认退出",
        confirmQuitMessage: "确定要退出 FlowTerm 吗？",
        confirmTitle: "确认",
        windowUnsavedTabsMessage: "窗口中有未保存的标签页，关闭窗口将删除现有标签页。\n\n是否继续？",
        closeTabButton: "关闭标签页",
        closeTabMessage: "确定要关闭此标签页吗？",
        deleteWorkspaceButton: "删除工作区",
        deleteWorkspaceMessage: "删除工作区将同时删除其全部内容。\n\n是否继续？",
        arm64Title: "FlowTerm 检测到性能问题",
        arm64Message: "FlowTerm 正在以 ARM64 转译模式运行，可能影响性能。\n\n建议：从官网下载原生 ARM64 版本以获得最佳性能。",
        dismissButton: "忽略",
        learnMoreButton: "了解更多",
        saveScrollbackTitle: "保存回滚缓冲",
        textFilesFilter: "文本文件",
    },
    updater: {
        notificationTitle: "FlowTerm",
        updateReady: "新版本的 FlowTerm 已准备好安装。",
        noUpdates: "当前没有可用的更新。",
        updateDialogTitle: "应用更新",
        updateDetail: "新版本已下载完成。重启应用以应用更新。",
        updateRestart: "重启",
    },
};

export { zhMain };
