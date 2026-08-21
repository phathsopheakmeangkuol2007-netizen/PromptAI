import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  GraduationCap, 
  Sparkles, 
  Bot, 
  Search, 
  Zap, 
  BookOpen, 
  Cpu, 
  Terminal 
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onStartLearning: () => void;
  onWatchDemo?: () => void;
  onJumpToOptimizer?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/learn?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onStartLearning();
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-70px)] flex flex-col justify-between bg-[#070A12] text-white pt-28 sm:pt-36 pb-0">
      {/* Background Grid Mesh & Glowing Orbs (Clipped inside container) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,#000_80%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-emerald-500/15 via-indigo-500/10 to-purple-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-10 right-1/4 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-gradient-to-t from-emerald-500/20 via-teal-600/10 to-transparent blur-[80px] rounded-t-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[120px] bg-emerald-400/15 blur-[50px] rounded-t-full" />
      </div>

      {/* Hero Content Area */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto space-y-8 z-10 pb-16 sm:pb-24">
        
        {/* Top Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg shadow-emerald-500/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>Next-Gen AI Prompt Engineering Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]"
        >
          Master the Art of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 drop-shadow-sm">
            AI Prompting
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
        >
          Learn, practice, and perfect prompts for ChatGPT, Claude, Gemini, and Midjourney. Transform vague requests into precision-engineered AI outcomes.
        </motion.p>

        {/* GitHub-style Action Input Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSearchSubmit} className="relative p-1.5 sm:p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2 group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-2 px-3.5 py-2 w-full text-slate-300">
              <Search className="w-5 h-5 text-slate-400 shrink-0 group-focus-within:text-emerald-400 transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What topic do you want to learn?" 
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-medium"
              />
            </div>
            
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl sm:rounded-full shadow-lg shadow-emerald-500/30 transition-all active:scale-95 cursor-pointer"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </form>

          {/* Quick Topic Chips */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-4 text-xs font-semibold text-slate-400">
            <span className="text-slate-500">Popular:</span>
            <button 
              type="button"
              onClick={() => navigate('/learn')}
              className="hover:text-emerald-400 transition-colors bg-slate-900/60 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-full cursor-pointer"
            >
              Role Prompting
            </button>
            <button 
              type="button"
              onClick={() => navigate('/learn')}
              className="hover:text-emerald-400 transition-colors bg-slate-900/60 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-full cursor-pointer"
            >
              Chain-of-Thought
            </button>
            <button 
              type="button"
              onClick={() => navigate('/learn')}
              className="hover:text-emerald-400 transition-colors bg-slate-900/60 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-full cursor-pointer"
            >
              Few-Shot Examples
            </button>
          </div>
        </motion.div>

      </div>

      {/* Model Cards Row - Positioned higher inside hero section */}
      <div className="relative w-full max-w-4xl mx-auto z-20 -translate-y-2 sm:-translate-y-4 pb-4">
        <div className="flex items-center justify-center gap-3 sm:gap-6 px-4 flex-wrap">
          {/* ChatGPT Character Chip */}
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2.5 bg-[#0a0f1d] border border-emerald-500/40 hover:border-emerald-400 px-4 py-2.5 rounded-2xl shadow-xl shadow-emerald-950/40 backdrop-blur-xl transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-white">ChatGPT</span>
            </div>
          </motion.div>

          {/* Claude Character Chip */}
          <motion.div 
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="flex items-center gap-2.5 bg-[#0a0f1d] border border-amber-500/40 hover:border-amber-400 px-4 py-2.5 rounded-2xl shadow-xl shadow-amber-950/40 backdrop-blur-xl transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-white">Claude</span>
            </div>
          </motion.div>

          {/* Gemini Character Chip */}
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="flex items-center gap-2.5 bg-[#0a0f1d] border border-purple-500/40 hover:border-purple-400 px-4 py-2.5 rounded-2xl shadow-xl shadow-purple-950/40 backdrop-blur-xl transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-white">Gemini</span>
            </div>
          </motion.div>

          {/* DeepSeek Character Chip */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="hidden sm:flex items-center gap-2.5 bg-[#0a0f1d] border border-sky-500/40 hover:border-sky-400 px-4 py-2.5 rounded-2xl shadow-xl shadow-sky-950/40 backdrop-blur-xl transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-white">DeepSeek</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
