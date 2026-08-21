import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { FeaturesOverview } from '../components/FeaturesOverview';
import { HowItWorks } from '../components/HowItWorks';
import { useModals } from '../context/ModalContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { openDemoModal } = useModals();

  useEffect(() => {
    document.title = 'Prompt AI | Master the Art of AI Prompting';
  }, []);

  return (
    <div className="bg-[#070A12] min-h-screen text-white">
      <HeroSection
        onStartLearning={() => navigate('/learn')}
        onWatchDemo={openDemoModal}
        onJumpToOptimizer={() => navigate('/improve')}
      />
      <FeaturesOverview />
      <HowItWorks />
    </div>
  );
};
