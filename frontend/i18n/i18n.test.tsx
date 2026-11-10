// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { globalStore } from "@/app/store/jotaiStore";
import { Provider } from "jotai";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { EN_DICT, type Dict } from "./locales/en";
import {
    getCurrentLang,
    lookupTranslation,
    normalizeLang,
    setLangOverride,
    tLang,
    useT,
    type TranslationKey,
} from "./i18n";

function getLeafPaths(obj: object, prefix = ""): string[] {
    const keys: string[] = [];
    for (const k in obj) {
        const path = prefix ? `${prefix}.${k}` : k;
        const val = (obj as Record<string, unknown>)[k];
        if (typeof val === "string") {
            keys.push(path);
        } else {
            keys.push(...getLeafPaths(val as object, path));
        }
    }
    return keys;
}

describe("i18n", () => {
    afterEach(() => {
        setLangOverride(null);
    });

    it("en and zh dicts have full key parity", () => {
        const enPaths = getLeafPaths(EN_DICT);
        expect(enPaths.length).toBeGreaterThan(100);
        const missing = enPaths.filter((path) => lookupTranslation("zh", path as TranslationKey) == null);
        expect(missing).toEqual([]);
    });

    it("normalizeLang maps locale tags", () => {
        expect(normalizeLang("zh-CN")).toBe("zh");
        expect(normalizeLang("zh-TW")).toBe("zh");
        expect(normalizeLang("en-US")).toBe("en");
        expect(normalizeLang("en")).toBe("en");
        expect(normalizeLang("fr")).toBe("en");
        expect(normalizeLang(null)).toBe("en");
    });

    it("tLang looks up en and zh", () => {
        expect(tLang("en", "common.cancel")).toBe("Cancel");
        expect(tLang("zh", "common.cancel")).toBe("取消");
    });

    it("tLang falls back to en for zh keys missing from zh dict", () => {
        expect(tLang("zh", "common.cancel")).not.toBe("common.cancel");
        expect(lookupTranslation("en", "common.cancel")).toBe("Cancel");
    });

    it("tLang returns the key itself when missing everywhere", () => {
        expect(tLang("en", "fake.missing.key" as TranslationKey)).toBe("fake.missing.key");
    });

    it("tLang interpolates {var} placeholders", () => {
        expect(tLang("en", "modals.about.clientVersion", { version: "9.9.9" })).toBe("Client Version 9.9.9");
        expect(tLang("zh", "modals.about.clientVersion", { version: "9.9.9" })).toContain("9.9.9");
    });

    it("setLangOverride drives getCurrentLang", () => {
        setLangOverride("zh");
        expect(getCurrentLang()).toBe("zh");
        setLangOverride("en");
        expect(getCurrentLang()).toBe("en");
        setLangOverride(null);
    });

    it("useT components re-render in the override language", () => {
        setLangOverride("zh");
        function TestComp() {
            const t = useT();
            return <div>{t("common.cancel")}</div>;
        }
        const markup = renderToStaticMarkup(
            <Provider store={globalStore}>
                <TestComp />
            </Provider>
        );
        expect(markup).toContain("取消");
        expect(markup).not.toContain("Cancel");
    });

    it("dict type Dict is exported with the common domain", () => {
        const dict: Dict = EN_DICT;
        expect(dict.common.cancel).toBe("Cancel");
    });
});
