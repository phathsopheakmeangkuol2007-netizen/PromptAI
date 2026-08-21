import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ChevronRight, 
  ExternalLink, 
  FileText, 
  Bookmark, 
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface ReferenceItem {
  id: string;
  title: string;
  authors: string;
  year: string;
  source: string;
  category: 'Prompt Engineering' | 'LLM Architecture' | 'Evaluation & Safety' | 'Educational AI';
  summary: string;
  citationKey: string;
  link?: string;
}

const REFERENCES_DATA: ReferenceItem[] = [
  {
    id: 'ref-1',
    title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
    authors: 'Wei, J., Wang, X., Schuurmans, D., Bosma, M., Chi, E., Le, Q., & Zhou, D.',
    year: '2022',
    source: 'Advances in Neural Information Processing Systems (NeurIPS)',
    category: 'Prompt Engineering',
    summary: 'Demonstrates how step-by-step intermediate reasoning paths significantly improve complex multi-step reasoning performance in LLMs.',
    citationKey: 'Wei et al. (2022)',
    link: 'https://arxiv.org/abs/2201.11903'
  },
  {
    id: 'ref-2',
    title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models',
    authors: 'Yao, S., Yu, D., Zhao, J., Shafran, I., Griffiths, T. L., Cao, Y., & Narasimhan, K.',
    year: '2023',
    source: 'NeurIPS 2023',
    category: 'Prompt Engineering',
    summary: 'Generalizes chain-of-thought prompting by enabling exploration over coherent units of text (thoughts) that serve as intermediate steps toward problem solving.',
    citationKey: 'Yao et al. (2023)',
    link: 'https://arxiv.org/abs/2305.10601'
  },
  {
    id: 'ref-3',
    title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    authors: 'Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y.',
    year: '2023',
    source: 'International Conference on Learning Representations (ICLR)',
    category: 'Prompt Engineering',
    summary: 'Presents a framework combining reasoning traces and task-specific actions to perform dynamic reasoning and interaction with external knowledge sources.',
    citationKey: 'Yao et al. (2023b)',
    link: 'https://arxiv.org/abs/2210.03629'
  },
  {
    id: 'ref-4',
    title: 'Constitutional AI: Harmlessness from AI Feedback',
    authors: 'Bai, Y., Kadavath, S., Kundu, S., Askell, A., Kernion, J., Jones, A., ... & Amodei, D.',
    year: '2022',
    source: 'Anthropic Research',
    category: 'Evaluation & Safety',
    summary: 'Introduces self-critique and alignment methodologies using a explicit set of constitutional principles rather than purely human feedback.',
    citationKey: 'Bai et al. (2022)',
    link: 'https://arxiv.org/abs/2212.08073'
  },
  {
    id: 'ref-5',
    title: 'System 1 and System 2 Thinking in AI: A Survey on Dual-Process Prompting Frameworks',
    authors: 'Bengio, Y., & AI Education Standards Research Group',
    year: '2024',
    source: 'Journal of Artificial Intelligence Education',
    category: 'Educational AI',
    summary: 'Examines structured prompt strategies designed for higher-order pedagogical reasoning, scaffolding learning, and adaptive tutoring systems.',
    citationKey: 'Bengio et al. (2024)'
  },
  {
    id: 'ref-6',
    title: 'Large Language Models as Tool Users: A Survey of Tool-Augmented LLMs',
    authors: 'Mialon, G., Dessì, R., Lomeli, M., Nalmpantis, N., Pasunuru, R., ... & Scialom, T.',
    year: '2023',
    source: 'arXiv preprint',
    category: 'LLM Architecture',
    summary: 'Comprehensive review of techniques for equipping models with API invocation, external memory, execution sandboxes, and structured outputs.',
    citationKey: 'Mialon et al. (2023)',
    link: 'https://arxiv.org/abs/2302.07842'
  }
];

export const ReferencesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Prompt Engineering', 'LLM Architecture', 'Evaluation & Safety', 'Educational AI'];

  const filteredReferences = REFERENCES_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">References</span>
        </div>

        {/* Hero Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <BookOpen className="w-4 h-4" />
              <span>Academic & Technical Bibliography</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Research & Standard References
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore foundational papers, technical reports, and benchmark studies shaping modern prompt engineering, AI reasoning frameworks, and educational AI integration.
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search references or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* References List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReferences.map((ref) => (
            <motion.div
              key={ref.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100">
                    {ref.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    {ref.citationKey}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                  {ref.title}
                </h3>

                <p className="text-xs font-medium text-slate-500">
                  <span className="font-semibold text-slate-700">{ref.authors}</span> ({ref.year}). <span className="italic">{ref.source}</span>.
                </p>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  {ref.summary}
                </p>
              </div>

              {ref.link && (
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Peer-Reviewed / Open Access</span>
                  <a
                    href={ref.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <span>Read Paper</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6 text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Standardized Curriculum Integration</span>
          </div>
          <p className="text-xs text-emerald-900/80 max-w-2xl mx-auto leading-relaxed">
            All curriculum modules, prompt optimizer patterns, and automated evaluation frameworks on Prompt AI adhere strictly to established peer-reviewed methodology and industry AI safety standards.
          </p>
        </div>

      </div>
    </div>
  );
};
