// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhProcessviewer: DeepPartial<Dict["processviewer"]> = {
    col: {
        pid: "PID",
        command: "命令",
        status: "状态",
        user: "用户",
        threads: "NT",
        threadsTooltip: "线程数",
        cpu: "CPU%",
        memory: "内存",
    },
    refreshInterval: "刷新间隔",
    oneSecond: "1 秒",
    twoSeconds: "2 秒",
    fiveSeconds: "5 秒",
    paused: "已暂停",
    clickToResume: "点击恢复",
    clickToPause: "点击暂停",
    statusError: "错误",
    statusStalled: "已停滞",
    statusUpdating: "更新中",
    errorWithMessage: "错误：{message}",
    gone: "（已退出）",
    load: "负载",
    mem: "内存",
    procs: "进程",
    procErr: "错误",
    core: "核心",
    cores: "核心",
    cpuTooltip: "每个核心 100% · {num} {cores} = 最大 {max}%",
    searchTooltipCmd: "搜索 (Cmd-F)",
    searchTooltipAlt: "搜索 (Alt-F)",
    filterProcesses: "筛选进程…",
    waitingForConnection: "等待连接…",
    copyPid: "复制 PID",
    signal: "发送信号",
    killProcess: "终止进程",
    killedMessage: "进程 #{pid} 已终止",
    sentMessage: "已向进程 #{pid} 发送 {signal}",
};

export { zhProcessviewer };
