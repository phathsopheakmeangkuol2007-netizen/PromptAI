import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';
import { BookOpen, Target, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-emerald-600" />;
      case 'Target':
        return <Target className="w-6 h-6 text-amber-500" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-purple-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#070A12] text-white relative overflow-hidden border-t border-slate-800/80">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>Simple 3-Step Mastery Pathway</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How Prompt AI Works
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            From foundational prompt structure to automated browser feedback, here is your path to 100% LLM precision.
          </p>
        </div>

        {/* 3 Step Horizontal Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((stepItem, index) => (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-slate-850/80 border border-slate-800 rounded-3xl p-8 relative flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
            >
              {/* Top Step Badge & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    {getIcon(stepItem.icon)}
                  </div>
                  <span className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono font-bold text-sm flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    0{stepItem.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  Step {stepItem.step}: {stepItem.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {stepItem.description}
                </p>
              </div>

              {/* Bottom Feature Tag */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{stepItem.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
