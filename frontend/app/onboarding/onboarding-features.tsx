// Copyright 2025, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import MascotLogo from "@/app/asset/mascot-128.png";
import { EmojiButton } from "@/app/element/emojibutton";
import { MagnifyIcon } from "@/app/element/magnify";
import { ClientModel } from "@/app/store/client-model";
import * as WOS from "@/app/store/wos";
import { RpcApi } from "@/app/store/wshclientapi";
import { TabRpcClient } from "@/app/store/wshrpcutil";
import * as services from "@/store/services";
import { isMacOS } from "@/util/platformutil";
import { fireAndForget } from "@/util/util";
import { useT } from "@/i18n/i18n";
import { useEffect, useState } from "react";
import { EditBashrcCommand, ViewLogoCommand, ViewShortcutsCommand } from "./onboarding-command";
import { CurrentOnboardingVersion } from "./onboarding-common";
import { DurableSessionPage } from "./onboarding-durable";
import { OnboardingFooter } from "./onboarding-features-footer";
import { FakeLayout } from "./onboarding-layout";

type FeaturePageName = "durable" | "magnify" | "files";

export const MagnifyBlocksPage = ({
    onNext,
    onSkip,
    onPrev,
}: {
    onNext: () => void;
    onSkip: () => void;
    onPrev?: () => void;
}) => {
    const isMac = isMacOS();
    const shortcutKey = isMac ? "⌘" : "Alt";
    const [fireClicked, setFireClicked] = useState(false);
    const t = useT();

    const handleFireClick = () => {
        setFireClicked(!fireClicked);
        if (!fireClicked) {
            RpcApi.RecordTEventCommand(TabRpcClient, {
                event: "onboarding:fire",
                props: {
                    "onboarding:feature": "magnify",
                    "onboarding:version": CurrentOnboardingVersion,
                },
            });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center gap-4 mb-6 w-full unselectable flex-shrink-0">
                <div>
                    <img src={MascotLogo} className="w-[88px] rounded-2xl" alt="" />
                </div>
                <div className="text-[25px] font-normal text-foreground">{t("onboarding.magnify.title")}</div>
            </header>
            <div className="flex-1 flex flex-row gap-0 min-h-0">
                <div className="flex-1 flex flex-col items-center justify-center gap-8 pr-6 unselectable">
                    <div className="text-6xl font-semibold text-foreground">{shortcutKey}-M</div>
                    <div className="flex flex-col items-start gap-4 text-secondary max-w-md">
                        <p>{t("onboarding.magnify.intro")}</p>
                        <p>{t("onboarding.magnify.efficient")}</p>
                        <div>
                            {t("onboarding.magnify.clickIntro")}{" "}
                            <span className="inline-block align-middle [&_svg_path]:!fill-foreground">
                                <MagnifyIcon enabled={false} />
                            </span>{" "}
                            {t("onboarding.magnify.clickOutro")}
                        </div>
                        <p>{t("onboarding.magnify.hint", { key: `${shortcutKey}-M` })}</p>
                        <EmojiButton emoji="🔥" isClicked={fireClicked} onClick={handleFireClick} />
                    </div>
                </div>
                <div className="w-[2px] bg-border flex-shrink-0"></div>
                <div className="flex items-center justify-center pl-6 flex-shrink-0 w-[400px]">
                    <FakeLayout />
                </div>
            </div>
            <OnboardingFooter currentStep={2} totalSteps={3} onNext={onNext} onPrev={onPrev} onSkip={onSkip} />
        </div>
    );
};

export const FilesPage = ({ onFinish, onPrev }: { onFinish: () => void; onPrev?: () => void }) => {
    const [fireClicked, setFireClicked] = useState(false);
    const isMac = isMacOS();
    const [commandIndex, setCommandIndex] = useState(0);
    const t = useT();

    const handleFireClick = () => {
        setFireClicked(!fireClicked);
        if (!fireClicked) {
            RpcApi.RecordTEventCommand(TabRpcClient, {
                event: "onboarding:fire",
                props: {
                    "onboarding:feature": "wsh",
                    "onboarding:version": CurrentOnboardingVersion,
                },
            });
        }
    };

    const commands = [
        (onComplete: () => void) => <EditBashrcCommand onComplete={onComplete} />,
        (onComplete: () => void) => <ViewShortcutsCommand isMac={isMac} onComplete={onComplete} />,
        (onComplete: () => void) => <ViewLogoCommand onComplete={onComplete} />,
    ];

    const handleCommandComplete = () => {
        setTimeout(() => {
            setCommandIndex((prev) => (prev + 1) % commands.length);
        }, 2500);
    };

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center gap-4 mb-6 w-full unselectable flex-shrink-0">
                <div>
                    <img src={MascotLogo} className="w-[88px] rounded-2xl" alt="" />
                </div>
                <div className="text-[25px] font-normal text-foreground">{t("onboarding.files.title")}</div>
            </header>
            <div className="flex-1 flex flex-row gap-0 min-h-0">
                <div className="flex-1 flex flex-col items-center justify-center gap-8 pr-6 unselectable">
                    <div className="flex flex-col items-start gap-6 max-w-md">
                        <div className="flex flex-col items-start gap-4 text-secondary">
                            <p>
                                {t("onboarding.files.previewIntro")} <i>{t("onboarding.files.previewRemote")}</i>{" "}
                                {t("onboarding.files.previewOutro")}
                            </p>

                            <div className="flex items-start gap-3 w-full">
                                <i className="fa fa-eye text-accent text-lg mt-1 flex-shrink-0" />
                                <div>
                                    <p className="mb-2">
                                        {t("onboarding.files.viewIntro")}{" "}
                                        <span className="font-mono font-semibold text-foreground">
                                            wsh view [filename]
                                        </span>{" "}
                                        {t("onboarding.files.viewOutro")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 w-full">
                                <i className="fa fa-pen-to-square text-accent text-lg mt-1 flex-shrink-0" />
                                <div>
                                    <p className="mb-2">
                                        {t("onboarding.files.editIntro")}{" "}
                                        <span className="font-mono font-semibold text-foreground">
                                            wsh edit [filename]
                                        </span>{" "}
                                        {t("onboarding.files.editOutro")}
                                    </p>
                                </div>
                            </div>

                            <p>{t("onboarding.files.seamless")}</p>

                            <EmojiButton emoji="🔥" isClicked={fireClicked} onClick={handleFireClick} />
                        </div>
                    </div>
                </div>
                <div className="w-[2px] bg-border flex-shrink-0"></div>
                <div className="flex items-center justify-center pl-6 flex-shrink-0 w-[400px]">
                    {commands[commandIndex](handleCommandComplete)}
                </div>
            </div>
            <OnboardingFooter currentStep={3} totalSteps={3} onNext={onFinish} onPrev={onPrev} />
        </div>
    );
};

export const OnboardingFeatures = ({ onComplete }: { onComplete: () => void }) => {
    const [currentPage, setCurrentPage] = useState<FeaturePageName>("durable");

    useEffect(() => {
        // onboarding:lastversion 不在这里记录：引导必须走完最后一页才记录（见 handleFinish）
        RpcApi.RecordTEventCommand(TabRpcClient, {
            event: "onboarding:start",
            props: {
                "onboarding:version": CurrentOnboardingVersion,
            },
        });
    }, []);

    const handleNext = () => {
        if (currentPage === "durable") {
            setCurrentPage("magnify");
        } else if (currentPage === "magnify") {
            setCurrentPage("files");
        }
    };

    const handlePrev = () => {
        if (currentPage === "magnify") {
            setCurrentPage("durable");
        } else if (currentPage === "files") {
            setCurrentPage("magnify");
        }
    };

    const handleSkip = () => {
        RpcApi.RecordTEventCommand(TabRpcClient, {
            event: "onboarding:skip",
            props: {},
        });
        onComplete();
    };

    const handleFinish = () => {
        // 引导走完最后一页才记录 tosagreed + onboarding:lastversion；
        // 中途关闭或「跳过」都不记录，下次启动会重新显示引导。
        // 串行写入（tosagreed 先落库，再记 lastversion），带超时+重试兜底：
        // 偶发 RPC 丢失不能让用户卡在引导里，最坏情况本次不记录、下次启动重新引导。
        const clientId = ClientModel.getInstance().clientId;
        fireAndForget(async () => {
            const agreeWithTimeout = () =>
                Promise.race([
                    services.ClientService.AgreeTos().then(() => true),
                    new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 3000)),
                ]).catch((e) => {
                    console.log("onboarding: AgreeTos attempt failed", e);
                    return false;
                });
            let agreed = false;
            for (let attempt = 0; attempt < 3 && !agreed; attempt++) {
                agreed = await agreeWithTimeout();
                if (!agreed) {
                    await new Promise((resolve) => setTimeout(resolve, 400));
                }
            }
            if (agreed) {
                try {
                    await Promise.race([
                        RpcApi.SetMetaCommand(TabRpcClient, {
                            oref: WOS.makeORef("client", clientId),
                            meta: { "onboarding:lastversion": CurrentOnboardingVersion },
                        }),
                        new Promise((resolve) => setTimeout(resolve, 3000)),
                    ]);
                } catch (e) {
                    console.log("onboarding: SetMeta lastversion failed", e);
                }
            } else {
                console.log("onboarding: AgreeTos failed after retries, closing without record");
            }
            onComplete();
        });
    };

    let pageComp: React.JSX.Element = null;
    switch (currentPage) {
        case "durable":
            pageComp = <DurableSessionPage onNext={handleNext} onSkip={handleSkip} onPrev={handlePrev} />;
            break;
        case "magnify":
            pageComp = <MagnifyBlocksPage onNext={handleNext} onSkip={handleSkip} onPrev={handlePrev} />;
            break;
        case "files":
            pageComp = <FilesPage onFinish={handleFinish} onPrev={handlePrev} />;
            break;
    }

    return <div className="flex flex-col w-full h-full">{pageComp}</div>;
};
