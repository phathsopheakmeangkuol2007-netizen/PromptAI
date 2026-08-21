import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLessonBySlugs } from '../data/coursesData';
import { markLessonCompleted, isLessonCompleted } from '../utils/courseProgress';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  BookOpen,
  HelpCircle,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

export const LessonPage: React.FC = () => {
  const { courseSlug, lessonSlug } = useParams<{ courseSlug: string; lessonSlug: string }>();
  const navigate = useNavigate();

  const data = getLessonBySlugs(courseSlug || '', lessonSlug || '');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [quizId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');

  useEffect(() => {
    if (data) {
      document.title = `${data.lesson.title} | ${data.course.title}`;
      const completed = isLessonCompleted(data.course.id, data.lesson.id);
      setAlreadyCompleted(completed);
      // Reset quiz state when switching lessons
      setSelectedAnswers({});
      setQuizSubmitted(completed);
    }
  }, [courseSlug, lessonSlug, data?.course.id, data?.lesson.id]);

  if (!data) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Lesson Not Found</h1>
        <p className="text-slate-600">The requested lesson could not be located.</p>
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-full hover:bg-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </Link>
      </div>
    );
  }

  const { course, lesson, lessonIndex } = data;
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

  const handleSelectOption = (quizId: string, optionIdx: number) => {
    if (quizSubmitted && alreadyCompleted) return; // Allow changing if retrying
    setSelectedAnswers((prev) => ({ ...prev, [quizId]: optionIdx }));
  };

  const handleVerifyQuiz = () => {
    setQuizSubmitted(true);
    // Check if all questions are answered correctly
    const allCorrect = lesson.quiz.every(
      (q) => selectedAnswers[q.id] === q.correctIndex
    );

    if (allCorrect || lesson.quiz.length === 0) {
      markLessonCompleted(course.id, lesson.id);
      setAlreadyCompleted(true);
    }
  };

  const allQuestionsAnswered = lesson.quiz.every((q) => selectedAnswers[q.id] !== undefined);
  const quizPassed = lesson.quiz.every((q) => selectedAnswers[q.id] === q.correctIndex);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/learn" className="hover:text-emerald-600 transition-colors">Learn</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/learn/${course.slug}`} className="hover:text-emerald-600 transition-colors truncate max-w-[150px] sm:max-w-xs">
            {course.title}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-[180px] sm:max-w-xs">{lesson.title}</span>
        </div>

        {/* Top Header Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  Lesson {lessonIndex + 1} of {course.lessons.length}
                </span>
                {alreadyCompleted && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {lesson.title}
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl shrink-0">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{lesson.duration}</span>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {lesson.summary}
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                activeTab === 'content'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lesson Material</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                activeTab === 'quiz'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Knowledge Check ({lesson.quiz.length} Questions)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Lesson Material Content */}
        {activeTab === 'content' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Theory Sections */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 text-slate-800">
              {lesson.contentSections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>{sec.heading}</span>
                  </h2>

                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
                    {sec.body}
                  </p>

                  {sec.tip && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block text-emerald-950 mb-0.5">Pro-Tip:</strong>
                        <span>{sec.tip}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Prompt Example Box (if available) */}
            {lesson.example && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>Practical Comparative Example</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bad Prompt */}
                  <div className="bg-red-50/50 border border-red-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-500" />
                        Weak / Ambiguous Prompt
                      </span>
                    </div>
                    <div className="bg-white border border-red-200 rounded-xl p-3 font-mono text-xs text-slate-800">
                      "{lesson.example.badText}"
                    </div>
                    <p className="text-xs text-red-800">
                      <strong>Flaw:</strong> {lesson.example.badFlaw}
                    </p>
                  </div>

                  {/* Good Prompt */}
                  <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Optimized Structured Prompt
                      </span>
                    </div>
                    <div className="bg-slate-900 text-emerald-300 border border-slate-800 rounded-xl p-3 font-mono text-xs whitespace-pre-wrap">
                      {lesson.example.goodText}
                    </div>
                    <p className="text-xs text-emerald-900">
                      <strong>Breakdown:</strong> {lesson.example.goodBreakdown}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Code / Sandbox Snippet */}
            {lesson.interactiveSnippet && (
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE LLM SANDBOX PROMPT PREVIEW
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                    Model: GPT-4o
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1">SYSTEM INSTRUCTION:</span>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-emerald-400">
                      {lesson.interactiveSnippet.systemPrompt}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1">USER PROMPT:</span>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-200 whitespace-pre-wrap">
                      {lesson.interactiveSnippet.userPrompt}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1">EXPECTED MODEL RESPONSE:</span>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-wrap">
                      {lesson.interactiveSnippet.expectedOutput}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Try It Callout */}
            {lesson.tryItTip && (
              <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-800/80 px-3 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Try It in Prompt AI
                  </span>
                </div>
                <p className="text-sm text-emerald-100 leading-relaxed">
                  {lesson.tryItTip.description}
                </p>
                <div className="bg-emerald-950/80 border border-emerald-700/60 rounded-2xl p-4 font-mono text-xs text-emerald-200 space-y-3">
                  <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Suggested Prompt:</div>
                  <p className="whitespace-pre-wrap">{lesson.tryItTip.promptToTry}</p>
                </div>
                <div className="pt-2 flex justify-end">
                  <Link
                    to={`/improve?prompt=${encodeURIComponent(lesson.tryItTip.promptToTry)}`}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
                  >
                    <span>Test in Improve Feature</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            {lesson.takeaways && lesson.takeaways.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Key Takeaways</span>
                </h3>
                <ul className="space-y-3">
                  {lesson.takeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-2" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA to Quiz */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-bold">Ready to test your knowledge?</h3>
                <p className="text-xs text-slate-300">Answer {lesson.quiz.length} quick questions to mark this lesson complete.</p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('quiz');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2"
              >
                <span>Take Lesson Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Quiz / Knowledge Check */}
        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>Knowledge Check</span>
                  </h2>
                  <p className="text-xs text-slate-500">Answer correctly to mark this lesson as completed</p>
                </div>

                {alreadyCompleted && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Lesson Completed!</span>
                  </span>
                )}
              </div>

              {lesson.quiz.map((q, qIdx) => {
                const selectedOpt = selectedAnswers[q.id];
                const isSelected = selectedOpt !== undefined;

                return (
                  <div key={q.id} className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {q.question}
                      </h3>
                    </div>

                    <div className="space-y-2.5 pl-9">
                      {q.options.map((opt, optIdx) => {
                        let optStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';

                        if (selectedOpt === optIdx) {
                          optStyle = 'bg-slate-900 border-slate-900 text-white font-semibold';
                        }

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optStyle = 'bg-emerald-500 border-emerald-500 text-white font-bold ring-2 ring-emerald-500/30';
                          } else if (selectedOpt === optIdx && selectedOpt !== q.correctIndex) {
                            optStyle = 'bg-red-500 border-red-500 text-white font-bold';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left text-xs sm:text-sm p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                            )}
                            {quizSubmitted && selectedOpt === optIdx && selectedOpt !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-white shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {quizSubmitted && (
                      <div className="ml-9 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-1">
                        <strong className="font-bold block text-slate-900">Explanation:</strong>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Submit / Retry Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  {quizSubmitted ? (
                    quizPassed ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        All questions correct! Progress saved to your course record.
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Some answers were incorrect. Review the explanations and try again!
                      </span>
                    )
                  ) : (
                    <span>Select an answer for each question above</span>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {quizSubmitted && !quizPassed && (
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setSelectedAnswers({});
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Quiz</span>
                    </button>
                  )}

                  {!quizSubmitted && (
                    <button
                      onClick={handleVerifyQuiz}
                      disabled={!allQuestionsAnswered}
                      className={`inline-flex items-center gap-2 font-bold text-xs px-6 py-3 rounded-xl transition-all ${
                        allQuestionsAnswered
                          ? 'bg-emerald-600 hover:bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Submit Answers</span>
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Lesson Navigation Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {prevLesson ? (
              <button
                onClick={() => navigate(`/learn/${course.slug}/${prevLesson.slug}`)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-600 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 uppercase font-mono">Previous Lesson</span>
                  <span className="truncate max-w-[140px] sm:max-w-xs block">{prevLesson.title}</span>
                </div>
              </button>
            ) : (
              <Link
                to={`/learn/${course.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Course Overview</span>
              </Link>
            )}
          </div>

          <Link
            to={`/learn/${course.slug}`}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            View All {course.lessons.length} Lessons
          </Link>

          <div>
            {nextLesson ? (
              <button
                onClick={() => navigate(`/learn/${course.slug}/${nextLesson.slug}`)}
                className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                <div className="text-right">
                  <span className="block text-[10px] text-emerald-100 uppercase font-mono">Next Lesson</span>
                  <span className="truncate max-w-[140px] sm:max-w-xs block">{nextLesson.title}</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to={`/learn/${course.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all"
              >
                <span>Complete Course Overview</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
