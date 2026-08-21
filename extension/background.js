// background.js
// This is the ONLY place that ever touches any API key.
// The content script never sees keys - it just asks the background worker
// to analyze text, and gets back a verdict, regardless of which provider
// is actually doing the grading.

const DEFAULT_MODELS = {
  gemini: "gemini-3.6-flash",
  openai: "gpt-5-mini",
  anthropic: "claude-haiku-4-5-20251001",
  openrouter: "openai/gpt-5-mini",
};

const SYSTEM_INSTRUCTION = `You are a Prompt Quality Checker.
Evaluate the user's draft prompt (intended for an AI assistant) against these 5 foundations,
scoring each from 0-2 points:

1. Role - does it tell the AI what persona/expertise to adopt?
   0 = not mentioned, 1 = implied loosely, 2 = explicitly named with relevant expertise.
2. Task - is the action clear and specific (not vague)?
   0 = unclear what's being asked, 1 = general topic with a vague verb, 2 = specific action + specific deliverable.
3. Context - is there relevant background (audience, situation, constraints on the real-world scenario)?
   0 = no background given, 1 = some context but thin, 2 = audience, situation, and relevant details given.
4. Format - is the desired output structure specified (length, style, structure, tone)?
   0 = no structure specified, 1 = loosely implied (e.g. "short"), 2 = explicit structure, length, and style.
5. Constraints/Examples - are there boundaries, must-haves, must-avoids, or examples of good output?
   0 = none given, 1 = one vague constraint, 2 = clear must-haves/avoids and/or an example.

Sum the 5 foundation scores for a total out of 10.

Respond ONLY with strict JSON, no markdown fences, no preamble, matching exactly this shape:
{
  "score": <integer 0-10, the sum of the 5 foundations>,
  "verdict": "bad" | "okay" | "good",
  "missing": ["short actionable bullet naming which foundation is weak/missing and why", "..."]
}

Rules for "missing":
- Max 4 bullets, one per weak/missing foundation (skip foundations that scored 2).
- Each bullet is a short, specific suggestion of what to ADD or CLARIFY for that foundation.
- Never rewrite or draft the user's prompt for them - only point out gaps.
- If the prompt scores 2 on every foundation, return an empty array.

Grade bands: total 1-3 = "bad", 4-7 = "okay", 8-10 = "good".
If the text is too short/empty to judge (under ~4 words), return score 1, verdict "bad",
missing: ["Prompt is too short to evaluate - add more detail"].`;

// --- Shared helpers -----------------------------------------------------------

async function fetchWithRetry(url, options, retryStatus = 503, maxAttempts = 3) {
  let attempt = 1;
  while (true) {
    const res = await fetch(url, options);
    if (res.status === retryStatus && attempt < maxAttempts) {
      await new Promise((r) => setTimeout(r, attempt * 700));
      attempt++;
      continue;
    }
    return res;
  }
}

function parseJsonVerdict(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned);
  }
  if (!parsed || !parsed.verdict || typeof parsed.score !== "number") {
    throw new Error("malformed-response");
  }
  return {
    score: parsed.score,
    verdict: parsed.verdict,
    missing: Array.isArray(parsed.missing) ? parsed.missing.slice(0, 4) : [],
  };
}

// --- Provider: Gemini -----------------------------------------------------------

async function analyzeWithGemini(text, apiKey, model) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const body = {
    system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    contents: [{ role: "user", parts: [{ text: `Evaluate this prompt:\n\n"""${text}"""` }] }],
    generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
  };

  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    if (res.status === 503) {
      return { error: "overloaded", detail: "Google's model is busy right now. It'll grade automatically once you pause typing again." };
    }
    return { error: "api-error", detail: `${res.status}: ${errText}` };
  }

  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) return { error: "empty-response" };

  try {
    return parseJsonVerdict(raw);
  } catch {
    return { error: "malformed-response" };
  }
}

// --- Provider: OpenAI -------------------------------------------------------------

async function analyzeWithOpenAI(text, apiKey, model) {
  const url = "https://api.openai.com/v1/chat/completions";
  const body = {
    model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_INSTRUCTION },
      { role: "user", content: `Evaluate this prompt:\n\n"""${text}"""` },
    ],
  };

  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    if (res.status === 429) {
      return { error: "overloaded", detail: "OpenAI is rate-limiting this key right now. It'll retry once you pause typing again." };
    }
    return { error: "api-error", detail: `${res.status}: ${errText}` };
  }

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content;
  if (!raw) return { error: "empty-response" };

  try {
    return parseJsonVerdict(raw);
  } catch {
    return { error: "malformed-response" };
  }
}

// --- Provider: Anthropic (Claude) --------------------------------------------------

