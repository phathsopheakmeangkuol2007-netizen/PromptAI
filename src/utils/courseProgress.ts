import { Course } from '../data/coursesData';

const STORAGE_KEY = 'prompt_ai_course_progress_v1';

interface ProgressStore {
  [courseId: string]: string[]; // array of completed lesson IDs
}

function loadStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse course progress from localStorage', e);
    return {};
  }
}

function saveStore(store: ProgressStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to save course progress to localStorage', e);
  }
}

export function getCompletedLessons(courseId: string): string[] {
  const store = loadStore();
  return store[courseId] || [];
}

export function isLessonCompleted(courseId: string, lessonId: string): boolean {
  const completed = getCompletedLessons(courseId);
  return completed.includes(lessonId);
}

export function markLessonCompleted(courseId: string, lessonId: string): void {
  const store = loadStore();
  const current = store[courseId] || [];
  if (!current.includes(lessonId)) {
    store[courseId] = [...current, lessonId];
    saveStore(store);
    // Dispatch custom event so other components can re-render reactively
    window.dispatchEvent(new CustomEvent('courseProgressUpdated', { detail: { courseId, lessonId } }));
  }
}

export function getCourseProgressStats(course: Course) {
  const completedIds = getCompletedLessons(course.id);
  const completedCount = course.lessons.filter((l) => completedIds.includes(l.id)).length;
  const totalCount = course.lessons.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // Find first incomplete lesson
  const firstIncomplete = course.lessons.find((l) => !completedIds.includes(l.id));
  const nextIncompleteLessonSlug = firstIncomplete ? firstIncomplete.slug : course.lessons[0]?.slug || '';

  return {
    completedCount,
    totalCount,
    percentage,
    isCompleted: completedCount === totalCount && totalCount > 0,
    hasStarted: completedCount > 0,
    nextIncompleteLessonSlug
  };
}
