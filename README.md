# Blorp

Blorp is the simplest possible content blocker for browsers that use the
Chromium extension API. It blocks the loading of URLs that match any of a list
of patterns that you provide. Blorp’s simplicity makes it efficient and safe.

## Blocking URLs

![Screenshot of using the Blorp pop-up](screenshot.png)

Click on the Blorp **B** icon in Chrome’s toolbar. This will raise the **Blorp
List** pop-up page. Add `urlFilter`s, 1 per line, that describe URLs you would
like to block. Then click **Apply**.

The simplest approach is to give a list of strings, such as domain names or
parts of URLs like paths or query strings. If the string occurs anywhere in a
URL, Blorp will block it from loading. Matching is case-insensitive.

Fancier pattern-matching is possible. For the full details on the syntax of
`urlFilter`s, see [the `declarativeNetRequest`
documentation](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/).

## Where To Get Lists Of Patterns?

Lots of people publish open source URL block lists that you can use.

(I built my list manually, by watching URLs load in Chrome’s Developer Tools,
and it mostly contains domain names. However, I am strange. Don’t end up like
me, kids.)
