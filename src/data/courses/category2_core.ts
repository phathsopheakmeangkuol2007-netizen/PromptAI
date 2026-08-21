import { Course } from '../coursesData';

export const category2Course: Course = {
  id: 'course-core',
  slug: 'core-prompting-techniques',
  category: '2. Core Techniques',
  title: '2. Core Prompting Techniques',
  level: 'Intermediate',
  duration: '2 hrs 15 mins',
  lessonsCount: 18,
  icon: 'Cpu',
  description: 'Master the entire canon of modern reasoning frameworks: Zero-shot, Few-shot, Chain-of-Thought, ReAct, Tree of Thoughts, RAG, PAL, Reflexion, Graph Prompting, and more.',
  topics: ['Zero-Shot & Few-Shot', 'Chain-of-Thought', 'Tree of Thoughts', 'ReAct & Reflexion', 'RAG & Knowledge Graphs', 'Automatic Prompting'],
  lessons: [
    {
      id: 'core-1',
      slug: 'zero-shot-prompting',
      title: 'Zero-Shot Prompting',
      duration: '7 mins',
      summary: 'Prompting models to perform tasks directly without providing explicit training examples or exemplars.',
      contentSections: [
        {
          heading: 'Direct Task Execution Without Examples',
          body: 'Zero-shot prompting relies entirely on the pre-trained knowledge and instruction-tuning alignment of modern LLMs. You describe the task, context, and constraints directly, expecting the model to perform the task without providing prior input-output examples.\n\nModern frontier models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5/2.0) excel at zero-shot performance across standard tasks like sentiment analysis, translation, summarization, and simple coding.'
        },
        {
          heading: 'When Zero-Shot Is Optimal',
          body: 'Zero-shot is ideal for high-volume, low-latency API pipelines where minimizing input token overhead is critical. When instructions are clear and the task matches standard domain conventions, zero-shot yields fast, cost-effective responses.',
          tip: 'Use zero-shot for straightforward tasks to save context tokens, and switch to few-shot when dealing with custom schemas or complex domain rules.'
        }
      ],
      example: {
        title: 'Zero-Shot Sentiment Classification',
        badText: 'How is this product review?',
        badFlaw: 'Lacks classification categories, output constraints, and formatting rules.',
        goodText: 'Classify the sentiment of the following customer review into exactly one label: [POSITIVE, NEGATIVE, NEUTRAL].\n\nReview: "The package arrived 2 days late, but customer support resolved it immediately and refunded my shipping fee."\n\nOutput ONLY the label.',
        goodBreakdown: 'Direct zero-shot directive with strict enum labels and zero-preamble constraint.'
      },
      takeaways: [
        'Zero-shot relies on model pre-training without input-output exemplars.',
        'Minimizes token costs and API latency for common natural language tasks.',
        'Requires clear, unambiguous instructions and explicit constraints.'
      ],
      tryItTip: {
        promptToTry: 'Classify the topic of this email into one category: [BILLING, FEATURE_REQUEST, BUG_REPORT]. Email: "The export CSV button throws a 500 error on Chrome."',
        description: 'Test zero-shot classification speed and accuracy in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-core-1-1',
          question: 'What defines Zero-Shot Prompting?',
          options: [
            'Providing 100 training examples in the prompt',
            'Asking the model to complete a task with zero input-output exemplars in the context',
            'Running zero temperature settings',
            'Executing code with zero dependencies'
          ],
          correctIndex: 1,
          explanation: 'Zero-shot prompting requests a task directly without providing prior input-output example pairs.'
        }
      ]
    },
    {
      id: 'core-2',
      slug: 'few-shot-prompting',
      title: 'Few-Shot Prompting & Exemplars',
      duration: '8 mins',
      summary: 'Injecting high-quality input-output exemplars to demonstrate exact formatting, tone, and reasoning patterns.',
      contentSections: [
        {
          heading: 'In-Context Pattern Learning',
          body: 'Few-shot prompting provides 2 to 5 concrete input-output examples (exemplars) within the prompt prior to the final target input. The model leverages in-context learning to identify the underlying transformation pattern, tone, and formatting.'
        },
        {
          heading: 'Designing High-Impact Exemplars',
          body: 'Exemplars must be accurate, diverse, and representative of real-world edge cases. Ensure consistent key labels and formatting across all examples. Ordering can subtly influence outputs, so keep exemplars balanced across output classes.',
          tip: 'Always structure exemplars with uniform labels (e.g., Input: ..., Output: ...) to make pattern matching trivial for the model.'
        }
      ],
      example: {
        title: 'Zero-Shot Ambiguity vs 3-Shot In-Context Pattern',
        badText: 'Convert tweet to formal English: "ngl this product is cracked lowkey mandatory buy"',
        badFlaw: 'Model may guess the slang translation tone incorrectly.',
        goodText: 'Convert informal slang into formal executive English.\n\nInput: "fr this feature is super clean no cap"\nOutput: "Indeed, this feature is exceptionally polished and reliable."\n\nInput: "smh backend went down again rip server"\nOutput: "Regrettably, the backend server experienced an outage once more."\n\nInput: "ngl this product is cracked lowkey mandatory buy"\nOutput:',
        goodBreakdown: 'Demonstrates formal translation style through 2 concrete training pairs.'
      },
      takeaways: [
        'Few-shot uses 2–5 exemplars to guide tone, style, and structured formatting.',
        'Drastically improves output consistency on complex or non-standard tasks.',
        'Keep exemplar formatting strictly uniform across all examples.'
      ],
      tryItTip: {
        promptToTry: 'Transform company names into stock ticker symbols:\nApple -> AAPL\nMicrosoft -> MSFT\nAlphabet -> GOOGL\nNVIDIA ->',
        description: 'Observe how few-shot pattern matching completes stock ticker lookups instantly.'
      },
      quiz: [
        {
          id: 'q-core-2-1',
          question: 'How does Few-Shot Prompting improve model consistency?',
          options: [
            'By updating model weights permanently',
            'By providing in-context input-output examples that demonstrate expected formatting and logic',
            'By lowering GPU memory usage',
            'By skipping token generation steps'
          ],
          correctIndex: 1,
          explanation: 'In-context exemplars visually demonstrate expected outputs, guiding probabilistic generation without model fine-tuning.'
        }
      ]
    },
    {
      id: 'core-3',
      slug: 'chain-of-thought-prompting',
      title: 'Chain-of-Thought (CoT) Prompting',
      duration: '8 mins',
      summary: 'Forcing intermediate step-by-step reasoning tokens to unlock complex math, logic, and multi-step problem solving.',
      contentSections: [
        {
          heading: 'Providing Intermediate Reasoning Computation',
          body: 'Chain-of-Thought (CoT) prompting explicitly instructs the model to break down complex multi-step problems into intermediate reasoning steps before declaring a final answer. Because transformers generate tokens sequentially, asking for an immediate answer forces the model to predict final output tokens without sufficient computational steps.'
        },
        {
          heading: 'Zero-Shot CoT vs Few-Shot CoT',
          body: '• Zero-Shot CoT: Simply adding "Think step-by-step before answering" forces the model to generate a reasoning chain.\n• Few-Shot CoT: Providing exemplars that explicitly include intermediate step-by-step calculations guides the model through domain-specific reasoning methodologies.',
          tip: 'Encourage the model to enclose its intermediate thoughts inside <thinking>...</thinking> tags.'
        }
      ],
      example: {
        title: 'Direct Output vs Step-by-Step Chain-of-Thought',
        badText: 'A warehouse has 48 boxes. 12 are shipped to Store A, 18 to Store B, and a shipment of 25 arrives. Half the total is moved to overflow. How many remain in the main warehouse? Give answer only.',
        badFlaw: 'Requests direct answer, leading to frequent mental arithmetic errors.',
        goodText: 'A warehouse has 48 boxes. 12 shipped to Store A, 18 to Store B, 25 arrive. Half the total is moved to overflow. How many remain in the main warehouse?\n\nInstructions:\n1. Show step-by-step arithmetic breakdown in <thinking> tags.\n2. State final main warehouse box count as **Final Answer: X**.',
        goodBreakdown: 'Allocates computation scratchpad space, eliminating arithmetic hallucinations.'
      },
      takeaways: [
        'CoT provides intermediate tokens that serve as working memory for calculations.',
        'Zero-Shot CoT ("Think step-by-step") significantly boosts accuracy on multi-step logic.',
        'Isolate thinking traces in XML tags (<thinking>) to separate logic from final output.'
      ],
      tryItTip: {
        promptToTry: 'Think step by step in <thinking> tags to solve: If a train leaves Station A at 60 mph and another leaves Station B 200 miles away at 40 mph towards Station A, when do they meet?',
        description: 'Test how forcing step-by-step math decomposition prevents word problem miscalculations.'
      },
      quiz: [
        {
          id: 'q-core-3-1',
          question: 'Why does Chain-of-Thought prompting drastically improve mathematical accuracy?',
          options: [
            'It connects the model to an online Python interpreter',
            'It provides intermediate generation tokens that act as sequential computational scratchpad memory',
            'It disables model safety guardrails',
            'It reduces temperature to absolute zero'
          ],
          correctIndex: 1,
          explanation: 'Intermediate reasoning tokens give the transformer step-by-step computational depth before committing to the final token sequence.'
        }
      ]
    },
    {
      id: 'core-4',
      slug: 'meta-prompting',
      title: 'Meta Prompting',
      duration: '7 mins',
      summary: 'Using language models to design, optimize, evaluate, and generate prompts for other language models.',
      contentSections: [
        {
          heading: 'Prompts That Build Prompts',
          body: 'Meta Prompting involves using an LLM as a meta-architect to construct, refine, or optimize prompts for a target task. Instead of manually tweaking wording, you describe the high-level objective and constraints to a meta-prompt, which outputs an engineered prompt blueprint.'
        },
        {
          heading: 'The Meta-Optimization Loop',
          body: 'Meta prompting excels when building complex system prompts, API tool schemas, or multi-role agent prompts. The meta-prompt acts as a specialized prompt developer that automatically incorporates RTCC architecture, XML delimiters, and edge-case handling.',
          tip: 'Use Prompt AI\'s Improve feature as an automated meta-prompting engine to elevate raw drafts instantly.'
        }
      ],
      example: {
        title: 'Raw Request vs Meta-Prompt Generation Blueprint',
        badText: 'Write a prompt for a Customer Service bot.',
        badFlaw: 'Lacks structural rigor and architectural specifications.',
        goodText: 'Act as a Senior Prompt Engineer. Design a production-grade system prompt for an e-commerce customer support AI agent. The prompt MUST include:\n1. System Persona\n2. Scope boundaries and fallback rules\n3. XML tags for user inputs\n4. Strict JSON response schema',
        goodBreakdown: 'Instructs the LLM to act as a prompt architect and generate an engineered system prompt.'
      },
      takeaways: [
        'Meta prompting leverages LLMs to author and optimize engineered prompts.',
        'Ideal for generating complex system prompts, agent instructions, and schema definitions.',
        'Saves engineering hours by automating prompt structural drafting.'
      ],
      tryItTip: {
        promptToTry: 'Act as an expert Prompt Architect. Create a structured prompt template for a Code Review assistant specializing in React performance optimizations.',
        description: 'Experience how meta-prompting constructs comprehensive professional prompt blueprints.'
      },
      quiz: [
        {
          id: 'q-core-4-1',
          question: 'What is Meta Prompting?',
          options: [
            'Prompting models manufactured by Meta AI',
            'Using an LLM to generate, refine, or optimize prompts for specific downstream tasks',
            'Writing prompts using virtual reality headsets',
            'Translating prompts into binary code'
          ],
          correctIndex: 1,
          explanation: 'Meta prompting uses LLM capabilities to author, structure, and refine prompts programmatically.'
        }
      ]
    },
    {
      id: 'core-5',
      slug: 'self-consistency',
      title: 'Self-Consistency Sampling',
      duration: '8 mins',
      summary: 'Generating multiple independent reasoning chains and using majority voting to select the most reliable answer.',
      contentSections: [
        {
          heading: 'Majority Voting Across Reasoning Paths',
          body: 'Self-Consistency is an advanced sampling technique designed to replace greedy decoding in complex reasoning tasks. Instead of generating a single Chain-of-Thought path at Temperature = 0, you sample multiple distinct reasoning paths (e.g., 5–10 paths at Temperature = 0.7) and select the majority answer.'
        },
        {
          heading: 'Why Majority Consensus Works',
          body: 'Complex reasoning tasks often have multiple valid ways to solve a problem, but random calculation slips can derail any single chain. If 8 out of 10 sampled paths arrive at the exact same conclusion despite taking different intermediate steps, that consensus answer is statistically far more reliable.',
          tip: 'Use Self-Consistency for critical financial calculations, legal analysis, and medical diagnostic prompts.'
        }
      ],
      example: {
        title: 'Single-Path Greedy Output vs Self-Consistency Voting',
        badText: 'Single generation run on a complex multi-step math problem at Temp = 0.0.',
        badFlaw: 'A single misstep early in the token chain permanently corrupts the final answer.',
        goodText: 'Sample 5 distinct reasoning paths at Temp = 0.7. Evaluate final answers across all 5 runs and select the majority consensus answer.',
        goodBreakdown: 'Aggregates independent reasoning runs to eliminate isolated token generation errors.'
      },
      takeaways: [
        'Self-Consistency samples multiple CoT paths at moderate temperature.',
        'Uses majority voting on final answers to filter out individual path errors.',
        'Significantly boosts accuracy on mathematical and symbolic reasoning benchmarks.'
      ],
      tryItTip: {
        promptToTry: 'Solve this logic puzzle 3 separate ways in <path1>, <path2>, <path3> tags, then state the consensus final answer: Three friends split a $90 dinner bill...',
        description: 'Simulate self-consistency directly within a single prompt by requesting multiple distinct paths.'
      },
      quiz: [
        {
          id: 'q-core-5-1',
          question: 'How does Self-Consistency determine the final response?',
          options: [
            'By choosing the longest generated response',
            'By taking a majority consensus vote across multiple independently sampled reasoning paths',
            'By picking the response generated with the lowest latency',
            'By asking a human reviewer'
          ],
          correctIndex: 1,
          explanation: 'Self-Consistency aggregates independent reasoning chains and selects the majority answer.'
        }
      ]
    },
    {
      id: 'core-6',
      slug: 'generate-knowledge-prompting',
      title: 'Generate Knowledge Prompting',
      duration: '7 mins',
      summary: 'Prompting the model to generate relevant domain background knowledge prior to executing the primary task.',
      contentSections: [
        {
          heading: 'Eliciting Parametric Knowledge Before Answering',
          body: 'Generate Knowledge Prompting forces the model to recall and articulate relevant facts, rules, or domain context before attempting to answer a complex query. This primes the model\'s attention weights with pertinent parametric memory.'
        },
        {
          heading: 'Two-Step Knowledge Generation',
          body: '1. Knowledge Generation: Prompt the model to list core facts, scientific rules, or legal principles relevant to the question.\n2. Knowledge Integration: Prompt the model to answer the query using the explicitly generated knowledge as contextual grounding.',
          tip: 'Use Generate Knowledge when asking about specialized domain regulations, technical protocols, or historical events.'
        }
      ],
      example: {
        title: 'Direct Answer Request vs Generate Knowledge Priming',
        badText: 'Should our EU app store user IP addresses under GDPR?',
        badFlaw: 'Direct request may lead to vague or generic legal assumptions.',
        goodText: 'Step 1: List the core GDPR articles and legal precedents regarding IP addresses as personally identifiable information (PII).\n\nStep 2: Based strictly on the generated GDPR principles above, provide a legal risk assessment for storing user IP addresses in an EU application.',
        goodBreakdown: 'Elicits explicit legal framework principles first, grounding the subsequent decision.'
      },
      takeaways: [
        'Generates background facts prior to answering complex questions.',
        'Primes the model context with relevant domain knowledge.',
        'Reduces superficial answers on specialized technical and legal topics.'
      ],
      tryItTip: {
        promptToTry: 'First, list 3 fundamental laws of thermodynamics. Second, explain how a refrigerator works using those exact laws.',
        description: 'See how generating foundational principles first sharpens scientific explanations.'
      },
      quiz: [
        {
          id: 'q-core-6-1',
          question: 'What is the key benefit of Generate Knowledge Prompting?',
          options: [
            'It searches Google automatically',
            'It forces the model to articulate relevant background facts first, grounding its final answer',
            'It bypasses token limits',
            'It automatically writes Python code'
          ],
          correctIndex: 1,
          explanation: 'Articulating relevant domain knowledge first primes the attention context, leading to more accurate, well-reasoned answers.'
        }
      ]
    },
    {
      id: 'core-7',
      slug: 'prompt-chaining',
      title: 'Prompt Chaining & Pipeline Workflows',
      duration: '8 mins',
      summary: 'Decomposing complex workflows into sequential sub-prompts where the output of step N becomes context for step N+1.',
      contentSections: [
        {
          heading: 'Modular Workflows Over Monolithic Prompts',
          body: 'Asking a single prompt to research, outline, write, review, format, and translate a long document places massive cognitive load on a single generation step, degrading overall quality. Prompt Chaining splits the workflow into focused sub-prompts connected sequentially.'
        },
        {
          heading: 'Building a Reliable Prompt Chain',
          body: '• Step 1: Research & Extract core key facts.\n• Step 2: Outline the document based on Step 1 output.\n• Step 3: Draft sections using Step 2 outline.\n• Step 4: Critique and refine the draft from Step 3.\n\nEach step handles a single task, maximizing quality and allowing programmatic validation between steps.',
          tip: 'Insert programmatic validation or regex checks between chain steps to catch formatting errors early.'
        }
      ],
      example: {
        title: 'Monolithic Everything-Prompt vs 3-Step Sequential Chain',
        badText: 'Research competitors, write a 1000-word blog post, critique it for SEO, format it in HTML, and translate to Spanish.',
        badFlaw: 'Overwhelms context window and instruction attention, leading to truncated, low-quality results.',
        goodText: 'Chain Pipeline:\nPrompt 1: Extract top 5 competitor features -> Output JSON\nPrompt 2: Pass JSON -> Write blog outline\nPrompt 3: Pass Outline -> Draft full article with SEO focus',
        goodBreakdown: 'Splits complex production pipeline into modular, verifiable single-task steps.'
      },
      takeaways: [
        'Break complex multi-stage tasks into a sequential pipeline of sub-prompts.',
        'Pass the validated output of Step N as input context into Step N+1.',
        'Prevents instruction degradation and allows step-by-step quality control.'
      ],
      tryItTip: {
        promptToTry: 'Step 1: Extract 3 main themes from this customer feedback. [Feedback text here]',
        description: 'Experience how breaking workflows into smaller chained prompts improves precision.'
      },
      quiz: [
        {
          id: 'q-core-7-1',
          question: 'Why is Prompt Chaining preferred for complex enterprise workflows?',
          options: [
            'It requires zero API keys',
            'It isolates single tasks into modular sub-prompts, maintaining high attention quality and enabling step validation',
            'It combines all models into a single server',
            'It eliminates the need for system prompts'
          ],
          correctIndex: 1,
          explanation: 'Decomposing monolithic requests into modular sub-prompts ensures each step operates with full attention and precision.'
        }
      ]
    },
    {
      id: 'core-8',
      slug: 'tree-of-thoughts',
      title: 'Tree of Thoughts (ToT)',
      duration: '9 mins',
      summary: 'Expanding Chain-of-Thought into non-linear tree exploration with branch evaluation, lookahead, and backtracking.',
      contentSections: [
        {
          heading: 'Tree Search Meets Language Models',
          body: 'Tree of Thoughts (ToT) generalizes Chain-of-Thought prompting by allowing language models to explore multiple decision paths simultaneously. ToT structures problem solving as a tree search (similar to A* or Monte Carlo Tree Search), where each node represents a thought state.'
        },
        {
          heading: 'The 4 Steps of Tree of Thoughts',
          body: '1. Thought Decomposition: Break the problem into discrete intermediate thought steps.\n2. Thought Generation: Generate multiple candidate next thoughts (branches) at each state.\n3. State Evaluation: Evaluate the viability of each branch using heuristic scores (e.g., Sure / Likely / Impossible).\n4. Search Algorithm: Use Breadth-First Search (BFS) or Depth-First Search (DFS) to explore promising branches and backtrack from dead ends.',
          tip: 'Use Tree of Thoughts for strategic planning, complex architectural design, and competitive game playing.'
        }
      ],
      example: {
        title: 'Linear Reasoning vs Tree-of-Thought Exploration',
        badText: 'Propose a strategy for entering the European market.',
        badFlaw: 'Linear generation commits to the first idea without exploring alternative market entry vectors.',
        goodText: 'Explore 3 distinct strategic branches for EU market entry: [Branch A: Direct Sales, Branch B: Local Partnership, Branch C: Acquisition].\nFor each branch, evaluate viability on a 1-10 scale considering regulatory cost and time-to-market. Prune weak branches and expand the top-scoring option.',
        goodBreakdown: 'Explicitly constructs decision branches, evaluates options, and selects the optimal path.'
      },
      takeaways: [
        'ToT enables non-linear exploration of multiple reasoning paths.',
        'Incorporate state evaluation to score branch viability and prune dead ends.',
        'Essential for complex strategic planning, creative writing outlines, and architectural design.'
      ],
      tryItTip: {
        promptToTry: 'Generate 3 alternative solutions for solving database bottleneck issues. Evaluate each on Cost, Complexity, and Scalability (1-5), then choose the winner.',
        description: 'Test tree search branching directly in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-core-8-1',
          question: 'What distinguishes Tree of Thoughts (ToT) from standard Chain-of-Thought (CoT)?',
          options: [
            'ToT outputs binary code',
            'ToT explores multiple non-linear decision branches with state evaluation and backtracking',
            'ToT runs exclusively on mobile devices',
            'ToT disables temperature settings'
          ],
          correctIndex: 1,
          explanation: 'ToT expands linear reasoning into a decision tree, allowing branch generation, evaluation, and backtracking.'
        }
      ]
    },
    {
      id: 'core-9',
      slug: 'retrieval-augmented-generation',
      title: 'Retrieval Augmented Generation (RAG)',
      duration: '8 mins',
      summary: 'Grounding model responses in retrieved vector database context to eliminate hallucinations and integrate custom knowledge.',
      contentSections: [
        {
          heading: 'Bridging LLM Reasoning with External Knowledge',
          body: 'Retrieval Augmented Generation (RAG) combines information retrieval systems (such as vector databases with semantic embeddings) with generative LLMs. Instead of relying solely on parametric memory frozen at training time, a RAG pipeline fetches relevant document chunks matching the user query and injects them into the prompt context.'
        },
        {
          heading: 'Anatomy of a Grounded RAG Prompt',
          body: 'A production RAG prompt explicitly instructs the model to answer user questions using ONLY the provided context snippets. It includes strict fallback rules demanding refusal if the retrieved context lacks sufficient evidence.',
          tip: 'Always include the rule: "If the answer cannot be derived from the provided context snippets, state: \'I cannot answer based on the available documentation.\'"'
        }
      ],
      example: {
        title: 'Ungrounded Parametric Query vs Strictly Grounded RAG Prompt',
        badText: 'What is company policy on remote work allowance?',
        badFlaw: 'Model will hallucinate generic remote work policies.',
        goodText: 'You are an internal HR assistant. Answer the user question based STRICTLY on the retrieved policy excerpts inside <context> tags.\n\n<context>\n[Retrieved Excerpt]: Employees receive a $500 annual home office stipend after 90 days of employment.\n</context>\n\nQuestion: What is the home office stipend amount?\n\nIf the answer is not in <context>, reply "Information not found in internal documents."',
        goodBreakdown: 'Grounds response strictly in retrieved text and enforces a mandatory refusal fallback.'
      },
      takeaways: [
        'RAG injects retrieved external context into the prompt to prevent hallucinations.',
        'Forces model generation to rely on authoritative documents rather than frozen memory.',
        'Must include explicit refusal rules when retrieved context is insufficient.'
      ],
      tryItTip: {
        promptToTry: 'Answer the question based strictly on <context>. Context: "Refunds are processed within 5 business days." Question: How long do refunds take?',
        description: 'See how strict context grounding produces accurate, verifiable answers.'
      },
      quiz: [
        {
          id: 'q-core-9-1',
          question: 'What is the primary purpose of Retrieval Augmented Generation (RAG)?',
          options: [
            'To retrain LLM neural weights daily',
            'To ground responses in retrieved custom document context and eliminate hallucinations',
            'To speed up model context tokenization',
            'To translate prompts into SQL automatically'
          ],
          correctIndex: 1,
          explanation: 'RAG supplies relevant context dynamically at query time, grounding answers in accurate external data.'
        }
      ]
    },
    {
      id: 'core-10',
      slug: 'automatic-reasoning-and-tool-use',
      title: 'Automatic Reasoning and Tool-use (ART)',
      duration: '8 mins',
      summary: 'Automating multi-step task execution by dynamically selecting and executing external tools from a library of demonstration exemplars.',
      contentSections: [
        {
          heading: 'Automated Tool Selection Frameworks',
          body: 'Automatic Reasoning and Tool-use (ART) is a framework that enables LLMs to automatically decompose complex multi-step queries, identify required external tools (search engines, calculators, code interpreters, DB queries), and execute tool calls by retrieving relevant demonstration exemplars from a task library.'
        },
        {
          heading: 'How ART Functions in Practice',
          body: 'When presented with an unseen task, ART retrieves similar tool-use demonstrations from a benchmark library, constructs a zero-shot or few-shot tool prompt, pauses generation to execute tool calls, and integrates tool outputs back into the reasoning chain.',
          tip: 'Design modular tool interfaces with clean descriptions so automated routing frameworks select them accurately.'
        }
      ],
      example: {
        title: 'Manual Calculation Prompt vs ART Automated Tool Call',
        badText: 'Calculate the compound interest on $10,000 at 5.5% over 15 years.',
        badFlaw: 'Relies on mental arithmetic, leading to exponentiation errors.',
        goodText: 'Task: Calculate compound interest.\nThought: I need precise mathematical computation. I will invoke the `python_interpreter` tool.\nTool Call: python_interpreter(code="10000 * (1 + 0.055)**15")\nObservation: 22324.83\nFinal Answer: The compounded total is $22,324.83.',
        goodBreakdown: 'Automatically delegates complex math execution to a Python tool.'
      },
      takeaways: [
        'ART retrieves tool-use demonstrations from a library to handle new multi-step tasks.',
        'Delegates complex calculation, web search, or database retrieval to external tools.',
        'Combines intermediate reasoning traces with deterministic tool execution.'
      ],
      tryItTip: {
        promptToTry: 'Determine if you need a web search tool or calculator tool to answer: "What is the square root of the population of Tokyo?"',
        description: 'Observe how specifying tool invocation logic handles multi-domain tasks.'
      },
      quiz: [
        {
          id: 'q-core-10-1',
          question: 'How does ART (Automatic Reasoning and Tool-use) handle complex computation?',
          options: [
            'By guessing higher numbers',
            'By automatically selecting and invoking external tools like code interpreters or search APIs',
            'By compressing the prompt text',
            'By turning off temperature'
          ],
          correctIndex: 1,
          explanation: 'ART automatically selects, formats, and executes external tools to perform deterministic operations.'
        }
      ]
    },
    {
      id: 'core-11',
      slug: 'automatic-prompt-engineer',
      title: 'Automatic Prompt Engineer (APE)',
      duration: '8 mins',
      summary: 'Treating prompt generation as an optimization problem where an LLM proposes candidate prompts and scores them against test benchmarks.',
      contentSections: [
        {
          heading: 'Automated Prompt Search and Optimization',
          body: 'Automatic Prompt Engineer (APE) reframes prompt engineering as a systematic optimization problem. An LLM acts as an inference engine that generates candidate instruction prompts based on input-output demonstration pairs, then evaluates each candidate across a validation dataset to discover optimal prompt phrasing.'
        },
        {
          heading: 'The APE Algorithm Loop',
          body: '1. Candidate Generation: Prompt an LLM to generate 10 variations of an instruction prompt given input-output pairs.\n2. Evaluation Scoring: Test each candidate prompt across 50 benchmark test cases.\n3. Resampling & Refinement: Select top-performing prompt candidates, mutate phrasing, and re-evaluate until benchmark accuracy peaks.',
          tip: 'Use APE algorithms when building enterprise production prompts that require 99%+ compliance.'
        }
      ],
      example: {
        title: 'Manual Intuitive Guessing vs APE Automated Optimization',
        badText: 'Manually writing and tweaking prompt phrasing until it seems to work.',
        badFlaw: 'Prone to human bias and fails on untested edge cases.',
        goodText: 'APE Loop: Generate 10 candidate instructions for sentiment extraction -> Evaluate accuracy on 100 test samples -> Select top candidate scoring 98.2%.',
        goodBreakdown: 'Systematic benchmark-driven prompt discovery outperforms manual prompt writing.'
      },
      takeaways: [
        'APE treats prompt design as a programmatic optimization problem.',
        'Generates candidate instructions and evaluates them against validation datasets.',
        'Discovers non-obvious prompt phrasing that maximizes benchmark performance.'
      ],
      tryItTip: {
        promptToTry: 'Generate 3 alternative system instructions for a customer support agent. Identify which instruction is most explicit regarding refund boundaries.',
        description: 'Test automated instruction variation directly in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-core-11-1',
          question: 'What is the core methodology behind Automatic Prompt Engineer (APE)?',
          options: [
            'Writing prompts by hand using a style guide',
            'Generating candidate prompts using an LLM and scoring them against a validation benchmark dataset',
            'Deleting all constraints from system prompts',
            'Using mechanical keyboards to type faster'
          ],
          correctIndex: 1,
          explanation: 'APE generates and evaluates candidate prompts programmatically against test datasets to find optimal instructions.'
        }
      ]
    },
    {
      id: 'core-12',
      slug: 'active-prompting',
      title: 'Active-Prompting',
      duration: '7 mins',
      summary: 'Selectively identifying uncertain or ambiguous test cases to annotate with human-designed CoT exemplars.',
      contentSections: [
        {
          heading: 'Uncertainty-Guided Exemplar Selection',
          body: 'Active-Prompting adapts few-shot Chain-of-Thought prompting to task-specific datasets. Instead of choosing arbitrary exemplars, Active-Prompting runs a pool of training inputs through an LLM, measures output variance or uncertainty, and identifies the most ambiguous cases for human annotation.'
        },
        {
          heading: 'Maximizing Exemplar Efficiency',
          body: 'By focusing exemplar creation effort on high-uncertainty edge cases, Active-Prompting constructs few-shot prompts that resolve model confusion where it matters most, achieving higher accuracy with fewer exemplars.',
          tip: 'When building few-shot prompts, focus your exemplars on edge cases where zero-shot models currently fail.'
        }
      ],
      example: {
        title: 'Random Exemplar Selection vs Active-Prompting Edge Selection',
        badText: 'Including 5 simple, obvious exemplars that the model already solves easily.',
        badFlaw: 'Wastes context tokens without providing new reasoning guidance.',
        goodText: 'Identify 3 high-variance edge cases where the zero-shot model failed, write step-by-step CoT explanations for those 3 cases, and include them as few-shot exemplars.',
        goodBreakdown: 'Targets exemplar budget directly at model weaknesses.'
      },
      takeaways: [
        'Active-Prompting selects high-uncertainty test cases for exemplar creation.',
        'Maximizes the impact of every exemplar token in the context window.',
        'Dramatically reduces edge-case errors on domain-specific benchmarks.'
      ],
      tryItTip: {
        promptToTry: 'Identify the trickiest edge case in this medical triage classification problem and write a detailed exemplar for it.',
        description: 'Practice designing targeted exemplars for high-uncertainty scenarios.'
      },
      quiz: [
        {
          id: 'q-core-12-1',
          question: 'What makes Active-Prompting different from standard Few-Shot prompting?',
          options: [
            'It uses active background threads',
            'It specifically identifies high-uncertainty edge cases to annotate as few-shot exemplars',
            'It turns off model guardrails',
            'It runs without internet connectivity'
          ],
          correctIndex: 1,
          explanation: 'Active-Prompting targets exemplar creation on high-uncertainty edge cases to maximize learning efficiency.'
        }
      ]
    },
    {
      id: 'core-13',
      slug: 'directional-stimulus-prompting',
      title: 'Directional Stimulus Prompting',
      duration: '7 mins',
      summary: 'Guiding LLM generations toward specific target outcomes using small directional stimulus signals or keywords.',
      contentSections: [
        {
          heading: 'Steering Generation with Signal Triggers',
          body: 'Directional Stimulus Prompting uses a small helper model or rule engine to generate concise directional hints (keywords, topic anchors, structural focus points) that steer a main LLM\'s generation toward desired target attributes.'
        },
        {
          heading: 'How Stimulus Anchors Steer Attention',
          body: 'Injecting a directional stimulus string like `[Key Keywords to Include: Security, SOC2, Encryption]` into the prompt context acts as a strong gravitational anchor for the model\'s attention mechanism, guaranteeing specific content inclusion without rewriting the primary prompt.',
          tip: 'Use directional stimulus triggers when summarizing long documents to ensure specific business metrics are highlighted.'
        }
      ],
      example: {
        title: 'Unguided Generation vs Directional Stimulus Guided Output',
        badText: 'Summarize our annual earnings report.',
        badFlaw: 'May highlight general marketing fluff instead of critical financial numbers.',
        goodText: 'Summarize our annual earnings report.\n\n[Directional Stimulus: Focus heavily on Q4 Subscription ARR Growth, Net Retention Rate, and Cloud Infrastructure Costs].',
        goodBreakdown: 'Injects explicit directional keywords to steer summary focus toward financial metrics.'
      },
      takeaways: [
        'Directional stimulus prompts use keyword/anchor signals to steer outputs.',
        'Directs model attention toward crucial topics without heavy prompt rewrites.',
        'Extremely effective for guided summarization and tailored content generation.'
      ],
      tryItTip: {
        promptToTry: 'Write a product announcement email. [Directional Stimulus: Emphasize SOC2 Compliance and 24/7 Phone Support].',
        description: 'Observe how directional stimulus triggers shape feature priorities in generated emails.'
      },
      quiz: [
        {
          id: 'q-core-13-1',
          question: 'What is the primary function of Directional Stimulus Prompting?',
          options: [
            'To direct network traffic to nearby servers',
            'To guide generation toward specific target attributes using keyword stimulus hints',
            'To translate prompts into C++',
            'To force instant model shutdown'
          ],
          correctIndex: 1,
          explanation: 'Directional stimulus hints steer the model\'s attention focus toward key topics or desired output properties.'
        }
      ]
    },
    {
      id: 'core-14',
      slug: 'program-aided-language-models',
      title: 'Program-Aided Language Models (PAL)',
      duration: '8 mins',
      summary: 'Offloading reasoning and mathematical calculations to an external Python interpreter by generating executable code.',
      contentSections: [
        {
          heading: 'Decoupling Natural Language Understanding from Math Execution',
          body: 'Program-Aided Language Models (PAL) combine LLM natural language understanding with deterministic code execution. Instead of asking the model to perform mental math in natural language, PAL prompts the model to convert word problems into executable code scripts (e.g., Python) and delegates execution to a runtime environment.'
        },
        {
          heading: 'Why PAL Outperforms Standard CoT on Math',
          body: 'LLMs often make calculation errors when solving complex equations or iterating over long loops. PAL eliminates math errors entirely because the LLM only translates human intent into Python code, while the Python interpreter calculates the exact numerical answer deterministically.',
          tip: 'Use PAL for complex financial modeling, statistical calculations, and algorithmic logic.'
        }
      ],
      example: {
        title: 'Mental Arithmetic CoT vs Program-Aided Python Execution',
        badText: 'Calculate compound interest on $15,400 at 7.25% for 18 years compounded monthly using text reasoning.',
        badFlaw: 'Prone to compounding math mistakes across 216 monthly iterations.',
        goodText: 'Write a Python function to solve this word problem and print the result:\n\ndef calculate():\n    P = 15400\n    r = 0.0725\n    n = 12\n    t = 18\n    return P * (1 + r/n)**(n*t)\n\nprint(f"Result: {calculate():.2f}")',
        goodBreakdown: 'Delegates calculation entirely to Python, guaranteeing 100% mathematical precision.'
      },
      takeaways: [
        'PAL prompts the LLM to write code instead of performing arithmetic directly.',
        'Delegates execution to an external Python or JavaScript runtime.',
        'Completely eliminates math and logic errors in complex quantitative workflows.'
      ],
      tryItTip: {
        promptToTry: 'Write a short Python script to compute the 40th Fibonacci number and print the result.',
        description: 'Test how converting algorithmic problems into executable code guarantees exact outputs.'
      },
      quiz: [
        {
          id: 'q-core-14-1',
          question: 'How does PAL (Program-Aided Language Models) achieve 100% mathematical accuracy?',
          options: [
            'By increasing model parameter size',
            'By prompting the model to generate executable code and running it in an external interpreter',
            'By setting temperature to 2.0',
            'By memorizing all multiplication tables'
          ],
          correctIndex: 1,
          explanation: 'PAL offloads calculation execution to an external programming language environment like Python.'
        }
      ]
    },
    {
      id: 'core-15',
      slug: 'react-prompting',
      title: 'ReAct Prompting (Reason + Act)',
      duration: '9 mins',
      summary: 'Combining Chain-of-Thought reasoning traces with interactive tool execution loops for autonomous AI agents.',
      contentSections: [
        {
          heading: 'Synergizing Reasoning and Action Loops',
          body: 'ReAct (Reason + Act) is the foundational architectural pattern powering modern autonomous AI agents. ReAct interleaves reasoning traces (Thought) with action execution (Action) and environment observation feedback (Observation) in an iterative loop.'
        },
        {
          heading: 'The ReAct Execution Loop',
          body: '1. Thought: Reason about current state and determine next step.\n2. Action: Execute an external tool call (e.g., `Search[query]`, `LookupDB[id]`).\n3. Observation: Receive tool output payload from the external environment.\n4. Repeat: Process observation, update thought state, and continue until task completion.',
          tip: 'Always define strict maximum loop iteration caps (e.g., max 5 iterations) to prevent infinite ReAct loops.'
        }
      ],
      example: {
        title: 'Static Knowledge Search vs Dynamic ReAct Loop',
        badText: 'Who won the latest Super Bowl and what was the final score?',
        badFlaw: 'Relies on frozen training memory, unable to answer real-time facts.',
        goodText: 'Thought: I need to search for the winner and final score of the latest Super Bowl.\nAction: Search[latest Super Bowl winner score]\nObservation: Kansas City Chiefs defeated San Francisco 49ers 25-22.\nThought: I now have the complete factual answer.\nFinal Answer: The Kansas City Chiefs won 25-22.',
        goodBreakdown: 'Explicitly demonstrates Thought -> Action -> Observation -> Final Answer agent loop.'
      },
      takeaways: [
        'ReAct interleaves Thought, Action, and Observation loops.',
        'Enables autonomous AI agents to solve dynamic, multi-step real-world problems.',
        'Always implement iteration caps and fallback rules to handle tool failures.'
      ],
      tryItTip: {
        promptToTry: 'Simulate a ReAct loop to find a user\'s order status: Thought -> Action: LookupOrder[1042] -> Observation: Shipped -> Final Answer.',
        description: 'Trace an agent reasoning and action loop step-by-step.'
      },
      quiz: [
        {
          id: 'q-core-15-1',
          question: 'What are the 3 core repeating steps in a ReAct agent loop?',
          options: [
            'Read, Write, Execute',
            'Thought, Action, Observation',
            'Input, Output, Reset',
            'Compile, Build, Deploy'
          ],
          correctIndex: 1,
          explanation: 'ReAct cycles through Thought (reasoning), Action (tool execution), and Observation (environment feedback).'
        }
      ]
    },
    {
      id: 'core-16',
      slug: 'reflexion',
      title: 'Reflexion & Self-Correction Loops',
      duration: '8 mins',
      summary: 'Equipping agents with verbal self-reflection memory to evaluate past execution failures and self-correct on subsequent tries.',
      contentSections: [
        {
          heading: 'Learning from Trial and Error Without Weight Updates',
          body: 'Reflexion is an advanced framework that gives AI agents verbal self-reflection memory. When an agent fails a task, unit test, or validation check, a Reflexion agent analyzes the failure logs, critiques its previous attempt, generates a reflection statement, and stores it in context memory to avoid repeating the mistake.'
        },
        {
          heading: 'The 3 Pillars of Reflexion',
          body: '1. Actor: Generates initial attempt or code solution.\n2. Evaluator: Checks output against unit tests or heuristic rubrics.\n3. Self-Reflection Engine: Analyzes failure causes and writes concrete verbal corrections to guide the next actor attempt.',
          tip: 'Use Reflexion loops in code generation agents to automatically fix syntax and unit test failures.'
        }
      ],
      example: {
        title: 'One-Shot Failed Generation vs Reflexion Self-Correction',
        badText: 'Code failed unit tests -> Throw HTTP 500 error.',
        badFlaw: 'Abandons execution on first failure without attempting correction.',
        goodText: 'Attempt 1 failed: IndexOutOfBoundsException on array length 0.\nReflection: I failed to guard against empty input arrays.\nAttempt 2: Added `if (!arr || arr.length === 0) return null;` -> Passed unit tests.',
        goodBreakdown: 'Analyzes error logs and writes targeted fixes based on verbal self-reflection.'
      },
      takeaways: [
        'Reflexion enables agents to learn from execution feedback without fine-tuning.',
        'Uses self-critique memory to diagnose failure causes and guide retries.',
        'Dramatically improves code generation pass-at-k benchmarks.'
      ],
      tryItTip: {
        promptToTry: 'Review this failed SQL query (SELECT * FROM users WHERE id = null), write a brief reflection on why it failed, and provide the corrected query.',
        description: 'Experience how verbal self-reflection diagnoses and repairs broken code.'
      },
      quiz: [
        {
          id: 'q-core-16-1',
          question: 'What is the primary mechanism behind the Reflexion framework?',
          options: [
            'Fine-tuning neural model weights on millions of GPU hours',
            'Verbal self-critique memory analyzing execution errors to guide subsequent correction retries',
            'Using glassmorphism UI cards',
            'Lowering API network latency'
          ],
          correctIndex: 1,
          explanation: 'Reflexion uses verbal self-reflection logs in context memory to diagnose errors and fix subsequent generation attempts.'
        }
      ]
    },
    {
      id: 'core-17',
      slug: 'multimodal-cot',
      title: 'Multimodal Chain-of-Thought',
      duration: '8 mins',
      summary: 'Extending step-by-step reasoning across combined visual (image, diagram) and textual modality inputs.',
      contentSections: [
        {
          heading: 'Reasoning Across Text and Vision Simultaneously',
          body: 'Multimodal Chain-of-Thought extends step-by-step reasoning to vision-language models (e.g., GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro). Instead of directly outputting an answer from an image, Multimodal CoT forces the model to decompose visual elements (charts, diagrams, UI wireframes, medical scans) into intermediate textual observations before concluding.'
        },
        {
          heading: 'Deconstructing Visual Inputs Step-by-Step',
          body: '• Step 1 (Visual Extraction): List all visible labels, axes, colors, and data points.\n• Step 2 (Spatial / Logical Analysis): Calculate relationships or trends across visual elements.\n• Step 3 (Final Synthesis): Formulate the answer based explicitly on visual extraction steps.',
          tip: 'When prompting vision models on charts or UI screenshots, require step-by-step visual element transcription first.'
        }
      ],
      example: {
        title: 'Direct Image Question vs Multimodal CoT Visual Extraction',
        badText: 'What was Q3 revenue according to this bar chart image?',
        badFlaw: 'Direct answer on complex charts often misreads subtle bar height pixels.',
        goodText: 'Analyze the bar chart image in 3 steps:\n1. Transcribe the Y-axis scale and X-axis labels.\n2. Locate the "Q3 Revenue" bar and measure its height against the Y-axis grid lines.\n3. Output the exact Q3 revenue figure in bold as **Q3 Revenue: $X**.',
        goodBreakdown: 'Forces systematic visual grid alignment before committing to a numerical answer.'
      },
      takeaways: [
        'Multimodal CoT structures visual visual chart, UI, or document analysis into steps.',
        'Requires transcribing visual features first to prevent pixel misreading.',
        'Essential for technical chart reading, UI auditing, and document OCR workflows.'
      ],
      tryItTip: {
        promptToTry: 'When analyzing a architectural diagram image, first list all labeled components, then trace the data flow path step by step.',
        description: 'Test how transcribing visual components first sharpens diagram analysis.'
      },
      quiz: [
        {
          id: 'q-core-17-1',
          question: 'Why is Multimodal Chain-of-Thought recommended when analyzing complex charts or diagrams?',
          options: [
            'It converts images into audio files',
            'It forces intermediate visual element transcription, preventing pixel misreading and misinterpretation',
            'It reduces image upload file sizes',
            'It disables vision processing'
          ],
          correctIndex: 1,
          explanation: 'Decomposing visual components into explicit intermediate text descriptions grounds visual reasoning accurately.'
        }
      ]
    },
    {
      id: 'core-18',
      slug: 'graph-prompting',
      title: 'Graph Prompting & Knowledge Graphs',
      duration: '8 mins',
      summary: 'Representing complex relational structures as node-edge knowledge graphs inside prompts for advanced reasoning.',
      contentSections: [
        {
          heading: 'Structuring Relational Knowledge as Graphs',
          body: 'Graph Prompting structures complex interconnected domain knowledge (social networks, supply chains, organizational hierarchies, entity relationships) as explicit graph representations (Node, Edge, Relation) inside the prompt context.'
        },
        {
          heading: 'Reasoning Over Graph Topologies',
          body: 'By formatting text as triple relationships `(EntityA) -[RELATION]-> (EntityB)`, language models can perform graph traversal, shortest-path reasoning, dependency checks, and root-cause analysis with high topological accuracy.',
          tip: 'Use standard graph serialization formats like Cypher, GraphML, or simple triple tuples `(Subject, Predicate, Object)`.'
        }
      ],
      example: {
        title: 'Unstructured Paragraph vs Graph Triple Representation',
        badText: 'Alice manages Bob. Bob works with Charlie on Project X. Charlie reports to Diana.',
        badFlaw: 'Complex multi-hop organizational queries get confused in prose.',
        goodText: 'Graph Topology:\n(Alice) -[MANAGES]-> (Bob)\n(Bob) -[COLLABORATES_WITH]-> (Charlie)\n(Charlie) -[REPORTS_TO]-> (Diana)\n(Project X) -[ASSIGNED_TO]-> (Bob, Charlie)\n\nTask: Trace the supervisory path from Alice to Diana and identify shared project dependencies.',
        goodBreakdown: 'Explicit graph nodes and edges enable multi-hop relationship reasoning.'
      },
      takeaways: [
        'Graph Prompting formats relational data as explicit nodes and edges.',
        'Enables accurate multi-hop traversal, dependency analysis, and root-cause reasoning.',
        'Ideal for supply chain modeling, org charts, and cybersecurity threat graphs.'
      ],
      tryItTip: {
        promptToTry: 'Format this supply chain as triple tuples: (Factory A) -> [SHIPS_TO] -> (Hub B) -> [DELIVERS_TO] -> (Store C). Trace what breaks if Hub B closes.',
        description: 'Test graph dependency reasoning directly in the Improve tool.'
      },
      quiz: [
        {
          id: 'q-core-18-1',
          question: 'What is the primary advantage of Graph Prompting for complex relational data?',
          options: [
            'It renders 3D interactive graphics in the browser',
            'It formats relationships as explicit nodes and edges, enabling multi-hop topological reasoning',
            'It deletes duplicate data from databases',
            'It replaces CSS styling'
          ],
          correctIndex: 1,
          explanation: 'Explicit node-edge relationships allow transformer attention to traverse complex multi-hop dependencies accurately.'
        }
      ]
    }
  ]
};
