// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

// 「添加链接」弹框：表单式新建 SSH 连接，写入用户 connections.json（conn:sshhost 等）。
// 布局遵循 shadcn/ui Dialog 规范（p-6 内容距、gap-2 字段组、右对齐 footer）。

import { Button } from "@/app/element/button";
import { Input } from "@/app/element/input";
import { confirmModalPromise } from "@/app/modals/confirmmodal";
import { FlexiModal } from "@/app/modals/modal";
import { atoms } from "@/app/store/global";
import { RpcApi } from "@/app/store/wshclientapi";
import { TabRpcClient } from "@/app/store/wshrpcutil";
import { t, useT } from "@/i18n/i18n";
import { useAtomValue } from "jotai";
import { fireAndForget, isBlank } from "@/util/util";
import { useState } from "react";

const AddConnectionModal = ({ onClose }: { onClose: () => void }) => {
    const t = useT();
    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [user, setUser] = useState("");
    const [port, setPort] = useState("22");
    const [saveError, setSaveError] = useState(false);
    const [saving, setSaving] = useState(false);
    const fullConfig = useAtomValue(atoms.fullConfigAtom);
    const portNum = Number(port.trim());
    const portValid = isBlank(port) || (!Number.isNaN(portNum) && portNum >= 1 && portNum <= 65535);
    const canSubmit = !isBlank(name) && !isBlank(host) && portValid && !saving;
    // 与已有连接同名：提交时二次确认覆盖（SetConnectionsConfigCommand 是合并语义）
    const isDuplicate = !isBlank(name) && fullConfig?.connections?.[name.trim()] != null;

    const submit = async () => {
        if (!canSubmit || saving) {
            return;
        }
        if (isDuplicate) {
            let overwrite: boolean;
            try {
                overwrite = await confirmModalPromise(t("modals.addConn.overwriteConfirm", { name: name.trim() }), {
                    title: t("modals.addConn.title"),
                    okLabel: t("common.ok"),
                    cancelLabel: t("common.cancel"),
                });
            } catch {
                return;
            }
            if (!overwrite) {
                return;
            }
        }
        // 注意键名：ConnKeywords 使用 ssh:hostname / ssh:user / ssh:port（不是旧版 conn:sshhost）
        const meta: { [key: string]: string } = { "ssh:hostname": host.trim() };
        if (!isBlank(user)) {
            meta["ssh:user"] = user.trim();
        }
        if (!isBlank(port) && !Number.isNaN(Number(port.trim())) && Number(port.trim()) != 22) {
            meta["ssh:port"] = port.trim();
        }
        setSaving(true);
        setSaveError(false);
        fireAndForget(async () => {
            try {
                await RpcApi.SetConnectionsConfigCommand(TabRpcClient, { host: name.trim(), metamaptype: meta });
                onClose();
            } catch (e) {
                console.log("error adding connection", e);
                setSaving(false);
                setSaveError(true);
            }
        });
    };

    return (
        <FlexiModal className="w-[420px] p-6" onClickBackdrop={onClose}>
            <div className="relative text-foreground">
                <button
                    className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-muted transition-colors hover:bg-hoverbg hover:text-foreground"
                    onClick={onClose}
                >
                    <i className="fa-sharp fa-solid fa-xmark text-[15px]"></i>
                </button>
                <div className="pr-8">
                    <div className="text-lg font-semibold leading-none">{t("modals.addConn.title")}</div>
                    <div className="mt-2 text-sm text-muted">{t("modals.addConn.description")}</div>
                </div>
                <div className="mt-6 grid gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="addconn-name" className="text-sm font-medium leading-none">
                            {t("modals.addConn.name")}
                        </label>
                        <Input
                            id="addconn-name"
                            value={name}
                            onChange={setName}
                            placeholder="myserver"
                            autoFocus
                            className="h-9 rounded-md"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="addconn-host" className="text-sm font-medium leading-none">
                            {t("modals.addConn.host")}
                        </label>
                        <Input
                            id="addconn-host"
                            value={host}
                            onChange={setHost}
                            placeholder="192.168.1.100"
                            className="h-9 rounded-md"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="addconn-user" className="text-sm font-medium leading-none">
                            {t("modals.addConn.user")}
                        </label>
                        <Input
                            id="addconn-user"
                            value={user}
                            onChange={setUser}
                            placeholder="root"
                            className="h-9 rounded-md"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="addconn-port" className="text-sm font-medium leading-none">
                            {t("modals.addConn.port")}
                        </label>
                        <Input
                            id="addconn-port"
                            value={port}
                            onChange={setPort}
                            isNumber
                            placeholder="22"
                            className="h-9 rounded-md"
                        />
                    </div>
                </div>
                {saveError && (
                    <div className="mt-4 text-sm text-error">{t("modals.addConn.saveFailed")}</div>
                )}
                <div className="mt-6 flex flex-row-reverse gap-2">
                    <Button className="h-9 px-4 text-sm" onClick={submit} disabled={!canSubmit}>
                        {t("modals.addConn.submit")}
                    </Button>
                    <Button className="outlined grey h-9 px-4 text-sm" onClick={onClose}>
                        {t("common.cancel")}
                    </Button>
                </div>
            </div>
        </FlexiModal>
    );
};

export { AddConnectionModal };

AddConnectionModal.displayName = "AddConnectionModal";
