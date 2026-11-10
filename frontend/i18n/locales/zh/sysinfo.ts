// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhSysinfo: DeepPartial<Dict["sysinfo"]> = {
    plotType: "图表类型",
    plotTypes: {
        cpu: "CPU",
        mem: "内存",
        cpuMem: "CPU + 内存",
        allCpu: "全部 CPU",
    },
    cpuPercent: "CPU %",
    memoryTotal: "内存总量",
    memoryUsed: "已用内存",
    memoryFree: "空闲内存",
    memoryAvailable: "可用内存",
    core: "核心 {num}",
};

export { zhSysinfo };
