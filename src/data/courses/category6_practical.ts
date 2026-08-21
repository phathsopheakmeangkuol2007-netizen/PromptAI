import { Course } from '../coursesData';

export const category6Course: Course = {
  id: 'course-practical',
  slug: 'practical-use-case-prompting',
  category: '6. Practical Applications',
  title: '6. Practical Real-World Applications',
  level: 'Beginner',
  duration: '1 hr 15 mins',
  lessonsCount: 5,
  icon: 'GraduationCap',
  description: 'Domain-specific masterclasses for engineering, data analysis, creative copywriting, business communications, and deep academic research.',
  topics: ['Code Generation', 'Data Analysis & SQL', 'Creative Writing', 'Executive Email', 'Research Summarization'],
  lessons: [
    {
      id: 'prac-1',
      slug: 'prompting-for-code-generation',
      title: 'Prompting for Code Generation & Software Engineering',
      duration: '9 mins',
      summary: 'Engineering prompts for full-stack code generation, refactoring, unit test creation, and bug debugging.',
      contentSections: [
        {
          heading: 'High-Precision Code Generation Patterns',
          body: 'Generating production-grade code requires specifying language versions, frameworks, typing strictness, error handling strategies, and boundary constraints. Vague requests like "write a React component" produce incomplete, un-typed code snippets.'
        },
        {
          heading: 'The 5 Rules of Coding Prompts',
          body: '1. Specify Tech Stack & Version: React 18, TypeScript 5.0, Tailwind CSS v3.\n2. Mandate Full Completeness: Prohibit placeholder comments (`// TODO: implement later`).\n3. Enforce Type Safety: Require explicit interfaces and zero `any` types.\n4. Error Handling: Require try/catch blocks and user-facing error UI states.\n5. Output Format: Ask for raw, drop-in replacement code blocks.',
          tip: 'Always state: "Provide complete, self-contained, drop-in replacement code without placeholder TODO comments."'
        }
      ],
      example: {
        title: 'Vague Code Request vs Production Component Specification',
        badText: 'Write a login form component in React.',
        badFlaw: 'Lacks TypeScript types, validation, accessibility, and styling constraints.',
        goodText: 'Act as a Principal Frontend Engineer. Write a complete React 18 component named `LoginForm` in TypeScript using Tailwind CSS.\n\nRequirements:\n- Form fields: Email and Password with real-time Zod validation.\n- Loading state during async submission.\n- Accessible ARIA labels and WCAG AA contrast.\n- Zero `any` types and NO placeholder comments.',
        goodBreakdown: 'Explicit stack, type strictness, validation rules, accessibility, and complete code mandate.'
      },
      takeaways: [
        'Specify framework versions, language strictness, and library dependencies.',
        'Prohibit placeholder comments (// TODO) to ensure full code completeness.',
        'Require built-in error handling, loading states, and TypeScript interfaces.'
      ],
      tryItTip: {
        promptToTry: 'Write a complete TypeScript function for debounce with generic types and unit tests using Vitest.',
        description: 'Test production code generation in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-prac-1-1',
          question: 'Why is it crucial to explicitly forbid placeholder comments (e.g. "// TODO: implement later") in code generation prompts?',
          options: [
            'Placeholder comments trigger compiler errors',
            'Models frequently truncate logic and leave critical code unwritten unless explicit full completeness is mandated',
            'It saves network bandwidth',
            'It forces the model to write Python instead'
          ],
          correctIndex: 1,
          explanation: 'Mandating full completeness prevents models from taking shortcuts with unwritten TODO placeholders.'
        }
      ]
    },
    {
      id: 'prac-2',
      slug: 'prompting-for-data-analysis',
      title: 'Prompting for Data Analysis & SQL',
      duration: '9 mins',
      summary: 'Prompting for clean SQL query generation, data transformations, chart visualizations, and statistical summaries.',
      contentSections: [
        {
          heading: 'Generating Valid SQL and Data Transformations',
          body: 'To generate accurate SQL queries or pandas transformation pipelines, you must provide the exact database table schemas, column data types, foreign key relationships, and target SQL dialect (PostgreSQL, MySQL, BigQuery).'
        },
        {
          heading: 'Preventing Schema and Join Errors',
          body: 'Provide sample rows inside `<schema>` tags and explicitly define edge cases (e.g., NULL values, timezone conversions, aggregation groupings).',
          tip: 'Always include table DDL schemas or CREATE TABLE statements in the prompt context when asking for complex SQL joins.'
        }
      ],
      example: {
        title: 'Vague Database Query vs Schema-Grounded SQL Prompt',
        badText: 'Write SQL to find top customers.',
        badFlaw: 'No schema, no dialect, undefined "top" metric (revenue? order count?).',
        goodText: 'Act as a Senior Database Administrator. Write a PostgreSQL query to find the top 10 customers by total spend in 2024.\n\nSchema:\n<schema>\nusers (id INT, name VARCHAR)\ninvoices (id INT, user_id INT, amount DECIMAL, status VARCHAR, created_at TIMESTAMP)\n</schema>\n\nRules:\n- Filter for invoices.status = \'PAID\' and created_at in year 2024.\n- Group by user_id and user name.\n- Order by total_spend DESC LIMIT 10.',
        goodBreakdown: 'Explicit DDL schema, dialect, exact status filtering, and grouping directives.'
      },
      takeaways: [
        'Provide explicit table schemas and column data types for SQL generation.',
        'Define exact business metrics (e.g. "top spend" = SUM(amount) WHERE status=\'PAID\').',
        'Specify target SQL dialect (PostgreSQL, Snowflake, BigQuery).'
      ],
      tryItTip: {
        promptToTry: 'Write a SQL prompt with a <schema> tag containing orders and items tables, asking for monthly revenue trends.',
        description: 'Test SQL prompt generation in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-prac-2-1',
          question: 'What is essential when requesting complex multi-table SQL queries from an LLM?',
          options: [
            'Using maximum temperature settings',
            'Providing explicit table DDL schemas, data types, and target SQL dialect',
            'Asking the model to guess table names',
            'Deleting WHERE clauses'
          ],
          correctIndex: 1,
          explanation: 'Explicit schemas and dialect specifications ground the model, preventing hallucinated column names and syntax errors.'
        }
      ]
    },
    {
      id: 'prac-3',
      slug: 'prompting-for-creative-writing',
      title: 'Prompting for Creative & Marketing Writing',
      duration: '8 mins',
      summary: 'Generating compelling copywriting, narrative fiction, brand voice alignment, and avoiding generic "AI tone" clichés.',
      contentSections: [
        {
          heading: 'Banning AI Slop and Generic Buzzwords',
          body: 'Generative models tend to over-use generic marketing clichés ("delve", "testament", "tapestry", "supercharge", "unleash", "game-changer"). Writing high-impact creative copy requires enforcing a strict Banned Words List and defining concrete voice personas.'
        },
        {
          heading: 'Elements of High-Converting Copy Prompts',
          body: '1. Brand Persona: Define tone attributes (e.g., "Witty, minimalist, direct, empathetic").\n2. Banned Buzzwords: Explicitly forbid generic AI marketing verbs.\n3. Formatting Rhythms: Require varied sentence lengths and strong punchy hooks.',
          tip: 'Include a negative constraint: "Forbidden words: delve, leverage, supercharge, game-changer, tapestry, testament."'
        }
      ],
      example: {
        title: 'Generic AI SaaS Pitch vs High-Impact Copywriting Prompt',
        badText: 'Write landing page copy to supercharge productivity.',
        badFlaw: 'Over-uses generic AI buzzwords ("supercharge", "empower").',
        goodText: 'Act as a Senior Direct-Response Copywriter. Write a 3-paragraph landing page hero section for a developer time-tracking tool.\n\nTone: Sharp, relatable, developer-focused, candid.\n\nNegative Rule: FORBIDDEN to use words [supercharge, empower, leverage, seamless, game-changer, delve]. Focus on real pain points: broken focus, endless status meetings, and lost coding time.',
        goodBreakdown: 'Explicit banned buzzword list and concrete developer pain-point focus.'
      },
      takeaways: [
        'Ban generic AI clichés (delve, leverage, supercharge, seamless).',
        'Define distinct brand persona traits and concrete customer pain points.',
        'Vary sentence lengths to create natural reading rhythm and flow.'
      ],
      tryItTip: {
        promptToTry: 'Draft a product launch tweet for a noise-canceling headphone, forbidding the words "unleash", "experience", and "game-changer".',
        description: 'Test buzzword-free copywriting in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-prac-3-1',
          question: 'Why is establishing a "Banned Words List" crucial for creative copywriting prompts?',
          options: [
            'It lowers network latency',
            'It suppresses generic AI buzzwords ("delve", "supercharge"), forcing the model to generate original, authentic phrasing',
            'It turns off model grammar checking',
            'It forces the model to write code'
          ],
          correctIndex: 1,
          explanation: 'Banning overused AI clichés forces the model to select fresher, more authentic, and punchier vocabulary.'
        }
      ]
    },
    {
      id: 'prac-4',
      slug: 'prompting-for-business-communication',
      title: 'Prompting for Business & Email Communication',
      duration: '8 mins',
      summary: 'Crafting persuasive executive emails, meeting agendas, escalation memos, and negotiation communications.',
      contentSections: [
        {
          heading: 'Executive-Ready Business Communications',
          body: 'Business communications require high signal-to-noise ratio, clear bottom-line up front (BLUF) structure, and calibrated professional tone. Unengineered email prompts yield wordy, overly apologetic messages.'
        },
        {
          heading: 'The BLUF (Bottom Line Up Front) Pattern',
          body: 'Structure business emails with the core ask or decision in the very first sentence, followed by bulleted supporting context and clear call-to-action deadlines.',
          tip: 'Instruct the model: "Use Bottom Line Up Front (BLUF) structure: state the core request in sentence 1."'
        }
      ],
      example: {
        title: 'Wordy Apologetic Draft vs BLUF Executive Memo',
        badText: 'Write an email asking for a budget increase for our team project.',
        badFlaw: 'Wordy, unfocused, buries the dollar request at the bottom.',
        goodText: 'Act as a VP of Engineering. Write a 150-word email to the CFO requesting a $25,000 budget increase for cloud infrastructure.\n\nStructure:\n1. Sentence 1 (BLUF): State exact $25,000 request and primary business impact.\n2. Bullets: 3 key ROI data points.\n3. Call to Action: Proposed 15-minute sync meeting by Friday.',
        goodBreakdown: 'Uses BLUF structure, concise length cap, quantitative ROI focus, and clear deadline.'
      },
      takeaways: [
        'Use BLUF (Bottom Line Up Front) structure for executive communications.',
        'Keep emails concise (100–200 words) with bulleted supporting facts.',
        'End with an explicit, actionable next step and deadline.'
      ],
      tryItTip: {
        promptToTry: 'Write a BLUF email to a project sponsor requesting a 1-week timeline extension due to API vendor delays.',
        description: 'Test executive communication prompts in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-prac-4-1',
          question: 'What does the BLUF (Bottom Line Up Front) communication structure mandate?',
          options: [
            'Placing the bibliography at the top',
            'Stating the primary decision or request in the very first sentence of the message',
            'Writing in all capital letters',
            'Hiding costs until the end'
          ],
          correctIndex: 1,
          explanation: 'BLUF places the core ask or conclusion in sentence 1, saving executive reading time.'
        }
      ]
    },
    {
      id: 'prac-5',
      slug: 'prompting-for-research-and-summarization',
      title: 'Prompting for Research & Long Document Summarization',
      duration: '8 mins',
      summary: 'Synthesizing technical research papers, long PDF documents, and multi-document comparative analysis without losing critical nuances.',
      contentSections: [
        {
          heading: 'High-Fidelity Document Synthesis',
          body: 'Summarizing 50-page research papers or multi-document comparative studies requires prompting techniques that preserve numerical data, methodology nuances, and core conclusions without generating generic fluff.'
        },
        {
          heading: 'The Executive Synthesis Blueprint',
          body: '1. Executive Summary: 3-bullet high-level takeaway.\n2. Key Findings Table: Markdown table comparing metrics, methods, and outcomes.\n3. Limitations & Edge Cases: Explicitly extracted study constraints.\n4. Actionable Recommendations: Implications for decision-makers.',
          tip: 'Always require Markdown tables when asking for multi-document comparisons.'
        }
      ],
      example: {
        title: 'Generic Paragraph Summary vs Structured Synthesis Blueprint',
        badText: 'Summarize these 3 research papers on battery technology.',
        badFlaw: 'Yields vague paragraphs without structured metric comparisons.',
        goodText: 'Synthesize the 3 research papers inside <papers>.\n\nOutput Structure:\n1. Executive Summary (3 bullets)\n2. Comparative Markdown Table: [Paper Title | Energy Density (Wh/kg) | Manufacturing Cost | Primary Bottleneck]\n3. Critical Methodology Differences\n4. Recommended R&D Direction',
        goodBreakdown: 'Structured Markdown table for multi-document metric comparison.'
      },
      takeaways: [
        'Use Markdown tables to compare metrics across multiple research documents.',
        'Require explicit extraction of study limitations and methodology edge cases.',
        'Separate high-level takeaways from deep-dive technical findings.'
      ],
      tryItTip: {
        promptToTry: 'Design a prompt to synthesize two product review articles into a Markdown pros/cons comparison table.',
        description: 'Practice structured document synthesis in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-prac-5-1',
          question: 'What is the most effective format for presenting multi-document comparative research summaries?',
          options: [
            'A single 1,000-word block paragraph',
            'A structured Markdown table comparing key metrics across documents',
            'An audio recording link',
            'A random list of numbers'
          ],
          correctIndex: 1,
          explanation: 'Markdown tables organize multi-document metrics into clear, scannable, side-by-side comparisons.'
        }
      ]
    }
  ]
};
