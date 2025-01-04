// Copyright 2022 by [Chris Palmer](https://noncombatant.org)
// SPDX-License-Identifier: Apache-2.0

"use strict";

chrome.runtime.onInstalled.addListener(async function () {
    chrome.declarativeNetRequest.setExtensionActionOptions({
        displayActionCountAsBadgeText: true
    });
})
