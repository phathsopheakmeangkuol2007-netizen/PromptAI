import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EXTENSION_BROWSERS, DEEP_DIVE_FEATURES } from '../data/mockData';
import { 
  Plug, 
  Check, 
  ArrowRight, 
  Star, 
  Zap, 
  Download, 
  ChevronRight, 
  Command, 
  Sparkles,
  Sliders,
  Layers,
  Copy,
  Settings,
  ShieldCheck,
  RotateCcw,
  Globe,
  Radio,
  FileCode,
  Laptop,
  CheckCircle2,
  X,
  Play,
  HelpCircle,
  AlertCircle,
  ExternalLink,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ChromeLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 12c-4.4 0-8.2 2.4-10.2 6L4.2 8.4C8.7 3.3 15.9 0 24 0c11.5 0 21.1 8 23.4 18.8H34.1c-1.8-4-5.8-6.8-10.1-6.8z" />
    <path fill="#FBBC05" d="M47.4 18.8C47.8 20.5 48 22.2 48 24c0 13.3-10.7 24-24 24-2.8 0-5.5-.5-8-1.4l9.6-16.6c.8.3 1.6.5 2.4.5 5 0 9.2-3.3 10.5-7.7h14.9z" />
    <path fill="#34A853" d="M24 48C10.7 48 0 37.3 0 24c0-5.8 2.1-11.2 5.6-15.4l9.6 16.6C16.1 29 19.7 32 24 32c2.1 0 4.1-.7 5.7-1.9l9.6 16.5C34.8 47.1 29.6 48 24 48z" />
    <circle cx="24" cy="24" r="11" fill="#FFFFFF" />
    <circle cx="24" cy="24" r="8.5" fill="#1A73E8" />
  </svg>
);

const FirefoxLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ff-orb" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#805AD5" />
        <stop offset="55%" stopColor="#5A67D8" />
        <stop offset="100%" stopColor="#3182CE" />
      </radialGradient>
      <linearGradient id="ff-flame-top" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stopColor="#FFF5F0" />
        <stop offset="25%" stopColor="#FFD400" />
        <stop offset="60%" stopColor="#FF9000" />
        <stop offset="100%" stopColor="#FF3600" />
      </linearGradient>
      <linearGradient id="ff-fox-main" x1="0%" y1="20%" x2="100%" y2="80%">
        <stop offset="0%" stopColor="#FFB700" />
        <stop offset="25%" stopColor="#FF6200" />
        <stop offset="65%" stopColor="#E6005C" />
        <stop offset="100%" stopColor="#9C007A" />
      </linearGradient>
      <linearGradient id="ff-tail-swoosh" x1="80%" y1="10%" x2="20%" y2="90%">
        <stop offset="0%" stopColor="#FFE500" />
        <stop offset="50%" stopColor="#FF7300" />
        <stop offset="100%" stopColor="#E60050" />
      </linearGradient>
    </defs>
    <path
      d="M62 2C62 2 50 12 46 28C43 17 52 4 52 4C52 4 33 17 30 37C26 27 30 14 30 14C30 14 16 30 22 50C16 40 18 30 18 30C18 30 3 47 10 70C12 76 16 82 21 87C14 77 12 64 18 52C18 52 26 64 38 62C30 54 30 42 40 34C46 29 54 28 60 32C66 36 68 44 64 52C72 44 73 34 70 26C78 36 80 50 76 62C83 52 84 38 80 27C90 42 92 60 86 76C80 90 66 100 50 100C24 100 3 79 3 53C3 40 8 28 16 19C16 19 8 34 12 50"
      fill="url(#ff-flame-top)"
    />
    <circle cx="50" cy="52" r="23" fill="url(#ff-orb)" />
    <path
      d="M50 97C24.5 97 3.8 76.3 3.8 50.8C3.8 36.3 10.5 23.3 21 14.8C19 22.9 20.3 31.6 25.2 38.7C30.1 45.8 37.8 50.2 46.4 50.5C52 50.7 57.5 48.7 61.7 44.9C65.9 41.1 68.3 35.8 68.3 30.1C68.3 26 67.1 22 65 18.5C74.3 24.6 79.8 35 79.8 46.2C79.8 60.2 71.4 72.4 58.7 77.4C54 79.3 48.8 79.1 44.3 76.9C39.8 74.7 36.3 70.7 34.6 65.8C32.9 60.9 33.2 55.4 35.4 50.7C37.6 46 41.5 42.4 46.3 40.6C39.8 40.6 33.7 44.1 30.6 49.8C27.5 55.5 27.7 62.4 31.1 67.8C34.5 73.2 40.8 76.6 47.3 76.6C59.5 76.6 69.4 66.7 69.4 54.5C69.4 48.6 67.1 43 62.9 38.8C72 44.4 77.8 54.5 77.8 65.4C77.8 82.8 63.6 97 46.2 97H50Z"
      fill="url(#ff-fox-main)"
    />
    <path
      d="M62 30C62 30 73 39 73 51C73 63 62 73 50 73C41 73 34 69 30 62C35 66 43 68 49 66C58 63 65 54 65 43C65 38 63 33 59 30C60 30 61 30 62 30Z"
      fill="url(#ff-tail-swoosh)"
    />
  </svg>
);

const EdgeLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="edge-blue-wave" x1="12%" y1="12%" x2="88%" y2="88%">
        <stop offset="0%" stopColor="#052C65" />
        <stop offset="30%" stopColor="#005A9E" />
        <stop offset="65%" stopColor="#0078D4" />
        <stop offset="100%" stopColor="#00A4EF" />
      </linearGradient>
      <linearGradient id="edge-green-cyan-wave" x1="10%" y1="90%" x2="90%" y2="10%">
        <stop offset="0%" stopColor="#00A4EF" />
        <stop offset="35%" stopColor="#00B7F4" />
        <stop offset="70%" stopColor="#00D8B6" />
        <stop offset="100%" stopColor="#32D74B" />
      </linearGradient>
    </defs>
    <path
      d="M128 12C63.9 12 12 63.9 12 128c0 64.1 51.9 116 116 116 48.8 0 90.9-30 108.3-72.7-22.1 20.3-51.7 31.5-82.6 28.1-45.7-5.1-81.2-42.3-84.5-88.1-3.6-50 35.8-92.3 85.3-92.3 22 0 42.4 8.2 57.9 22.8-19.1-17.7-44.5-27.8-71.4-27.8-11 0-21.7 1.7-31.8 4.9C119 13.9 123.5 12 128 12z"
      fill="url(#edge-blue-wave)"
    />
    <path
      d="M128 12c41.3 0 78.8 19.5 102.5 50 14.5 18.7 21.5 42 19.5 65.5-3.3 38.8-31 71.3-69.5 78.8 33-11.8 56.5-43 56.5-79.3 0-46.9-38-85-85-85-17.3 0-33.4 5.2-46.8 14.1C118.7 29.8 123.3 12 128 12z"
      fill="url(#edge-green-cyan-wave)"
    />
  </svg>
);

const renderBrowserIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('firefox')) {
    return <FirefoxLogo className="w-7 h-7" />;
  }
  if (lowerName.includes('edge')) {
    return <EdgeLogo className="w-7 h-7" />;
  }
  return <ChromeLogo className="w-7 h-7" />;
};

interface SamplePrompt {
  id: string;
  label: string;
  raw: string;
  strategy: 'Role & Scaffolding' | 'Chain of Thought' | 'Structured JSON' | 'Midjourney V6';
  enhanced: string;
  scoreBefore: number;
  scoreAfter: number;
}

