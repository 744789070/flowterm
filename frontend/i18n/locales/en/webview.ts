// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

const webview = {
    mobileUserAgentIphone: "Mobile User Agent: iPhone",
    mobileUserAgentAndroid: "Mobile User Agent: Android",
    openInExternalBrowser: "Open in External Browser",
    userAgentType: "User Agent Type",
    userAgentIphone: "Mobile: iPhone",
    userAgentAndroid: "Mobile: Android",
    copyUrlToClipboard: "Copy URL to Clipboard",
    setBlockHomepage: "Set Block Homepage",
    setDefaultHomepage: "Set Default Homepage",
    unHideNavigation: "Un-Hide Navigation",
    hideNavigation: "Hide Navigation",
    setZoomFactor: "Set Zoom Factor",
    openDevtools: "Open DevTools",
    closeDevtools: "Close DevTools",
    clearHistory: "Clear History",
    clearCookiesAndStorage: "Clear Cookies and Storage (All Web Widgets)",
    openBookmark: "Open Bookmark...",
    noBookmarksConfigured: "No Bookmarks Configured",
    editBookmarksDescBefore: "Edit your",
    editBookmarksDescAfter: "file to configure bookmarks.",
    openBookmarksJson: "Open bookmarks.json",
    editBookmarksJson: "Edit bookmarks.json",
    noMatchingBookmarks: "No matching bookmarks",
    failedToLoadUrl: "Failed to load {url}: {msg}",
    tsunami: {
        stop: "Stop WaveApp",
        restart: "Restart WaveApp",
        restartForceRebuild: "Restart WaveApp and Force Rebuild",
        remixInBuilder: "Remix WaveApp in Builder",
        appPathOrIdRequired: "App path or app ID must be set (tsunami:apppath or tsunami:appid)",
        invalidController: "Invalid controller (must be \"tsunami\")",
        start: "Start",
        starting: "Starting...",
    },
    vdom: {
        invalidTag: "Invalid Tag <{tag}>",
    },
    aiFileDiff: {
        loading: "Loading diff...",
        noDiffData: "No diff data available",
        missingChatMetadata: "Missing chatId or toolCallId in block metadata",
        missingFileName: "Missing file name in block metadata",
        noDiffFromServer: "No diff data returned from server",
        errorLoading: "Error loading diff data: {msg}",
    },
};

export { webview };
