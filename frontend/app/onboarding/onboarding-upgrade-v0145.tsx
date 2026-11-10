// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { useT } from "@/i18n/i18n";

const UpgradeOnboardingModal_v0_14_5_Content = () => {
    const t = useT();
    return (
        <div className="flex flex-col items-start gap-6 w-full mb-4 unselectable">
            <div className="text-secondary leading-relaxed">
                <p className="mb-0">{t("onboarding.v0145.intro")}</p>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-list-tree"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0145.processViewerTitle")}
                    </div>
                    <div className="text-secondary leading-5">{t("onboarding.v0145.processViewerText")}</div>
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
                                <strong>{t("onboarding.v0145.quakeLabel")}</strong> &mdash; {t("onboarding.v0145.quakeIntro")}
                                <code>app:globalhotkey</code>
                                {t("onboarding.v0145.quakeOutro")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0145.dragDropLabel")}</strong> {t("onboarding.v0145.dragDropText")}
                            </li>
                            <li>
                                {t("onboarding.v0145.splitButtonsIntro")} <code>app:showsplitbuttons</code>{" "}
                                {t("onboarding.v0145.splitButtonsOutro")}
                            </li>
                            <li>{t("onboarding.v0145.viewMenuToggle")}</li>
                            <li>{t("onboarding.v0145.f2Rename")}</li>
                            <li>{t("onboarding.v0145.mouseNav")}</li>
                            <li>
                                <strong>{t("onboarding.release.bugfix")}</strong> {t("onboarding.v0145.configBugfixText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpgradeOnboardingModal_v0_14_5_Content.displayName = "UpgradeOnboardingModal_v0_14_5_Content";

export { UpgradeOnboardingModal_v0_14_5_Content };
