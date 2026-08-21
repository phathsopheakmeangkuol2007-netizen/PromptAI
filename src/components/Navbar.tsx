import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Menu, X, ArrowLeft } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Learn', path: '/learn' },
    { label: 'Challenges', path: '/challenges' },
    { label: 'Improve', path: '/improve' },
    { label: 'Extensions', path: '/extensions' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.key === 'Escape' && location.pathname !== '/') {
        handleGoBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [location.pathname, navigate]);

  const isDarkPage = location.pathname === '/';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkPage 
          ? isScrolled 
            ? 'bg-[#070A12]/90 backdrop-blur-md border-b border-slate-800/80 shadow-xl py-2.5' 
            : 'bg-transparent py-4'
          : isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2.5'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-2xs py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Side: Logo & Go Back Button Below Prompt AI */}
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center group">
            <Logo isDarkBg={isDarkPage} />
          </Link>

          {location.pathname !== '/' && (
            <button
              onClick={handleGoBack}
              title="Click or press Escape to go back"
              className="flex items-center gap-1.5 mt-2.5 px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer group text-slate-600 hover:text-emerald-600 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/80 shadow-2xs"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600 group-hover:-translate-x-0.5 transition-transform" />
              <span>Go Back</span>
            </button>
          )}
        </div>

        {/* Center / Right Nav Links (Desktop) */}
        <nav 
          className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 ${
            isDarkPage
              ? 'bg-slate-900/80 backdrop-blur-md border-slate-800 shadow-xl'
              : 'bg-white/90 backdrop-blur-md border-slate-200/90 shadow-xs hover:shadow-md'
          }`}
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                  active
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : isDarkPage
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg focus:outline-none transition-colors ${
              isDarkPage
                ? 'text-white hover:bg-slate-800/80'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {location.pathname !== '/' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoBack();
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-left"
              >
                <ArrowLeft className="w-5 h-5 text-emerald-600" />
                <span>Go Back</span>
              </button>
            )}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                location.pathname === '/' ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                    active ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};