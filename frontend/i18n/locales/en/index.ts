// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { aipanel } from "./aipanel";
import { waveai } from "./waveai";
import { blockframe } from "./blockframe";
import { conn } from "./conn";
import { common } from "./common";
import { contextmenu } from "./contextmenu";
import { help } from "./help";
import { launcher } from "./launcher";
import { main } from "./main";
import { modals } from "./modals";
import { onboarding } from "./onboarding";
import { preview } from "./preview";
import { processviewer } from "./processviewer";
import { quicktips } from "./quicktips";
import { sysinfo } from "./sysinfo";
import { tab } from "./tab";
import { term } from "./term";
import { tips } from "./tips";
import { views } from "./views";
import { waveconfig } from "./waveconfig";
import { web } from "./web";
import { webview } from "./webview";
import { workspace } from "./workspace";

const en = {
    common,
    tab,
    workspace,
    blockframe,
    conn,
    contextmenu,
    modals,
    views,
    term,
    preview,
    web,
    webview,
    launcher,
    sysinfo,
    processviewer,
    waveconfig,
    onboarding,
    quicktips,
    help,
    tips,
    main,
    aipanel,
    waveai,
};

type DictShape = typeof en;

export type Dict = DictShape;
export { en as EN_DICT };
