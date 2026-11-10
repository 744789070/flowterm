// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import * as jotai from "jotai";
import { useAtomValue } from "jotai";
import { atoms } from "@/app/store/global-atoms";
import { globalStore } from "@/app/store/jotaiStore";
import { EN_DICT, type Dict } from "./locales/en";
import { ZH_DICT } from "./locales/zh";
import type { NestedKeyOf, TranslationVars, UiLang } from "./types";

export type TranslationKey = NestedKeyOf<Dict>;

let detectedLangCache: UiLang = null;
// only set by the electron main process (which has no settingsAtom); renderers resolve via settingsAtom
const langOverrideAtom = jotai.atom(null) as jotai.PrimitiveAtom<UiLang | null>;

const resolvedLangAtom = jotai.atom((get) => {
    let setting: string = null;
    if (atoms != null) {
        setting = get(atoms.settingsAtom)?.["app:language"];
    }
    if (setting != null && setting !== "") {
        return normalizeLang(setting);
    }
    const override = get(langOverrideAtom);
    if (override != null) {
        return override;
    }
    return getDetectedLang();
});

export function normalizeLang(tag: string): UiLang {
    if (tag != null && tag.toLowerCase().startsWith("zh")) {
        return "zh";
    }
    return "en";
}

function getDetectedLang(): UiLang {
    if (detectedLangCache == null) {
        // navigator.language is unavailable in the electron main process; it publishes WAVETERM_LOCALE instead
        detectedLangCache = normalizeLang((globalThis.navigator as Navigator)?.language ?? globalThis.process?.env?.WAVETERM_LOCALE);
    }
    return detectedLangCache;
}

export function setLangOverride(lang: UiLang | null): void {
    globalStore.set(langOverrideAtom, lang);
}

export function lookupTranslation(lang: UiLang, key: TranslationKey): string | null {
    return lookupString(lang === "zh" ? ZH_DICT : EN_DICT, key);
}

function lookupString(dict: object, key: string): string {
    let cur: any = dict;
    for (const part of key.split(".")) {
        if (cur == null || typeof cur !== "object") {
            return null;
        }
        cur = cur[part];
    }
    return typeof cur === "string" ? cur : null;
}

export function tLang(lang: UiLang, key: TranslationKey, vars?: TranslationVars): string {
    let str = lookupString(lang === "zh" ? ZH_DICT : EN_DICT, key);
    if (str == null && lang !== "en") {
        str = lookupString(EN_DICT, key);
    }
    if (str == null) {
        return key;
    }
    if (vars != null) {
        for (const varName in vars) {
            str = str.split(`{${varName}}`).join(String(vars[varName]));
        }
    }
    return str;
}

export function getCurrentLang(): UiLang {
    return globalStore.get(resolvedLangAtom);
}

export function t(key: TranslationKey, vars?: TranslationVars): string {
    return tLang(getCurrentLang(), key, vars);
}

export function useT(): (key: TranslationKey, vars?: TranslationVars) => string {
    const lang = useAtomValue(resolvedLangAtom);
    return (key: TranslationKey, vars?: TranslationVars) => tLang(lang, key, vars);
}

export { resolvedLangAtom };
