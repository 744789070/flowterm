// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhModals: DeepPartial<Dict["modals"]> = {
    about: {
        tagline1: "开源 AI 集成终端",
        tagline2: "为无缝工作流而生",
        basedOn: "基于 Wave Terminal",
        clientVersion: "客户端版本 {version}",
        updateChannel: "更新渠道：{channel}",
        website: "网站",
        openSource: "开源",
        sponsor: "赞助",
        languageAuto: "自动（跟随系统）",
    },
    userinput: {
        titleWithCountdown: "{title}（{seconds} 秒）",
    },
    connTypeAhead: {
        connectTo: "连接到 (用户名@主机)...",
        local: "本地",
        remote: "远程",
        reconnectTo: "重新连接到 {conn}",
        disconnect: "断开连接 {conn}",
        addConnection: "添加链接",
        newConnection: "{conn}（新建连接）",
    },
    modal: {
        closeEsc: "关闭 (ESC)",
    },
    addConn: {
        title: "添加链接",
        description: "填写 SSH 连接信息，保存后会出现在连接列表中。",
        name: "连接名称",
        host: "主机（SSH）",
        user: "用户名（可选）",
        port: "端口（可选，默认 22）",
        submit: "添加",
        saveFailed: "保存失败，请重试",
        overwriteConfirm: "链接“{name}”已存在，覆盖其配置？",
    },
};

export { zhModals };