async function analyzeWithAnthropic(text, apiKey, model) {
  const url = "https://api.anthropic.com/v1/messages";
  const body = {
    model,
    max_tokens: 300,
    temperature: 0.2,
    system: SYSTEM_INSTRUCTION,
    messages: [{ role: "user", content: `Evaluate this prompt:\n\n"""${text}"""` }],
  };

  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      // Required for calling the Anthropic API directly from a browser/extension context.
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    if (res.status === 529 || res.status === 429) {
      return { error: "overloaded", detail: "Anthropic's API is busy right now. It'll retry once you pause typing again." };
    }
    return { error: "api-error", detail: `${res.status}: ${errText}` };
  }

  const data = await res.json();
  const raw = data?.content?.find((b) => b.type === "text")?.text;
  if (!raw) return { error: "empty-response" };

  try {
    return parseJsonVerdict(raw);
  } catch {
    return { error: "malformed-response" };
  }
}

// --- Provider: OpenRouter -----------------------------------------------------------

async function analyzeWithOpenRouter(text, apiKey, model) {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const body = {
    model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_INSTRUCTION },
      { role: "user", content: `Evaluate this prompt:\n\n"""${text}"""` },
    ],
  };

  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      // Optional per OpenRouter docs, but recommended so requests are attributed to this extension.
      "HTTP-Referer": "https://github.com/promptai-extension",
      "X-Title": "Prompt AI",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    if (res.status === 429) {
      return { error: "overloaded", detail: "OpenRouter is rate-limiting this key right now. It'll retry once you pause typing again." };
    }
    return { error: "api-error", detail: `${res.status}: ${errText}` };
  }

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content;
  if (!raw) return { error: "empty-response" };

  try {
    return parseJsonVerdict(raw);
  } catch {
    return { error: "malformed-response" };
  }
}

// --- Provider: Local heuristic (no API key needed) -----------------------------
// Implements the same 5-foundation rubric as SYSTEM_INSTRUCTION, scored heuristically:
//   Role, Task, Context, Format, Constraints/Examples - each 0-2 points, summed to /10.
// Grade bands: 1-3 Bad, 4-7 Normal, 8-10 Good.

const ACTION_VERBS = [
  "write", "explain", "summarize", "create", "generate", "list", "compare",
  "analyze", "design", "build", "draft", "translate", "fix", "debug",
  "review", "plan", "outline", "convert", "rewrite", "brainstorm",
];
const AUDIENCE_MARKERS = [
  "audience", "for beginners", "for experts", "professional", "students",
  "client", "reader", "customer", "for a", "for my", "target",
];
const SITUATIONAL_MARKERS = [
  "budget", "allergy", "allergies", "experience", "background", "situation",
  "currently", "context:", "goal is", "trying to", "level of",
];
const EXPLICIT_FORMAT_MARKERS = [
  "bullet", "table", "columns", "json", "markdown", "format:", "structure",
  "step by step", "outline", "list of",
];
const QUALITATIVE_FORMAT_MARKERS = ["short", "long", "brief", "concise", "detailed"];
const CONSTRAINT_MARKERS = [
  "must ", "should ", "don't", "do not", "avoid ", "without using",
  "no more than", "at least", "word limit", "character limit", "limit to",
  "instead of", "excluding",
  "type hint", "docstring", "return type", "edge case", "error handling",
  "unit test", "time complexity",
];
const EXAMPLE_MARKERS = ["example", "e.g.", "for instance", "such as"];

function scoreRole(lower) {
  if (/\byou are (a|an)\s+[a-z][a-z\s]{2,40}/i.test(lower) || /\bact as (a|an)\s+[a-z][a-z\s]{2,40}/i.test(lower) || /^role\s*:/im.test(lower)) {
    return { pts: 2, note: null };
  }
  if (/\bas an? expert\b/.test(lower) || /\bprofessional\b/.test(lower) || /\bexpert in\b/.test(lower)) {
    return { pts: 1, note: "Role is only loosely implied - name a specific persona (e.g. 'You are a ___')" };
  }
  return { pts: 0, note: "No persona/expertise assigned - try starting with 'You are a ___'" };
}

function scoreTask(lower, words, hasVerb, hasQuestion) {
  if (!hasVerb && !hasQuestion) {
    return { pts: 0, note: "Unclear what's being asked - state a specific action (e.g. 'Write...', 'Explain...')" };
  }
  if (words.length >= 8) {
    return { pts: 2, note: null };
  }
  return { pts: 1, note: "Task is a general topic with a vague verb - specify the exact deliverable" };
}

function scoreContext(lower, trimmed) {
  const hasAudience = AUDIENCE_MARKERS.some((a) => lower.includes(a));
  const hasSituational = SITUATIONAL_MARKERS.some((s) => lower.includes(s));
  const hasNumber = /\d/.test(trimmed);
  const properNouns = (trimmed.match(/\b[A-Z][a-z]{2,}\b/g) || []).length;
  const hits = [hasAudience, hasSituational, hasNumber, properNouns >= 2].filter(Boolean).length;

  if (hits === 0) return { pts: 0, note: "No background given - add audience, situation, or relevant details", hasAudience };
  if (hits === 1) return { pts: 1, note: "Context is thin - add more specifics (audience, situation, constraints)", hasAudience };
  return { pts: 2, note: null, hasAudience };
}

