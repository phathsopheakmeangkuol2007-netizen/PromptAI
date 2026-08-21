import React, { useState } from 'react';
import { DEEP_DIVE_FEATURES, COURSE_MODULES, SAMPLE_CHALLENGES, EXTENSION_BROWSERS } from '../data/mockData';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  Wand2, 
  Plug, 
  Play, 
  ShieldCheck, 
  Code, 
  Zap, 
  Search,
  Sliders,
  Terminal,
  ExternalLink,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProductDeepDiveProps {
  onOpenChallenge: () => void;
  onOpenAuth: (mode: 'signup') => void;
  onJumpToOptimizer: () => void;
}

export const ProductDeepDive: React.FC<ProductDeepDiveProps> = ({
  onOpenChallenge,
  onOpenAuth,
  onJumpToOptimizer,
}) => {
  // Interactive mock states for the deep dive visual blocks
  const [activeLessonTab, setActiveLessonTab] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [extensionModel, setExtensionModel] = useState<'ChatGPT' | 'Claude' | 'Gemini'>('ChatGPT');

  const activeChallenge = SAMPLE_CHALLENGES[activeChallengeIdx];

  return (
    <section className="py-20 md:py-32 bg-slate-50 space-y-24 md:space-y-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>Product Deep Dive</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Designed for Peak AI Productivity
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Explore the specialized tooling powering prompt engineering workflows worldwide.
          </p>
        </div>

        {/* Feature 1: LEARN (Text Left, Image/Mockup Right) */}
        <div id="learn" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Left */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              <BookOpen className="w-4 h-4" />
              <span>{DEEP_DIVE_FEATURES[0].tag}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {DEEP_DIVE_FEATURES[0].title}
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {DEEP_DIVE_FEATURES[0].description}
            </p>

            <ul className="space-y-3 pt-2">
              {DEEP_DIVE_FEATURES[0].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={() => onOpenAuth('signup')}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md transition-all active:scale-95"
              >
                <span>{DEEP_DIVE_FEATURES[0].ctaText}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Realistic Interactive Course Player Mockup Right */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800 text-white">
              {/* Top Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">PromptAI Academy // Module 01</span>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  Progress: 75%
                </span>
              </div>

              {/* Module Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {COURSE_MODULES.map((mod, i) => (
                  <button
                    key={mod.id}
                    onClick={() => setActiveLessonTab(i)}
                    className={`text-xs p-2.5 rounded-xl border text-left transition-all ${
                      activeLessonTab === i
                        ? 'bg-slate-800 border-emerald-500/60 text-emerald-400 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="truncate">{mod.title}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{mod.duration} • {mod.level}</div>
                  </button>
                ))}
              </div>

              {/* Interactive Lesson View */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Topic: {COURSE_MODULES[activeLessonTab].topics[0]}</span>
                  </h4>
                  <span className="text-xs font-mono text-slate-400">Lesson 3 of {COURSE_MODULES[activeLessonTab].lessonsCount}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {COURSE_MODULES[activeLessonTab].description}
                </p>

                {/* Code Playground Box inside Lesson */}
                <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 font-mono text-xs text-emerald-300">
                  <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                    <span>LIVE LLM SANDBOX PROMPT:</span>
                    <span className="text-emerald-400">Model: GPT-4o</span>
                  </div>
                  <div className="text-slate-200 whitespace-pre-wrap">
                    {`System: You are a Senior Data Analyst.
Task: Summarize Q3 churn drivers.
Constraint: Respond in JSON format with strict keys: ["driver", "impact"].`}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">Interactive Quiz Status: Passed</span>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span>Next Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: CHALLENGES (Image/Mockup Left, Text Right) */}
        <div id="challenges" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Realistic Interactive Challenge Mockup Left */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800 text-white">
              {/* Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">Community Arena // Challenge #{activeChallengeIdx + 1}</span>
                </div>
                <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30">
                  +{activeChallenge.points} XP
                </span>
              </div>

              {/* Challenge Scenario Box */}
              <div className="space-y-4">
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      {activeChallenge.category} • {activeChallenge.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-400">Global Solves: 4,820</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{activeChallenge.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {activeChallenge.scenario}
                  </p>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs font-mono text-amber-200">
                    <span className="text-slate-400 text-[10px] block mb-1">Target Constraint Requirement:</span>
                    {activeChallenge.targetOutput}
                  </div>
                </div>

                {/* Score Rubric Bar */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 mb-2 flex justify-between">
                    <span>Automated AI Rubric Checkers:</span>
                    <span className="text-emerald-400 font-mono">100% Match Target</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {activeChallenge.scoringCriteria.map((crit, idx) => (
                      <div key={idx} className="bg-slate-900 p-2 rounded-lg text-center border border-slate-800">
                        <div className="text-[10px] text-slate-400 truncate">{crit.name}</div>
                        <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">+{crit.weight}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenChallenge}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Attempt This Challenge in Arena</span>
                </button>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              <Trophy className="w-4 h-4" />
              <span>{DEEP_DIVE_FEATURES[1].tag}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {DEEP_DIVE_FEATURES[1].title}
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {DEEP_DIVE_FEATURES[1].description}
            </p>

            <ul className="space-y-3 pt-2">
              {DEEP_DIVE_FEATURES[1].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={onOpenChallenge}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md transition-all active:scale-95"
              >
                <span>{DEEP_DIVE_FEATURES[1].ctaText}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature 3: IMPROVE (Text Left, Image/Mockup Right) */}
        <div id="improve" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Left */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-md border border-purple-200">
              <Wand2 className="w-4 h-4" />
              <span>{DEEP_DIVE_FEATURES[2].tag}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {DEEP_DIVE_FEATURES[2].title}
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {DEEP_DIVE_FEATURES[2].description}
            </p>

            <ul className="space-y-3 pt-2">
              {DEEP_DIVE_FEATURES[2].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                  <div className="w-5 h-5 rounded-full bg-purple-100 border border-purple-300 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={onJumpToOptimizer}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md transition-all active:scale-95"
              >
                <span>{DEEP_DIVE_FEATURES[2].ctaText}</span>
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </button>
            </div>
          </div>

          {/* Realistic Optimizer Engine Visual Mockup Right */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800 text-white">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-bold text-white">Prompt AI Optimizer Engine</span>
                </div>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full font-bold">
                  Score: 96/100
                </span>
              </div>

              {/* Score Radar / Category Breakdown */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-2">Structural Quality Breakdown</div>
                
                {[
                  { name: 'Role & Persona Specification', score: 98, color: 'bg-emerald-500' },
                  { name: 'Task Context & Objectives', score: 94, color: 'bg-purple-500' },
                  { name: 'Output Schema & Formatting Constraints', score: 96, color: 'bg-blue-500' },
                  { name: 'Safety Guards & Edge Cases', score: 92, color: 'bg-teal-500' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="font-mono font-bold text-emerald-400">{item.score}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-xs text-purple-200 flex items-center justify-between">
                <span>AI Recommendation: "Add few-shot example for 12% higher accuracy"</span>
                <button 
                  onClick={onJumpToOptimizer}
                  className="font-bold text-white bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded-lg transition-colors shrink-0 ml-2"
                >
                  Apply Fix
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: EXTENSIONS (Image/Mockup Left, Text Right) */}
        <div id="extensions" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Extension Co-pilot Mockup Left */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800 text-white">
              {/* Fake ChatGPT / LLM Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">ChatGPT Interface (Chrome Extension Active)</span>
                </div>
                
                {/* Switch active model demo */}
                <div className="flex gap-1 bg-slate-800 p-1 rounded-lg">
                  {(['ChatGPT', 'Claude', 'Gemini'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setExtensionModel(m)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        extensionModel === m ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Window with Floating Extension Overlay */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 relative min-h-[220px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="text-[10px] text-slate-500 block">USER INPUT IN {extensionModel.toUpperCase()}:</span>
                    "Draft an email to client asking for invoice payment."
                  </div>
                </div>

                {/* Floating Prompt AI Overlay Widget */}
                <div className="mt-3 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-emerald-500/50 rounded-xl p-3 shadow-xl relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span>Prompt AI Co-Pilot Widget (Cmd+K)</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-mono">
                      Enhancement Ready
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 font-mono bg-slate-950/80 p-2 rounded-lg border border-slate-800 mb-2">
                    Inject Persona: "Firm yet courteous Accounts Receivable Manager" + 3 payment link options.
                  </p>

                  <div className="flex justify-end gap-2">
                    <button className="text-[11px] text-slate-400 hover:text-white px-2 py-1">Dismiss</button>
                    <button 
                      onClick={() => onOpenAuth('signup')}
                      className="text-[11px] font-bold bg-emerald-500 text-slate-950 px-3 py-1 rounded-md hover:bg-emerald-400 transition-colors"
                    >
                      1-Click Auto-Fill
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Available for Chrome, Firefox, and Edge</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-emerald-400" /> 4.9/5 Rating (65k Downloads)
                </span>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
              <Plug className="w-4 h-4" />
              <span>{DEEP_DIVE_FEATURES[3].tag}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {DEEP_DIVE_FEATURES[3].title}
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {DEEP_DIVE_FEATURES[3].description}
            </p>

            <ul className="space-y-3 pt-2">
              {DEEP_DIVE_FEATURES[3].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                  <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-300 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={() => onOpenAuth('signup')}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md transition-all active:scale-95"
              >
                <span>{DEEP_DIVE_FEATURES[3].ctaText}</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
