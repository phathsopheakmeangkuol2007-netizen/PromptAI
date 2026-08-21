import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MIN_DISPLAY_TIME = 1200; // ms — loader bar duration

export const PageLoader: React.FC = () => {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApp(true);
    }, MIN_DISPLAY_TIME);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!showApp && (
        <motion.div
          key="top-bar-loader"
          className="fixed inset-0 z-[9999] pointer-events-none select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Render-Style Top Progress Bar Only */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/50 z-50 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 origin-left shadow-[0_0_12px_rgba(16,185,129,0.9)]"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{
                duration: MIN_DISPLAY_TIME / 1000,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};