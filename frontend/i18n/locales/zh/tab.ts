// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhTab: DeepPartial<Dict["tab"]> = {
    flagColors: {
        green: "绿色",
        teal: "青色",
        blue: "蓝色",
        purple: "紫色",
        red: "红色",
        orange: "橙色",
        yellow: "黄色",
    },
    tabBarPosition: "标签栏位置",
    top: "顶部",
    left: "左侧",
    renameTab: "重命名标签页",
    copyTabId: "复制标签页 ID",
    flagTab: "标记标签页",
    backgrounds: "背景",
    uiTheme: "界面主题",
    closeTab: "关闭标签页",
    addTab: "新建标签页",
    newTab: "新建标签页",
    tabName: "标签页名称",
    tabLoading: "标签页加载中",
    tabNotFound: "未找到标签页",
    update: "更新",
    downloading: "下载中",
    installing: "安装中",
    clickToInstallUpdate: "点击安装更新",
};

export { zhTab };
