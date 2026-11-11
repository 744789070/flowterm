// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhQuicktips: DeepPartial<Dict["quicktips"]> = {
    headerIcons: "标题栏图标",
    magnifyBlock: "放大块",
    connectRemote: "连接到远程服务器",
    blockSettings: "块设置",
    closeBlock: "关闭块",
    importantKeybindings: "重要快捷键",
    mainKeybindings: "主要快捷键",
    newTab: "新建标签页",
    newTerminalBlock: "新建终端块",
    tabSwitching: "切换标签页（{mod}）",
    switchToNthTab: "切换到第 N 个标签页",
    previousTab: "上一个标签页",
    nextTab: "下一个标签页",
    blockNavigation: "块导航（Ctrl-Shift）",
    navigateBetweenBlocks: "在块之间导航",
    focusNthBlock: "聚焦第 N 个块",
    splitBlocks: "拆分块",
    splitRight: "向右拆分",
    splitBelow: "向下拆分",
    splitInDirection: "按方向拆分",
    numberKey: "数字（1-9）",
    wshCommands: "wsh 命令",
    wshViewDesc: "预览文件、目录或网页 URL",
    wshEditDesc: "编辑配置和代码文件",
    moreTips: "更多提示",
    tabsLabel: "标签页",
    tabsTip: "右键点击任意标签页可更改背景或重命名。",
    webViewLabel: "网页视图",
    webViewTip: "点击网页视图中的齿轮图标可设置你的主页",
    terminalLabel: "终端",
    terminalTip: "点击终端中的齿轮图标可设置终端主题和字体大小",
    needMoreHelp: "需要更多帮助？",
    joinDiscord: "加入我们的 Discord",
    configurationOptions: "配置选项",
    allKeybindings: "全部快捷键",
    fullDocumentation: "完整文档",
};

export { zhQuicktips };
