// Copyright 2022 by [Chris Palmer](https://noncombatant.org)
// SPDX-License-Identifier: Apache-2.0

"use strict";

const log = function() {
  errorsDiv.innerText = Array.from(arguments).join(" ")
  console.log(...arguments)
}

const removeRuleIds = [...Array(chrome.declarativeNetRequest.MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES).keys()].map(x => x + 1)

export const applyBlorpList = async function() {
  const options = { addRules: [], removeRuleIds: removeRuleIds }
  const patterns = localStorage.getItem("blorpList").split(/[\r\n]+/).map(p => p.trim()).filter(p => p.length > 0)
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i]
    options.addRules.push({
      id: i + 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        resourceTypes: [
          "main_frame",
          "sub_frame",
          "stylesheet",
          "script",
          "image",
          "font",
          "object",
          "xmlhttprequest",
          "ping",
          "csp_report",
          "media",
          "websocket",
          "other"
        ],
        urlFilter: pattern,
        isUrlFilterCaseSensitive: false,
      }
    })
  }
  await chrome.declarativeNetRequest.updateDynamicRules(options)
  log("Loaded", options.addRules.length, "rules")
}

const onApplyButtonClick = async function(event) {
  localStorage.setItem("blorpList", blorpList.value)
  await applyBlorpList()
}

document.body.onload = async function(event) {
  blorpList.value = localStorage.getItem("blorpList")
  applyButton.addEventListener("click", onApplyButtonClick)
}
