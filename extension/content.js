// content.js
// Finds the prompt input box on ChatGPT / Claude, overlays a small traffic-light
// dot on it, and calls the background worker to grade the prompt as you type.

const DEBOUNCE_MS = 900;
const MIN_CHARS = 12;

let dotEl = null;
let tooltipEl = null;
let currentInput = null;
let debounceTimer = null;
let lastAnalyzedText = "";
let lastResult = null;

// --- Find the input box across ChatGPT / Claude, with fallbacks ------------

function findInputBox() {
  const selectors = [
    "#prompt-textarea", // ChatGPT (contenteditable div)
    'div[contenteditable="true"].ProseMirror', // Claude
    'div[contenteditable="true"][aria-label*="prompt" i]',
    'textarea[data-id="root"]',
    'textarea[placeholder*="message" i]',
    'div[contenteditable="true"]',
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el && isVisible(el)) return el;
  }
  return null;
}

function isVisible(el) {
  const rect = el.getBoundingClientRect();
  return rect.width > 50 && rect.height > 0;
}

function getText(el) {
  if (!el) return "";
  return el.tagName === "TEXTAREA" ? el.value : el.innerText || "";
}

// --- UI: the dot + tooltip ---------------------------------------------------

function ensureDot() {
  if (dotEl) return dotEl;

  dotEl = document.createElement("div");
  dotEl.id = "promptai-dot";
  dotEl.className = "promptai-dot promptai-dot--idle";

  tooltipEl = document.createElement("div");
  tooltipEl.id = "promptai-tooltip";
  tooltipEl.className = "promptai-tooltip promptai-hidden";

  document.body.appendChild(dotEl);
  document.body.appendChild(tooltipEl);

  dotEl.addEventListener("mouseenter", showTooltip);
  dotEl.addEventListener("mouseleave", scheduleHideTooltip);
  tooltipEl.addEventListener("mouseenter", cancelHideTooltip);
  tooltipEl.addEventListener("mouseleave", scheduleHideTooltip);
  dotEl.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleTooltip();
  });

  // Placed once when we attach to an input - it does NOT follow scroll,
  // so it stays put instead of jittering around while you scroll the page.
  window.addEventListener("resize", requestPositionUpdate);

  return dotEl;
}

let rafPending = false;
function requestPositionUpdate() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    rafPending = false;
    positionDot();
  });
}

function positionDot() {
  if (!currentInput || !dotEl) return;

  // If the input got removed from the page, hide until we find a new one.
  if (!currentInput.isConnected) {
    dotEl.classList.add("promptai-hidden");
    return;
  }

  const rect = currentInput.getBoundingClientRect();

  // Only hide when the element is genuinely not laid out (display:none etc),
  // not on a momentary 0-size frame mid-scroll or mid-animation.
  if (rect.width === 0 && rect.height === 0 && !isVisible(currentInput)) {
    dotEl.classList.add("promptai-hidden");
    return;
  }

  dotEl.classList.remove("promptai-hidden");
  dotEl.style.top = `${rect.top - 8}px`;
  dotEl.style.left = `${rect.left + 10}px`;
  positionTooltip();
}

function positionTooltip() {
  if (!dotEl || !tooltipEl) return;
  const dotRect = dotEl.getBoundingClientRect();
  tooltipEl.style.top = `${dotRect.bottom + 8}px`;
  tooltipEl.style.left = `${dotRect.left}px`;
}

let hideTimer = null;
function showTooltip() {
  clearTimeout(hideTimer);
  renderTooltip();
  positionTooltip();
  tooltipEl.classList.remove("promptai-hidden");
}
function scheduleHideTooltip() {
  hideTimer = setTimeout(() => tooltipEl.classList.add("promptai-hidden"), 200);
}
function cancelHideTooltip() {
  clearTimeout(hideTimer);
}
function toggleTooltip() {
  if (tooltipEl.classList.contains("promptai-hidden")) showTooltip();
  else tooltipEl.classList.add("promptai-hidden");
}

