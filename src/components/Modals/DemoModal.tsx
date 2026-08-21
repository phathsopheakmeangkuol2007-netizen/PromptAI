import React, { useState } from 'react';
import { X, Play, Pause, Sparkles, CheckCircle2, ShieldCheck, Wand2, Trophy, Plug } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFree: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onStartFree }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'optimizer' | 'arena' | 'extension'>('optimizer');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Product Walkthrough Demo
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            See Prompt AI in Action (60-Second Overview)
          </h3>
        </div>

        {/* Interactive Feature Demo Player Bar */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('optimizer')}
            className={`text-xs font-bold px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              activeTab === 'optimizer' 
                ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>1. Prompt Optimizer</span>
          </button>
          <button
            onClick={() => setActiveTab('arena')}
            className={`text-xs font-bold px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              activeTab === 'arena' 
                ? 'bg-amber-500 text-slate-950 border-amber-400' 
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>2. Arena Challenges</span>
          </button>
          <button
            onClick={() => setActiveTab('extension')}
            className={`text-xs font-bold px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              activeTab === 'extension' 
                ? 'bg-blue-500 text-slate-950 border-blue-400' 
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Plug className="w-3.5 h-3.5" />
            <span>3. Browser Extension</span>
          </button>
        </div>

        {/* Video Simulation Screen */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 relative min-h-[260px] flex flex-col justify-between overflow-hidden">
          
          {/* Simulated Active Demo View */}
          {activeTab === 'optimizer' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>DEMO // REAL-TIME HEURISTIC SCORING ENGINE</span>
                <span className="text-emerald-400 font-bold">Score: 96/100 (+64% boost)</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-red-400 block mb-1">Raw Input: "Give me ideas for my youtube video"</span>
                <span className="text-emerald-400 block">Optimized: "Act as a Lead YouTube Strategist. Generate 5 high-CTR title hooks for a tech review video on the M4 Mac mini..."</span>
              </div>
            </div>
          )}

          {activeTab === 'arena' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>DEMO // COMMUNITY PROMPT CHALLENGE grading</span>
                <span className="text-amber-400 font-bold">+250 XP Awarded</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-amber-300 block mb-1">Challenge: Force Claude 3.5 Sonnet to output strict JSON only</span>
                <span className="text-slate-200">Rubric Validation: 100% Match (Zero Preamble, Valid Syntax)</span>
              </div>
            </div>
          )}

          {activeTab === 'extension' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>DEMO // CHROME EXTENSION ON CHATGPT</span>
                <span className="text-blue-400 font-bold">Hotkey: Cmd+K</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-blue-300 block mb-1">Live ChatGPT Overlay Box:</span>
                <span className="text-slate-200">Auto-filled Persona & Output Format parameters directly into prompt textarea.</span>
              </div>
            </div>
          )}

          {/* Video Playback Control Bar */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              <span>{isPlaying ? 'Pause Interactive Demo' : 'Play Walkthrough'}</span>
            </button>

            <span className="text-xs font-mono text-slate-500">00:45 / 01:00</span>
          </div>
        </div>

        {/* Modal Bottom Action */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ready to start mastering prompts?</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onStartFree();
            }}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
          >
            Start Learning Free Now
          </button>
        </div>
      </div>
    </div>
  );
};
