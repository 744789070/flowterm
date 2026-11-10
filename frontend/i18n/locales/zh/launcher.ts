// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhLauncher: DeepPartial<Dict["launcher"]> = {
    searchWidgets: "搜索组件",
    logo: "徽标",
    noWidgetsFound: "未找到组件。按 Escape 清除搜索。",
    hintDefault: "输入以筛选，按 Enter 启动，方向键导航",
    hintSearching: "正在搜索“{term}”，按 Enter 启动",
};

export { zhLauncher };
