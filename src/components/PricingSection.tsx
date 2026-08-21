import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-20 md:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Invest in Your AI Superpowers
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Start for free, then scale up as your prompting demands grow. No hidden fees.
          </p>
        </div>

        {/* Billing Toggle (Monthly / Yearly) */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold ${!isYearly ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>

          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-16 h-9 rounded-full bg-slate-800 border border-slate-700 p-1 relative transition-colors focus:outline-none"
            aria-label="Toggle annual billing"
          >
            <div
              className={`w-7 h-7 rounded-full bg-emerald-500 shadow-md transition-transform ${
                isYearly ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${isYearly ? 'text-white' : 'text-slate-400'}`}>
              Annual Billing
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, index) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                  plan.isPopular
                    ? 'bg-slate-850 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 lg:-translate-y-4'
                    : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs px-4 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-extrabold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-8 pb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">${price}</span>
                      <span className="text-slate-400 text-sm font-semibold">/ month</span>
                    </div>
                    {isYearly && price > 0 && (
                      <div className="text-xs text-emerald-400 font-mono mt-1">
                        Billed annually (${price * 12}/year)
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3.5 mb-8">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Included Features:
                    </div>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                        {feat.included ? (
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            feat.isHighlight ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-emerald-400'
                          }`}>
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-900 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-3 h-3" />
                          </div>
                        )}
                        <span className={feat.included ? (feat.isHighlight ? 'text-white font-semibold' : 'text-slate-300') : 'text-slate-500 line-through'}>
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-4 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                    plan.isPopular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
                      : 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee footer */}
        <div className="mt-16 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>14-day money-back guarantee. Cancel anytime with 1-click in account settings.</span>
        </div>

      </div>
    </section>
  );
};
