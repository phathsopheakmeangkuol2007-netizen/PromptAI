import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CHALLENGES_DATA, 
  getLocalChallengeProgress, 
  LocalChallengeProgress, 
  PromptChallenge 
} from '../data/challengesData';
import { 
  Trophy, 
  Check, 
  ArrowRight, 
  Target, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Search,
  Filter,
  Award
} from 'lucide-react';
import { useModals } from '../context/ModalContext';

export const ChallengesPage: React.FC = () => {
  const { openChallengeModal } = useModals();
  const [activeChallengeId, setActiveChallengeId] = useState<string>(CHALLENGES_DATA[0].id);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [progress, setProgress] = useState<LocalChallengeProgress>(getLocalChallengeProgress());

  useEffect(() => {
    document.title = 'Challenges | Prompt AI';

    const handleProgressUpdate = () => {
      setProgress(getLocalChallengeProgress());
    };

    window.addEventListener('challengeProgressUpdated', handleProgressUpdate);
    return () => {
      window.removeEventListener('challengeProgressUpdated', handleProgressUpdate);
    };
  }, []);

  const activeChallenge = CHALLENGES_DATA.find((c) => c.id === activeChallengeId) || CHALLENGES_DATA[0];

  const categories = ['All', ...Array.from(new Set(CHALLENGES_DATA.map((c) => c.category)))];

  const filteredChallenges = CHALLENGES_DATA.filter((c) => {
    const matchesDiff = selectedDifficulty === 'All' || c.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.scenario.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDiff && matchesCat && matchesSearch;
  });

  const totalMaxXp = CHALLENGES_DATA.reduce((sum, c) => sum + c.xpValue, 0);
  const completedCount = progress.completedIds.length;
  const progressPercent = Math.round((completedCount / CHALLENGES_DATA.length) * 100);

  const beginnerTotal = CHALLENGES_DATA.filter(c => c.difficulty === 'Beginner').length;
  const beginnerDone = CHALLENGES_DATA.filter(c => c.difficulty === 'Beginner' && progress.completedIds.includes(c.id)).length;

  const interTotal = CHALLENGES_DATA.filter(c => c.difficulty === 'Intermediate').length;
  const interDone = CHALLENGES_DATA.filter(c => c.difficulty === 'Intermediate' && progress.completedIds.includes(c.id)).length;

  const advTotal = CHALLENGES_DATA.filter(c => c.difficulty === 'Advanced').length;
  const advDone = CHALLENGES_DATA.filter(c => c.difficulty === 'Advanced' && progress.completedIds.includes(c.id)).length;

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your local challenge progress?')) {
      localStorage.removeItem('prompt_ai_challenges_progress_v2');
      const reset = { completedIds: [], scores: {}, totalXp: 0 };
      setProgress(reset);
      window.dispatchEvent(new CustomEvent('challengeProgressUpdated', { detail: reset }));
    }
  };

  const scrollToChallenges = () => {
    const el = document.getElementById('challenge-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Challenges</span>
        </div>

        {/* Page Hero Header - Dark Navy Blue (#0A0E1A) */}
        <div className="bg-[#0A0E1A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>PROMPT ENGINEERING CHALLENGES</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              15 Real Prompt Engineering Challenges
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Test your ability to construct strict guardrails, zero-hallucination personas, structured JSON schemas, and defensive prompt injection boundaries — evaluated live by the Gemini API.
            </p>
          </div>
        </div>

        {/* Feature Interactive Challenge Focus Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          {/* Active Challenge Preview Left */}
          <div className="lg:col-span-7">
            <div className="bg-[#0A0E1A] rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800/80 text-white space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">Featured Scenario: {activeChallenge.title}</span>
                </div>
                <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-bold">
                  +{activeChallenge.xpValue} XP
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      {activeChallenge.category} • {activeChallenge.difficulty}
                    </span>
                    {progress.completedIds.includes(activeChallenge.id) && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed (Score: {progress.scores[activeChallenge.id]}/100)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeChallenge.scenario}
                  </p>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-300 flex justify-between">
                    <span>AI Evaluator Rubric Rules:</span>
                    <span className="text-amber-400 font-mono text-[11px]">{activeChallenge.gradingCriteria.length} Criteria Checks</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeChallenge.gradingCriteria.map((crit) => (
                      <div key={crit.id} className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-left">
                        <div className="text-[11px] font-bold text-amber-300 truncate">{crit.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{crit.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openChallengeModal(activeChallenge.id)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4" />
                  <span>{progress.completedIds.includes(activeChallenge.id) ? 'Re-attempt Challenge' : 'Solve Challenge'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Info & Navigation Right */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              <Zap className="w-4 h-4" />
              <span>Interactive Evaluation Engine</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Master the Art of Steering AI Models
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              Every challenge is designed to build muscle memory for production AI engineering. Write your prompt, submit it to our AI evaluator, and get instant feedback on structural formatting, zero-preamble enforcement, and boundary safety.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">Arena Stats Overview:</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] block">Total Challenges</span>
                  <span className="font-extrabold text-slate-900 text-sm">15 Original Tasks</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] block">Available XP</span>
                  <span className="font-extrabold text-amber-600 text-sm">{totalMaxXp.toLocaleString()} XP</span>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToChallenges}
              className="inline-flex items-center gap-2 bg-[#0A0E1A] hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all cursor-pointer border border-slate-800/80"
            >
              <span>Browse All 15 Challenges</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Challenge Feed & Your Progress Sidebar Grid */}
        <div id="challenge-list" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Challenge Feed */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header & Filter Toolbar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Arena Challenge Directory</h2>
                  <p className="text-slate-500 text-xs mt-0.5">Filter by difficulty or category to find target prompt scenarios</p>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search challenges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Difficulty Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        selectedDifficulty === diff
                          ? 'bg-[#090D16] text-white shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>

                {/* Category Dropdown Filter */}
                <div className="flex items-center gap-2 text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-xl focus:outline-none focus:border-amber-400"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'All' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Challenges List */}
            {filteredChallenges.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
                <div className="text-slate-400 text-sm font-bold">No challenges match your active filters</div>
                <button
                  onClick={() => { setSelectedDifficulty('All'); setSelectedCategory('All'); setSearchQuery(''); }}
                  className="text-xs text-amber-600 font-bold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredChallenges.map((challenge) => {
                  const isCompleted = progress.completedIds.includes(challenge.id);
                  const isSelected = activeChallengeId === challenge.id;
                  const userScore = progress.scores[challenge.id];

                  return (
                    <div
                      key={challenge.id}
                      onClick={() => setActiveChallengeId(challenge.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                              challenge.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800' :
                              challenge.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {challenge.difficulty}
                            </span>
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                              {challenge.category}
                            </span>
                            {isCompleted && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Solved ({userScore}/100)
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-extrabold text-slate-900">{challenge.title}</h3>
                        </div>

                        <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shrink-0">
                          +{challenge.xpValue} XP
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                        {challenge.scenario}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400 font-mono">
                          Rubric: {challenge.gradingCriteria.length} AI criteria checks
                        </span>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openChallengeModal(challenge.id);
                          }}
                          className={`font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                            isCompleted 
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                              : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                          }`}
                        >
                          <span>{isCompleted ? 'Re-attempt' : 'Solve'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Your Progress Panel */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6 h-fit sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-extrabold text-slate-900">Your Progress</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Browser Session
              </span>
            </div>

            {/* Overall Progress Stat Card */}
            <div className="bg-[#0A0E1A] text-white rounded-2xl p-5 space-y-3 border border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Earned Experience</span>
                <span className="text-xs font-mono text-amber-400 font-bold">{progress.totalXp} / {totalMaxXp} XP</span>
              </div>

              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, (progress.totalXp / totalMaxXp) * 100))}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-slate-300 font-bold">{completedCount} of 15 Challenges Completed</span>
                <span className="font-mono text-emerald-400 font-bold">{progressPercent}%</span>
              </div>
            </div>

            {/* Difficulty Level Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Level Mastery Breakdown:</span>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="font-medium text-slate-700">Beginner (3)</span>
                  <span className="font-mono font-bold text-slate-900">{beginnerDone} / {beginnerTotal} Done</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="font-medium text-slate-700">Intermediate (7)</span>
                  <span className="font-mono font-bold text-slate-900">{interDone} / {interTotal} Done</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="font-medium text-slate-700">Advanced (5)</span>
                  <span className="font-mono font-bold text-slate-900">{advDone} / {advTotal} Done</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => openChallengeModal()}
                className="w-full bg-[#0A0E1A] hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all text-center block cursor-pointer border border-slate-800/80"
              >
                Launch Next Challenge
              </button>

              {completedCount > 0 && (
                <button
                  onClick={handleResetProgress}
                  className="w-full text-slate-400 hover:text-red-500 text-[11px] py-1 text-center flex items-center justify-center gap-1 font-mono transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Local Progress</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
