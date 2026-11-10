// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhBlockframe: DeepPartial<Dict["blockframe"]> = {
    unMagnifyBlock: "取消放大块",
    magnifyBlock: "放大块",
    copyBlockId: "复制块 ID",
    closeBlock: "关闭块",
    splitHorizontally: "水平拆分",
    splitVertically: "垂直拆分",
    addToLayout: "添加到布局",
    errorRenderingViewHeader: "渲染视图头部出错：{msg}",
    minimize: "最小化",
    magnify: "放大",
    noView: "无视图",
    noViewComponent: "无视图组件",
};

export { zhBlockframe };
