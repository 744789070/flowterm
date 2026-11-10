// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhCommon: DeepPartial<Dict["common"]> = {
    cancel: "取消",
    ok: "确定",
    close: "关闭",
    copy: "复制",
    paste: "粘贴",
    cut: "剪切",
    delete: "删除",
    rename: "重命名",
    save: "保存",
    settings: "设置",
    search: "搜索",
    loading: "加载中...",
    error: "错误",
    warning: "警告",
    add: "添加",
    edit: "编辑",
    open: "打开",
    reset: "重置",
    done: "完成",
    apply: "应用",
    confirm: "确认",
    default: "默认",
    none: "无",
    more: "更多",
    selectAll: "全选",
    undo: "撤销",
    redo: "重做",
    reload: "重新加载",
    quit: "退出",
    restart: "重启",
    later: "稍后",
    name: "名称",
    yes: "是",
    no: "否",
    language: "语言",
};

export { zhCommon };
