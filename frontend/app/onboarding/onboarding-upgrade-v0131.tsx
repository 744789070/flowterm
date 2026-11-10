// Copyright 2025, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { useT } from "@/i18n/i18n";

const UpgradeOnboardingModal_v0_13_1_Content = () => {
    const t = useT();
    return (
        <div className="flex flex-col items-start gap-6 w-full mb-4 unselectable">
            <div className="text-secondary leading-relaxed">
                <p className="mb-0">{t("onboarding.v0131.intro")}</p>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-brands fa-windows"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0131.windowsTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0131.windowLayoutLabel")}</strong> -{" "}
                                {t("onboarding.v0131.windowLayoutText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0131.gitBashLabel")}</strong> -{" "}
                                {t("onboarding.v0131.gitBashText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0131.sshAgentLabel")}</strong> -{" "}
                                {t("onboarding.v0131.sshAgentText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0131.focusKeyLabel")}</strong> -{" "}
                                {t("onboarding.v0131.focusKeyText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-sparkles"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.release.waveaiUpdates")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0131.visualDesignLabel")}</strong> -{" "}
                                {t("onboarding.v0131.visualDesignText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0131.byokNoTelemetryLabel")}</strong> -{" "}
                                {t("onboarding.v0131.byokNoTelemetryText")}
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
                                <strong>{t("onboarding.v0131.scrollingKeysLabel")}</strong> -{" "}
                                {t("onboarding.v0131.scrollingKeysText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpgradeOnboardingModal_v0_13_1_Content.displayName = "UpgradeOnboardingModal_v0_13_1_Content";

export { UpgradeOnboardingModal_v0_13_1_Content };
