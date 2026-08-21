import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURES_OVERVIEW } from '../data/mockData';
import { GraduationCap, Trophy, Wand2, Plug, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturesOverview: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-7 h-7 text-emerald-600" />;
      case 'Trophy':
        return <Trophy className="w-7 h-7 text-emerald-600" />;
      case 'Wand2':
        return <Wand2 className="w-7 h-7 text-emerald-600" />;
      case 'Plugin':
      case 'Plug':
        return <Plug className="w-7 h-7 text-emerald-600" />;
      default:
        return <GraduationCap className="w-7 h-7 text-emerald-600" />;
    }
  };

  const getRoute = (id: string) => {
    switch (id) {
      case 'learn':
        return '/learn';
      case 'challenges':
        return '/challenges';
      case 'improve':
        return '/improve';
      case 'extensions':
        return '/extensions';
      default:
        return `/${id}`;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-[#070A12] text-white relative border-t border-slate-800/80">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>Core Capability Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Master <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              AI Prompt Engineering
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-normal">
            Four integrated tools designed to bridge the gap between basic text inputs and enterprise-grade LLM steering.
          </p>
        </div>

        {/* 4-Column Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES_OVERVIEW.map((item, index) => {
            const targetRoute = getRoute(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  to={targetRoute}
                  className="group relative bg-slate-900/60 hover:bg-slate-900/90 rounded-3xl p-7 border border-slate-800/90 hover:border-emerald-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between h-full backdrop-blur-md"
                >
                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getIcon(item.iconName)}
                      </div>
                      {item.badge && (
                        <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-3 flex items-center gap-1.5">
                      <span>{item.title}</span>
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-emerald-400">
                    <span>Explore {item.title}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