const SAMPLE_PROMPTS: SamplePrompt[] = [
  {
    id: 'p1',
    label: 'Client Email',
    raw: 'Draft an email to client asking for overdue payment.',
    strategy: 'Role & Scaffolding',
    enhanced: `Act as a courteous yet firm Accounts Receivable Manager at a SaaS company. Write a professional email reminding a key B2B client about Invoice #INV-2026-88 (Amount: $4,250, Overdue: 14 days). Include:\n1. Warm opening acknowledging recent milestones\n2. Clear reference to invoice date and amount\n3. Convenient payment link options (ACH / Stripe / Credit Card)\n4. Polite request to confirm receipt or report billing issues.`,
    scoreBefore: 42,
    scoreAfter: 98
  },
  {
    id: 'p2',
    label: 'Python CSV Parser',
    raw: 'Write python code to read CSV and send alert if price spike.',
    strategy: 'Chain of Thought',
    enhanced: `You are a Principal Backend Engineer. Write a robust Python 3.11 script using pandas and requests to parse an incoming market price CSV stream. Perform the following step-by-step:\n1. Load CSV with schema validation and missing value handling\n2. Calculate 15-minute rolling average price per asset\n3. Trigger a Slack webhook alert if current price > 20% over rolling average\n4. Add comprehensive try-except logging and environment variable config for Slack Webhook URL.`,
    scoreBefore: 51,
    scoreAfter: 96
  },
  {
    id: 'p3',
    label: 'Midjourney Prompt',
    raw: 'Futuristic AI classroom with students',
    strategy: 'Midjourney V6',
    enhanced: `A futuristic holographic AI classroom in year 2030, high-school students wearing minimalist neural interfaces interacting with floating 3D glowing DNA strands, soft cinematic natural lighting from floor-to-ceiling glass windows, architectural minimalist design, photorealistic --ar 16:9 --v 6.0 --style raw --q 2`,
    scoreBefore: 35,
    scoreAfter: 95
  },
  {
    id: 'p4',
    label: 'Physics Summary',
    raw: 'Explain quantum computing in simple terms',
    strategy: 'Structured JSON',
    enhanced: `You are an award-winning STEM Educator. Explain quantum computing to a high school senior using an engaging analogy (e.g. coin spinning vs coin on table). Return your output strictly in JSON format with keys:\n{\n  "headline": string,\n  "analogies": string[],\n  "keyDifferencesClassicalVsQuantum": string[],\n  "realWorldApplications": string[],\n  "takeawaySummary": string\n}`,
    scoreBefore: 48,
    scoreAfter: 99
  }
];

export const ExtensionsPage: React.FC = () => {
  const [extensionModel, setExtensionModel] = useState<'ChatGPT' | 'Claude' | 'Gemini' | 'Midjourney'>('ChatGPT');
  const [currentPromptIndex, setCurrentPromptIndex] = useState<number>(0);
  const [userCustomRaw, setUserCustomRaw] = useState<string>('');
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [hasEnhanced, setHasEnhanced] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [installed, setInstalled] = useState<string | null>(null);

  // Settings State
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<string | null>(null);
  const [shortcutKey, setShortcutKey] = useState<'Cmd + K' | 'Alt + K' | 'Cmd + Shift + P'>('Cmd + K');
  const [autoImproveOnType, setAutoImproveOnType] = useState<boolean>(true);
  const [showQualityBadge, setShowQualityBadge] = useState<boolean>(true);
  const [personaPreset, setPersonaPreset] = useState<string>('Senior Specialist & Educator');
  const [testConnectionStatus, setTestConnectionStatus] = useState<'idle' | 'testing' | 'success'>('idle');

  useEffect(() => {
    document.title = 'Browser Extensions | Prompt AI';
    window.scrollTo(0, 0);
  }, []);

  const activeSample = SAMPLE_PROMPTS[currentPromptIndex];
  const activeRaw = userCustomRaw !== '' ? userCustomRaw : activeSample.raw;

  const handleEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      setHasEnhanced(true);
    }, 600);
  };

  const handleTestHandshake = () => {
    setTestConnectionStatus('testing');
    setTimeout(() => {
      setTestConnectionStatus('success');
    }, 1200);
  };