function renderTooltip() {
  if (!tooltipEl) return;

  if (!lastResult) {
    tooltipEl.innerHTML = `<div class="promptai-tt-title">Keep typing…</div>
      <div class="promptai-tt-body">I'll grade your prompt once there's enough to go on.</div>`;
    return;
  }

  if (lastResult.error === "no-api-key") {
    tooltipEl.innerHTML = `<div class="promptai-tt-title">No API key set</div>
      <div class="promptai-tt-body">Click the extension icon → pick a provider tab and paste a key, or switch to the "Local (no key)" tab for free offline grading.</div>`;
    return;
  }

  if (lastResult.error === "overloaded") {
    tooltipEl.innerHTML = `<div class="promptai-tt-title">Google's model is busy</div>
      <div class="promptai-tt-body">${escapeHtml(lastResult.detail)}</div>`;
    return;
  }

  if (lastResult.error) {
    tooltipEl.innerHTML = `<div class="promptai-tt-title">Couldn't grade this prompt</div>
      <div class="promptai-tt-body">${escapeHtml(lastResult.detail || lastResult.error)}</div>`;
    return;
  }

  const verdictLabel =
    lastResult.verdict === "good" ? "Solid prompt" : lastResult.verdict === "okay" ? "Getting there" : "Needs work";

  const items = (lastResult.missing || [])
    .map((m) => `<li>${escapeHtml(m)}</li>`)
    .join("");

  const badHint =
    lastResult.verdict === "bad"
      ? `<div class="promptai-tt-body promptai-tt-hint">This prompt needs more detail — try adding a few more specific words about what you want.</div>`
      : "";

  tooltipEl.innerHTML = `
    <div class="promptai-tt-title promptai-tt-${lastResult.verdict}">${verdictLabel} · ${lastResult.score}/10</div>
    ${badHint}
    ${
      items
        ? `<ul class="promptai-tt-list">${items}</ul>`
        : `<div class="promptai-tt-body">Nothing obvious missing — looks ready to send.</div>`
    }
  `;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function setDotState(state) {
  if (!dotEl) return;
  dotEl.className = `promptai-dot promptai-dot--${state}`;
}

// --- Analysis flow ------------------------------------------------------------

function scheduleAnalysis(text) {
  clearTimeout(debounceTimer);

  if (text.trim().length < MIN_CHARS) {
    lastResult = null;
    setDotState("idle");
    return;
  }

  setDotState("thinking");
  debounceTimer = setTimeout(() => runAnalysis(text), DEBOUNCE_MS);
}

function runAnalysis(text) {
  if (text === lastAnalyzedText) return;
  lastAnalyzedText = text;

  chrome.runtime.sendMessage({ type: "ANALYZE_PROMPT", text }, (response) => {
    if (chrome.runtime.lastError) {
      lastResult = { error: "network-error", detail: chrome.runtime.lastError.message };
      setDotState("error");
      return;
    }
    lastResult = response;

    if (response?.error) {
      setDotState(response.error === "no-api-key" ? "no-key" : "error");
      return;
    }

    setDotState(response.verdict); // "bad" | "okay" | "good"
    if (!tooltipEl.classList.contains("promptai-hidden")) renderTooltip();
  });
}

// --- Watch the page for the input box appearing / changing --------------------

function attachToInput(el) {
  if (el === currentInput) return;
  currentInput = el;
  lastAnalyzedText = "";
  lastResult = null;
  ensureDot();
  setDotState("idle");
  positionDot();

  const handler = () => scheduleAnalysis(getText(currentInput));
  el.addEventListener("input", handler);
  el.addEventListener("keyup", handler);
}

function scan() {
  const el = findInputBox();
  if (el) {
    attachToInput(el); // only positions on first attach - won't re-follow after that
  } else if (dotEl) {
    dotEl.classList.add("promptai-hidden");
  }
}

const observer = new MutationObserver(() => scan());
observer.observe(document.body, { childList: true, subtree: true });

setInterval(scan, 1500); // cheap fallback for SPA route changes
scan();
