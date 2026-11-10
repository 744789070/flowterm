// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Dict } from "../en";
import type { DeepPartial } from "@/i18n/types";
import { zhAipanel } from "./aipanel";
import { zhBlockframe } from "./blockframe";
import { zhConn } from "./conn";
import { zhCommon } from "./common";
import { zhContextmenu } from "./contextmenu";
import { zhHelp } from "./help";
import { zhLauncher } from "./launcher";
import { zhMain } from "./main";
import { zhModals } from "./modals";
import { zhOnboarding } from "./onboarding";
import { zhPreview } from "./preview";
import { zhProcessviewer } from "./processviewer";
import { zhQuicktips } from "./quicktips";
import { zhSysinfo } from "./sysinfo";
import { zhTab } from "./tab";
import { zhTerm } from "./term";
import { zhTips } from "./tips";
import { zhViews } from "./views";
import { zhWaveai } from "./waveai";
import { zhWaveconfig } from "./waveconfig";
import { zhWeb } from "./web";
import { zhWebview } from "./webview";
import { zhWorkspace } from "./workspace";

const zh: DeepPartial<Dict> = {
    common: zhCommon,
    tab: zhTab,
    workspace: zhWorkspace,
    blockframe: zhBlockframe,
    conn: zhConn,
    contextmenu: zhContextmenu,
    modals: zhModals,
    views: zhViews,
    term: zhTerm,
    preview: zhPreview,
    web: zhWeb,
    webview: zhWebview,
    waveai: zhWaveai,
    aipanel: zhAipanel,
    launcher: zhLauncher,
    sysinfo: zhSysinfo,
    processviewer: zhProcessviewer,
    waveconfig: zhWaveconfig,
    onboarding: zhOnboarding,
    quicktips: zhQuicktips,
    help: zhHelp,
    tips: zhTips,
    main: zhMain,
};

export { zh as ZH_DICT };
