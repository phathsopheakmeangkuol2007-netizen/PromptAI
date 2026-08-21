import React from 'react';
import { TESTIMONIALS, STATS_DATA } from '../data/mockData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const SocialProofSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stat Bar Above */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-20 shadow-xl border border-slate-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {STATS_DATA.map((stat, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-6 sm:pt-0' : ''} space-y-1`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>Loved by Engineers & Creators</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Prompt Engineers at Top Companies
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            See how individuals and AI product teams use Prompt AI to cut token costs and skyrocket output accuracy.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all hover:bg-white group"
            >
              <div>
                {/* Rating Stars & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {testimonial.badge}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-8">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-slate-200/60 flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {testimonial.role} • <span className="text-slate-700 font-semibold">{testimonial.company}</span>
                  </p>
                  <p className="text-[11px] font-mono text-emerald-600 mt-0.5">
                    {testimonial.improvedCount}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
