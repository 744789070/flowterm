// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhViews: DeepPartial<Dict["views"]> = {
    noView: "（无视图）",
    terminal: "终端",
    preview: "预览",
    web: "网页",
    help: "帮助",
    tips: "提示",
    processes: "进程",
    widgetLauncher: "组件启动器",
    waveConfig: "配置",
    waveApp: "Wave App",
    cpuPlot: "CPU 图表",
    sysinfo: "系统信息",
};

export { zhViews };
