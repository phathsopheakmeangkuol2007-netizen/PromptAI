import { CourseModule } from '../types';
import { category1Course } from './courses/category1_intro';
import { category2Course } from './courses/category2_core';
import { category3Course } from './courses/category3_advanced';
import { category4Course } from './courses/category4_safety';
import { category5Course } from './courses/category5_models';
import { category6Course } from './courses/category6_practical';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContentSection {
  heading: string;
  body: string;
  tip?: string;
}

export interface PromptExample {
  title: string;
  badText: string;
  badFlaw: string;
  goodText: string;
  goodBreakdown: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  summary: string;
  contentSections: LessonContentSection[];
  example?: PromptExample;
  takeaways?: string[];
  tryItTip?: {
    promptToTry: string;
    description: string;
  };
  interactiveSnippet?: {
    systemPrompt: string;
    userPrompt: string;
    expectedOutput: string;
  };
  quiz: QuizQuestion[];
}

export interface Course extends CourseModule {
  slug: string;
  category?: string;
  lessons: Lesson[];
}

export const COURSES_DATA: Course[] = [
  category1Course,
  category2Course,
  category3Course,
  category4Course,
  category5Course,
  category6Course
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES_DATA.find((c) => c.slug === slug);
}

export function getLessonBySlugs(courseSlug: string, lessonSlug: string): { course: Course; lesson: Lesson; lessonIndex: number } | undefined {
  // First, search within the matching course
  const course = getCourseBySlug(courseSlug);
  if (course) {
    const lessonIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);
    if (lessonIndex !== -1) {
      return { course, lesson: course.lessons[lessonIndex], lessonIndex };
    }
  }

  // Fallback: search across all courses for the lesson slug
  for (const c of COURSES_DATA) {
    const lessonIndex = c.lessons.findIndex((l) => l.slug === lessonSlug);
    if (lessonIndex !== -1) {
      return { course: c, lesson: c.lessons[lessonIndex], lessonIndex };
    }
  }

  return undefined;
}
