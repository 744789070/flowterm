// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { useT } from "@/i18n/i18n";
import { useWaveEnv } from "@/app/waveenv/waveenv";

const UpgradeOnboardingModal_v0_14_2_Content = () => {
    const waveEnv = useWaveEnv();
    const t = useT();
    return (
        <div className="flex flex-col items-start w-full mb-2 unselectable">
            <div className="text-secondary leading-relaxed mb-4">
                <p className="mb-0">{t("onboarding.v0142.intro")}</p>
            </div>

            <div className="flex w-full items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-bell"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0142.badgesTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0142.badgesRollupLabel")}</strong> -{" "}
                                {t("onboarding.v0142.badgesRollupText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0142.bellLabel")}</strong> - {t("onboarding.v0142.bellIntro")}{" "}
                                <code>term:bellindicator</code>
                                {t("onboarding.v0142.bellOutro")}
                            </li>
                            <li>
                                <strong>
                                    <code>wsh badge</code>
                                </strong>{" "}
                                - {t("onboarding.v0142.wshBadgeText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0142.claudeIntegrationLabel")}</strong> -{" "}
                                {t("onboarding.v0142.claudeIntro")} <code>wsh badge</code>{" "}
                                {t("onboarding.v0142.claudeOutro")}{" "}
                                <button
                                    onClick={() => waveEnv.electron.openExternal("https://docs.waveterm.dev/claude-code")}
                                    className="text-accent text-sm font-normal cursor-pointer hover:underline"
                                >
                                    {t("onboarding.release.seeDocs")}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-folder-open"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.release.otherTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>[v0.14.3] </strong>
                                {t("onboarding.release.bugfix")} {t("onboarding.v0142.v143Text")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0142.dirPreviewLabel")}</strong> -{" "}
                                {t("onboarding.v0142.dirPreviewText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0142.searchBarLabel")}</strong> -{" "}
                                {t("onboarding.v0142.searchBarText")}
                            </li>
                            <li>
                                {t("onboarding.release.bugfix")} {t("onboarding.v0142.gnomeBugfixText")}
                            </li>
                            <li>
                                {t("onboarding.release.bugfix")} {t("onboarding.v0142.saveSessionBugfixText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpgradeOnboardingModal_v0_14_2_Content.displayName = "UpgradeOnboardingModal_v0_14_2_Content";

export { UpgradeOnboardingModal_v0_14_2_Content };
