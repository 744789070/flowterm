// Copyright 2025, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { useT } from "@/i18n/i18n";

const UpgradeOnboardingModal_v0_12_3_Content = () => {
    const t = useT();
    return (
        <div className="flex flex-col items-start gap-6 w-full mb-4 unselectable">
            <div className="text-secondary leading-relaxed">
                <p className="mb-0">{t("onboarding.v0123.intro")}</p>
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
                                <strong>{t("onboarding.v0123.gpt51Label")}</strong> - {t("onboarding.v0123.gpt51Text")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0123.thinkingToggleLabel")}</strong> -{" "}
                                {t("onboarding.v0123.thinkingToggleText")}
                            </li>
                            <li>{t("onboarding.v0123.writeBackup")}</li>
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
                                <strong>{t("onboarding.v0123.inputHandlingLabel")}</strong> -{" "}
                                {t("onboarding.v0123.inputHandlingText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0123.imagePasteLabel")}</strong> -{" "}
                                {t("onboarding.v0123.imagePasteText")}
                            </li>
                            <li>{t("onboarding.v0123.shiftEnter")}</li>
                            <li>{t("onboarding.v0123.ime")}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-key"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0123.secretStoreTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0123.secretWidgetLabel")}</strong> -{" "}
                                {t("onboarding.v0123.secretWidgetText")}
                            </li>
                            <li>
                                {t("onboarding.v0123.secretCliIntro")}{" "}
                                <span className="font-mono">wsh secret list/get/set</span>{" "}
                                {t("onboarding.v0123.secretCliOutro")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpgradeOnboardingModal_v0_12_3_Content.displayName = "UpgradeOnboardingModal_v0_12_3_Content";

export { UpgradeOnboardingModal_v0_12_3_Content };
