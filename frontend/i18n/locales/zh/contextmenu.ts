// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhContextmenu: DeepPartial<Dict["contextmenu"]> = {
    openClipboardUrl: "打开剪贴板 URL（{host}）",
    invalidConfig: "配置无效，未加载客户端或窗口",
    noSuggestions: "暂无建议",
    treeLoading: "加载中…",
    treeLoadError: "错误：{msg}",
    treeUnableToLoadDir: "无法加载目录",
    treeShowingFirstEntries: "仅显示前 {count} 项",
    treeUnknownError: "未知错误",
};

export { zhContextmenu };
