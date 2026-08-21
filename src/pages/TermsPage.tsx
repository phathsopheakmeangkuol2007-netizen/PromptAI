import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms of Service | Prompt AI';
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-[emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Terms of Service</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[emerald-600">
            <Scale className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Terms of Service</h1>
            <p className="text-xs text-slate-500 font-mono">Last Updated: January 15, 2026 • Effective Immediately</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Please read these Terms of Service ("Terms") carefully before using the Prompt AI application, courseware, and browser extensions operated by Prompt AI Technologies Inc.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">1.</span> Acceptance of Terms
            </h2>
            <p>
              By accessing or using Prompt AI, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to all of these Terms, you may not access or use the platform.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">2.</span> Acceptable Use
            </h2>
            <p>You agree not to use Prompt AI to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>Generate prompts intended to bypass AI model safety guardrails or harm third parties.</li>
              <li>Attempt to reverse-engineer or scrape platform courseware for unauthorized commercial resale.</li>
              <li>Interfere with the normal operation or network infrastructure of the platform.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">3.</span> AI-Generated Content Disclaimer
            </h2>
            <p>
              Prompt AI provides educational guides and automated prompt structuring tools. We make no guarantees regarding the accuracy, completeness, or safety of output produced by third-party Large Language Models (such as ChatGPT, Claude, or Gemini) when using generated prompts.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">4.</span> Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Prompt AI Technologies Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[emerald-600">5.</span> Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Delaware, United States, without regard to its conflict of law provisions.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
