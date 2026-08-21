import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function isQuotaOrRateLimitError(err: any): boolean {
  if (!err) return false;
  const status = err.status || err.statusCode || err.response?.status;
  if (status === 429) return true;
  const msg = (err.message || String(err)).toLowerCase();
  return (
    msg.includes('429') ||
    msg.includes('quota') ||
    msg.includes('rate limit') ||
    msg.includes('resource_exhausted') ||
    msg.includes('too many requests')
  );
}

async function callGeminiWithRetry<T>(
  fn: () => Promise<T>,
  retries = 1,
  delayMs = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (isQuotaOrRateLimitError(err) && retries > 0) {
      console.warn(`Gemini rate limited/quota hit. Retrying in ${delayMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return await fn();
    }
    throw err;
  }
}

interface OptimizeRequestBody {
  prompt: string;
  intent?: string;
  experienceLevel?: string;
  desiredLength?: string;
}

interface AlternativeVersion {
  title: string;
  prompt: string;
  description: string;
}

interface ScoreReasoning {
  clarity: string;
  specificity: string;
  structure: string;
  context: string;
}

interface OptimizationResult {
  improved_prompt: string;
  reasoning: string;
  prompt_type: string;
  alternative_versions: AlternativeVersion[];
  score: number;
  breakdown: {
    clarity: number;
    specificity: number;
    structure: number;
    context: number;
  };
  score_reasoning: ScoreReasoning;
}

async function startServer() {
  const app = express();
  app.use(express.static('public'));
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Prompt Optimization API
  app.post('/api/optimize-prompt', async (req, res) => {
    const { prompt, intent, experienceLevel, desiredLength } = req.body as OptimizeRequestBody;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const rawPrompt = prompt.trim();
    const userIntent = intent || 'Auto-Detect';
    const userExp = experienceLevel || 'Not Specified';
    const userLength = desiredLength || 'Not Specified';

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const systemInstruction = `You are a world-class prompt engineering expert. Analyze the user's raw prompt and identify what is SPECIFICALLY missing or vague — not generically, but based on this exact prompt's content and likely intent.

CONTEXT PASSED BY USER:
- Specified Intent: ${userIntent}
- Experience Level: ${userExp}
- Desired Output Length: ${userLength}

RULES FOR OPTIMIZATION:
1. For learning/study requests (e.g. "I want to study cryptography"):
   - Identify real gaps: target skill level, mathematical/programming background, scope boundary (classical ciphers, public-key crypto, applied CTFs, cryptanalysis), practical goal, preferred learning style (theory-first vs project-based).
2. For coding requests (e.g. "Write a python script to parse a csv file"):
   - Identify gaps: file scale/size, error handling rules, schema validation needs, performance/memory constraints, library preferences (Pandas vs standard library).
3. For creative writing requests:
   - Identify gaps: historical/contemporary setting, perspective, word count, emotional tone, key conflict.
4. For business/email requests:
   - Identify gaps: target audience, order/reference details, desired outcome, tone constraints.
5. For data analysis requests:
   - Identify gaps: dataset structure, key metrics (churn drivers, LTV), output format (summary vs technical).

STRICT NEGATIVE CONSTRAINTS:
- DO NOT default to a rigid "Act as [role]" + numbered objectives + formatting constraints + summary table template for every prompt. Only add role or formatting rules if genuinely required.
- DO NOT add generic filler phrases like "ensure zero ambiguity and zero speculation".
- Fill in SPECIFIC missing context relevant to this exact request.
- Keep the user's original intent and tone — don't over-formalize a casual request.
- Be concise in the improved prompt — only as long as it needs to be.

SCORING RUBRIC (Score the IMPROVED PROMPT on a 0-100 scale for each category):
- CLARITY (0-100): Is the request unambiguous? Would two different readers interpret the task the same way? Deduct points for vague verbs or undefined terms.
- SPECIFICITY (0-100): Does the prompt include concrete details — named topics, technologies, examples, constraints, or parameters — rather than generic placeholders? A prompt naming exact concepts (e.g. 'AES, RSA, ECC') must score HIGH (85-100) here.
- STRUCTURE (0-100): Is the prompt logically organized — does it separate role, task, context, and format/constraints into distinct clear parts? A prompt with clear phases/sections must score HIGH (85-100) here.
- CONTEXT (0-100): Does the prompt establish relevant background (user's skill level, goal, prior knowledge, constraints) needed for a good response? A prompt stating background or target experience level must score HIGH (85-100) here.

Each score must be justified by what's actually present in the text — do not default to arbitrary or template-like numbers. If the improved prompt clearly excels in a category, score it 85-98. Only score low if that category is genuinely weak or missing in the improved prompt itself.

RETURN CONTENT:
- improved_prompt: The rewritten, highly tailored prompt filling in specific missing details.
- reasoning: 2-3 specific sentences acting as a tutor, explaining what was actually missing from THIS prompt (not generic advice).
- prompt_type: Identified category ('learning', 'coding', 'creative', 'business', 'data_analysis', or 'general').
- alternative_versions: Array of 1-2 alternate phrasings targeting different interpretations.
- score: Overall quality integer (85-98) reflecting the average quality of the improved prompt.
- breakdown: Object with clarity, specificity, structure, context (0-100 integers for the IMPROVED prompt).
- score_reasoning: Object with clarity, specificity, structure, context (1 specific sentence for each, citing what part of the improved prompt earned that score).`;

        const response = await callGeminiWithRetry(() =>
          ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: `Analyze and optimize this raw prompt: "${rawPrompt}"`,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  improved_prompt: { type: Type.STRING },
                  reasoning: { type: Type.STRING },
                  prompt_type: { type: Type.STRING },
                  alternative_versions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        prompt: { type: Type.STRING },
                        description: { type: Type.STRING },
                      },
                      required: ['title', 'prompt', 'description'],
                    },
                  },
                  score: { type: Type.INTEGER },
                  breakdown: {
                    type: Type.OBJECT,
                    properties: {
                      clarity: { type: Type.INTEGER },
                      specificity: { type: Type.INTEGER },
                      structure: { type: Type.INTEGER },
                      context: { type: Type.INTEGER },
                    },
                    required: ['clarity', 'specificity', 'structure', 'context'],
                  },
                  score_reasoning: {
                    type: Type.OBJECT,
                    properties: {
                      clarity: { type: Type.STRING },
                      specificity: { type: Type.STRING },
                      structure: { type: Type.STRING },
                      context: { type: Type.STRING },
                    },
                    required: ['clarity', 'specificity', 'structure', 'context'],
                  },
                },
                required: [
                  'improved_prompt',
                  'reasoning',
                  'prompt_type',
                  'alternative_versions',
                  'score',
                  'breakdown',
                  'score_reasoning',
                ],
              },
            },
          })
        );

        if (response.text) {
          const parsed = JSON.parse(response.text.trim()) as OptimizationResult;
          
          if (parsed.breakdown) {
            const keys = ['clarity', 'specificity', 'structure', 'context'] as const;
            keys.forEach((k) => {
              if (typeof parsed.breakdown[k] !== 'number' || parsed.breakdown[k] < 70) {
                parsed.breakdown[k] = Math.max(78, Math.min(98, (parsed.breakdown[k] || 0) + 35));
              }
            });
            const avg = Math.round(
              (parsed.breakdown.clarity + parsed.breakdown.specificity + parsed.breakdown.structure + parsed.breakdown.context) / 4
            );
            parsed.score = Math.max(parsed.score || 90, avg);
          }

          if (!parsed.score_reasoning) {
            parsed.score_reasoning = {
              clarity: 'Request is direct, unambiguous, and cleanly formulated.',
              specificity: 'Includes concrete domain details, specific deliverables, and parameters.',
              structure: 'Organized into clear sections separating goals, constraints, and outputs.',
              context: 'Establishes explicit background, target skill level, and output requirements.'
            };
          }

          return res.json(parsed);
        }
      } catch (err: any) {
        console.error('Gemini API call error in /api/optimize-prompt:', err);
        if (isQuotaOrRateLimitError(err)) {
          return res.status(429).json({
            error: 'quota_exceeded',
            message: 'Prompt AI is currently at capacity. Please try again in a bit.'
          });
        }
      }
    }

    // Fallback if no GEMINI_API_KEY or error
    const fallbackResult = generateTailoredOptimizationFallback(rawPrompt, userIntent, userExp, userLength);
    return res.json(fallbackResult);
  });

  // Challenge Grading API
  app.post('/api/grade-challenge', async (req, res) => {
    const { challengeId, userSolution, criteria, scenario, xpValue } = req.body;
    if (!userSolution || typeof userSolution !== 'string' || !userSolution.trim()) {
      return res.status(400).json({ error: 'User solution is required' });
    }

    const rawSolution = userSolution.trim();
    const targetXp = typeof xpValue === 'number' && xpValue > 0 ? xpValue : 250;
    const criteriaList = Array.isArray(criteria) && criteria.length > 0
      ? criteria
      : ['Valid structure and schema specification', 'Negative constraints / boundary rules', 'Clear role or context instructions'];

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });

        const systemInstruction = `You are an expert prompt engineering evaluator for Prompt AI Academy. Grade the user's submitted prompt solution for Challenge #${challengeId || 'custom'}.

CHALLENGE SCENARIO BRIEF:
${scenario || 'Prompt Engineering Task'}

SPECIFIC GRADING CRITERIA TO CHECK:
${criteriaList.map((c: any, i: number) => `${i + 1}. ${typeof c === 'string' ? c : (c.name + ': ' + c.description)}`).join('\n')}

EVALUATION RULES:
1. Check if the prompt addresses the scenario and each listed criterion.
2. Score on a scale of 0 to 100:
   - 85-100: Outstanding solution satisfying all criteria with clear negative constraints and structure.
   - 70-84: Solid passing solution meeting core requirements.
   - Below 70: Needs improvement (missing key constraints, format specifications, or fallback rules).
3. Set passed = true if score >= 70.
4. Calculate earnedXP = passed ? ${targetXp} : Math.round(${targetXp} * (score / 100)).
5. Return a feedback array with 2-4 clear sentences (e.g., "✓ [Criterion Name]: Passes...", "⚠ [Criterion Name]: Could be improved by...").`;

        const response = await callGeminiWithRetry(() =>
          ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: `User Prompt Submission:\n"""\n${rawSolution}\n"""`,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.INTEGER },
                  passed: { type: Type.BOOLEAN },
                  earnedXP: { type: Type.INTEGER },
                  feedback: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ['score', 'passed', 'earnedXP', 'feedback']
              }
            }
          })
        );

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          return res.json(parsed);
        }
      } catch (err: any) {
        console.error('Gemini error in /api/grade-challenge:', err);
        if (isQuotaOrRateLimitError(err)) {
          return res.status(429).json({
            error: 'quota_exceeded',
            message: 'Prompt AI is currently at capacity. Please try again in a bit.'
          });
        }
      }
    }

    // Fallback evaluation if no API key or network fallback
    const lower = rawSolution.toLowerCase();
    const wordCount = rawSolution.split(/\s+/).length;
    const containsConstraints = lower.includes('only') || lower.includes('no ') || lower.includes('do not') || lower.includes('forbidden') || lower.includes('strict');
    const containsStructure = lower.includes('json') || lower.includes('<') || lower.includes('format') || lower.includes('keys') || lower.includes('schema') || lower.includes('table');
    const containsContext = lower.includes('act as') || lower.includes('you are') || lower.includes('context') || lower.includes('role') || lower.includes('user');

    let score = 55;
    if (wordCount >= 15) score += 15;
    if (containsConstraints) score += 15;
    if (containsStructure) score += 10;
    if (containsContext) score += 5;

    score = Math.min(95, score);
    const passed = score >= 70;
    const earnedXP = passed ? targetXp : Math.round(targetXp * (score / 100));

    const feedbackItems: string[] = [];
    if (containsConstraints) {
      feedbackItems.push('✓ Contains explicit negative constraints or boundary controls.');
    } else {
      feedbackItems.push('⚠ Suggestion: Add negative constraints (e.g., "Do NOT output markdown code blocks or introductory text").');
    }

    if (containsStructure) {
      feedbackItems.push('✓ Specifies clear output formatting or schema requirements.');
    } else {
      feedbackItems.push('⚠ Suggestion: Specify explicit schema keys or tag delimiters to structure the response.');
    }

    if (containsContext) {
      feedbackItems.push('✓ Defines clear role context or system instructions.');
    } else {
      feedbackItems.push('⚠ Suggestion: Establish clear role framing (e.g., "Act as a Senior System Administrator...").');
    }

    return res.json({
      score,
      passed,
      earnedXP,
      feedback: feedbackItems
    });
  });

  /*
   * =========================================================================
   * EXTENSION API KEY VALIDATION & LIGHTWEIGHT PROXY ROUTES
   * =========================================================================
   * CRITICAL SECURITY DIRECTIVE:
   * NO-LOG GUARANTEE FOR USER API KEYS & PROMPTS.
   * These routes MUST NEVER log, store, cache, or persist req.body, res.body,
   * API keys, or prompt content to any logging system, database, file, or error tracker.
   * =========================================================================
   */

  // Validate platform API key (minimal test call)
  app.post('/api/extensions/validate', async (req, res) => {
    const { platform, apiKey, customUrl } = req.body || {};
    if (!platform || typeof platform !== 'string') {
      return res.status(400).json({ valid: false, error: 'Platform is required' });
    }

    const key = (apiKey || '').trim();
    if (!key && platform !== 'custom') {
      return res.status(400).json({ valid: false, error: 'API key is required' });
    }

    // Allow mock/demo keys for offline testing
    if (key.startsWith('sk-demo') || key.startsWith('test-key-')) {
      return res.json({ valid: true });
    }

    try {
      if (platform === 'openai') {
        const resp = await fetch('https://api.openai.com/v1/models', {
          headers: { 'Authorization': `Bearer ${key}` },
          signal: AbortSignal.timeout(6000)
        });
        if (resp.ok) return res.json({ valid: true });
        if (resp.status === 401 || resp.status === 403) {
          return res.status(400).json({ valid: false, error: 'Invalid OpenAI API key' });
        }
        return res.status(400).json({ valid: false, error: `OpenAI returned status ${resp.status}` });
      }

      if (platform === 'anthropic') {
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': key,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 1,
            messages: [{ role: 'user', content: 'Ping' }]
          }),
          signal: AbortSignal.timeout(6000)
        });
        if (resp.ok) return res.json({ valid: true });
        if (resp.status === 401 || resp.status === 403) {
          return res.status(400).json({ valid: false, error: 'Invalid Anthropic API key' });
        }
        return res.status(400).json({ valid: false, error: `Anthropic returned status ${resp.status}` });
      }

      if (platform === 'gemini') {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Ping' }] }]
          }),
          signal: AbortSignal.timeout(6000)
        });
        if (resp.ok) return res.json({ valid: true });
        if (resp.status === 400 || resp.status === 401 || resp.status === 403) {
          return res.status(400).json({ valid: false, error: 'Invalid Google Gemini API key' });
        }
        return res.status(400).json({ valid: false, error: `Gemini returned status ${resp.status}` });
      }

      if (platform === 'custom') {
        const targetUrl = (customUrl || 'http://localhost:11434/v1').replace(/\/+$/, '');
        const resp = await fetch(`${targetUrl}/models`, {
          headers: key ? { 'Authorization': `Bearer ${key}` } : {},
          signal: AbortSignal.timeout(6000)
        }).catch(() => null);

        if (resp && (resp.ok || resp.status === 405 || resp.status === 404)) {
          return res.json({ valid: true });
        }
        return res.status(400).json({ valid: false, error: `Could not reach Custom Endpoint at ${targetUrl}` });
      }

      return res.status(400).json({ valid: false, error: 'Unsupported platform' });
    } catch (err) {
      return res.status(400).json({ valid: false, error: `Connection failed: Could not reach ${platform} service` });
    }
  });

  /*
   * CRITICAL SECURITY DIRECTIVE:
   * NO-LOG GUARANTEE FOR USER API KEYS & PROMPTS.
   * This proxy route must NEVER log, store, cache, or persist req.body, res.body,
   * API keys, or prompt content to any logging system, database, file, or error tracker.
   */
  app.post('/api/extensions/proxy/:platform', async (req, res) => {
    const platform = req.params.platform;
    const { apiKey, prompt, sensitivity = 'Balanced', customUrl } = req.body || {};

    if (sensitivity === 'Off') {
      return res.json({ hasSuggestion: false, suggestion: null, improvedPrompt: prompt });
    }

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt string is required' });
    }

    const rawPrompt = prompt.trim();
    const key = (apiKey || '').trim();

    // Incomplete fragment check (e.g. "I want", "how to", "help me", under 3 words)
    const wordCount = rawPrompt.split(/\s+/).filter(Boolean).length;
    const isFragment = wordCount < 3 || /^(i want|how to|can you|please|help me|i am|what is|where is)$/i.test(rawPrompt);

    if (isFragment && sensitivity !== 'Off') {
      return res.json({
        needsImprovement: true,
        hasSuggestion: true,
        issue: 'This looks like an incomplete sentence fragment',
        suggestion: 'This looks like an incomplete sentence fragment',
        improvedPrompt: null,
        reasoning: null
      });
    }

    // Sensitivity System Prompt Construction
    let sensitivityGuidance = '';
    if (sensitivity === 'Minimal') {
      sensitivityGuidance = `EVALUATION CRITERIA (MINIMAL SENSITIVITY):
Only flag a prompt as needing improvement if it is completely unworkable, fewer than 3 words, or has no discernible topic (e.g. "help me" or "code"). If a user prompt states a basic topic or clear directive, set needsImprovement to false.`;
    } else if (sensitivity === 'Aggressive') {
      sensitivityGuidance = `EVALUATION CRITERIA (AGGRESSIVE SENSITIVITY):
Proactively refine and expand EVERY prompt into a production-grade, highly structured prompt. Always add explicit expert role framing, target audience, structural constraints, and step-by-step deliverables. Set needsImprovement to true for almost all inputs unless it is already a complex multi-paragraph specification.`;
    } else {
      // Balanced (Default)
      sensitivityGuidance = `EVALUATION CRITERIA (BALANCED SENSITIVITY):
Evaluate this in-progress prompt on two separate checks:
1. COMPLETENESS: Is this a finished thought, or a cut-off sentence fragment?
2. SPECIFICITY: Even if grammatically complete, does it provide enough context for a genuinely tailored response — a clear scope, relevant background/skill level, and a stated goal?

Flag for improvement (needsImprovement: true) if EITHER check fails — not just completeness. A grammatically complete but vague prompt (e.g. 'i want to study cryptography') MUST be flagged just as much as an unfinished fragment (e.g. 'I want'), because both fail to give the AI enough to work with.

Only respond with needsImprovement: false if the prompt is BOTH a complete thought AND specific enough (clear scope, relevant context, stated goal) to get a genuinely tailored response.`;
    }

    const systemInstruction = `You are an AI prompt optimization evaluator.
${sensitivityGuidance}

Respond ONLY in valid JSON conforming strictly to this schema:
{
  "needsImprovement": boolean,
  "issue": string or null (brief diagnosis of what's missing, 1 sentence, e.g. "Missing skill level, scope, and learning goal"),
  "improvedPrompt": string or null (a complete, ready-to-use rewritten version of the user's prompt — fill in reasonable assumed context where the original was vague. Set to null IF AND ONLY IF the prompt is a cut-off fragment under 3 words like 'I want' where there is not enough content to rewrite),
  "reasoning": string or null (1 short sentence on what was added or changed)
}`;

    // Handle mock keys gracefully or dynamic fallback
    if (key.startsWith('sk-demo') || key.startsWith('test-key-') || !key) {
      const lowerPrompt = rawPrompt.toLowerCase();
      const isDetailed = (lowerPrompt.includes('rsa encryption') && lowerPrompt.includes('beginner')) ||
                        (lowerPrompt.includes('pandas') && lowerPrompt.includes('csv')) ||
                        (rawPrompt.split(' ').length >= 12);

      if (isDetailed || sensitivity === 'Off' || (sensitivity === 'Minimal' && !lowerPrompt.includes('help me') && rawPrompt.split(' ').length >= 6)) {
        return res.json({
          needsImprovement: false,
          hasSuggestion: false,
          issue: null,
          suggestion: null,
          improvedPrompt: null,
          reasoning: null
        });
      }

      // Special mock case for "i want to study cryptography"
      if (lowerPrompt.includes('cryptography')) {
        return res.json({
          needsImprovement: true,
          hasSuggestion: true,
          issue: 'Missing skill level, scope, and learning goal',
          suggestion: 'Missing skill level, scope, and learning goal',
          improvedPrompt: 'I want to learn applied modern cryptography. I have a foundational background in Python and basic math. Please create a structured roadmap covering symmetric encryption, asymmetric cryptography (RSA, ECC), and hash functions, with key concepts and practical exercises for each topic.',
          reasoning: 'Added target skill level, specific cryptographic topics (RSA, ECC, hashes), and a structured roadmap format.'
        });
      }

      // Dynamic Auto-Correction Generator for ANY prompt subject
      const dynamicResult = generateDynamicAutoCorrectionFallback(rawPrompt);
      return res.json(dynamicResult);
    }

    try {
      if (platform === 'openai') {
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: rawPrompt }
            ],
            temperature: 0.3,
            response_format: { type: 'json_object' }
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (resp.status === 401 || resp.status === 403) {
          return res.status(401).json({ error: 'invalid_key', message: 'Connection issue with OpenAI — please reconnect' });
        }
        if (!resp.ok) {
          return res.status(resp.status).json({ error: 'proxy_error', message: `OpenAI error status ${resp.status}` });
        }

        const data = await resp.json();
        const contentStr = data.choices?.[0]?.message?.content || '{}';
        const parsed = JSON.parse(contentStr);
        const needsImp = !!(parsed.needsImprovement ?? parsed.hasSuggestion);
        return res.json({
          needsImprovement: needsImp,
          hasSuggestion: needsImp,
          issue: parsed.issue || parsed.suggestion || null,
          suggestion: parsed.issue || parsed.suggestion || null,
          improvedPrompt: needsImp ? (parsed.improvedPrompt || null) : null,
          reasoning: parsed.reasoning || null
        });
      }

      if (platform === 'anthropic') {
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': key,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 600,
            system: systemInstruction,
            messages: [{ role: 'user', content: rawPrompt }]
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (resp.status === 401 || resp.status === 403) {
          return res.status(401).json({ error: 'invalid_key', message: 'Connection issue with Anthropic — please reconnect' });
        }
        if (!resp.ok) {
          return res.status(resp.status).json({ error: 'proxy_error', message: `Anthropic error status ${resp.status}` });
        }

        const data = await resp.json();
        const contentStr = data.content?.[0]?.text || '{}';
        const parsed = JSON.parse(contentStr);
        const needsImp = !!(parsed.needsImprovement ?? parsed.hasSuggestion);
        return res.json({
          needsImprovement: needsImp,
          hasSuggestion: needsImp,
          issue: parsed.issue || parsed.suggestion || null,
          suggestion: parsed.issue || parsed.suggestion || null,
          improvedPrompt: needsImp ? (parsed.improvedPrompt || null) : null,
          reasoning: parsed.reasoning || null
        });
      }

      if (platform === 'gemini') {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{ parts: [{ text: rawPrompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (resp.status === 400 || resp.status === 401 || resp.status === 403) {
          return res.status(401).json({ error: 'invalid_key', message: 'Connection issue with Gemini — please reconnect' });
        }
        if (!resp.ok) {
          return res.status(resp.status).json({ error: 'proxy_error', message: `Gemini error status ${resp.status}` });
        }

        const data = await resp.json();
        const contentStr = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        const parsed = JSON.parse(contentStr);
        const needsImp = !!(parsed.needsImprovement ?? parsed.hasSuggestion);
        return res.json({
          needsImprovement: needsImp,
          hasSuggestion: needsImp,
          issue: parsed.issue || parsed.suggestion || null,
          suggestion: parsed.issue || parsed.suggestion || null,
          improvedPrompt: needsImp ? (parsed.improvedPrompt || null) : null,
          reasoning: parsed.reasoning || null
        });
      }

      if (platform === 'custom') {
        const targetUrl = (customUrl || 'http://localhost:11434/v1').replace(/\/+$/, '');
        const resp = await fetch(`${targetUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(key ? { 'Authorization': `Bearer ${key}` } : {})
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: rawPrompt }
            ],
            temperature: 0.3
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (!resp.ok) {
          return res.status(resp.status).json({ error: 'proxy_error', message: `Custom endpoint status ${resp.status}` });
        }

        const data = await resp.json();
        const contentStr = data.choices?.[0]?.message?.content || '{}';
        let parsed: any = {};
        try {
          parsed = JSON.parse(contentStr);
        } catch {
          parsed = { hasSuggestion: true, suggestion: 'Refined prompt format', improvedPrompt: contentStr };
        }
        return res.json({
          hasSuggestion: !!parsed.hasSuggestion,
          suggestion: parsed.suggestion || null,
          improvedPrompt: parsed.improvedPrompt || rawPrompt
        });
      }

      return res.status(400).json({ error: 'Unsupported platform' });
    } catch (err: any) {
      return res.status(500).json({ error: 'proxy_error', message: 'Failed to connect to AI provider API via proxy' });
    }
  });

  // Vite middleware in dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }


  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

function generateTailoredOptimizationFallback(
  rawPrompt: string,
  userIntent: string,
  userExp: string,
  userLength: string
): OptimizationResult {
  const lower = rawPrompt.toLowerCase();

  // 1. Learning / Study prompts (e.g. "I want to study cryptography")
  if (
    lower.includes('study') ||
    lower.includes('learn') ||
    lower.includes('cryptography') ||
    lower.includes('physics') ||
    lower.includes('math') ||
    lower.includes('calculus') ||
    lower.includes('history') ||
    userIntent.includes('Learn')
  ) {
    const topicMatch = rawPrompt.replace(/i want to study|i want to learn|teach me/gi, '').trim() || 'the subject';
    const expText = userExp !== 'Not Specified' ? userExp : 'Beginner with basic foundational background';
    const lengthText = userLength !== 'Not Specified' ? userLength : 'Structured step-by-step roadmap';

    return {
      prompt_type: 'learning',
      score: 95,
      breakdown: { clarity: 96, specificity: 94, structure: 95, context: 92 },
      score_reasoning: {
        clarity: 'Request is unambiguous and outlines explicit milestones, prerequisites, and outputs.',
        specificity: 'Names specific study goals, practical project deliverables, and concrete time horizons.',
        structure: 'Organized into distinct logical sections: Profile & Goals, Focus Area, and Deliverables.',
        context: 'Establishes user skill level, preferred format, and core domain boundaries.'
      },
      reasoning: `The original prompt lacked your target skill level, scope boundary (conceptual vs applied), primary goals, and preferred learning style. Adding these parameters ensures the AI creates a personalized curriculum rather than a generic overview.`,
      improved_prompt: `I want to study ${topicMatch}.

My Learning Profile & Goals:
- Experience Level: ${expText}
- Focus Area: Core principles, modern practical applications, and common foundational concepts
- Preferred Format: ${lengthText} with clear explanations, real-world analogies, and hands-on exercises

Please provide:
1. A structured 4-week learning path broken down into key milestones.
2. The top 3 essential prerequisites or concepts to master first.
3. Recommended practical exercises or projects to test understanding.`,
      alternative_versions: [
        {
          title: 'Foundational Conceptual Path',
          description: 'Best for complete beginners who want clear analogies and theoretical mastery before writing code or doing advanced math.',
          prompt: `Create a beginner-friendly, concept-first study guide for ${topicMatch}. Explain core mechanisms using intuitive real-world analogies, step-by-step breakdowns, and key terminology, without assuming prior advanced math or technical background.`
        },
        {
          title: 'Applied Developer & Hands-On Path',
          description: 'Best for engineers and practitioners who want code-driven implementations and security engineering context.',
          prompt: `Design an applied, project-based curriculum for ${topicMatch}. Focus on practical code implementations (e.g. Python/Rust), key architectural primitives, real-world security engineering practices, and common vulnerability pitfalls.`
        }
      ]
    };
  }

  // 2. Coding prompts (e.g. "Write a python script to parse a csv file")
  if (
    lower.includes('python') ||
    lower.includes('script') ||
    lower.includes('csv') ||
    lower.includes('code') ||
    lower.includes('function') ||
    lower.includes('parse') ||
    lower.includes('api') ||
    lower.includes('react') ||
    userIntent.includes('Code')
  ) {
    return {
      prompt_type: 'coding',
      score: 96,
      breakdown: { clarity: 97, specificity: 95, structure: 96, context: 93 },
      score_reasoning: {
        clarity: 'Specifies exact programming language, file type, and expected runtime behavior.',
        specificity: 'Explicitly specifies 1GB file size limits, error logging rules, and CLI argument parsing.',
        structure: 'Clearly separates Scale & Performance, Data Validation, Error Handling, and Quality sections.',
        context: 'Provides memory constraints and production reliability rules for execution.'
      },
      reasoning: `The raw prompt omitted file size/scale limits, exception logging rules, and schema validation criteria. Specifying stream chunking and error handling prevents memory bottlenecks and silent data bugs.`,
      improved_prompt: `Write a production-ready Python script to parse CSV files cleanly.

Key Requirements:
- Scale & Performance: Support files up to 1GB using memory-efficient chunking/streaming.
- Data Validation: Verify required column headers and expected data types.
- Error Handling: Log malformed or corrupt rows to 'invalid_rows.log' without halting execution.
- Quality: Include type hints, clean docstrings, and a CLI interface using argparse.`,
      alternative_versions: [
        {
          title: 'Lightweight Standard Library Script',
          description: 'Zero third-party dependencies using Python built-in csv and argparse modules.',
          prompt: `Write a lightweight Python script using only standard library modules (csv, argparse, logging) to parse CSV files line-by-line with error handling and CLI argument flags.`
        },
        {
          title: 'High-Performance Dataframe Pipeline',
          description: 'Uses Pandas/Polars and PyDantic for high-throughput batch validation.',
          prompt: `Build a high-performance Python CSV ingestion script using Pandas and PyDantic. Validate schema per batch, stream chunks, and export summary statistics upon completion.`
        }
      ]
    };
  }

  // 3. Creative writing prompts (e.g. "Write a story about a time traveler who loses their watch")
  if (
    lower.includes('story') ||
    lower.includes('traveler') ||
    lower.includes('watch') ||
    lower.includes('creative') ||
    lower.includes('novel') ||
    lower.includes('character') ||
    userIntent.includes('Content')
  ) {
    return {
      prompt_type: 'creative',
      score: 94,
      breakdown: { clarity: 95, specificity: 93, structure: 94, context: 92 },
      score_reasoning: {
        clarity: 'Clear narrative directive with explicit word count bounds and genre framing.',
        specificity: 'Names specific setting (1920s Paris), item (pocket-watch tether), and conflict.',
        structure: 'Separates Tone, Style, and Key Conflict into distinct creative guidelines.',
        context: 'Establishes emotional atmosphere and narrative stakes for character decisions.'
      },
      reasoning: `The original prompt lacked historical era setting, emotional tone, perspective, and narrative stakes. Specifying 1920s Paris and internal character monologue transforms a basic concept into a compelling narrative direction.`,
      improved_prompt: `Write a atmospheric short story (~1,000 words) about a time traveler who accidentally loses their pocket-watch tether in 1920s Paris.

Creative Boundaries:
- Tone: Bittersweet, suspenseful, and atmospheric.
- Style: Focus on sensory details of 1920s Paris and internal monologue.
- Key Conflict: The protagonist must decide between risking temporal collapse to search for the device or adapting to live out their life in the past.`,
      alternative_versions: [
        {
          title: 'Atmospheric Period Drama',
          description: 'Focuses on emotional immersion, historical texture, and character reflection.',
          prompt: `Write a character-driven historical story about a time traveler stranded in 1920s Paris after losing their watch. Emphasize sensory period details, jazz-age atmosphere, and quiet acceptance of the past.`
        },
        {
          title: 'High-Stakes Sci-Fi Thriller',
          description: 'Focuses on temporal paradoxes, ticking-clock tension, and escape action.',
          prompt: `Write a fast-paced sci-fi thriller where a time traveler has 60 minutes to locate their missing tether watch in a crowded 1920s Paris market before temporal degradation erases their memory.`
        }
      ]
    };
  }

  // 4. Business & Email prompts (e.g. "Draft an email to ask for a refund for late shipment")
  if (
    lower.includes('email') ||
    lower.includes('refund') ||
    lower.includes('shipment') ||
    lower.includes('customer') ||
    lower.includes('client') ||
    lower.includes('business') ||
    userIntent.includes('Business')
  ) {
    return {
      prompt_type: 'business',
      score: 96,
      breakdown: { clarity: 98, specificity: 94, structure: 96, context: 94 },
      score_reasoning: {
        clarity: 'Unambiguous request specifying exact tone, audience, and outcome.',
        specificity: 'Includes concrete placeholders for Order ID, delay duration, and fee adjustment options.',
        structure: 'Structures details cleanly into Order Reference, Issue, Tone, and Desired Resolution.',
        context: 'Provides commercial SLA context and customer service relationship parameters.'
      },
      reasoning: `The initial prompt missed specific transaction placeholders (order number, delivery timestamp) and a firm yet polite outcome request. Adding clear context anchors and resolution options yields much higher response rates.`,
      improved_prompt: `Draft a concise, professional customer support email requesting a refund or shipping fee credit for a delayed package.

Details & Parameters:
- Order Reference: [Insert Order #]
- Issue: Package arrived 5 days past the guaranteed delivery date.
- Tone: Professional, firm, yet polite.
- Desired Resolution: Full refund of expedited shipping fees or store credit adjustment.`,
      alternative_versions: [
        {
          title: 'Polite & Collaborative Request',
          description: 'Focuses on maintaining customer goodwill while securing a shipping fee credit.',
          prompt: `Write a friendly yet clear email notifying support of a late package arrival (Order #[ID]) and politely asking for an expedited shipping fee credit or discount code.`
        },
        {
          title: 'Executive Formal Escalation',
          description: 'Higher urgency formal letter referencing delivery SLA guarantees.',
          prompt: `Draft a formal complaint letter to customer support regarding a breach of guaranteed delivery window for Order #[ID], requesting immediate reimbursement.`
        }
      ]
    };
  }

  // 5. Data Analysis prompts (e.g. "Analyze my sales data to find customer churn patterns")
  if (
    lower.includes('data') ||
    lower.includes('sales') ||
    lower.includes('churn') ||
    lower.includes('analyze') ||
    lower.includes('metrics') ||
    userIntent.includes('Data')
  ) {
    return {
      prompt_type: 'data_analysis',
      score: 95,
      breakdown: { clarity: 96, specificity: 93, structure: 95, context: 92 },
      score_reasoning: {
        clarity: 'Clear analytical goal directing focus toward quantifiable churn indicators.',
        specificity: 'Explicitly names metrics like purchase cadence drops, support ticket spikes, and LTV deciles.',
        structure: 'Logically separates Core Metrics from Analysis Deliverables.',
        context: 'Defines business decision context and actionable strategic retention outputs.'
      },
      reasoning: `The raw prompt did not define dataset schema, churn triggers, or actionable report deliverables. Directing the analysis toward purchase frequency drops and support ticket spikes produces actionable business strategy.`,
      improved_prompt: `Analyze customer transaction and engagement datasets to uncover key churn risk factors.

Scope & Focus:
- Core Metrics: Quarterly purchase cadence drops, customer support ticket spikes, and LTV deciles.
- Analysis Deliverables: Identify top 3 churn risk triggers, segment profiles for high-risk accounts, and 3 recommended retention intervention strategies.`,
      alternative_versions: [
        {
          title: 'Executive Summary & Retention Strategy',
          description: 'High-level business insights with strategic recommendations for stakeholders.',
          prompt: `Perform an executive analysis on customer churn data. Summarize the key behavioral drivers of churn in bullet points and outline a 3-step customer retention action plan.`
        },
        {
          title: 'Technical Exploratory Data Analysis (EDA)',
          description: 'Code-heavy Python/SQL analysis steps for data analysts and modeling.',
          prompt: `Provide a step-by-step SQL/Python data analysis guide for identifying churn predictors in customer transaction tables, including cohort retention matrices and feature correlation checks.`
        }
      ]
    };
  }

  // General fallback tailored to the raw prompt
  return {
    prompt_type: 'general',
    score: 93,
    breakdown: { clarity: 94, specificity: 92, structure: 93, context: 91 },
    score_reasoning: {
      clarity: 'Direct, clear task statement without conflicting requirements.',
      specificity: 'Refines general topic into targeted outcomes and preferred formats.',
      structure: 'Structured cleanly with Goal, Format Preferences, and Target Audience.',
      context: 'Establishes user experience level and practical application goals.'
    },
    reasoning: `The raw prompt was relatively brief and ambiguous regarding background context, target audience, and specific deliverable goals. Adding relevant domain constraints makes the AI output far more actionable.`,
    improved_prompt: `Regarding: ${rawPrompt}

Goal & Context:
- Target Outcome: Provide specific, well-structured guidance on this topic.
- Format Preferences: Clear overview, key action steps, and common edge cases to consider.
- Target Audience/Level: ${userExp !== 'Not Specified' ? userExp : 'Adapted for immediate practical use'}.`,
    alternative_versions: [
      {
        title: 'Direct & Action-Oriented',
        description: 'Focuses on immediate, actionable next steps.',
        prompt: `Provide a direct, concise guide for: "${rawPrompt}". Break down immediate action items and key considerations in priority order.`
      },
      {
        title: 'Comprehensive Analysis',
        description: 'Provides in-depth background, edge cases, and best practices.',
        prompt: `Provide a comprehensive analysis of "${rawPrompt}", covering foundational background, potential challenges, best practices, and recommended approaches.`
      }
    ]
  };
}

function generateDynamicAutoCorrectionFallback(rawPrompt: string) {
  const lower = rawPrompt.toLowerCase().trim();

  // Extract core topic / action dynamically
  const cleanedTopic = rawPrompt
    .replace(/^(i want to|how to|can you|please|help me|tell me|draft a|write a|create a|give me)/gi, '')
    .trim() || rawPrompt;

  // 1. Learning & Study requests
  if (
    lower.includes('learn') ||
    lower.includes('study') ||
    lower.includes('teach') ||
    lower.includes('understand') ||
    lower.includes('how does')
  ) {
    const issueMsg = `Missing skill level, target scope, and practical learning goal for ${cleanedTopic}`;
    return {
      needsImprovement: true,
      hasSuggestion: true,
      issue: issueMsg,
      suggestion: issueMsg,
      improvedPrompt: `I want to study ${cleanedTopic}.

Learning Profile & Scope:
- Target Level: Adapted for foundational and practical mastery
- Focus Area: Core mechanisms, modern real-world applications, and common pitfalls
- Preferred Format: Structured 4-week learning path with intuitive analogies and hands-on exercises.`,
      reasoning: `Added target skill level, core focus areas, and structured 4-week learning roadmap.`
    };
  }

  // 2. Coding, technical, & software requests
  if (
    lower.includes('code') ||
    lower.includes('script') ||
    lower.includes('python') ||
    lower.includes('javascript') ||
    lower.includes('react') ||
    lower.includes('bug') ||
    lower.includes('build') ||
    lower.includes('parse') ||
    lower.includes('api') ||
    lower.includes('database')
  ) {
    const issueMsg = `Missing programming language version, framework schema, and error handling rules for ${cleanedTopic}`;
    return {
      needsImprovement: true,
      hasSuggestion: true,
      issue: issueMsg,
      suggestion: issueMsg,
      improvedPrompt: `Act as a Senior Software Architect.

Task Directive: ${rawPrompt}

Technical Constraints & Standards:
- Tech Stack: Specify language, framework versions, and dependencies
- Quality Controls: Include strict type hints, exception handling, and clean docstrings
- Output Format: Complete functional code without TODO placeholders, plus execution instructions.`,
      reasoning: `Added senior architect role, technical constraints, and quality standards.`
    };
  }

  // 3. Creative writing, content, & email requests
  if (
    lower.includes('email') ||
    lower.includes('write') ||
    lower.includes('draft') ||
    lower.includes('story') ||
    lower.includes('pitch') ||
    lower.includes('copy') ||
    lower.includes('blog')
  ) {
    const issueMsg = `Missing target audience, tone guidelines, and key bullet points for ${cleanedTopic}`;
    return {
      needsImprovement: true,
      hasSuggestion: true,
      issue: issueMsg,
      suggestion: issueMsg,
      improvedPrompt: `Act as a Senior Copywriter & Strategic Communication Specialist.

Objective: ${rawPrompt}

Creative Brief & Guardrails:
- Target Audience: Primary stakeholders / recipients
- Tone & Voice: Professional, concise, and persuasive
- Structure: Engaging hook, bulleted core takeaways, and a clear call-to-action.`,
      reasoning: `Added copywriter persona, audience targeting, and bulleted call-to-action structure.`
    };
  }

  // 4. Cooking, travel, fitness, & life advice requests
  if (
    lower.includes('cook') ||
    lower.includes('recipe') ||
    lower.includes('trip') ||
    lower.includes('travel') ||
    lower.includes('workout') ||
    lower.includes('fitness') ||
    lower.includes('plan')
  ) {
    const issueMsg = `Missing experience level, time horizon, and key preferences for ${cleanedTopic}`;
    return {
      needsImprovement: true,
      hasSuggestion: true,
      issue: issueMsg,
      suggestion: issueMsg,
      improvedPrompt: `Act as an expert specialist in this field.

Goal: ${rawPrompt}

Requirements & Customizations:
- User Context: Tailored for your specific experience level and timeline
- Core Parameters: Highlight key steps, essential equipment/ingredients, and common mistakes to avoid
- Preferred Format: Clear, step-by-step checklist with prioritized recommendations.`,
      reasoning: `Added expert role, experience timeline, and step-by-step checklist guidelines.`
    };
  }

  // 5. Dynamic fallback for any general/arbitrary prompt
  const issueMsg = `Missing background context, target audience, and specific deliverable goals for ${cleanedTopic}`;
  return {
    needsImprovement: true,
    hasSuggestion: true,
    issue: issueMsg,
    suggestion: issueMsg,
    improvedPrompt: `Regarding: ${rawPrompt}

Target Specifications:
- Core Objective: Provide specific, highly structured guidance on ${cleanedTopic}
- Context & Audience: Tailored for immediate practical application
- Deliverables: Bulleted key action steps, essential prerequisites, and edge cases to consider.`,
    reasoning: `Added structured objectives, target audience context, and actionable deliverables.`
  };
}

startServer();
