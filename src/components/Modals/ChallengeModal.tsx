import React, { useState, useEffect } from 'react';
import { X, Trophy, CheckCircle2, RefreshCw, AlertCircle, Lightbulb } from 'lucide-react';
import { CHALLENGES_DATA, getChallengeById, recordChallengeCompletion } from '../../data/challengesData';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId?: string;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, onClose, challengeId }) => {
  const challenge = (challengeId ? getChallengeById(challengeId) : null) || CHALLENGES_DATA[0];
  const [userSolution, setUserSolution] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<null | {
    score: number;
    passed: boolean;
    feedback: string[];
    earnedXP: number;
  }>(null);

  useEffect(() => {
    if (challenge) {
      setUserSolution(challenge.initialPrompt || '');
      setEvaluation(null);
      setErrorMessage(null);
    }
  }, [challenge.id, isOpen]);

  if (!isOpen) return null;

  const handleSubmitSolution = async () => {
    setIsEvaluating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/grade-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: challenge.id,
          userSolution,
          scenario: challenge.scenario,
          criteria: challenge.gradingCriteria,
          xpValue: challenge.xpValue,
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        if (response.status === 429 || resData.error === 'quota_exceeded' || resData.error === 'rate_limit_exceeded') {
          setErrorMessage("⏳ Prompt AI is currently at capacity. Please try again in a bit.");
        } else {
          setErrorMessage(resData.message || "Unable to grade challenge. Please try again.");
        }
        return;
      }

      setEvaluation(resData);

      // Save completion locally if passed
      if (resData.passed || resData.score >= 70) {
        recordChallengeCompletion(challenge.id, resData.score, challenge.xpValue);
      }
    } catch (err) {
      console.error('Failed to grade challenge:', err);
      setErrorMessage("Network error when grading challenge. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleUseHint = () => {
    if (challenge.solutionExample) {
      setUserSolution(challenge.solutionExample);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative text-white space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Challenge Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pr-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Challenge: {challenge.category}
            </span>
            <span className="text-xs font-mono text-slate-400">+{challenge.xpValue} XP reward</span>
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-1">{challenge.title}</h3>
        
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-400">Scenario Brief:</strong> {challenge.scenario}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-xs text-amber-200/90 font-mono">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span><strong>Hint:</strong> {challenge.hint}</span>
          </div>
        </div>

        {/* Grading Criteria Checklist Preview */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">AI Evaluation Rubric Criteria:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {challenge.gradingCriteria.map((crit) => (
              <div key={crit.id} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-slate-300">
                <div className="font-bold text-amber-300 text-[11px]">{crit.name}</div>
                <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{crit.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-950/80 border border-red-500/50 text-red-200 rounded-xl p-3 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Input Textarea */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Your Prompt Solution:</span>
            {challenge.solutionExample && (
              <button
                onClick={handleUseHint}
                className="text-amber-400 hover:underline font-mono text-[11px]"
              >
                Load Benchmark Prompt Solution
              </button>
            )}
          </div>

          <textarea
            value={userSolution}
            onChange={(e) => setUserSolution(e.target.value)}
            rows={5}
            placeholder="Type your prompt solution here..."
            className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>

        {/* Evaluation Output Box */}
        {evaluation && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            evaluation.passed ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-amber-500/10 border-amber-500/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-1.5">
                {evaluation.passed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Challenge Passed! (+{evaluation.earnedXP} XP)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300">Attempt Score: {evaluation.score}/100</span>
                  </>
                )}
              </span>
              <span className="font-mono text-slate-400">Passing Score: 70+</span>
            </div>

            <div className="space-y-1.5 pt-1">
              {evaluation.feedback.map((item, idx) => (
                <div key={idx} className="text-slate-300 font-mono text-[11px] leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400">Graded live by Gemini API</span>

          <button
            onClick={handleSubmitSolution}
            disabled={isEvaluating}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Trophy className="w-4 h-4" />
                <span>Submit Solution</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


