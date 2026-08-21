import {
  FeatureItem,
  DeepDiveFeature,
  PromptTransformation,
  PromptChallenge,
  CourseModule,
  Testimonial,
  PricingPlan,
  ExtensionBrowser
} from '../types';

export const HERO_TRANSFORMATIONS: PromptTransformation[] = [
  {
    id: 'hero-1',
    category: 'Marketing & Copywriting',
    badPrompt: 'Write a blog post about our new AI productivity tool.',
    improvedPrompt: `Act as a senior B2B SaaS Content Marketer. Write a 1,200-word SEO-optimized blog post introducing "SyncAI" (an automated meeting summarizer).

Target Audience: Remote Engineering Managers seeking to reduce meeting overload.
Tone: Authoritative, empathetic, and data-backed.
Structure:
1. Hook: Highlight the cost of 10+ weekly meeting hours lost.
2. Problem: Context switching and lost action items.
3. Solution: How SyncAI automates action items into Jira ticket drafts.
4. Key Call-to-Action: Free 14-day team trial.

Include 3 subheadings (H2) and a key takeaways bullet box.`,
    scoreBefore: { clarity: 40, specificity: 30, structure: 25, total: 32 },
    scoreAfter: { clarity: 96, specificity: 94, structure: 98, total: 96 },
    improvements: [
      'Added explicit Persona ("Senior B2B SaaS Content Marketer")',
      'Defined target audience and exact output length (1,200 words)',
      'Specified clear 4-part structure with actionable CTA',
      'Added format directives (H2 headers, key takeaways bullet box)'
    ],
    technique: 'Role + Task + Context + Constraint (RTCC Pattern)'
  },
  {
    id: 'hero-2',
    category: 'Code Generation & Refactoring',
    badPrompt: 'Fix my React code component to make it faster.',
    improvedPrompt: `Act as a Principal Frontend Architect specializing in React 19 performance optimization.

Task: Audit and refactor the following React component to eliminate unnecessary re-renders.
Context: This list renders 5,000 live data items in a financial dashboard.
Requirements:
1. Implement windowing/virtualization (e.g., using virtual rendering principles).
2. Memoize expensive calculation functions with React.useMemo.
3. Replace inline callback handlers with stable useCallback references.
4. Output the updated code with inline inline comments explaining memory allocation savings.`,
    scoreBefore: { clarity: 45, specificity: 25, structure: 35, total: 35 },
    scoreAfter: { clarity: 98, specificity: 96, structure: 95, total: 96 },
    improvements: [
      'Specified domain expert persona (Principal Architect)',
      'Quantified dataset scale (5,000 live items)',
      'Explicitly requested specific optimization techniques (virtualization, useMemo)',
      'Demanded annotated code explanations'
    ],
    technique: 'System Persona + Quantitative Constraints'
  },
  {
    id: 'hero-3',
    category: 'Data Analysis & Strategy',
    badPrompt: 'Analyze this sales data and tell me what to do.',
    improvedPrompt: `You are a Lead Business Intelligence Director. Analyze the attached quarterly revenue dataset (CSV format).

Deliverable: Executive Briefing Document with 3 strategic recommendations.
Analysis Framework:
- Identify top 3 churn drivers across SMB vs Enterprise segments.
- Calculate Customer Acquisition Cost (CAC) payback period trends.
- Highlight statistically significant anomalies in Q3 expansion revenue.

Format: Markdown document with an Executive Summary table at the top. Use strict bullet points for recommendations with estimated ROI metrics.`,
    scoreBefore: { clarity: 35, specificity: 20, structure: 30, total: 28 },
    scoreAfter: { clarity: 95, specificity: 95, structure: 97, total: 96 },
    improvements: [
      'Defined analytical framework (churn drivers, CAC payback, expansion revenue)',
      'Demanded structured output format (Markdown table + ROI metrics)',
      'Segmented customer cohorts (SMB vs Enterprise)'
    ],
    technique: 'Structured Analysis & Executive Output Schema'
  }
];

