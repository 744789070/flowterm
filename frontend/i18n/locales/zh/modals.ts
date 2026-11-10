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
        editConnections: "编辑连接",
        newConnection: "{conn}（新建连接）",
    },
    modal: {
        closeEsc: "关闭 (ESC)",
    },
};

export { zhModals };
