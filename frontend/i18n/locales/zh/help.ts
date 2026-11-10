// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhHelp: DeepPartial<Dict["help"]> = {
    openDevTools: "打开开发者工具",
    closeDevTools: "关闭开发者工具",
    setZoomFactor: "设置缩放比例",
};

export { zhHelp };