export const FEATURES_OVERVIEW: FeatureItem[] = [
  {
    id: 'learn',
    iconName: 'GraduationCap',
    title: 'Interactive Learning',
    description: 'Master every prompt engineering concept from core basics to advanced chain-of-thought, persona steering, and few-shot techniques.',
    color: 'from-emerald-500 to-teal-600',
    badge: '40+ Lessons'
  },
  {
    id: 'challenges',
    iconName: 'Trophy',
    title: 'Do Challenges',
    description: 'Tackle AI-generated prompt challenges, solve real-world AI tasks, and refine your prompting skills with instant evaluation.',
    color: 'from-amber-500 to-orange-600',
    badge: 'Made by PromptAI'
  },
  {
    id: 'improve',
    iconName: 'Wand2',
    title: 'AI Prompt Optimizer',
    description: 'Paste any raw prompt and get instant AI optimizations with structural scoring for clarity, specificity, and model precision.',
    color: 'from-purple-500 to-indigo-600',
    badge: 'Real-time AI'
  },
  {
    id: 'extensions',
    iconName: 'Plugin',
    title: 'Browser Extensions',
    description: 'Integrate Prompt AI directly into ChatGPT, Claude, Gemini, and Midjourney for live auto-correction as you type.',
    color: 'from-blue-500 to-cyan-600',
    badge: 'Chrome & Firefox'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Learn the Fundamentals',
    description: 'Complete bite-sized interactive modules covering persona crafting, context injection, output schema constraints, and model-specific nuances.',
    icon: 'BookOpen',
    detail: 'Interactive lessons with real LLM sandboxes'
  },
  {
    step: 2,
    title: 'Practice with Challenges',
    description: 'Put theory into action with hands-on scenarios. Test your prompts against benchmark models and earn instant automated rubric scores.',
    icon: 'Target',
    detail: 'Instant automated grading & rubrics'
  },
  {
    step: 3,
    title: 'Improve & Auto-Correct in Real Time',
    description: 'Deploy your skills everywhere with our browser extension. Get inline suggestions, score updates, and 1-click prompt enhancements while writing.',
    icon: 'Zap',
    detail: '1-click browser extension overlay'
  }
];

export const DEEP_DIVE_FEATURES: DeepDiveFeature[] = [
  {
    id: 'learn-deep',
    tag: 'LEARNING HUB',
    title: 'Structured Curriculum for Every AI Skill Level',
    subtitle: 'From beginner prompt structure to cutting-edge cognitive architecture.',
    description: 'Our step-by-step interactive courses teach you how modern LLMs process natural language, how token limits affect reasoning, and how to reliably force structured JSON outputs, Markdown reports, or creative ideation.',
    bullets: [
      'Master Few-Shot, Chain-of-Thought, and Tree-of-Thought prompting patterns',
      'Learn model-specific directives (OpenAI o3/GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro)',
      'Hands-on interactive playground embedded inside every lesson'
    ],
    ctaText: 'Explore Courses',
    accentColor: 'emerald',
    mockupType: 'learn'
  },
  {
    id: 'challenges-deep',
    tag: 'ARENA & CHALLENGES',
    title: 'Test Your Skills in High-Stakes Prompt Challenges',
    subtitle: 'Solve real-world prompt scenarios and earn global recognition.',
    description: 'Whether it is optimizing a customer support agent prompt to reduce hallucination rates to 0% or instructing Midjourney to produce consistent character poses, our challenge engine evaluates your output quality against benchmark models.',
    bullets: [
      'Automated grading engine checks formatting, edge cases, and token usage',
      'Global leaderboard with weekly cash prizes and digital certificates',
      'Community solution gallery with peer reviews and expert breakdowns'
    ],
    ctaText: 'View Today’s Challenge',
    accentColor: 'amber',
    mockupType: 'challenges'
  },
  {
    id: 'improve-deep',
    tag: 'PROMPT OPTIMIZER ENGINE',
    title: 'Instant AI-Powered Optimization & Quality Scoring',
    subtitle: 'Transform vague 5-word inputs into robust, deterministic prompts.',
    description: 'Our proprietary optimization engine breaks down your raw prompt into 5 key dimensions: Clarity, Specificity, Context, Persona, and Formatting. Receive an instant 0–100 score along with actionable suggestions and 1-click enhanced alternatives.',
    bullets: [
      'Visual radar score breakdown showing structural strengths and weak points',
      'Automatic injection of safety guards, output formatting, and step-by-step reasoning',
      'Export directly to your Prompt Library or sync with team workspaces'
    ],
    ctaText: 'Try Prompt Optimizer',
    accentColor: 'purple',
    mockupType: 'improve'
  },
  {
    id: 'extensions-deep',
    tag: 'EVERYWHERE YOU WORK',
    title: 'Native Browser Extension for Instant Co-Pilot Support',
    subtitle: 'Bring Prompt AI inside ChatGPT, Claude, Gemini, and Midjourney.',
    description: 'Stop switching tabs. The Prompt AI browser extension detects active LLM input boxes, offers live prompt improvement overlays, auto-fills proven templates, and stores your personal prompt library right at your fingertips.',
    bullets: [
      'Floating widget integrates seamlessly into ChatGPT, Claude, and Gemini web interfaces',
      'Hotkey trigger (Cmd+K / Ctrl+K) to insert saved prompts instantly',
      'Real-time token cost estimator and prompt clarity score pill'
    ],
    ctaText: 'Install Chrome Extension',
    accentColor: 'blue',
    mockupType: 'extensions'
  }
];

