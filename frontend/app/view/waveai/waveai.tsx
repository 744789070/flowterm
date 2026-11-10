// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { Button } from "@/app/element/button";
import { WorkspaceLayoutModel } from "@/app/workspace/workspace-layout-model";
import { resolvedLangAtom, tLang, useT } from "@/i18n/i18n";
import { atom } from "jotai";
import { useCallback } from "react";

export class WaveAiModel implements ViewModel {
    viewType = "waveai";
    viewIcon = atom("sparkles");
    viewName = atom((get) => tLang(get(resolvedLangAtom), "views.waveai"));
    noPadding = atom(true);
    viewComponent = WaveAiDeprecatedView;

    constructor(_: ViewModelInitType) {}
}

function WaveAiDeprecatedView() {
    const t = useT();
    const handleOpenAIPanel = useCallback(() => {
        WorkspaceLayoutModel.getInstance().setAIPanelVisible(true);
    }, []);

    return (
        <div className="flex h-full w-full flex-col px-6 text-center">
            <div className="flex-[4]" />
            <div className="mx-auto flex w-full max-w-[760px] flex-col items-center">
                <h2 className="text-xl font-semibold text-primary">{t("waveai.deprecated.title")}</h2>
                <p className="mt-3 text-sm leading-6 text-secondary">{t("waveai.deprecated.description")}</p>
                <Button className="mt-6 cursor-pointer" onClick={handleOpenAIPanel}>
                    {t("waveai.deprecated.openPanel")}
                </Button>
            </div>
            <div className="flex-[6]" />
        </div>
    );
}
