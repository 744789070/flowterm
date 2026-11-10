// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

export type UiLang = "en" | "zh";

export type TranslationVars = Record<string, string | number>;

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends string ? T[K] : DeepPartial<T[K]>;
};

export type NestedKeyOf<T> = T extends string
    ? never
    : { [K in keyof T & string]: T[K] extends string ? K : `${K}.${NestedKeyOf<T[K]>}` }[keyof T & string];
