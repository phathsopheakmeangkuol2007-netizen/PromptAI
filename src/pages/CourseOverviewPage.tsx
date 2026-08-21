import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSES_DATA, getCourseBySlug } from '../data/coursesData';
import { getCourseProgressStats, isLessonCompleted } from '../utils/courseProgress';
import { 
  BookOpen, 
  Check, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Cpu, 
  ShieldCheck,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { motion } from 'motion/react';

export const CourseOverviewPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const navigate = useNavigate();
  const course = getCourseBySlug(courseSlug || '');

  const [, setProgressTick] = useState(0);

  useEffect(() => {
    const handleProgressUpdate = () => {
      setProgressTick((prev) => prev + 1);
    };
    window.addEventListener('courseProgressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('courseProgressUpdated', handleProgressUpdate);
  }, []);

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | Prompt AI`;
    }
  }, [course]);

  if (!course) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Course Not Found</h1>
        <p className="text-slate-600">The requested course could not be located.</p>
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

  const stats = getCourseProgressStats(course);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-purple-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/learn" className="hover:text-emerald-600 transition-colors">Learn Prompting</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate">{course.title}</span>
        </div>

        {/* Hero Course Header Card */}
        <div className="bg-[#090D16] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800/80 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                {getModuleIcon(course.icon)}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  {course.level} Level Course
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
                  {course.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {course.duration}
              </span>
              <span>•</span>
              <span>{course.lessonsCount} lessons</span>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {course.description}
          </p>

          {/* Topics Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {course.topics.map((topic, i) => (
              <span key={i} className="text-xs font-semibold bg-slate-800/90 border border-slate-700 text-slate-300 px-3 py-1 rounded-lg">
                {topic}
              </span>
            ))}
          </div>

          {/* Progress & Quick Start Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Course Progress</span>
                <span className="text-emerald-400 font-mono">
                  {stats.completedCount}/{stats.totalCount} completed ({stats.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                navigate(`/learn/${course.slug}/${stats.nextIncompleteLessonSlug}`);
              }}
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>{stats.hasStarted ? 'Continue Course' : 'Start First Lesson'}</span>
            </button>
          </div>
        </div>

        {/* Lessons List Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Course Syllabus</h2>
              <p className="text-slate-500 text-xs">Complete all lessons and quizzes to earn course completion</p>
            </div>
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {course.lessons.length} Modules
            </span>
          </div>

          <div className="space-y-3">
            {course.lessons.map((lesson, idx) => {
              const completed = isLessonCompleted(course.id, lesson.id);
              const isNextUp = stats.nextIncompleteLessonSlug === lesson.slug;

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => navigate(`/learn/${course.slug}/${lesson.slug}`)}
                  className={`group relative p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    completed
                      ? 'bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-300'
                      : isNextUp
                      ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Status Icon / Index */}
                    <div className="mt-0.5 shrink-0">
                      {completed ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <Check className="w-5 h-5 stroke-[3]" />
                        </div>
                      ) : isNextUp ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center font-bold text-xs font-mono">
                          {idx + 1}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center font-bold text-xs font-mono">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-400">Lesson {idx + 1}</span>
                        {completed && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                            Completed
                          </span>
                        )}
                        {isNextUp && !completed && (
                          <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-md">
                            Up Next
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {lesson.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {lesson.summary}
                      </p>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.duration}
                    </span>

                    <button
                      className={`text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                        completed
                          ? 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                          : isNextUp
                          ? 'bg-emerald-600 text-white shadow-sm group-hover:bg-emerald-500'
                          : 'bg-slate-900 text-white group-hover:bg-slate-800'
                      }`}
                    >
                      <span>{completed ? 'Review' : isNextUp ? 'Start' : 'Start'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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