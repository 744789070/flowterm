// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

const modals = {
    about: {
        tagline1: "Open-Source AI-Integrated Terminal",
        tagline2: "Built for Seamless Workflows",
        basedOn: "Based on Wave Terminal",
        clientVersion: "Client Version {version}",
        updateChannel: "Update Channel: {channel}",
        website: "Website",
        openSource: "Open Source",
        sponsor: "Sponsor",
        languageAuto: "Auto (system)",
    },
    userinput: {
        titleWithCountdown: "{title} ({seconds}s)",
    },
    connTypeAhead: {
        connectTo: "Connect to (username@host)...",
        local: "Local",
        remote: "Remote",
        reconnectTo: "Reconnect to {conn}",
        disconnect: "Disconnect {conn}",
        addConnection: "Add Connection",
        newConnection: "{conn} (New Connection)",
    },
    modal: {
        closeEsc: "Close (ESC)",
    },
    addConn: {
        title: "Add Connection",
        description: "Enter SSH details; the connection will appear in the connection list.",
        name: "Connection name",
        host: "Host (SSH)",
        user: "User (optional)",
        port: "Port (optional, default 22)",
        submit: "Add",
        saveFailed: "Failed to save, please try again",
        overwriteConfirm: "Connection \"{name}\" already exists. Overwrite its settings?",
    },
};

export { modals };
