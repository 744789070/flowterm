// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhWorkspace: DeepPartial<Dict["workspace"]> = {
    workspaceSwitcher: "工作区切换器",
    switchWorkspace: "切换工作区",
    openWorkspace: "打开工作区",
    createWorkspace: "新建工作区",
    saveWorkspace: "保存工作区",
    editWorkspace: "编辑工作区",
    deleteWorkspace: "删除工作区",
    currentWorkspace: "这是当前工作区",
    workspaceOpen: "该工作区已打开",
    noActiveTab: "无活动标签页",
    settingsAndHelp: "设置与帮助",
    configErrors: "配置错误",
    secrets: "密钥",
    releaseNotes: "发行说明",
    editWidgetsJson: "编辑 widgets.json",
    localWaveApps: "本地 WaveApps",
    buildEditApps: "构建/编辑应用",
    noLocalApps: "未找到本地应用",
    runningWaveDevBuild: "正在运行 Wave 开发版本",
    appsLabel: "应用",
    settingsLabel: "设置",
    widgetLabels: {
        terminal: "终端",
        files: "文件",
        web: "网页",
        sysinfo: "系统信息",
        processes: "进程",
    },
};

export { zhWorkspace };
