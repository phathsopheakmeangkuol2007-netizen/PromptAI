import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Dismiss the preloader once React has mounted
const dismissPreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Small delay to let the progress bar finish
    setTimeout(() => {
      preloader.classList.add('fade-out');
      // Remove from DOM after transition
      setTimeout(() => {
        preloader.remove();
      }, 700);
    }, 500);
  }
};

// Use requestIdleCallback for best timing, fallback to setTimeout
if ('requestIdleCallback' in window) {
  requestIdleCallback(dismissPreloader);
} else {
  setTimeout(dismissPreloader, 100);
}
