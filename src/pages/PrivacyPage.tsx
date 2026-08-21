import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Lock, Eye, HardDrive, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Prompt AI';
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-[emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Privacy Policy</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-slate-500 font-mono">Last Updated: January 15, 2026 • Effective Immediately</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            At Prompt AI ("we", "our", or "us"), we prioritize the privacy and security of our users. This Privacy Policy outlines how we handle data when you use the Prompt AI web application, browser extensions, and educational courseware.
          </p>
        </div>

        {/* Legal Text Sections */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">1.</span> Overview & Privacy-First Architecture
            </h2>
            <p>
              Prompt AI is designed with a local-first philosophy. Your interactive course progress, custom challenge scores, prompt improver drafts, and configuration settings are stored locally within your web browser using HTML5 LocalStorage. We do not require account registration or store sensitive personal information on centralized servers.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">2.</span> Information We Process
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <p><strong>Local State Data:</strong> Progress across modules, XP score counters, and preferred theme settings stored in your local browser cache.</p>
              <p><strong>Prompt Optimizer Inputs:</strong> Text prompts submitted to the Prompt Improver engine are processed dynamically to generate RTCC-structured output. We do not store, log, or harvest the contents of your prompts.</p>
              <p><strong>Browser Extension Data:</strong> The Prompt AI extension reads active draft text only when you explicitly invoke the "Enhance Prompt" overlay on supported AI model web interfaces (ChatGPT, Claude, Gemini).</p>
            </div>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">3.</span> Third-Party AI API Services
            </h2>
            <p>
              When using live optimization or extension auto-fill features, requests may be routed through official API endpoints (such as OpenAI, Anthropic, or Google Gemini). Interactions with these models are governed by the respective privacy policies and enterprise zero-data-retention agreements of those model providers.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">4.</span> Cookies and Local Storage
            </h2>
            <p>
              We do not use tracking or advertising cookies. HTML5 LocalStorage is used exclusively for functional purposes to remember your course completion state and preferences across browser sessions. You can clear this data at any time via your browser settings.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">5.</span> Contact Us
            </h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please contact our Privacy Team at <a href="mailto:phathsopheakmeangkuol2007@gmail.com" className="text-[emerald-600 font-bold hover:underline">phathsopheakmeangkuol2007@gmail.com</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
