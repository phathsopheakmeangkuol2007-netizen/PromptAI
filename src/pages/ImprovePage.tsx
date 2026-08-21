import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InteractivePlayground } from '../components/InteractivePlayground';
import { DEEP_DIVE_FEATURES } from '../data/mockData';
import { 
  Wand2, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Sliders, 
  Code 
} from 'lucide-react';

export const ImprovePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Improve Prompts | Prompt AI';
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Improve</span>
        </div>

        {/* Page Hero Header - Dark Navy Blue (#0A0E1A) */}
        <div className="bg-[#0A0E1A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/40 text-purple-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Wand2 className="w-4 h-4 text-purple-300" />
              <span>AI Optimization Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Transform Raw Prompts into Precision AI Directives
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Instantly analyze, refine, and optimize your prompts by filling in specific missing domain context, skill parameters, and tutoring reasoning tailored to your exact request.
            </p>
          </div>
        </div>

        {/* Interactive Optimizer Sandbox Component */}
        <InteractivePlayground />

        {/* Feature Deep Dive Breakdown Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-md border border-purple-200">
              <Wand2 className="w-4 h-4" />
              <span>{DEEP_DIVE_FEATURES[2].tag}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {DEEP_DIVE_FEATURES[2].title}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {DEEP_DIVE_FEATURES[2].description}
            </p>

            <ul className="space-y-2.5">
              {DEEP_DIVE_FEATURES[2].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-xs sm:text-sm">
                  <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[#0A0E1A] hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all cursor-pointer border border-slate-800/80"
            >
              <span>{DEEP_DIVE_FEATURES[2].ctaText}</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#0A0E1A] rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800/80 text-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-bold text-white">Score Breakdown Heuristics</span>
                </div>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full font-bold border border-purple-500/30">
                  Target: 95+ Score
                </span>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
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
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
