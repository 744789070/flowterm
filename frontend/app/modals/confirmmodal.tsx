// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { Modal } from "@/app/modals/modal";
import { modalsModel } from "@/app/store/modalmodel";
import { getApi } from "@/store/global";
import { useT } from "@/i18n/i18n";
import * as React from "react";

import "./confirmmodal.scss";

type ConfirmModalProps = {
    title?: string;
    message: string;
    okLabel?: string;
    cancelLabel?: string;
    onOk?: () => void;
    onClose?: () => void;
};

function ConfirmModalBody({
    title,
    message,
    okLabel,
    cancelLabel,
    onOk,
    onClose,
}: ConfirmModalProps) {
    return (
        <>
            <div className="flex items-start gap-3">
                <i className="fa-sharp fa-solid fa-circle-info text-accent-400 text-[18px] leading-[22px] mt-[1px]" />
                <div className="flex-1 min-w-0">
                    {title != null && <div className="text-[15px] font-semibold leading-[22px]">{title}</div>}
                    <div className="whitespace-pre-line text-[13px] text-secondary leading-[20px] mt-1">{message}</div>
                </div>
            </div>
            <div className="flex justify-end items-center gap-2.5 mt-5">
                <button
                    type="button"
                    onClick={onClose}
                    className="h-[30px] px-3.5 rounded-md text-[13px] text-secondary hover:bg-hoverbg hover:text-primary transition-colors cursor-pointer"
                >
                    {cancelLabel}
                </button>
                <button
                    type="button"
                    onClick={onOk}
                    className="h-[30px] px-3.5 rounded-md text-[13px] font-medium bg-accent-400 text-black hover:bg-accent-300 transition-colors cursor-pointer"
                >
                    {okLabel}
                </button>
            </div>
        </>
    );
}

const ConfirmModal = ({ title, message, okLabel, cancelLabel, onOk, onClose }: ConfirmModalProps) => {
    const t = useT();

    function handleOk() {
        onOk?.();
        modalsModel.popModal();
    }

    function handleClose() {
        onClose?.();
        modalsModel.popModal();
    }

    return (
        <Modal className="confirm-modal" onClose={handleClose}>
            <ConfirmModalBody
                title={title}
                message={message}
                okLabel={okLabel ?? t("common.ok")}
                cancelLabel={cancelLabel ?? t("common.cancel")}
                onOk={handleOk}
                onClose={handleClose}
            />
        </Modal>
    );
};

ConfirmModal.displayName = "ConfirmModal";

// renderer-initiated confirm shown with the app's own modal framework
function confirmModalPromise(
    message: string,
    opts?: { title?: string; okLabel?: string; cancelLabel?: string }
): Promise<boolean> {
    return new Promise((resolve) => {
        modalsModel.pushModal("ConfirmModal", {
            title: opts?.title,
            message,
            okLabel: opts?.okLabel,
            cancelLabel: opts?.cancelLabel,
            onOk: () => resolve(true),
            onClose: () => resolve(false),
        });
    });
}

// renders confirm requests sent from the electron main process (e.g. window close)
const ConfirmModalHost = () => {
    const [req, setReq] = React.useState<ModalConfirmRequest | null>(null);

    React.useEffect(() => {
        try {
            getApi().onModalConfirmRequest((data) => setReq(data));
        } catch (e) {
            console.log("modal confirm host unavailable", e);
        }
    }, []);

    if (req == null) {
        return null;
    }

    function done(ok: boolean) {
        getApi().resolveModalConfirm(req.id, ok);
        setReq(null);
    }

    return (
        <Modal className="confirm-modal" onClose={() => done(false)}>
            <ConfirmModalBody
                title={req.title}
                message={req.message}
                okLabel={req.okLabel}
                cancelLabel={req.cancelLabel}
                onOk={() => done(true)}
                onClose={() => done(false)}
            />
        </Modal>
    );
};

ConfirmModalHost.displayName = "ConfirmModalHost";

export { ConfirmModal, ConfirmModalHost, confirmModalPromise };