import { CHALLENGES_DATA } from './challengesData';

export const SAMPLE_CHALLENGES = CHALLENGES_DATA.map((ch) => ({
  id: ch.id,
  title: ch.title,
  difficulty: ch.difficulty,
  category: ch.category,
  points: ch.xpValue,
  scenario: ch.scenario,
  targetOutput: ch.targetOutput || '',
  initialPrompt: ch.initialPrompt || '',
  hint: ch.hint,
  solutionExample: ch.solutionExample || '',
  scoringCriteria: ch.gradingCriteria.map((g, idx) => ({
    name: g.name,
    weight: idx === 0 ? 40 : idx === 1 ? 35 : 25
  }))
}));

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    title: 'Foundations of Prompt Architecture',
    level: 'Beginner',
    duration: '45 mins',
    lessonsCount: 8,
    icon: 'Sparkles',
    description: 'Learn the RTCC model (Role, Task, Context, Constraint) and eliminate ambiguity from AI requests.',
    topics: ['Prompt Anatomy', 'Role Steerability', 'Context Scoping', 'Avoiding Ambiguity']
  },
  {
    id: 'mod-2',
    title: 'Advanced Reasoning & Few-Shot Learning',
    level: 'Intermediate',
    duration: '1 hr 15 mins',
    lessonsCount: 12,
    icon: 'Cpu',
    description: 'Guide complex multi-step reasoning with Chain-of-Thought prompting and few-shot exemplar injection.',
    topics: ['Chain-of-Thought (CoT)', 'Few-Shot Exemplars', 'Self-Consistency Sampling', 'Tree-of-Thought']
  },
  {
    id: 'mod-3',
    title: 'System Prompts & AI Agent Steering',
    level: 'Advanced',
    duration: '2 hrs',
    lessonsCount: 15,
    icon: 'ShieldCheck',
    description: 'Design robust system prompts for production apps, tool calling, JSON enforcement, and safety guardrails.',
    topics: ['JSON Mode Enforcement', 'Function/Tool Calling', 'Jailbreak Mitigation', 'Context Window Budgeting']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Elena Rostova',
    role: 'Lead AI Product Manager',
    company: 'FinTech Stack',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    quote: 'Prompt AI transformed how our engineering team interacts with LLMs. We reduced our API prompt token usage by 35% while dramatically improving output accuracy.',
    rating: 5,
    improvedCount: '1,400+ prompts optimized',
    badge: 'Verified Pro User'
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    role: 'Senior Growth Marketer',
    company: 'Nexus Digital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    quote: 'The browser extension is pure magic! As I write copy in ChatGPT, Prompt AI suggests structured persona guidelines and tone adjustments in real-time.',
    rating: 5,
    improvedCount: '850+ prompts optimized',
    badge: 'Top Challenge Winner'
  },
  {
    id: 'test-3',
    name: 'Sarah Chen',
    role: 'Full-Stack Developer',
    company: 'SaaSify',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    quote: 'The interactive challenges gave me the exact skills needed to build robust JSON guardrails for our backend AI pipelines. Worth every single penny.',
    rating: 5,
    improvedCount: '2,100+ prompts optimized',
    badge: 'Verified Enterprise'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Starter',
    description: 'Essential learning & basic prompt optimizations for AI enthusiasts.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaText: 'Start Free Today',
    features: [
      { text: 'Access to 10 Beginner Courses', included: true },
      { text: '20 AI Prompt Optimizations / month', included: true },
      { text: 'Access to Weekly Community Challenges', included: true },
      { text: 'Basic Browser Extension features', included: true },
      { text: 'Advanced Few-Shot & JSON Templates', included: false },
      { text: 'Team Library & Shareable Prompts', included: false },
      { text: 'Priority API & Dedicated Support', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Pro Engineer',
    description: 'For power users, prompt engineers, and creators building with AI.',
    monthlyPrice: 19,
    yearlyPrice: 15,
    isPopular: true,
    ctaText: 'Start 14-Day Free Trial',
    features: [
      { text: 'Unlimited Course & Curriculum Access', included: true, isHighlight: true },
      { text: 'Unlimited AI Prompt Optimizations', included: true, isHighlight: true },
      { text: 'Full Browser Extension with Hotkey Library', included: true },
      { text: 'Advanced Chain-of-Thought & JSON Templates', included: true },
      { text: 'Challenge Sandbox with Detailed AI Rubrics', included: true },
      { text: 'Personal Prompt Vault (Cloud Sync)', included: true },
      { text: 'Team Library & Shareable Prompts', included: false }
    ]
  },
  {
    id: 'team',
    name: 'Team & Enterprise',
    description: 'For engineering teams and organizations standardizing AI prompts.',
    monthlyPrice: 49,
    yearlyPrice: 39,
    ctaText: 'Contact Sales / Start Team',
    features: [
      { text: 'Everything in Pro for up to 10 Members', included: true },
      { text: 'Shared Team Prompt Library & Workspaces', included: true, isHighlight: true },
      { text: 'Custom Enterprise Guardrails & Rule Sets', included: true, isHighlight: true },
      { text: 'Token Cost Analytics & Performance Dashboards', included: true },
      { text: 'SSO (SAML/Okta) & Admin Control Panel', included: true },
      { text: 'Dedicated AI Prompt Specialist Onboarding', included: true },
      { text: '99.9% Uptime SLA & Priority 24/7 Support', included: true }
    ]
  }
];

export const EXTENSION_BROWSERS: ExtensionBrowser[] = [
  {
    name: 'Google Chrome',
    icon: 'Chrome',
    users: '45,000+ active users',
    rating: 4.9,
    supportedModels: ['ChatGPT', 'Claude 3.5', 'Gemini 1.5', 'Perplexity']
  },
  {
    name: 'Mozilla Firefox',
    icon: 'Firefox',
    users: '12,000+ active users',
    rating: 4.8,
    supportedModels: ['ChatGPT', 'Claude 3.5', 'Gemini 1.5']
  },
  {
    name: 'Microsoft Edge',
    icon: 'Edge',
    users: '8,000+ active users',
    rating: 4.9,
    supportedModels: ['ChatGPT', 'Claude 3.5', 'Copilot']
  }
];

export const TRUST_LOGOS = [
  { name: 'ChatGPT / OpenAI', iconName: 'Bot' },
  { name: 'Anthropic Claude', iconName: 'Sparkles' },
  { name: 'Google Gemini', iconName: 'Zap' },
  { name: 'Midjourney', iconName: 'Image' }
];

export const STATS_DATA = [
  { label: 'Active Learners', value: '50,000+' },
  { label: 'Prompts Improved', value: '1,200,000+' },
  { label: 'Completed Challenges', value: '250,000+' },
  { label: 'Avg Accuracy Boost', value: '3.4x' }
];