function scoreFormat(lower) {
  const hasExplicit = EXPLICIT_FORMAT_MARKERS.some((f) => lower.includes(f)) || /\d+\s*(words|word|sentences|sentence|paragraphs|paragraph|pages|page|characters|character)/.test(lower);
  if (hasExplicit) return { pts: 2, note: null };
  const hasQualitative = QUALITATIVE_FORMAT_MARKERS.some((f) => lower.includes(f));
  if (hasQualitative) return { pts: 1, note: "Format is only loosely implied - specify exact structure/length/style" };
  return { pts: 0, note: "No output structure specified - add format, length, or style" };
}

function scoreConstraints(lower) {
  const constraintHits = CONSTRAINT_MARKERS.filter((c) => lower.includes(c)).length;
  const hasExample = EXAMPLE_MARKERS.some((e) => lower.includes(e));
  const totalHits = constraintHits + (hasExample ? 1 : 0);

  if (totalHits === 0) return { pts: 0, note: "No constraints or examples given - add must-haves, must-avoids, or an example" };
  if (totalHits === 1) return { pts: 1, note: "Only one vague constraint - add clearer must-haves/avoids or an example" };
  return { pts: 2, note: null };
}

function analyzeLocally(text) {
  const trimmed = text.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const lower = trimmed.toLowerCase();

  if (words.length < 4) {
    return {
      score: 1,
      verdict: "bad",
      missing: ["Prompt is too short to evaluate - add more detail"],
    };
  }

  const hasVerb = ACTION_VERBS.some((v) => lower.includes(v));
  const hasQuestion = trimmed.includes("?");

  const role = scoreRole(lower);
  const task = scoreTask(lower, words, hasVerb, hasQuestion);
  const context = scoreContext(lower, trimmed);
  const format = scoreFormat(lower);
  const constraints = scoreConstraints(lower);

  const rawScore = role.pts + task.pts + context.pts + format.pts + constraints.pts;

  // A high raw sum can mask 2+ genuinely thin/missing foundations (e.g. a strong
  // Role + Format compensating for weak Context + Constraints). "Good" should mean
  // the prompt leaves little room for misinterpretation across the board, so it
  // only counts as Good if at most one foundation is below full marks.
  const weakCount = [role.pts, task.pts, context.pts, format.pts, constraints.pts].filter((p) => p < 2).length;

  let verdict;
  let score = rawScore;
  if (rawScore <= 3) {
    verdict = "bad";
  } else if (rawScore >= 8 && weakCount <= 1) {
    verdict = "good";
  } else {
    verdict = "okay";
    // Cap the displayed number to the Normal band (4-7) so the score shown
    // never contradicts the yellow color it's paired with.
    score = Math.min(rawScore, 7);
  }

  // Order missing bullets by weakest foundation first.
  const foundations = [
    { pts: role.pts, note: role.note },
    { pts: task.pts, note: task.note },
    { pts: context.pts, note: context.note },
    { pts: format.pts, note: format.note },
    { pts: constraints.pts, note: constraints.note },
  ]
    .filter((f) => f.note)
    .sort((a, b) => a.pts - b.pts)
    .map((f) => f.note);

  return {
    score,
    verdict,
    missing: verdict === "good" ? [] : foundations.slice(0, 4),
  };
}

// --- Dispatch ------------------------------------------------------------------

async function analyzePrompt(text) {
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

  const provider = settings.activeProvider || "local";

  // Local mode never needs a key or network call.
  if (provider === "local") {
    return analyzeLocally(text);
  }

  try {
    if (provider === "gemini") {
      if (!settings.geminiApiKey) return { error: "no-api-key" };
      return await analyzeWithGemini(text, settings.geminiApiKey, settings.geminiModel || DEFAULT_MODELS.gemini);
    }
    if (provider === "openai") {
      if (!settings.openaiApiKey) return { error: "no-api-key" };
      return await analyzeWithOpenAI(text, settings.openaiApiKey, settings.openaiModel || DEFAULT_MODELS.openai);
    }
    if (provider === "anthropic") {
      if (!settings.anthropicApiKey) return { error: "no-api-key" };
      return await analyzeWithAnthropic(text, settings.anthropicApiKey, settings.anthropicModel || DEFAULT_MODELS.anthropic);
    }
    if (provider === "openrouter") {
      if (!settings.openrouterApiKey) return { error: "no-api-key" };
      return await analyzeWithOpenRouter(text, settings.openrouterApiKey, settings.openrouterModel || DEFAULT_MODELS.openrouter);
    }
    return { error: "no-api-key" };
  } catch (err) {
    return { error: "network-error", detail: String(err) };
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "ANALYZE_PROMPT") {
    analyzePrompt(message.text).then(sendResponse);
    return true; // keep the message channel open for async sendResponse
  }
});
