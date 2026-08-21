export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  color: string;
  badge?: string;
}

export interface DeepDiveFeature {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  ctaText: string;
  accentColor: string;
  mockupType: 'learn' | 'challenges' | 'improve' | 'extensions';
}

export interface PromptTransformation {
  id: string;
  category: string;
  badPrompt: string;
  improvedPrompt: string;
  scoreBefore: { clarity: number; specificity: number; structure: number; total: number };
  scoreAfter: { clarity: number; specificity: number; structure: number; total: number };
  improvements: string[];
  technique: string;
}

export interface PromptChallenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  points: number;
  scenario: string;
  targetOutput: string;
  initialPrompt: string;
  hint: string;
  solutionExample: string;
  scoringCriteria: { name: string; weight: number }[];
}

export interface CourseModule {
  id: string;
  title: string;
  level: string;
  duration: string;
  lessonsCount: number;
  icon: string;
  description: string;
  topics: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  improvedCount: string;
  badge: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular?: boolean;
  ctaText: string;
  features: { text: string; included: boolean; isHighlight?: boolean }[];
}

export interface ExtensionBrowser {
  name: string;
  icon: string;
  users: string;
  rating: number;
  supportedModels: string[];
}
