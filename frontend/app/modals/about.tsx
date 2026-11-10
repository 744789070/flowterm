// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import MascotLogo from "@/app/asset/mascot-128.png";
import { OnboardingGradientBg } from "@/app/onboarding/onboarding-common";
import { atoms } from "@/app/store/global";
import { modalsModel } from "@/app/store/modalmodel";
import { RpcApi } from "@/app/store/wshclientapi";
import { TabRpcClient } from "@/app/store/wshrpcutil";
import { isDev } from "@/util/isdev";
import { fireAndForget } from "@/util/util";
import { useT } from "@/i18n/i18n";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { Modal } from "./modal";

interface AboutModalVProps {
    versionString: string;
    updaterChannel: string;
    onClose: () => void;
}

const AboutModalV = ({ versionString, updaterChannel, onClose }: AboutModalVProps) => {
    const t = useT();
    const languageSetting = useAtomValue(atoms.settingsAtom)?.["app:language"] ?? "";
    const currentDate = new Date();

    const handleLanguageChange = (lang: string) => {
        fireAndForget(() => RpcApi.SetConfigCommand(TabRpcClient, { "app:language": lang }));
    };

    return (
        <Modal className="pt-[34px] pb-[34px] overflow-hidden w-[450px]" onClose={onClose}>
            <OnboardingGradientBg />
            <div className="flex flex-col gap-[26px] w-full relative z-10">
                <div className="flex flex-col items-center justify-center gap-4 self-stretch w-full text-center">
                    <img src={MascotLogo} className="w-[72px] rounded-2xl" alt="" />
                    <div className="text-[25px]">FlowTerm</div>
                    <div className="leading-5">
                        {t("modals.about.tagline1")}
                        <br />
                        {t("modals.about.tagline2")}
                        <br />
                        <span className="text-[13px] text-attention">{t("modals.about.basedOn")}</span>
                    </div>
                </div>
                <div className="items-center gap-4 self-stretch w-full text-center">
                    {t("modals.about.clientVersion", { version: versionString })}
                    <br />
                    {t("modals.about.updateChannel", { channel: updaterChannel })}
                </div>
                <div className="grid grid-cols-2 gap-[10px] self-stretch w-full">
                    <a
                        href="https://github.com/wavetermdev/waveterm?ref=about"
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center justify-center px-4 py-2 rounded border border-border hover:bg-hoverbg transition-colors duration-200"
                    >
                        <i className="fa-brands fa-github mr-2"></i>GitHub
                    </a>
                    <a
                        href="https://www.waveterm.dev/?ref=about"
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center justify-center px-4 py-2 rounded border border-border hover:bg-hoverbg transition-colors duration-200"
                    >
                        <i className="fa-sharp fa-light fa-globe mr-2"></i>
                        {t("modals.about.website")}
                    </a>
                    <a
                        href="https://github.com/wavetermdev/waveterm/blob/main/ACKNOWLEDGEMENTS.md"
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center justify-center px-4 py-2 rounded border border-border hover:bg-hoverbg transition-colors duration-200"
                    >
                        <i className="fa-sharp fa-light fa-book mr-2"></i>
                        {t("modals.about.openSource")}
                    </a>
                    <a
                        href="https://github.com/sponsors/wavetermdev"
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center justify-center px-4 py-2 rounded border border-border hover:bg-hoverbg transition-colors duration-200"
                    >
                        <i className="fa-sharp fa-light fa-heart mr-2"></i>
                        {t("modals.about.sponsor")}
                    </a>
                </div>
                <div className="flex items-center justify-center gap-2 self-stretch w-full text-center text-[13px]">
                    <span>{t("common.language")}</span>
                    <select
                        value={languageSetting}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="bg-hoverbg border border-border rounded px-2 py-1 text-[13px] cursor-pointer"
                    >
                        <option value="">{t("modals.about.languageAuto")}</option>
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                    </select>
                </div>
                <div className="items-center gap-4 self-stretch w-full text-center">
                    &copy; {currentDate.getFullYear()} Command Line Inc.
                </div>
            </div>
        </Modal>
    );
};

AboutModalV.displayName = "AboutModalV";

const AboutModal = () => {
    const fullConfig = useAtomValue(atoms.fullConfigAtom);
    const versionString = `${fullConfig?.version ?? ""} (${isDev() ? "dev-" : ""}${fullConfig?.buildtime ?? ""})`;
    const updaterChannel = fullConfig?.settings?.["autoupdate:channel"] ?? "latest";

    useEffect(() => {
        fireAndForget(async () => {
            RpcApi.RecordTEventCommand(
                TabRpcClient,
                { event: "action:other", props: { "action:type": "about" } },
                { noresponse: true }
            );
        });
    }, []);

    return (
        <AboutModalV
            versionString={versionString}
            updaterChannel={updaterChannel}
            onClose={() => modalsModel.popModal()}
        />
    );
};

AboutModal.displayName = "AboutModal";

export { AboutModal, AboutModalV };
