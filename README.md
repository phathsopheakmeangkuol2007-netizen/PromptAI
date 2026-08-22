# PromptAI

**Master the art of AI prompting.**

PromptAI is a web application for learning, practicing, and improving prompt engineering skills. It combines structured lessons, hands-on challenges, an AI-powered prompt optimizer, and integrations with third-party AI platforms into a single learning platform.

No account required — all progress is stored locally in your browser.

---

## Features

### 📚 Learn
A structured curriculum covering prompt engineering concepts from fundamentals to advanced techniques — including prompt anatomy, chain-of-thought prompting, few-shot learning, system prompts, and AI agent steering. Lessons include real examples, key takeaways, and short quizzes to track progress.

### 🏆 Challenges
A set of scenario-based prompt engineering challenges across categories like API/dev tools, customer experience, data extraction, and safety guardrails. Submissions are graded automatically against defined criteria, with XP and progress tracked per browser.

### ✨ Improve
Paste any prompt and get an AI-optimized rewrite, complete with a breakdown of what was missing (clarity, specificity, structure, context) and reasoning behind each change.

### 🔌 Extensions *(in development)*
Connect your own OpenAI, Anthropic, or Gemini API key to enable prompt auto-correction as you write. Keys are stored only in your browser and routed through a zero-log proxy — never stored on our servers.

> **Note:** The live auto-correction demo in Extensions is still being refined and may currently produce inconsistent results. The connect/disconnect flow works as expected; full auto-correction accuracy is a planned improvement.

---

## Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js / Express (API proxy + optimization endpoints)
- **AI Integration:** Google Gemini API (Improve, Challenges grading), with optional user-provided OpenAI / Anthropic / Gemini keys for Extensions
- **Storage:** Browser localStorage (no accounts, no database-backed user data)

---

## AIs and Tools
  - Google Ai Studio
  - Antigravity
  - Visual Studio Code
  - Claude Sonnet 5
  - Gemini 3.6 Flash
  - Free Claude Code
  - Git

---
## Hosting and Deployment

- Github
- Render

---

## Project Structure

```
promptai/
├── src/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Learn/
│   │   ├── Challenges/
│   │   ├── Improve/
│   │   └── Extensions/
│   ├── components/
│   ├── data/              # course, lesson, and challenge content
│   └── lib/                # API client, prompt logic
├── server/
│   ├── routes/             # /api/improve, /api/grade-challenge, /api/extensions/*
│   └── proxy/               # BYOK proxy for Extensions (no-log)
└── public/
```

---


## Privacy

PromptAI does not require an account and does not store personal data on a server. Learning progress, challenge history, and saved prompts live in your browser's local storage. API keys added under Extensions are stored locally and are never logged or persisted server-side.

---

## Contributing

This project is under active development as part of an independent build (originally prepared for the Makers Innovation Quest competition). Issues and suggestions are welcome.

---

Built by Group A-13 from theme AI for Education - Innovation Challenge 2026
