// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { useT } from "@/i18n/i18n";

const UpgradeOnboardingModal_v0_14_4_Content = () => {
    const t = useT();
    return (
        <div className="flex flex-col items-start gap-6 w-full mb-4 unselectable">
            <div className="text-secondary leading-relaxed">
                <p className="mb-0">{t("onboarding.v0144.intro")}</p>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-table-columns"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0144.verticalTabTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0144.verticalTabLabel")}</strong> -{" "}
                                {t("onboarding.v0144.verticalTabText")}
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
                                <strong>{t("onboarding.v0144.xtermLabel")}</strong> -{" "}
                                {t("onboarding.v0144.xtermText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-wrench"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.release.otherTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0144.macClickLabel")}</strong> -{" "}
                                {t("onboarding.v0144.macClickText")}
                            </li>
                            <li>
                                <strong>
                                    <code>backgrounds.json</code>
                                </strong>{" "}
                                - {t("onboarding.v0144.renamedIntro")} <code>presets/bg.json</code>{" "}
                                {t("onboarding.v0144.renamedMid")} <code>backgrounds.json</code>
                            </li>
                            <li>
                                <strong>{t("onboarding.v0144.configErrorsLabel")}</strong> -{" "}
                                {t("onboarding.v0144.configErrorsText")}
                            </li>
                            <li>{t("onboarding.v0144.unsavedWarning")}</li>
                            <li>{t("onboarding.v0144.previewStreaming")}</li>
                            <li>{t("onboarding.v0144.legacyAiRemoved")}</li>
                            <li>
                                {t("onboarding.release.bugfix")} {t("onboarding.v0144.focusBugfixText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpgradeOnboardingModal_v0_14_4_Content.displayName = "UpgradeOnboardingModal_v0_14_4_Content";

export { UpgradeOnboardingModal_v0_14_4_Content };
