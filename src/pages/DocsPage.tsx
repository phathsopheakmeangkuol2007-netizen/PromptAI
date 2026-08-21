import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles, 
  Trophy, 
  Wand2, 
  Chrome, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight,
  Code2,
  CheckCircle2,
  Search,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'General',
    question: 'What is Prompt AI?',
    answer: 'Prompt AI is an education platform and real-time prompt engineering suite designed to teach developers, creators, and teams how to write deterministic, high-performing prompts for Large Language Models (LLMs).'
  },
  {
    category: 'General',
    question: 'Do I need an account to use Prompt AI features?',
    answer: 'No registration is required! Course progress, customized prompts, and challenge scores are saved locally in your browser so you can start learning and optimizing immediately.'
  },
  {
    category: 'Framework',
    question: 'What is the RTCC Framework?',
    answer: 'RTCC stands for Role, Task, Context, and Constraint. It is our structured prompt architecture blueprint that eliminates ambiguity and ensures AI models produce accurate output on the first try.'
  },
  {
    category: 'Features',
    question: 'How does the Prompt Improver work?',
    answer: 'The Prompt Improver analyzes raw unstructured text and automatically reorganizes it into an RTCC-structured prompt with explicit role definitions, XML delimiters, quantitative constraints, and zero-preamble directives.'
  },
  {
    category: 'Extensions',
    question: 'How do the browser extensions integrate with ChatGPT, Claude, and Gemini?',
    answer: 'Our browser extension injects a subtle "Enhance Prompt" overlay directly inside chat interfaces. Clicking it formats your active draft using RTCC rules before sending it to the model.'
  },
  {
    category: 'Features',
    question: 'Are the Prompt Challenges graded automatically?',
    answer: 'Yes! Challenge submissions are evaluated against specific criteria such as token efficiency, output formatting adherence, and negative constraint compliance to award XP and rank on the leaderboard.'
  }
];

export const DocsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Documentation | Prompt AI';
  }, []);

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-[emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Documentation</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#090D16] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800/80 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono font-bold text-[emerald-600 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block">
              System Manual & Platform Docs
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Prompt AI Documentation
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore how to leverage Prompt AI's four core engines to master prompt engineering, build structured RTCC architecture, and streamline AI workflows across model providers.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">COURSES</span>
              <span className="text-emerald-400 font-bold text-base">3 Masterclass Syllabi</span>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">ENGINE</span>
              <span className="text-emerald-400 font-bold text-base">RTCC Refinement</span>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">EXTENSIONS</span>
              <span className="text-emerald-400 font-bold text-base">Chrome, Firefox, Edge</span>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">CHALLENGES</span>
              <span className="text-emerald-400 font-bold text-base">Interactive Drills</span>
            </div>
          </div>
        </div>

        {/* Core Platform Modules Overview */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-900">Platform Features & Modules</h2>
            <p className="text-slate-600 text-xs sm:text-sm">Detailed guide to the four primary capabilities of Prompt AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Feature 1: Learn */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[emerald-600">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[emerald-600 uppercase">Module 1</span>
                <h3 className="text-xl font-bold text-slate-900">1. Learn Prompting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Interactive curriculum covering foundations of prompt architecture, Chain-of-Thought reasoning, few-shot exemplars, JSON mode enforcement, and system prompt steering.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[emerald-600" />
                  <span>24 step-by-step interactive lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[emerald-600" />
                  <span>Knowledge-check quizzes & instant feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[emerald-600" />
                  <span>Local persistence of course completion</span>
                </li>
              </ul>
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 text-xs font-bold text-[emerald-600 hover:text-emerald-700 pt-2"
              >
                <span>Explore All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Feature 2: Challenges */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase">Module 2</span>
                <h3 className="text-xl font-bold text-slate-900">2. Prompt Challenges</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hands-on prompt drills testing token optimization, hallucination prevention, persona steering, and complex edge-case handling under strict constraint limits.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>Earn XP and climb global leaderboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>Difficulty levels from Beginner to Advanced</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>Real-time evaluation sandbox</span>
                </li>
              </ul>
              <Link
                to="/challenges"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 pt-2"
              >
                <span>Start a Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Feature 3: Improve */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Wand2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-purple-600 uppercase">Module 3</span>
                <h3 className="text-xl font-bold text-slate-900">3. Prompt Improver</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Instant transformation engine that turns vague user inputs into structured RTCC architecture with custom formatting, XML delimiters, and boundary guardrails.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>1-click RTCC model restructuring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Target model presets (ChatGPT, Claude, Gemini)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Copyable production prompt code</span>
                </li>
              </ul>
              <Link
                to="/improve"
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-700 pt-2"
              >
                <span>Try Prompt Improver</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Feature 4: Extensions */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Chrome className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase">Module 4</span>
                <h3 className="text-xl font-bold text-slate-900">4. Browser Extensions</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Seamless browser extension that brings Prompt AI directly into ChatGPT, Claude, and Gemini interfaces with auto-fill, shortcut expansion, and prompt history.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Compatible with Chrome, Firefox, and Edge</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>1-Click auto-fill into active model prompt box</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Zero API key storage required</span>
                </li>
              </ul>
              <Link
                to="/extensions"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 pt-2"
              >
                <span>Get Browser Extension</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-[emerald-600" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">Quick answers to common questions about Prompt AI</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[emerald-600"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left bg-white hover:bg-slate-50/80 flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="font-bold text-sm text-slate-900">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[emerald-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500">
                No FAQs match your search query.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
