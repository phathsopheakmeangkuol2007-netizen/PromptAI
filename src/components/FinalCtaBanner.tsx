import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface FinalCtaBannerProps {
  onGetStarted: () => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative space-y-8">
        
        {/* Top pill */}
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>No Credit Card Required • Instant 14-Day Pro Access</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
          Start Mastering AI Prompts Today
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto font-normal leading-relaxed">
          Get 3x better results from ChatGPT, Claude, and Gemini with precision-engineered AI prompts.
        </p>

        {/* Centered CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-lg px-9 py-4 rounded-full shadow-2xl hover:shadow-slate-950/40 transition-all active:scale-95"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 text-emerald-400" />
          </button>
        </div>

        {/* Perks list */}
        <div className="pt-6 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm font-medium text-emerald-100 opacity-95">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            Free forever tier
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            Setup in 60 seconds
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            Chrome extension included
          </span>
        </div>

      </div>
    </section>
  );
};
