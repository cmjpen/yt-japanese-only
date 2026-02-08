# YouTube Japanese Only

Small Chrome extension that hides (dims and marks) YouTube videos whose titles do not contain Japanese characters.

## What it does

- Scans video titles on YouTube pages and checks whether the title contains Japanese characters (Hiragana, Katakana, Kanji).
- If a title appears to be non-Japanese, the extension visually de-emphasises the video by reducing opacity and adding a red dashed border so you can quickly spot and ignore non-Japanese content.
- The extension runs as a content script on all youtube.com pages and updates dynamically as the page changes.

The extension does all processing locally in your browser; it uses chrome.storage.sync only to save your settings (enabled state and opacity preference).

## Files

- `manifest.json` — Extension manifest (manifest_version: 3). Declares content script and popup.
- `content.js` — Content script that finds video title elements, detects Japanese text and applies styles to non-Japanese videos. Also observes DOM mutations and periodically re-runs filtering.
- `popup.html` / `popup.js` — Small options popup where you can enable/disable the filter and set how transparent non-Japanese videos become (opacity value). Settings are stored using chrome.storage.sync.

## Features

- Toggle extension on/off via popup.
- Adjust dim opacity for filtered videos.
- Works on watch pages, home feed, search results and channel pages (any matching YouTube pages).

## Installation (Load unpacked extension in Chrome)

1. Open Chrome and go to chrome://extensions
2. Enable **Developer mode** (toggle in the top-right)
3. Click **Load unpacked**
4. In the file picker, select the folder that contains this extension's files (the folder with manifest.json, content.js, popup.html and popup.js). For example: `C:\Users\<your-username>\Desktop\yt-japanese-only`
5. The extension should appear in the list. Make sure it is enabled.
6. Open or reload any YouTube page (https://www.youtube.com) — you should see non-Japanese videos visually de-emphasised.

Note: Because this is a local (unpacked) extension, Chrome may warn about developer mode. This is expected for extensions you load from a folder.

## Usage

1. Click the extension icon to open the popup.
2. Toggle the **Enabled** checkbox to turn filtering on/off.
3. Use the **Opacity** slider to set how transparent non-Japanese videos become (lowest value = invisible). Click Save to persist settings.

## Troubleshooting

- If filtering doesn't appear to work, confirm the extension is enabled in chrome://extensions and the page is reloaded.
- Open DevTools on YouTube (F12) and check the console for the log: `JP Filter: Lockup Logic Active` — this confirms the content script is running.
- If you installed the extension correctly but do not see changes, try toggling the extension off and on again, then reload the page.

## Privacy

This extension does not send any data to external servers. It only reads titles from the YouTube page DOM locally and stores your preferences using Chrome's sync storage.

## Development notes

- The title-language detection is a simple regex that looks for Japanese character ranges. It may not be perfect (for example, romanized Japanese or mixed-language titles). You can modify `content.js` to alter the detection logic or styling. Google translated titles will still show.
Also, the non-Japanese videos are hidden but thumbnails can still play on the thumbnails if you
hover your mouse over the blank spot where the video is.

## License

MIT — feel free to reuse or modify.
