# Blorp: Simple site allow/deny list

Blorp is the simplest possible content ~~blorper~~ blocker for browsers that use
the Chromium extension API v3. At your choice, it blocks all URLs matching
patterns you provide, or it loads only the matching URLs. Blorp’s simplicity,
and the exclusive use of the declarative APIs, make it efficient and safe (no
powerful permissions required).

## Blocking And Allowing URLs

![Screenshot of using the Blorp pop-up](screenshot.png)

Click on the puzzle piece icon in Chrome’s toolbar, and then on the Blorp **B**
icon in the pop-up that appears. This will raise the **Blorp List**
configuration pop-up. Add `urlFilter`s, 1 per line, that describe URLs you would
like to match. Select either **Block** or **Allow**, and click **Apply**. You
can easily turn filtering on or off by checking and unchecking the **Enabled**
checkbox.

The simplest approach is to give a list of strings, such as domain names or
parts of URLs like paths or query strings. If the string occurs anywhere in a
URL, Blorp will block it from loading. Matching is case-insensitive.

Fancier pattern-matching is possible. For the full details on the syntax and
semantics of `urlFilter`s, see [the `declarativeNetRequest`
documentation](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/).

## Where To Get Lists Of Patterns?

To create an allow list, just add the sites you like.

Lots of people publish open source URL block lists that you can use.

(I built my list manually, by watching URLs load in Chrome’s Developer Tools,
and it mostly contains domain names. However, I am strange. Don’t end up like
me, kids.)
