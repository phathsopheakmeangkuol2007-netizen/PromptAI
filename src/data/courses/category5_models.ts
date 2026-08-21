import { Course } from '../coursesData';

export const category5Course: Course = {
  id: 'course-models',
  slug: 'model-specific-prompting-guides',
  category: '5. Model-Specific Guides',
  title: '5. Model-Specific Prompting Guides',
  level: 'Intermediate',
  duration: '1 hr',
  lessonsCount: 4,
  icon: 'Cpu',
  description: 'Learn the architectural nuances, XML preferences, system prompt behaviors, and optimal strategies for GPT-4o, Claude 3.5 Sonnet, Gemini 1.5/2.0, and open-source Llama models.',
  topics: ['OpenAI GPT-4o', 'Anthropic Claude 3.5', 'Google Gemini', 'Meta Llama & Open-Source'],
  lessons: [
    {
      id: 'mod-1',
      slug: 'prompting-gpt-models',
      title: 'Prompting GPT-Family Models (GPT-4o, o1/o3)',
      duration: '8 mins',
      summary: 'Mastering prompt optimization for OpenAI models: markdown sectioning, JSON mode, tool calling, and reasoning model behaviors.',
      contentSections: [
        {
          heading: 'Optimizing for OpenAI Model Families',
          body: 'OpenAI\'s flagship models (GPT-4o, GPT-4o-mini) respond exceptionally well to clean Markdown sectioning (`### Role`, `### Constraints`), explicit developer messages, and native Structured Outputs (JSON Schema enforcement).\n\nWhen working with OpenAI reasoning models (o1, o3-mini), avoid detailed Chain-of-Thought prompting ("think step-by-step"), as these models generate internal reasoning chains automatically prior to output.'
        },
        {
          heading: 'Key OpenAI Best Practices',
          body: '• Developer / System Messages: Set clear operational personas in system messages.\n• Structured Outputs: Use strict JSON Schema definitions for zero-parsing-error API pipelines.\n• Reasoning Models (o1/o3): Keep prompts concise and focused on high-level goal definitions without instructing internal reasoning steps.',
          tip: 'When prompting o1/o3 models, do NOT include "think step-by-step" — let the model handle internal reasoning natively.'
        }
      ],
      example: {
        title: 'Over-engineered CoT for Reasoning Model vs Clean GPT-4o Blueprint',
        badText: 'To o1 model: Please think step by step, first analyze X, then analyze Y, then write code.',
        badFlaw: 'Redundant instruction for native reasoning models that slows down generation.',
        goodText: '### Role\nSenior Backend Architect.\n\n### Task\nDesign a rate-limiting Redis middleware in TypeScript.\n\n### Constraints\n- Use sliding window algorithm.\n- Include clean inline comments.\n- Output raw TypeScript code block.',
        goodBreakdown: 'Clear Markdown sections optimized for GPT-4o architectural adherence.'
      },
      takeaways: [
        'Use Markdown headers (###) to separate instructions, context, and constraints.',
        'Enforce Structured Outputs via API JSON Schemas for robust software integration.',
        'Avoid manually instructing CoT steps on native reasoning models like o1 or o3.'
      ],
      tryItTip: {
        promptToTry: 'Structure a GPT-4o prompt using ### Role, ### Task, and ### Constraints for drafting a technical README.',
        description: 'Test Markdown sectioning optimization in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-mod-1-1',
          question: 'Why should you avoid adding "think step-by-step" instructions when prompting OpenAI reasoning models like o1 or o3?',
          options: [
            'It triggers an immediate server error',
            'Reasoning models generate internal chain-of-thought automatically, making manual CoT instructions redundant',
            'It forces the model to output Spanish text',
            'It disables model parameter access'
          ],
          correctIndex: 1,
          explanation: 'Native reasoning models perform internal chain-of-thought calculation automatically prior to generating output tokens.'
        }
      ]
    },
    {
      id: 'mod-2',
      slug: 'prompting-claude-models',
      title: 'Prompting Anthropic Claude Models (Claude 3.5 Sonnet)',
      duration: '8 mins',
      summary: 'Leveraging XML tag structuring, prefilling assistant responses, and long-context comprehension for Claude 3.5 Sonnet.',
      contentSections: [
        {
          heading: 'Claude\'s Architectural Affinity for XML Tags',
          body: 'Anthropic Claude models (Claude 3.5 Sonnet, Claude 3 Opus) are specially tuned to process XML tags (e.g., `<instructions>`, `<context>`, `<documents>`). Using XML tags to structure prompts makes instruction boundaries crystalline for Claude\'s attention mechanism.'
        },
        {
          heading: 'The Power of Prefilling Assistant Responses',
          body: 'Claude allows developers to prefill the beginning of the assistant\'s response string. For example, prefilling `{"status": "success", "data":` forces Claude to instantly complete valid JSON without any conversational intro.',
          tip: 'Prefill Claude\'s response with `<thinking>` or `{` to control output structure deterministically.'
        }
      ],
      example: {
        title: 'Unstructured Text vs Claude XML & Response Prefilling Pattern',
        badText: 'Analyze this report and give me JSON.',
        badFlaw: 'Lacks XML sectioning and fails to take advantage of response prefilling.',
        goodText: '<system>\nYou are a Lead Security Auditor.\n</system>\n\n<document>\n[Security Log Data]\n</document>\n\n<instructions>\nExtract all critical vulnerabilities into JSON.\n</instructions>\n\n[Prefill Assistant Response]: {',
        goodBreakdown: 'Combines XML tag isolation with response prefilling (`{`) for guaranteed JSON.'
      },
      takeaways: [
        'Structure Claude prompts heavily with XML tags (<context>, <rules>, <data>).',
        'Use response prefilling to steer Claude\'s exact output format from token 1.',
        'Claude excels at processing massive 200K+ token context windows accurately.'
      ],
      tryItTip: {
        promptToTry: 'Format a prompt with <instructions> and <data> tags, then practice prefilling the start of the output with `{`.',
        description: 'Experience XML tag structuring for Claude.'
      },
      quiz: [
        {
          id: 'q-mod-2-1',
          question: 'What unique capability in the Anthropic API guarantees exact output formatting with Claude?',
          options: [
            'System tray notifications',
            'Response prefilling (supplying the initial characters of the assistant response)',
            'Automatic GPU overclocking',
            'Disabling model safety filters'
          ],
          correctIndex: 1,
          explanation: 'Response prefilling supplies the initial tokens of the assistant turn, forcing Claude to continue directly in that format.'
        }
      ]
    },
    {
      id: 'mod-3',
      slug: 'prompting-gemini-models',
      title: 'Prompting Google Gemini Models (Gemini 1.5 / 2.0)',
      duration: '8 mins',
      summary: 'Harnessing Gemini\'s million-token multimodal context, native audio/video understanding, and system instruction tuning.',
      contentSections: [
        {
          heading: 'Native Multimodality and Massive Context',
          body: 'Google Gemini 1.5 Pro and 2.0 Flash feature native multimodality (processing text, high-res images, full-length audio, and 1-hour video natively in the same token window) and context windows up to 2,000,000 tokens.'
        },
        {
          heading: 'Best Practices for Gemini Prompts',
          body: '• Grounding with Google Search: Enable native web search grounding tools for real-time factual accuracy.\n• Multimodal Placement: Place image/video/audio assets first, followed by reference documents, and state final instructions at the end.\n• System Instructions: Utilize Gemini\'s dedicated system instruction config field for persistent persona steering.',
          tip: 'When providing hour-long video or audio files to Gemini, specify exact timestamp references in your extraction requests.'
        }
      ],
      example: {
        title: 'Single-Text Request vs Gemini Multimodal Timestamp Blueprint',
        badText: 'What happened in this video?',
        badFlaw: 'Generic prompt fails to utilize Gemini\'s precise timestamp extraction capabilities.',
        goodText: 'Analyze the attached 45-minute video presentation.\n\nTask:\n1. Provide a 3-bullet executive summary.\n2. Create a timestamp table format: [MM:SS] - Key Topic / Slide Title.\n3. Highlight any audience Q&A moments.',
        goodBreakdown: 'Leverages Gemini\'s long video token window with explicit timestamp formatting rules.'
      },
      takeaways: [
        'Gemini handles million-token multimodal context (video, audio, code, documents).',
        'Incorporate Google Search grounding for real-time factual updates.',
        'Request timestamped references when querying long video or audio files.'
      ],
      tryItTip: {
        promptToTry: 'Write a Gemini prompt requesting a timestamped breakdown of a long lecture video.',
        description: 'Practice designing multimodal prompts in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-mod-3-1',
          question: 'What is a defining advantage of Google Gemini 1.5 / 2.0 architecture?',
          options: [
            'It only works on mobile phones',
            'Native multimodality (text, audio, video, images) with up to 2 million tokens of context',
            'It deletes user inputs after 5 seconds',
            'It does not support system prompts'
          ],
          correctIndex: 1,
          explanation: 'Gemini handles text, images, long audio, and full-length video natively within a massive 2M token context window.'
        }
      ]
    },
    {
      id: 'mod-4',
      slug: 'prompting-llama-models',
      title: 'Prompting Open-Source & Llama-Family Models',
      duration: '8 mins',
      summary: 'Formatting chat template tags, instruct tokens (<|start_header_id|>), and optimizing prompts for open-source Llama models.',
      contentSections: [
        {
          heading: 'Understanding Open-Source Chat Templates',
          body: 'Open-source models like Meta Llama 3 / 3.1 / 3.3 require strict adherence to special prompt template chat tokens (e.g., `<|begin_of_text|>`, `<|start_header_id|>system<|end_header_id|>`). When using raw API inference endpoints, failing to format chat templates accurately causes instruction bleed and degraded quality.'
        },
        {
          heading: 'Optimizing Prompts for 8B and 70B Models',
          body: 'Unlike frontier closed models that tolerate ambiguous phrasing, smaller open-source models (8B–70B parameters) require highly explicit instructions, few-shot exemplars, and concise negative constraints.',
          tip: 'Use few-shot exemplars generously when deploying open-source Llama 8B models to maintain strict output schemas.'
        }
      ],
      example: {
        title: 'Malformed Prompt String vs Official Llama 3 Chat Template Format',
        badText: 'System: You are an assistant. User: Hello.',
        badFlaw: 'Lacks required Llama 3 special header and turn tokens.',
        goodText: '<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\nHello.<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n',
        goodBreakdown: 'Uses official Llama 3 chat template special tokens for exact turn boundaries.'
      },
      takeaways: [
        'Open-source Llama models rely on exact chat template special tokens.',
        'Smaller models (8B) benefit significantly from few-shot exemplars.',
        'Keep system directives concise and direct to prevent open-source instruction drift.'
      ],
      tryItTip: {
        promptToTry: 'Format a Llama 3 chat template string with system, user, and assistant header tags.',
        description: 'Test chat template token formatting in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-mod-4-1',
          question: 'Why is strict adherence to chat templates (special tokens) critical for open-source models like Llama 3?',
          options: [
            'It reduces GPU power consumption',
            'Special tokens define exact turn boundaries between system, user, and assistant roles',
            'It enables automatic cloud deployment',
            'It bypasses token pricing'
          ],
          correctIndex: 1,
          explanation: 'Special tokens instruct the transformer attention layer where system directives end and user/assistant turns begin.'
        }
      ]
    }
  ]
};
