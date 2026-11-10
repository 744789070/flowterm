// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { useT } from "@/i18n/i18n";
import { useWaveEnv } from "@/app/waveenv/waveenv";

const UpgradeOnboardingModal_v0_14_0_Content = () => {
    const waveEnv = useWaveEnv();
    const t = useT();
    return (
        <div className="flex flex-col items-start w-full mb-2 unselectable">
            <div className="text-secondary leading-relaxed mb-4">
                <p className="mb-0">{t("onboarding.v0140.intro")}</p>
            </div>

            <div className="flex w-full items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-sky-500 fa-sharp fa-solid fa-shield"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.durable.title")}{" "}
                        <button
                            onClick={() => waveEnv.electron.openExternal("https://docs.waveterm.dev/durable-sessions")}
                            className="text-accent text-sm font-normal cursor-pointer hover:underline"
                        >
                            {t("onboarding.release.seeDocs")}
                        </button>
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0140.sessionProtectionLabel")}</strong> -{" "}
                                {t("onboarding.v0140.sessionProtectionText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0140.statusIndicatorsLabel")}</strong> -{" "}
                                {t("onboarding.v0140.statusIndicatorsText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0140.flexibleConfigLabel")}</strong> -{" "}
                                {t("onboarding.v0140.flexibleConfigText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                    <i className="text-[24px] text-accent fa-solid fa-network-wired"></i>
                </div>
                <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="text-foreground text-base font-semibold leading-[18px]">
                        {t("onboarding.v0140.connMonitoringTitle")}
                    </div>
                    <div className="text-secondary leading-5">
                        <ul className="list-disc list-outside space-y-1 pl-5">
                            <li>
                                <strong>{t("onboarding.v0140.keepalivesLabel")}</strong> -{" "}
                                {t("onboarding.v0140.keepalivesText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0140.stalledLabel")}</strong> -{" "}
                                {t("onboarding.v0140.stalledText")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-start gap-4 mb-4">
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
                                <strong>{t("onboarding.v0140.imageSupportLabel")}</strong> -{" "}
                                {t("onboarding.v0140.imageSupportText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0140.stopGenLabel")}</strong> -{" "}
                                {t("onboarding.v0140.stopGenText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0140.autoScroll")}</strong>
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
                                <strong>{t("onboarding.v0140.contextMenuLabel")}</strong> -{" "}
                                {t("onboarding.v0140.contextMenuText")}
                            </li>
                            <li>
                                <strong>{t("onboarding.v0140.osc52Label")}</strong> -{" "}
                                {t("onboarding.v0140.osc52Text")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpgradeOnboardingModal_v0_14_0_Content.displayName = "UpgradeOnboardingModal_v0_14_0_Content";

export { UpgradeOnboardingModal_v0_14_0_Content };
