// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { useT } from "@/i18n/i18n";

const UpgradeOnboardingModal_v0_14_1_Content = () => {
    const t = useT();
    return (
        <div className="flex flex-col items-start w-full mb-2 unselectable">
            <div className="text-secondary leading-relaxed mb-4">
                <p className="mb-0">{t("onboarding.v0141.intro")}</p>
            </div>

            <div className="flex w-full items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-terminal"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0141.terminalFixesTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0141.claudeScrollLabel")}</strong> -{" "}
                                {t("onboarding.v0141.claudeScrollText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0141.imeFixLabel")}</strong> -{" "}
                                {t("onboarding.v0141.imeFixText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0141.scrollResizeLabel")}</strong> -{" "}
                                {t("onboarding.v0141.scrollResizeText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0141.scrollbackSaveLabel")}</strong> -{" "}
                                {t("onboarding.v0141.scrollbackSaveIntro")} <code>wsh</code>{" "}
                                {t("onboarding.v0141.scrollbackSaveOutro")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-sliders"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0141.configOptionsTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0141.focusCursorLabel")}</strong> -{" "}
                                {t("onboarding.v0141.focusCursorIntro")} <code>app:focusfollowscursor</code>{" "}
                                {t("onboarding.v0141.focusCursorOutro")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0141.cursorStyleLabel")}</strong> -{" "}
                                {t("onboarding.v0141.cursorStyleText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0141.vimNavLabel")}</strong> -{" "}
                                {t("onboarding.v0141.vimNavText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0141.aiProvidersLabel")}</strong> -{" "}
                                {t("onboarding.v0141.aiProvidersText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpgradeOnboardingModal_v0_14_1_Content.displayName = "UpgradeOnboardingModal_v0_14_1_Content";

export { UpgradeOnboardingModal_v0_14_1_Content };
