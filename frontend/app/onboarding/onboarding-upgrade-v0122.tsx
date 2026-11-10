// Copyright 2025, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { useT } from "@/i18n/i18n";

const UpgradeOnboardingModal_v0_12_2_Content = () => {
    const t = useT();
    return (
        <div className="flex flex-col items-start gap-6 w-full mb-4 unselectable">
            <div className="text-secondary leading-relaxed">
                <p className="mb-0">{t("onboarding.v0122.intro")}</p>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-file-pen"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0122.fileEditingTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0122.fileWriteLabel")}</strong> -{" "}
                                {t("onboarding.v0122.fileWriteText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0122.diffPreviewLabel")}</strong> -{" "}
                                {t("onboarding.v0122.diffPreviewText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0122.rollbackLabel")}</strong> -{" "}
                                {t("onboarding.v0122.rollbackText")}
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
                        {t("onboarding.v0122.aiImprovementsTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>{t("onboarding.v0122.dragDrop")}</li>
                            <li>
                                {t("onboarding.v0122.dirListingsIntro")}{" "}
                                <span className="font-mono">`wsh ai`</span> {t("onboarding.v0122.dirListingsOutro")}
                            </li>
                            <li>{t("onboarding.v0122.thinkingLevel")}</li>
                            <li>{t("onboarding.v0122.toolDesc")}</li>
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
                        {t("onboarding.v0122.bugfixesTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>{t("onboarding.v0122.memoryLeak")}</li>
                            <li>{t("onboarding.v0122.schemaValidation")}</li>
                            <li>{t("onboarding.v0122.pwsh")}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpgradeOnboardingModal_v0_12_2_Content.displayName = "UpgradeOnboardingModal_v0_12_2_Content";

export { UpgradeOnboardingModal_v0_12_2_Content };
