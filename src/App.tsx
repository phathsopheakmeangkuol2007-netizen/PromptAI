import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import { ScrollToTop } from './components/ScrollToTop';
import { PageLoader } from './components/PageLoader';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { CourseOverviewPage } from './pages/CourseOverviewPage';
import { LessonPage } from './pages/LessonPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ImprovePage } from './pages/ImprovePage';
import { ExtensionsPage } from './pages/ExtensionsPage';
import { DocsPage } from './pages/DocsPage';
import { CookbookPage } from './pages/CookbookPage';
import { BenchmarksPage } from './pages/BenchmarksPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { SecurityPage } from './pages/SecurityPage';
import { GdprPage } from './pages/GdprPage';

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <PageLoader />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="learn" element={<LearnPage />} />
            <Route path="learn/:courseSlug" element={<CourseOverviewPage />} />
            <Route path="learn/:courseSlug/:lessonSlug" element={<LessonPage />} />
            <Route path="challenges" element={<ChallengesPage />} />
            <Route path="improve" element={<ImprovePage />} />
            <Route path="extensions" element={<ExtensionsPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="cookbook" element={<CookbookPage />} />
            <Route path="benchmarks" element={<BenchmarksPage />} />
            <Route path="references" element={<ReferencesPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="gdpr" element={<GdprPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}
