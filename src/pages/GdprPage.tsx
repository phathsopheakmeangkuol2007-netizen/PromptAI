import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Globe2, UserCheck, Trash2, Download, ShieldCheck } from 'lucide-react';

export const GdprPage: React.FC = () => {
  useEffect(() => {
    document.title = 'GDPR Compliance | Prompt AI';
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-[emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">GDPR Compliance</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Globe2 className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">GDPR Compliance Notice</h1>
            <p className="text-xs text-slate-500 font-mono">General Data Protection Regulation (EU 2016/679)</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Prompt AI is fully committed to compliance with the European Union General Data Protection Regulation (GDPR). Because our platform is built on a local-first architecture, EU users maintain total control over their personal data at all times.
          </p>
        </div>

        {/* Your EU Rights Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Your Data Protection Rights Under GDPR</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <UserCheck className="w-4 h-4 text-[emerald-600" />
                <span>Right of Access & Rectification</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                You have the right to view all progress and preferences data stored by Prompt AI. Because data is stored in your local browser, you can inspect or update it at any time.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Trash2 className="w-4 h-4 text-red-500" />
                <span>Right to Erasure ("Right to be Forgotten")</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                You can instantly delete all stored data by clearing your browser's site data or LocalStorage cache for promptai.com. No remote server backup persists.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Download className="w-4 h-4 text-blue-600" />
                <span>Right to Data Portability</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                You can export your custom prompts and challenge history as standard JSON formatted data directly from your browser settings.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Zero Tracking & Consent Choice</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Prompt AI does not deploy cross-site tracking cookies, behavioral advertising trackers, or fingerprinting scripts.
              </p>
            </div>

          </div>
        </div>

        {/* Legal Contact for EU Data Protection Officer */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 space-y-3 text-xs sm:text-sm text-slate-600">
          <h3 className="text-base font-bold text-slate-900">Data Protection Officer (DPO) Contact</h3>
          <p>
            If you reside in the European Economic Area (EEA) and wish to make a formal data inquiry or exercise GDPR rights, please email our designated Data Protection Officer at:
          </p>
          <div className="font-mono text-xs font-bold text-[emerald-600 bg-slate-50 p-3 rounded-xl border border-slate-200 inline-block">
            dpo@promptai.com
          </div>
        </div>

      </div>
    </div>
  );
};
