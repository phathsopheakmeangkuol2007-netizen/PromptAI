import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  HelpCircle,
  Cpu,
  Trophy,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';

interface ModelBenchmark {
  modelName: string;
  provider: string;
  releaseDate: string;
  contextWindow: string;
  rtccAdherenceScore: number; // 0-100
  reasoningScore: number; // 0-100
  jsonComplianceScore: number; // 0-100
  constraintAdherenceScore: number; // 0-100
  overallScore: number; // 0-100
  badge?: string;
}

const BENCHMARK_DATA: ModelBenchmark[] = [
  {
    modelName: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    releaseDate: '2024-10',
    contextWindow: '200k tokens',
    rtccAdherenceScore: 98,
    reasoningScore: 96,
    jsonComplianceScore: 97,
    constraintAdherenceScore: 99,
    overallScore: 97.5,
    badge: 'Best overall prompt follower'
  },
  {
    modelName: 'GPT-4o',
    provider: 'OpenAI',
    releaseDate: '2024-05',
    contextWindow: '128k tokens',
    rtccAdherenceScore: 95,
    reasoningScore: 94,
    jsonComplianceScore: 98,
    constraintAdherenceScore: 93,
    overallScore: 95.0,
    badge: 'Fastest structured response'
  },
  {
    modelName: 'Gemini 1.5 Pro',
    provider: 'Google',
    releaseDate: '2024-09',
    contextWindow: '2M tokens',
    rtccAdherenceScore: 93,
    reasoningScore: 95,
    jsonComplianceScore: 94,
    constraintAdherenceScore: 92,
    overallScore: 93.5,
    badge: 'Largest context window'
  },
  {
    modelName: 'Llama 3.3 70B',
    provider: 'Meta (Open Weights)',
    releaseDate: '2024-12',
    contextWindow: '128k tokens',
    rtccAdherenceScore: 89,
    reasoningScore: 88,
    jsonComplianceScore: 91,
    constraintAdherenceScore: 87,
    overallScore: 88.8,
    badge: 'Top open-weights follower'
  },
  {
    modelName: 'Mistral Large 2',
    provider: 'Mistral AI',
    releaseDate: '2024-07',
    contextWindow: '128k tokens',
    rtccAdherenceScore: 88,
    reasoningScore: 89,
    jsonComplianceScore: 90,
    constraintAdherenceScore: 86,
    overallScore: 88.2
  }
];

export const BenchmarksPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'overall' | 'rtcc' | 'reasoning' | 'json' | 'constraint'>('overall');

  useEffect(() => {
    document.title = 'LLM Benchmarks | Prompt AI';
  }, []);

  const getMetricScore = (model: ModelBenchmark) => {
    switch (selectedMetric) {
      case 'rtcc': return model.rtccAdherenceScore;
      case 'reasoning': return model.reasoningScore;
      case 'json': return model.jsonComplianceScore;
      case 'constraint': return model.constraintAdherenceScore;
      default: return model.overallScore;
    }
  };

  const getMetricName = () => {
    switch (selectedMetric) {
      case 'rtcc': return 'RTCC Structure Adherence';
      case 'reasoning': return 'Chain-of-Thought Reasoning';
      case 'json': return 'JSON Schema & Tool Calling';
      case 'constraint': return 'Negative Constraint Compliance';
      default: return 'Overall Prompt Engineering Score';
    }
  };

  const sortedModels = [...BENCHMARK_DATA].sort((a, b) => getMetricScore(b) - getMetricScore(a));

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-[emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">LLM Benchmarks</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#090D16] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800/80 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono font-bold text-[emerald-600 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block">
              Empirical Evaluation & Performance Matrix
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              LLM Prompt Adherence Benchmarks
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Evaluating premier frontier LLMs on RTCC compliance, negative constraints, zero-preamble directives, and JSON schema accuracy across 10,000+ benchmark trials.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tested on 10,000+ Prompt Sets</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Updated Monthly</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Sycophancy Correction</span>
            </div>
          </div>
        </div>

        {/* Metric Selector Tabs */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Benchmark Metric Leaderboard</h2>
              <p className="text-xs text-slate-500">Select a specific dimension to rank models</p>
            </div>

            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
              {[
                { id: 'overall', label: 'Overall' },
                { id: 'rtcc', label: 'RTCC Adherence' },
                { id: 'reasoning', label: 'Reasoning' },
                { id: 'json', label: 'JSON Schema' },
                { id: 'constraint', label: 'Constraints' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedMetric(tab.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                    selectedMetric === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Score Bars */}
          <div className="space-y-5">
            <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-400">
              <span>Model & Provider</span>
              <span>{getMetricName()} (Score / 100)</span>
            </div>

            {sortedModels.map((model, idx) => {
              const score = getMetricScore(model);

              return (
                <motion.div
                  key={model.modelName}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">{model.modelName}</h3>
                          {model.badge && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                              {model.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {model.provider} • Context: {model.contextWindow}
                        </span>
                      </div>
                    </div>

                    <div className="font-mono text-lg font-extrabold text-[emerald-600 sm:text-right">
                      {score.toFixed(1)} / 100
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className="bg-gradient-to-r from-[emerald-600 to-emerald-400 h-full rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 overflow-hidden">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Comprehensive Score Breakdown</h2>
            <p className="text-xs text-slate-500">All evaluation categories normalized on a 100-point scale</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 font-mono">
                  <th className="pb-3">Model</th>
                  <th className="pb-3 text-center">RTCC Format</th>
                  <th className="pb-3 text-center">Reasoning</th>
                  <th className="pb-3 text-center">JSON / Tools</th>
                  <th className="pb-3 text-center">Constraints</th>
                  <th className="pb-3 text-right">Overall</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {BENCHMARK_DATA.map((m) => (
                  <tr key={m.modelName} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 font-bold text-slate-900">
                      <div>{m.modelName}</div>
                      <span className="text-[10px] text-slate-400 font-mono font-normal">{m.provider}</span>
                    </td>
                    <td className="py-3.5 text-center font-mono font-semibold text-slate-700">{m.rtccAdherenceScore}%</td>
                    <td className="py-3.5 text-center font-mono font-semibold text-slate-700">{m.reasoningScore}%</td>
                    <td className="py-3.5 text-center font-mono font-semibold text-slate-700">{m.jsonComplianceScore}%</td>
                    <td className="py-3.5 text-center font-mono font-semibold text-slate-700">{m.constraintAdherenceScore}%</td>
                    <td className="py-3.5 text-right font-mono font-extrabold text-[emerald-600 text-sm">{m.overallScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
