import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Logo & Tagline + Nav Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Left Column: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/">
              <Logo showText={true} isDarkBg={true} />
            </Link>
            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              Master the art of AI prompting. The leading education platform and real-time optimization suite for prompt engineers.
            </p>
          </div>

          {/* Right Columns: Nav Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Product */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li><Link to="/learn" className="hover:text-emerald-400 transition-colors">Learn</Link></li>
                <li><Link to="/challenges" className="hover:text-emerald-400 transition-colors">Challenges</Link></li>
                <li><Link to="/improve" className="hover:text-emerald-400 transition-colors">Improve</Link></li>
                <li><Link to="/extensions" className="hover:text-emerald-400 transition-colors">Extensions</Link></li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li><Link to="/docs" className="hover:text-emerald-400 transition-colors">Documentation</Link></li>
                <li><Link to="/cookbook" className="hover:text-emerald-400 transition-colors">Prompt Cookbook</Link></li>
                <li><Link to="/benchmarks" className="hover:text-emerald-400 transition-colors">LLM Benchmarks</Link></li>
                <li><Link to="/references" className="hover:text-emerald-400 transition-colors">References</Link></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                <li><Link to="/security" className="hover:text-emerald-400 transition-colors">Security Overview</Link></li>
                <li><Link to="/gdpr" className="hover:text-emerald-400 transition-colors">GDPR Compliance</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Social Icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Innovation Challenge 2026. Theme AI for Education - A13
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/phathsopheakmeangkuol2007-netizen" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://www.linkedin.com/in/phath-sopheakmeangkuol-97058b3ab" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

