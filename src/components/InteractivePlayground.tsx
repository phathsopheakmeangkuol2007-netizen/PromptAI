import React, { useState, useEffect } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  SlidersHorizontal, 
  Lightbulb, 
  ChevronDown,
  ChevronUp,
  Layers,
  Info,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

export const InteractivePlayground: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [intent, setIntent] = useState('Auto-Detect');
  const [experienceLevel, setExperienceLevel] = useState('Not Specified');
  const [desiredLength, setDesiredLength] = useState('Not Specified');
  const [showContextOptions, setShowContextOptions] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialPrompt = params.get('prompt');
    if (initialPrompt) {
      setUserPrompt(initialPrompt);
    }
  }, []);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeMetricKey, setActiveMetricKey] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const runOptimization = async (
    promptText: string,
    pIntent: string,
    pExp: string,
    pLen: string
  ) => {
    if (!promptText.trim()) return;
    setIsAnalyzing(true);
    setActiveTab(0);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/optimize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          intent: pIntent,
          experienceLevel: pExp,
          desiredLength: pLen
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        if (response.status === 429 || resData.error === 'quota_exceeded' || resData.error === 'rate_limit_exceeded') {
          setErrorMessage("⏳ Prompt AI is currently at capacity. Please try again in a bit.");
        } else {
          setErrorMessage(resData.message || "Unable to optimize prompt right now. Please try again.");
        }
        return;
      }

      setResult(resData);
    } catch (err) {
      console.error('Failed to optimize prompt via API:', err);
      setErrorMessage("Network or connection error. Please check your connection and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCustomSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    runOptimization(userPrompt, intent, experienceLevel, desiredLength);
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Currently selected prompt text based on tab
  const getDisplayPrompt = (): { title: string; text: string; desc?: string } => {
    if (!result) return { title: 'Optimized Prompt', text: '' };
    if (activeTab === 0) {
      return {
        title: 'Primary Tailored Prompt',
        text: result.improved_prompt,
        desc: 'Directly fills in missing contextual gaps specific to your exact request.'
      };
    }
    const altIdx = activeTab - 1;
    const alt = result.alternative_versions?.[altIdx];
    if (alt) {
      return {
        title: alt.title,
        text: alt.prompt,
        desc: alt.description
      };
    }
    return { title: 'Optimized Prompt', text: result.improved_prompt };
  };

  const currentDisplay = getDisplayPrompt();

  const isButtonDisabled = isAnalyzing || !userPrompt.trim();

  return (
    <section className="py-12 bg-white relative" id="playground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Wand2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Interactive Prompt Optimizer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored Optimization Engine
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            Paste or type any raw prompt below to generate a tailored optimization with domain-specific context parameters and tutoring reasoning.
          </p>
        </div>

        {/* Error / Rate Limit Alert Box */}
        {errorMessage && (
          <div className="bg-red-950/80 border border-red-500/50 text-red-200 rounded-2xl p-4 text-xs flex items-start gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-red-300 block text-sm">Optimization Paused</span>
              <p className="text-red-200/90 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Workspace Grid */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Input & Context Options */}
            <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-emerald-400" />
                    <span>Raw Input Prompt:</span>
                  </label>
                  <span className="text-[11px] text-slate-400">{userPrompt.length} chars</span>
                </div>

                <textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                      e.preventDefault();
                      if (!isButtonDisabled) {
                        handleCustomSubmit();
                      }
                    }
                  }}
                  placeholder="Paste or type your prompt here (e.g., 'I want to study cryptography')..."
                  rows={6}
                  className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-500 transition-all resize-none shadow-inner"
                />

                {/* Optional Context Inputs Toggle */}
                <div className="border border-slate-800 rounded-2xl bg-slate-950/60 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowContextOptions(!showContextOptions)}
                    className="w-full px-4 py-3 text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Optional Context & User Parameters</span>
                    </div>
                    {showContextOptions ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showContextOptions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 border-t border-slate-800/80 space-y-3 pt-3 text-xs"
                      >
                        {/* Intent */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-400">User Intent Category:</label>
                          <select
                            value={intent}
                            onChange={(e) => setIntent(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-sans"
                          >
                            <option value="Auto-Detect">Auto-Detect from Prompt</option>
                            <option value="Learn / Study">Learn & Study</option>
                            <option value="Write / Debug Code">Write / Debug Code</option>
                            <option value="Creative & Narrative">Creative & Narrative</option>
                            <option value="Business & Email">Business & Communication</option>
                            <option value="Data & Analytics">Data Analysis & Analytics</option>
                          </select>
                        </div>

                        {/* Experience Level */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-400">Target Experience Level:</label>
                          <select
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-sans"
                          >
                            <option value="Not Specified">Not Specified / Flexible</option>
                            <option value="Beginner / Foundational">Beginner (Foundational)</option>
                            <option value="Intermediate / Hands-on">Intermediate (Hands-on)</option>
                            <option value="Advanced / Expert">Advanced (Expert / Senior)</option>
                          </select>
                        </div>

                        {/* Desired Output Length */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-400">Desired Output Depth:</label>
                          <select
                            value={desiredLength}
                            onChange={(e) => setDesiredLength(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-sans"
                          >
                            <option value="Not Specified">Not Specified / Standard</option>
                            <option value="Concise & Direct">Concise & Direct</option>
                            <option value="Detailed & Thorough">Detailed & Thorough</option>
                            <option value="Comprehensive Roadmap">Comprehensive Roadmap</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCustomSubmit}
                disabled={isButtonDisabled}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analyzing Specific Missing Context...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Optimize Prompt Now</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Reasoning & Optimized Results */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative space-y-4 min-h-[320px]">
              
              {isAnalyzing ? (
                <div className="h-80 flex flex-col items-center justify-center text-slate-400 space-y-3">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                  <p className="text-xs font-mono text-center">
                    Analyzing domain-specific gaps, skill parameters, and narrative boundaries...
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  
                  {/* Top Bar inside Output Card */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Tailored Result
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono uppercase">
                        {result.prompt_type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400">
                        Score: <strong className="text-emerald-400">{result.score}/100</strong>
                      </span>
                      <button
                        onClick={() => handleCopyText(currentDisplay.text, 99)}
                        className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-emerald-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors cursor-pointer"
                      >
                        {copiedIndex === 99 ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedIndex === 99 ? 'Copied!' : 'Copy Selected'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Prominent Reasoning Card */}
                  <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-emerald-300">
                      <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Why This Specific Improvement Was Made</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-6">
                      {result.reasoning}
                    </p>
                  </div>

                  {/* Version Tabs */}
                  {result.alternative_versions && result.alternative_versions.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-purple-400" />
                        <span>Select Version / Pathway:</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setActiveTab(0)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeTab === 0
                              ? 'bg-emerald-500 text-slate-950 shadow-md'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                          }`}
                        >
                          Primary Tailored
                        </button>

                        {result.alternative_versions.map((alt, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveTab(idx + 1)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              activeTab === idx + 1
                                ? 'bg-purple-500 text-white shadow-md'
                                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                            }`}
                          >
                            {alt.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Display Description of active version */}
                  {currentDisplay.desc && (
                    <div className="text-[11px] text-slate-400 italic">
                      "{currentDisplay.desc}"
                    </div>
                  )}

                  {/* Displayed Prompt Box */}
                  <div className="relative">
                    <pre className="text-slate-100 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 shadow-inner">
                      {currentDisplay.text}
                    </pre>

                    <button
                      onClick={() => handleCopyText(currentDisplay.text, activeTab)}
                      className="absolute top-3 right-3 text-xs bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedIndex === activeTab ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedIndex === activeTab ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Score Metrics Footer */}
                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-300">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Improved Prompt Quality Breakdown</span>
                      </div>
                      <span className="text-[11px] text-slate-400 hidden sm:inline italic">
                        Click any metric to view score reasoning
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        {
                          key: 'clarity',
                          label: 'Clarity',
                          val: result.breakdown.clarity,
                          reason: result.score_reasoning?.clarity || 'Unambiguous task statement and clear objective.'
                        },
                        {
                          key: 'specificity',
                          label: 'Specificity',
                          val: result.breakdown.specificity,
                          reason: result.score_reasoning?.specificity || 'Includes concrete parameters, domain tools, and constraints.'
                        },
                        {
                          key: 'structure',
                          label: 'Structure',
                          val: result.breakdown.structure,
                          reason: result.score_reasoning?.structure || 'Organized into distinct logical sections and deliverables.'
                        },
                        {
                          key: 'context',
                          label: 'Context',
                          val: result.breakdown.context,
                          reason: result.score_reasoning?.context || 'Establishes skill background, target format, and boundaries.'
                        }
                      ].map((item) => {
                        const isSelected = activeMetricKey === item.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => setActiveMetricKey(isSelected ? null : item.key)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-950/80 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/50'
                                : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">{item.label}</span>
                              <Info className={`w-3 h-3 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                            </div>
                            <div className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono mt-0.5">
                              {item.val}%
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Metric Score Reasoning Callout */}
                    <AnimatePresence mode="wait">
                      {activeMetricKey && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="bg-slate-900 border border-emerald-500/40 rounded-xl p-3 text-xs space-y-1 text-slate-300"
                        >
                          <div className="flex items-center justify-between text-emerald-400 font-bold">
                            <span className="capitalize flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5" />
                              Why {activeMetricKey} scored {result.breakdown[activeMetricKey as keyof typeof result.breakdown]}%
                            </span>
                            <button
                              onClick={() => setActiveMetricKey(null)}
                              className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
                            >
                              Close
                            </button>
                          </div>
                          <p className="text-slate-300 leading-relaxed pt-0.5">
                            {result.score_reasoning?.[activeMetricKey as keyof typeof result.score_reasoning] ||
                              'Score reflects high alignment with prompt engineering best practices.'}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              ) : (
                <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-slate-500 space-y-2 p-6 text-center">
                  <Wand2 className="w-8 h-8 text-slate-700" />
                  <p className="text-xs font-mono">Your optimized prompt, tutoring explanation, and pathway options will appear here.</p>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
