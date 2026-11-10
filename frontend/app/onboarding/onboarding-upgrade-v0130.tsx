// Copyright 2025, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { useT } from "@/i18n/i18n";

const UpgradeOnboardingModal_v0_13_0_Content = () => {
    const t = useT();
    return (
        <div className="flex flex-col items-start gap-6 w-full mb-4 unselectable">
            <div className="text-secondary leading-relaxed">
                <p className="mb-0">{t("onboarding.v0130.intro")}</p>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-sparkles"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0130.localAiTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0130.openaiApiLabel")}</strong> -{" "}
                                {t("onboarding.v0130.openaiApiText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0130.geminiLabel")}</strong> - {t("onboarding.v0130.geminiText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0130.presetsLabel")}</strong> -{" "}
                                {t("onboarding.v0130.presetsText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0130.modesLabel")}</strong> - {t("onboarding.v0130.modesText")}
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
                        {t("onboarding.v0130.configWidgetTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0130.configInterfaceLabel")}</strong> -{" "}
                                {t("onboarding.v0130.configInterfaceText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0130.organizationLabel")}</strong> -{" "}
                                {t("onboarding.v0130.organizationText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0130.secretsLabel")}</strong> -{" "}
                                {t("onboarding.v0130.secretsText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-terminal"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.release.terminalImprovements")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0130.bracketedPasteLabel")}</strong> -{" "}
                                {t("onboarding.v0130.bracketedPasteText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0130.windowsPasteLabel")}</strong> -{" "}
                                {t("onboarding.v0130.windowsPasteText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0130.sshPasswordLabel")}</strong> -{" "}
                                {t("onboarding.v0130.sshPasswordText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpgradeOnboardingModal_v0_13_0_Content.displayName = "UpgradeOnboardingModal_v0_13_0_Content";

export { UpgradeOnboardingModal_v0_13_0_Content };
