// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

import { globalStore } from "@/app/store/jotaiStore";
import { setLangOverride } from "@/i18n/i18n";
import { Provider } from "jotai";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TermLinkTooltipContent } from "./term-tooltip";

describe("TermLinkTooltipContent", () => {
    setLangOverride("en");

    it("keeps the existing modifier-click hint for plain URLs", () => {
        const markup = renderToStaticMarkup(
            <Provider store={globalStore}>
                <TermLinkTooltipContent />
            </Provider>
        );
        expect(markup).toContain("-click to open link");
        expect(markup).not.toContain("break-all");
    });

    it("shows and safely escapes the destination for OSC 8 links", () => {
        const markup = renderToStaticMarkup(
            <Provider store={globalStore}>
                <TermLinkTooltipContent url="https://example.com/?next=<script>&x=1" />
            </Provider>
        );
        expect(markup).toContain("-click to open link");
        expect(markup).toContain("https://example.com/?next=&lt;script&gt;&amp;x=1");
        expect(markup).toContain("break-all");
        expect(markup).not.toContain("<script>");
    });
});
