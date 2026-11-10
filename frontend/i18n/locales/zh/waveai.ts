// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DeepPartial } from "@/i18n/types";
import type { Dict } from "../en";

const zhWaveai: DeepPartial<Dict["waveai"]> = {
    deprecated: {
        title: "此旧版 Wave AI 块已不再受支持",
        description: "此旧版 AI 组件已被弃用。请改用新版 Wave AI 面板来进行 AI 对话、获取终端上下文、使用工具和上传文件。",
        openPanel: "打开 Wave AI 面板",
    },
};

export { zhWaveai };
