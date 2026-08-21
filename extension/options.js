const tabs = document.querySelectorAll(".provider-tab");
const panels = document.querySelectorAll(".provider-panel");
const saveBtn = document.getElementById("save");
const statusEl = document.getElementById("status");

let activeProvider = "local";

function setActiveProvider(provider) {
  activeProvider = provider;
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.provider === provider));
  panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === provider));
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveProvider(tab.dataset.provider));
});

const PROVIDER_LABELS = { local: "Local (no key)", gemini: "Gemini", openai: "OpenAI", anthropic: "Claude", openrouter: "OpenRouter" };
const currentModeEl = document.getElementById("currentMode");

function updateCurrentModeLabel(provider) {
  currentModeEl.textContent = `Currently active: ${PROVIDER_LABELS[provider] || provider}`;
}

async function load() {
  const settings = await chrome.storage.local.get([
    "activeProvider",
    "geminiApiKey",
    "geminiModel",
    "openaiApiKey",
    "openaiModel",
    "anthropicApiKey",
    "anthropicModel",
    "openrouterApiKey",
    "openrouterModel",
  ]);

  if (settings.geminiApiKey) document.getElementById("geminiApiKey").value = settings.geminiApiKey;
  if (settings.geminiModel) document.getElementById("geminiModel").value = settings.geminiModel;
  if (settings.openaiApiKey) document.getElementById("openaiApiKey").value = settings.openaiApiKey;
  if (settings.openaiModel) document.getElementById("openaiModel").value = settings.openaiModel;
  if (settings.anthropicApiKey) document.getElementById("anthropicApiKey").value = settings.anthropicApiKey;
  if (settings.anthropicModel) document.getElementById("anthropicModel").value = settings.anthropicModel;
  if (settings.openrouterApiKey) document.getElementById("openrouterApiKey").value = settings.openrouterApiKey;
  document.getElementById("openrouterModel").value = settings.openrouterModel || "openai/gpt-5-mini";

  setActiveProvider(settings.activeProvider || "local");
  updateCurrentModeLabel(settings.activeProvider || "local");
}

saveBtn.addEventListener("click", async () => {
  const payload = {
    activeProvider,
    geminiApiKey: document.getElementById("geminiApiKey").value.trim(),
    geminiModel: document.getElementById("geminiModel").value,
    openaiApiKey: document.getElementById("openaiApiKey").value.trim(),
    openaiModel: document.getElementById("openaiModel").value,
    anthropicApiKey: document.getElementById("anthropicApiKey").value.trim(),
    anthropicModel: document.getElementById("anthropicModel").value,
    openrouterApiKey: document.getElementById("openrouterApiKey").value.trim(),
    openrouterModel: document.getElementById("openrouterModel").value.trim() || "openai/gpt-5-mini",
  };

  const keyField = {
    local: null,
    gemini: "geminiApiKey",
    openai: "openaiApiKey",
    anthropic: "anthropicApiKey",
    openrouter: "openrouterApiKey",
  }[activeProvider];

  if (keyField && !payload[keyField]) {
    statusEl.textContent = `Please paste a ${activeProvider} key first.`;
    statusEl.className = "err";
    return;
  }

  await chrome.storage.local.set(payload);
  updateCurrentModeLabel(activeProvider);
  statusEl.textContent =
    activeProvider === "local"
      ? "Saved. Using local (offline) grading now — reload ChatGPT/Claude tabs to apply."
      : `Saved. Using ${activeProvider} now — reload ChatGPT/Claude tabs to apply.`;
  statusEl.className = "ok";
});

load();
