# Prompt AI — Chrome Extension

A small dot overlaid on the ChatGPT / Claude input box that turns:
- 🔴 **red** — weak prompt
- 🟡 **yellow** — okay, could be sharper
- 🟢 **green** — solid prompt
- 🟣 **purple** — no Gemini API key set yet
- ⚪ **gray, pulsing** — analyzing

Hover or click the dot to see 1–4 short bullets on what's *missing* —
it never rewrites your prompt for you.

## 1. Load the extension (unpacked)

1. Open `chrome://extensions`
2. Toggle **Developer mode** on (top right)
3. Click **Load unpacked**
4. Select this folder (`promptai-extension`)

The extension is now active on `chatgpt.com`, `chat.openai.com`, and `claude.ai`.

## 2. Add your Gemini API key — this is the ONLY place it goes

1. Click the extension's icon in your Chrome toolbar (or go to
   `chrome://extensions` → PromptAI → **Details** → **Extension options**)
2. Paste your Gemini API key into the **Gemini API key** field
3. Pick a model (default `gemini-2.0-flash` is fastest/cheapest)
4. Click **Save**
5. Reload any open ChatGPT/Claude tabs

Get a free key at https://aistudio.google.com/apikey

### Why this is safe
- The key is stored in `chrome.storage.local`, scoped to this extension only.
- Only `background.js` (the service worker) ever reads the key.
- `content.js` — the part that runs *inside* chatgpt.com/claude.ai pages —
  never sees the key. It only sends prompt text to the background worker
  and gets back a score. This matters because content scripts share the
  page's environment, so keeping the key out of it is what keeps it safe
  from any page-level script on those sites.
- The key is sent over HTTPS directly to `generativelanguage.googleapis.com`
  (Google's Gemini endpoint) — nowhere else.

## 3. How grading works

Every time you pause typing for ~1 second (and have written 12+ characters),
the current draft is sent to Gemini with instructions to score it 1–10 on:
clarity, specificity, context, desired output format, and constraints —
and to list what's missing, not rewrite it.

## Customizing

- **Debounce / minimum length**: `DEBOUNCE_MS` and `MIN_CHARS` at the top of `content.js`
- **Grading criteria / tone of feedback**: `SYSTEM_INSTRUCTION` in `background.js`
- **Colors**: `content.css`
- **Score thresholds** (bad/okay/good): set inside the Gemini prompt in `background.js`,
  under "Verdict mapping"

## Troubleshooting

- **Dot never appears**: the site's DOM changed. Open DevTools console on the
  page and check for errors; you may need to update a selector in
  `findInputBox()` in `content.js`.
- **Dot stays purple**: no API key saved, or the tab was open before you saved it — reload the tab.
- **Dot stays gray/error on hover**: hover it — the tooltip shows the raw
  error (bad key, rate limit, network issue, etc).
