// Copyright 2022 by [Chris Palmer](https://noncombatant.org)
// SPDX-License-Identifier: Apache-2.0

"use strict";

const log = function () {
  errorsDiv.innerText = Array.from(arguments).join(" ")
  console.log(...arguments)
}

const resourceTypes = [
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
]

const removeRuleIds = [...Array(chrome.declarativeNetRequest.MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES).keys()].map(x => x + 1)

export const applyBlorpList = async function (block) {
  const options = { addRules: [], removeRuleIds: removeRuleIds }
  if (listEnabled.checked) {
    const patterns = localStorage.getItem("blorpList").split(/[\r\n]+/).map(p => p.trim()).filter(p => p.length > 0)
    let i = 0
    for (; i < patterns.length; i++) {
      const pattern = patterns[i]
      options.addRules.push({
        id: i + 1,
        priority: 1,
        action: { type: block ? "block" : "allow" },
        condition: {
          resourceTypes: resourceTypes,
          urlFilter: pattern,
          isUrlFilterCaseSensitive: false,
        }
      })
    }
    if (!block) {
      options.addRules.push({
        id: i + 1,
        priority: 1,
        action: { type: "block" },
        condition: {
          resourceTypes: resourceTypes,
          urlFilter: "*://*",
          isUrlFilterCaseSensitive: false,
        }
      })
    }
  }
  await chrome.declarativeNetRequest.updateDynamicRules(options)
  log("Loaded", options.addRules.length, "rules")
}

const onApplyButtonClick = async function (event) {
  localStorage.setItem("blorpList", blorpList.value)
  localStorage.setItem("listEnabled", listEnabled.checked ? "true" : "false")
  localStorage.setItem("listType", listTypeBlock.checked ? "block" : "allow")
  await applyBlorpList(listTypeBlock.checked)
}

document.body.onload = async function (event) {
  blorpList.value = localStorage.getItem("blorpList")
  let enabled = localStorage.getItem("listEnabled")
  listEnabled.checked = enabled !== "false"
  let listType = localStorage.getItem("listType")
  listTypeBlock.checked = listType !== "allow"
  listTypeAllow.checked = listType === "allow"
  applyButton.addEventListener("click", onApplyButtonClick)
}
