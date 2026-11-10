// Copyright 2026, Command Line Inc.
// SPDX-License-Identifier: Apache-2.0

const conn = {
    connectionStalled: "Connection Stalled",
    stalledMessage: "Connection to \"{connName}\" is stalled",
    noActivityFor: " (no activity for {duration})",
    moreThanADay: "more than a day",
    disconnect: "Disconnect",
    reconnect: "Reconnect",
    connectingStatus: "Connecting to \"{connName}\"...",
    disconnectedStatus: "Disconnected from \"{connName}\"",
    connectedToGitBash: "Connected to Git Bash",
    connectedToLocalMachine: "Connected to Local Machine",
    connectedTo: "Connected to {conn}",
    connectingTo: "Connecting to {conn}",
    errorConnectingTo: "Error connecting to {conn}",
    disconnectedFrom: "Disconnected from {conn}",
    connectionDegraded: "Connection degraded: {conn}",
    connectionStalledStatus: "Connection stalled: {conn}",
    wshNotInstalled: "wsh is not installed for this connection",
    alwaysDisableWsh: "always disable wsh",
    errorMessage: "error: {msg}",
    wshErrorMessage: "unable to use wsh: {msg}",
    learnMore: "Learn More",
    standardSshSession: "Standard SSH Session",
    standardSshSessionDesc:
        "Standard SSH sessions end when the connection drops. Durable sessions keep your shell state, running programs, and history alive through network changes, computer sleep, and Wave restarts.",
    restartAsDurable: "Restart as Durable",
    durableSessionAttached: "Durable Session (Attached)",
    durableSessionAttachedDesc:
        "Your shell state, running programs, and history are protected. This session will survive network disconnects.",
    durableSessionDetached: "Durable Session (Detached)",
    durableSessionDetachedDesc:
        "Connection lost, but your session is still running on the remote server. Wave will automatically reconnect when the connection is restored.",
    durableSessionAwaitingConnection: "Durable Session (Awaiting Connection)",
    durableSessionAwaitingConnectionDesc:
        "Configured for a durable session. The session will start when the connection is established.",
    durableSessionAwaitingStart: "Durable Session (Awaiting Start)",
    durableSessionAwaitingStartDesc:
        "Configured for a durable session, but session hasn't started yet. Click below to start it manually.",
    startSession: "Start Session",
    durableSessionStarting: "Durable Session (Starting)",
    durableSessionStartingDesc: "The durable session is starting.",
    durableSessionEnded: "Durable Session (Ended)",
    durableSessionEndedDesc: "The durable session has ended. This block is still configured for durable sessions.",
    durableSessionExited: "Durable Session (Ended, Exited)",
    durableSessionExitedDesc:
        "The shell was terminated and is no longer running. This block is still configured for durable sessions.",
    durableSessionLost: "Durable Session (Ended, Lost)",
    durableSessionLostDesc:
        "The session was lost or not found on the remote server. This may have occurred due to a system reboot or the session being manually terminated.",
    durableSessionFailedToStart: "Durable Session (Failed to Start)",
    durableSessionFailedToStartDesc: "The durable session failed to start.",
    restartSession: "Restart Session",
    restartAsStandard: "Restart as Standard",
};

export { conn };