const handleDownloadZip = () => {
    const a = document.createElement("a");
    a.href = "/promptai-extension.zip";
    a.download = "promptai-extension.zip";
    a.click();
  };
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Extensions</span>
        </div>

        {/* Page Hero Header - Dark Navy Blue (#0A0E1A) */}
        <div className="space-y-6">
          <div className="bg-[#0A0E1A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/40 text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4 text-teal-400" />
                <span>CHROME EXTENSION &nbsp;·&nbsp; LIVE PROMPT GRADING</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                A quiet dot that tells you when your prompt <span className="text-[#FF6B6B]">isn't ready</span> and when it's <span className="text-[#34D399]">good to send</span>.
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                PromptAI sits on the ChatGPT and Claude input box and grades what you're typing in real time — red, yellow, green — then tells you what's missing.
              </p>
            </div>
          </div>

          {/* Early Development Notice Banner */}
          <div className="bg-[#FFFDF0] border border-[#FDE047] text-[#92400E] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-3.5 shadow-2xs">
            <AlertCircle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              <span className="mr-1">⚠️</span> <strong>This feature is still in early development and may not work reliably yet.</strong> Live auto-correction accuracy is limited at this stage — we're actively improving it. Full functionality is coming in a future update.
            </p>
          </div>

          {/* Action Row Below Hero Card */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadZip}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Download the extension</span>
              </button>

              <button
                onClick={() => {
                  document.getElementById('setup-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
              >
                <span>Watch the demo &rarr;</span>
              </button>
            </div>

            {/* Feature Bullets */}
            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Gemini API key is optional
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Open source, load unpacked
              </span>
            </div>
          </div>
        </div>

        {/* COLOR REFERENCE SECTION */}
        <div className="pt-8 sm:pt-12 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#34D399]">
              COLOR REFERENCE
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Four states, one dot.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* BAD */}
            <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-2xs">
              <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] mx-auto" />
              <div className="text-[11px] font-mono font-bold text-slate-400 tracking-wider uppercase">
                BAD
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700">
                Weak prompt
              </div>
            </div>

            {/* OKAY */}
            <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-2xs">
              <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B] mx-auto" />
              <div className="text-[11px] font-mono font-bold text-slate-400 tracking-wider uppercase">
                OKAY
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700">
                Could be sharper
              </div>
            </div>

            {/* GOOD */}
            <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-2xs">
              <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] mx-auto" />
              <div className="text-[11px] font-mono font-bold text-slate-400 tracking-wider uppercase">
                GOOD
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700">
                Solid prompt
              </div>
            </div>

            {/* IDLE / ERROR */}
            <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-2xs">
              <div className="w-3.5 h-3.5 rounded-full bg-[#94A3B8] mx-auto" />
              <div className="text-[11px] font-mono font-bold text-slate-400 tracking-wider uppercase">
                IDLE / ERROR
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700">
                Waiting or network issue
              </div>
            </div>
          </div>
        </div>

        {/* SETUP SECTION - Matched to design image */}
        <div id="setup-section" className="pt-12 sm:pt-16 pb-6 space-y-8">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#34D399]">
              SETUP
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Three steps, entirely local.
            </h2>
            <p className="text-slate-500 text-base sm:text-lg font-normal">
              No account, no server. An API key is optional — add one only if you want it.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            {/* Step 01 */}
            <div className="flex items-start gap-5 sm:gap-8">
              <span className="text-xs font-mono font-bold text-[#8B5CF6] tracking-wider pt-1 shrink-0">
                01
              </span>
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Load the extension unpacked
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Open <code className="bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">chrome://extensions</code> , toggle <strong>Developer mode</strong> on, click <strong>Load unpacked</strong>, and select the unzipped <code className="bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">promptai-extension</code> folder.
                </p>
              </div>
            </div>

            <div className="border-b border-slate-200/80" />

            {/* Step 02 */}
            <div className="flex items-start gap-5 sm:gap-8">
              <span className="text-xs font-mono font-bold text-[#8B5CF6] tracking-wider pt-1 shrink-0">
                02
              </span>
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Add a Gemini API key (optional)
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Click the toolbar icon and paste a key from <code className="bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">aistudio.google.com/apikey</code> if you have one. Skip this step and PromptAI still runs.
                </p>
              </div>
            </div>

            <div className="border-b border-slate-200/80" />

            {/* Step 03 */}
            <div className="flex items-start gap-5 sm:gap-8">
              <span className="text-xs font-mono font-bold text-[#8B5CF6] tracking-wider pt-1 shrink-0">
                03
              </span>
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Reload ChatGPT or Claude
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Refresh any open tab on <code className="bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">chatgpt.com</code> or <code className="bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">claude.ai</code> and start typing — the dot appears by the input box.
                </p>
              </div>
            </div>
          </div>

          {/* Video Demo Section */}
          <div className="bg-[#0A0E1A] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-slate-800/80 space-y-6 mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#34D399]">
                  <Video className="w-4 h-4" />
                  <span>VIDEO WALKTHROUGH DEMO</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Watch How to Install & Use the Extension
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
                  Watch this step-by-step video demo to see how to load the unpacked extension in Chrome, configure options, and see live prompt grading in action.
                </p>
              </div>

              <a
                href="https://youtu.be/zEAiuX0A58A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all self-start sm:self-auto shrink-0"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
              <iframe
                className="w-full h-full border-0"
                src="https://www.youtube-nocookie.com/embed/zEAiuX0A58A"
                title="PromptAI Extension Setup Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* GET STARTED / DOWNLOAD SECTION - Matched to design image */}
        <div className="py-16 sm:py-20 text-center space-y-6 border-t border-slate-200/80">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#34D399]">
            GET STARTED
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Install PromptAI in under a minute.
          </h2>

          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            Download the extension folder, then follow the three setup steps above.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleDownloadZip}
              className="bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Download promptai-extension.zip</span>
            </button>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>manifest v3 &nbsp;·&nbsp; content script + service worker &nbsp;·&nbsp; ~17 KB</span>
            </div>
          </div>
        </div>

      </div>

      {/* Extension Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setShowSettingsModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                  <Settings className="w-3.5 h-3.5" />
                  <span>Extension Preferences</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Co-Pilot Extension Configuration</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Keyboard Shortcut Trigger</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Cmd + K', 'Alt + K', 'Cmd + Shift + P'] as const).map((k) => (
                      <button
                        key={k}
                        onClick={() => setShortcutKey(k)}
                        className={`p-2.5 rounded-xl font-mono font-bold border transition-all text-center ${
                          shortcutKey === k 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Default Persona Preset</label>
                  <select
                    value={personaPreset}
                    onChange={(e) => setPersonaPreset(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Senior Specialist & Educator">Senior Specialist & Educator</option>
                    <option value="Accounts Manager">Accounts Manager</option>
                    <option value="Software Architect">Software Architect</option>
                    <option value="Creative Director">Creative Director</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="font-semibold text-slate-800">Auto-Improve on Typing</span>
                    <input 
                      type="checkbox" 
                      checked={autoImproveOnType} 
                      onChange={(e) => setAutoImproveOnType(e.target.checked)}
                      className="accent-emerald-600 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="font-semibold text-slate-800">Show Live Quality Score Pill</span>
                    <input 
                      type="checkbox" 
                      checked={showQualityBadge} 
                      onChange={(e) => setShowQualityBadge(e.target.checked)}
                      className="accent-emerald-600 w-4 h-4"
                    />
                  </label>
                </div>

                {/* Handshake Test */}
                <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-slate-300 block">Connection Handshake</span>
                    <span className="text-[10px] text-slate-400">Verify extension local state sync</span>
                  </div>

                  <button
                    onClick={handleTestHandshake}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1"
                  >
                    {testConnectionStatus === 'testing' ? (
                      <span>Testing...</span>
                    ) : testConnectionStatus === 'success' ? (
                      <span className="flex items-center gap-1 text-emerald-300">
                        <Check className="w-3.5 h-3.5" /> Connected
                      </span>
                    ) : (
                      <span>Test Handshake</span>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all"
              >
                Save & Close Preferences
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Browser Installation Guide Modal */}
      <AnimatePresence>
        {showInstallModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setShowInstallModal(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                  {renderBrowserIcon(showInstallModal)}
                  <span>Prompt AI for {showInstallModal}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Installation Guide</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Option A: 1-Click Store Installation</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Instantly add Prompt AI Co-Pilot from the official {showInstallModal} Extension Store with auto-updates enabled.
                  </p>
                  <button 
                    onClick={() => {
                      alert(`Successfully simulated installation for ${showInstallModal}! Extension active.`);
                      setShowInstallModal(null);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl transition-all"
                  >
                    Launch Official {showInstallModal} Store Page
                  </button>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-blue-600" />
                    <span>Option B: Developer Unpacked Mode (.zip)</span>
                  </h4>
                  <ol className="list-decimal list-inside text-slate-600 space-y-1 pl-1">
                    <li>Download the compiled extension manifest archive.</li>
                    <li>Open <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">{showInstallModal.toLowerCase().includes('firefox') ? 'about:debugging' : 'chrome://extensions'}</code>.</li>
                    <li>Enable <strong>Developer Mode</strong> in top-right toggle.</li>
                    <li>Click <strong>Load Unpacked</strong> and select the extracted folder.</li>
                  </ol>
                </div>
              </div>

              <button
                onClick={() => setShowInstallModal(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
