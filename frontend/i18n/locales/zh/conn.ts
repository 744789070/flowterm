// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhConn: DeepPartial<Dict["conn"]> = {
    connectionStalled: "连接停滞",
    stalledMessage: "与 “{connName}” 的连接已停滞",
    noActivityFor: "（已无活动 {duration}）",
    moreThanADay: "超过一天",
    disconnect: "断开连接",
    reconnect: "重新连接",
    connectingStatus: "正在连接 “{connName}”...",
    disconnectedStatus: "已断开与 “{connName}” 的连接",
    connectedToGitBash: "已连接到 Git Bash",
    connectedToLocalMachine: "已连接到本地机器",
    connectedTo: "已连接到 {conn}",
    connectingTo: "正在连接 {conn}",
    errorConnectingTo: "连接 {conn} 出错",
    disconnectedFrom: "已断开与 {conn} 的连接",
    connectionDegraded: "连接质量下降：{conn}",
    connectionStalledStatus: "连接停滞：{conn}",
    wshNotInstalled: "此连接未安装 wsh",
    alwaysDisableWsh: "始终禁用 wsh",
    errorMessage: "错误：{msg}",
    wshErrorMessage: "无法使用 wsh：{msg}",
    learnMore: "了解更多",
    standardSshSession: "标准 SSH 会话",
    standardSshSessionDesc:
        "标准 SSH 会话会在连接断开时结束。持久会话可在网络变化、电脑休眠和 Wave 重启时保持 shell 状态、运行中的程序和历史记录。",
    restartAsDurable: "重启为持久会话",
    durableSessionAttached: "持久会话（已连接）",
    durableSessionAttachedDesc: "你的 shell 状态、运行中的程序和历史记录均已受到保护。此会话在网络断开后依然保留。",
    durableSessionDetached: "持久会话（已断开）",
    durableSessionDetachedDesc: "连接已丢失，但你的会话仍在远程服务器上运行。连接恢复后，Wave 将自动重新连接。",
    durableSessionAwaitingConnection: "持久会话（等待连接）",
    durableSessionAwaitingConnectionDesc: "已配置为持久会话。连接建立后会话将自动启动。",
    durableSessionAwaitingStart: "持久会话（等待启动）",
    durableSessionAwaitingStartDesc: "已配置为持久会话，但会话尚未启动。点击下方按钮手动启动。",
    startSession: "启动会话",
    durableSessionStarting: "持久会话（启动中）",
    durableSessionStartingDesc: "持久会话正在启动。",
    durableSessionEnded: "持久会话（已结束）",
    durableSessionEndedDesc: "持久会话已结束。此块仍配置为持久会话。",
    durableSessionExited: "持久会话（已结束，已退出）",
    durableSessionExitedDesc: "shell 已终止，不再运行。此块仍配置为持久会话。",
    durableSessionLost: "持久会话（已结束，已丢失）",
    durableSessionLostDesc: "远程服务器上的会话已丢失或未找到。这可能是由于系统重启或会话被手动终止所致。",
    durableSessionFailedToStart: "持久会话（启动失败）",
    durableSessionFailedToStartDesc: "持久会话启动失败。",
    restartSession: "重启会话",
    restartAsStandard: "重启为标准会话",
};

export { zhConn };
