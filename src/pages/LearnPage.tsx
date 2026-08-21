import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COURSES_DATA } from '../data/coursesData';
import { getCourseProgressStats } from '../utils/courseProgress';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  ShieldCheck, 
  Cpu, 
  Clock, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

export const LearnPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [, setProgressTick] = useState(0);

  useEffect(() => {
    document.title = 'Learn Prompting | Prompt AI';

    const handleProgressUpdate = () => {
      setProgressTick((prev) => prev + 1);
    };
    window.addEventListener('courseProgressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('courseProgressUpdated', handleProgressUpdate);
  }, []);

  const filteredCourses = selectedLevel === 'All'
    ? COURSES_DATA
    : COURSES_DATA.filter((course) => course.level.toLowerCase() === selectedLevel.toLowerCase());

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Learn</span>
        </div>

        {/* Page Hero Header - Dark Navy Blue (#0A0E1A) */}
        <div className="bg-[#0A0E1A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Prompt AI Academy</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Master Structured Prompt Engineering
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Step-by-step interactive courses teaching you RTCC architecture, Chain-of-Thought reasoning, few-shot exemplars, system steering, and enterprise guardrails.
            </p>
          </div>
        </div>

        {/* Curriculum Course Cards Grid */}
        <div id="curriculum" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Curriculum Modules</h2>
              <p className="text-slate-600 text-xs sm:text-sm">Filter courses by expertise level</p>
            </div>

            {/* Level Filter Tabs */}
            <div className="flex gap-1.5 bg-slate-200/80 p-1 rounded-xl shrink-0">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    selectedLevel === level
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const stats = getCourseProgressStats(course);

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                        {getModuleIcon(course.icon)}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {course.category && (
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                            {course.category}
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          {course.level}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      <Link to={`/learn/${course.slug}`} className="hover:text-emerald-600 transition-colors">
                        {course.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Progress Bar on Card */}
                    {stats.hasStarted && (
                      <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-500">Progress:</span>
                          <span className="text-emerald-600 font-mono">
                            {stats.completedCount}/{stats.totalCount} completed ({stats.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                            style={{ width: `${stats.percentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Key Topics Covered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.topics.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                      <span>•</span>
                      <span>{course.lessonsCount} lessons</span>
                    </div>

                    <Link
                      to={`/learn/${course.slug}`}
                      className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
                    >
                      <span>{stats.hasStarted ? 'Continue Course' : 'Start Course'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
