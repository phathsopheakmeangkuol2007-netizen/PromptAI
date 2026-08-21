import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldAlert, Key, Lock, Server, CheckCircle2 } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Security Overview | Prompt AI';
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-[emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Security Overview</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[emerald-600">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Security Overview</h1>
            <p className="text-xs text-slate-500 font-mono">Defense-in-Depth Architecture & Data Protection</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Security is integral to everything we build. Prompt AI enforces strict zero-data-retention principles, client-side encryption, and safe extension practices to protect developer prompts and API key credentials.
          </p>
        </div>

        {/* Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">1. Client-Side API Key Encryption</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              When configuring API keys for browser extensions or custom model proxies, credentials are encrypted in your browser using AES-GCM 256-bit encryption. Keys are never transmitted to Prompt AI telemetry servers.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[emerald-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">2. Zero Prompt Data Logging</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prompts transformed in the Prompt Improver or submitted during challenge drills are processed ephemerally in memory. Prompt text is never saved to database persistent storage or used to train public models.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">3. Isolated Extension Execution</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our Chrome and Firefox extensions run in sandboxed content-script environments with strictly defined host permissions. They interact with chat textareas without accessing unrelated web browsing data or cookies.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">4. Continuous Security Auditing</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our web codebase and extension scripts undergo automated static analysis and vulnerability scans. Dependency trees are audited weekly for OWASP compliance.
            </p>
          </div>

        </div>

        {/* Security Reporting Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Have a security vulnerability to report?</h3>
            <p className="text-xs text-slate-300">We welcome responsible disclosure reports from security researchers.</p>
          </div>
          <a
            href="mailto:security@promptai.com"
            className="bg-[emerald-600 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shrink-0"
          >
            Report Vulnerability
          </a>
        </div>

      </div>
    </div>
  );
};
