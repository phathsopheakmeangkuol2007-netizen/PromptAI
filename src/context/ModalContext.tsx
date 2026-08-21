import React, { createContext, useContext, useState } from 'react';
import { DemoModal } from '../components/Modals/DemoModal';
import { ChallengeModal } from '../components/Modals/ChallengeModal';

interface ModalContextType {
  openAuthModal: (mode?: 'login' | 'signup') => void;
  openDemoModal: () => void;
  openChallengeModal: (challengeId?: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | undefined>(undefined);

  const openAuthModal = () => {
    // Auth modal disabled/removed per user request
  };

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);

  const openChallengeModal = (challengeId?: string) => {
    if (challengeId) {
      setSelectedChallengeId(challengeId);
    }
    setIsChallengeModalOpen(true);
  };
  const closeChallengeModal = () => setIsChallengeModalOpen(false);

  return (
    <ModalContext.Provider value={{ openAuthModal, openDemoModal, openChallengeModal }}>
      {children}

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={closeDemoModal}
        onStartFree={closeDemoModal}
      />

      <ChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={closeChallengeModal}
        challengeId={selectedChallengeId}
      />
    </ModalContext.Provider>
  );
};

export const useModals = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
};
