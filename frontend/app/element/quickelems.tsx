// Copyright 2025, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { t } from "@/i18n/i18n";
import React from "react";
import "./quickelems.scss";

function CenteredLoadingDiv() {
    return <CenteredDiv>{t("common.loading")}</CenteredDiv>;
}

function CenteredDiv({ children }: { children: React.ReactNode }) {
    return (
        <div className="centered-div">
            <div>{children}</div>
        </div>
    );
}

export { CenteredDiv, CenteredLoadingDiv };
