import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { HomepageSectionsConfig } from '../types';
import {
  Layers,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Save,
  RotateCcw,
  ExternalLink,
  Compass,
  TrendingUp,
  Building2,
  Activity,
  Award,
  Target,
  Briefcase,
  GraduationCap,
  BookOpen,
  UserCheck,
  PhoneCall,
  Search,
  Filter,
  Check,
  Info,
} from 'lucide-react';

interface SectionDefinition {
  id: keyof HomepageSectionsConfig;
  number: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  anchor: string;
  keyElements: string[];
}

const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    id: 'heroBanner',
    number: '01',
    name: 'Corporate Hero Banner & 3D Interactive Viewport',
    tagline: 'First impression hero backdrop with glowing bull & bear artwork',
    category: 'Branding & Hero',
    description: 'Renders the full-width high-impact hero section with headline "Trusted Partner for Generations to Come", subheadings, and quick action CTA buttons.',
    icon: Compass,
    anchor: '#hero',
    keyElements: ['Bull & Bear Artwork', 'Primary CTA Buttons', 'AMFI Registration Badge'],
  },
  {
    id: 'statsRibbon',
    number: '02',
    name: 'Institutional Experience & Metrics Ribbon',
    tagline: 'Key trust figures and operational milestones',
    category: 'Trust & Credibility',
    description: 'Displays numerical achievement indicators: 30+ Years Industry Experience, 5000+ Satisfied Families, and ₹500 Cr+ Assets Facilitated.',
    icon: TrendingUp,
    anchor: '#metrics',
    keyElements: ['30+ Years Experience', '5000+ Families', '₹500 Cr+ Assets Facilitated'],
  },
  {
    id: 'aboutUs',
    number: '03',
    name: 'About Sahayak Associates Showcase',
    tagline: 'Physical headquarters showcase & institutional legacy overview',
    category: 'Corporate Identity',
    description: 'Presents the official photograph of Sahayak Associates physical office entrance in Sector 31-A Chandigarh alongside the corporate backstory and philosophy.',
    icon: Building2,
    anchor: '#about',
    keyElements: ['Office Entrance Photo', 'Legacy Story', 'Institutional Vision'],
  },
  {
    id: 'marketTicker',
    number: '04',
    name: 'Live Financial Market Rolling Ticker',
    tagline: 'Continuous horizontal ticker of Indian financial indices',
    category: 'Market Intelligence',
    description: 'Displays a continuous animated real-time ticker bar for NIFTY 50, SENSEX, Gold, Silver, Crude Oil, and key mutual fund benchmarks.',
    icon: Activity,
    anchor: '#markets',
    keyElements: ['NIFTY 50 & SENSEX', 'Precious Metals', 'Continuous Marquee'],
  },
  {
    id: 'valueCards',
    number: '05',
    name: 'How We Add Value (Core Differentiators)',
    tagline: 'Four pillars of advisory philosophy & client partnership',
    category: 'Value Proposition',
    description: 'Interactive carousel and grid highlighting Clarity (Reduce Complexity), Execution (Take Action), Confidence (Conviction), and Security (Feel Safer).',
    icon: Award,
    anchor: '#value',
    keyElements: ['Clarity', 'Execution', 'Conviction', 'Security'],
  },
  {
    id: 'productBasket',
    number: '06',
    name: 'The Sahayak Product Basket (Services Carousel)',
    tagline: 'Curated distribution matrix across institutional finance',
    category: 'Product Offerings',
    description: 'Dynamic portfolio showcase featuring Mutual Funds, Life & Health Insurance, Capital Markets / PMS, Estate Planning & Wills, and Fixed Income Deposits.',
    icon: Briefcase,
    anchor: '#services',
    keyElements: ['Mutual Funds', 'Insurance', 'Capital Markets & PMS', 'Estate Planning'],
  },
  {
    id: 'whyDifferent',
    number: '07',
    name: 'What Makes Sahayak Different? (Core Edge)',
    tagline: 'Six strategic differentiators that set our practice apart',
    category: 'Our Edge',
    description: 'Highlights our bespoke client focus, unbiased distribution, institutional governance, and end-to-end execution without shortcuts.',
    icon: Target,
    anchor: '#different',
    keyElements: ['Unbiased Recommendations', 'Institutional Governance', 'Family Partnership'],
  },
  {
    id: 'ourProcess',
    number: '08',
    name: 'Our Advisory Process (5-Stage Timeline)',
    tagline: 'Structured path from discovery to regular semi-annual rebalancing',
    category: 'Advisory Process',
    description: 'Connected visual roadmap detailing Discovery, Analysis, Plan Development, Execution & Review (R4R) framework.',
    icon: Compass,
    anchor: '#process',
    keyElements: ['5-Stage Connected Steps', 'Semi-Annual Rebalancing', 'Goal Alignment'],
  },
  {
    id: 'whySahayak',
    number: '09',
    name: 'Why Sahayak Associates? (Key Strengths)',
    tagline: 'Seven institutional pillars of client security and digital convenience',
    category: 'Why Choose Us',
    description: 'Showcases qualified finance professionals, 100% digital investment platform, full financial health checkups, and bespoke portfolio architecture.',
    icon: Award,
    anchor: '#why-us',
    keyElements: ['Qualified Professionals', '100% Digital 24/7', 'Financial Health Checkup'],
  },
  {
    id: 'gurukul',
    number: '10',
    name: 'Sahayak Gurukul & Academic Research Center',
    tagline: 'Investor education, academic library, and masterclasses',
    category: 'Education & Research',
    description: 'Features the physical research library photo, investor awareness initiatives, workshops, downloadable brochures, and scholarly curriculum under Sahayak Gurukul.',
    icon: GraduationCap,
    anchor: '#gurukul',
    keyElements: ['Physical Library Photo', 'Investor Masterclasses', 'Brochures & Research'],
  },
  {
    id: 'goalPlanning',
    number: '11',
    name: 'Financial Goal Planning Framework',
    tagline: 'Structured accordion roadmap for major family financial goals',
    category: 'Goal Planning',
    description: 'Interactive planning accordion guiding visitors through Retirement Corpus, Children Higher Education, and Multi-generational Wealth Creation.',
    icon: Target,
    anchor: '#goals',
    keyElements: ['Retirement Planning', 'Higher Education', 'Wealth Creation'],
  },
  {
    id: 'bookstore',
    number: '12',
    name: 'Sahayak Publications & Bestselling Books',
    tagline: 'Curated bookshelf of published literature by Sandeep Sahni',
    category: 'Publications & Authors',
    description: 'Interactive book cover showcase with direct preview and cart purchase links for bestselling titles like "Heyy 18" and "The Art of Governance" with featured author badges.',
    icon: BookOpen,
    anchor: '#books',
    keyElements: ['Bestselling Titles', 'Featured Author Badges', 'Direct Bookstore Link'],
  },
];

const DEFAULT_SECTIONS_STATE: HomepageSectionsConfig = {
  heroBanner: true,
  statsRibbon: true,
  aboutUs: true,
  marketTicker: true,
  valueCards: true,
  productBasket: true,
  whyDifferent: true,
  ourProcess: true,
  whySahayak: true,
  gurukul: true,
  goalPlanning: true,
  bookstore: true,
};

export const AdminHomepageLayoutManager: React.FC = () => {
  const { settings, updateSettings, showToast, navigate } = useStore();

  const [sections, setSections] = useState<HomepageSectionsConfig>(() => ({
    ...DEFAULT_SECTIONS_STATE,
    ...(settings?.homepageSections || {}),
  }));

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'enabled' | 'disabled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Keep in sync with store when settings load/update
  useEffect(() => {
    if (settings?.homepageSections && !hasUnsavedChanges) {
      setSections({
        ...DEFAULT_SECTIONS_STATE,
        ...settings.homepageSections,
      });
    }
  }, [settings?.homepageSections, hasUnsavedChanges]);

  // Toggle single section
  const handleToggle = (id: keyof HomepageSectionsConfig) => {
    const nextVal = !sections[id];
    const updated = {
      ...sections,
      [id]: nextVal,
    };
    setSections(updated);
    setHasUnsavedChanges(true);

    const targetDef = SECTION_DEFINITIONS.find((d) => d.id === id);
    showToast(
      nextVal
        ? `"${targetDef?.name || id}" enabled. Remember to save layout.`
        : `"${targetDef?.name || id}" hidden from live homepage.`
    );
  };

  // Save changes
  const handleSaveLayout = async () => {
    setIsSaving(true);
    try {
      await updateSettings({
        homepageSections: sections,
      });
      setHasUnsavedChanges(false);
      showToast('Homepage layout updated & published live!');
    } catch (err: any) {
      showToast(`Failed to save layout: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Presets
  const applyPreset = (presetName: string, newConfig: Partial<HomepageSectionsConfig>) => {
    const updated = {
      ...DEFAULT_SECTIONS_STATE,
      ...newConfig,
    };
    setSections(updated);
    setHasUnsavedChanges(true);
    showToast(`Applied preset: ${presetName}. Click Save to apply live.`);
  };

  const handleResetToAll = () => {
    applyPreset('All 11 Modules Visible', DEFAULT_SECTIONS_STATE);
  };

  const handleMinimalistPreset = () => {
    applyPreset('Core Executive Layout', {
      heroBanner: true,
      statsRibbon: true,
      aboutUs: true,
      marketTicker: false,
      valueCards: false,
      goalPlanning: false,
      productBasket: true,
      gurukul: false,
      bookstore: false,
      founderSpotlight: true,
      consultationCta: true,
    });
  };

  const handleWealthAdvisoryPreset = () => {
    applyPreset('Wealth & Advisory Focus', {
      heroBanner: true,
      statsRibbon: true,
      aboutUs: true,
      marketTicker: true,
      valueCards: true,
      goalPlanning: true,
      productBasket: true,
      gurukul: true,
      bookstore: false,
      founderSpotlight: true,
      consultationCta: true,
    });
  };

  // Filtered list
  const filteredList = SECTION_DEFINITIONS.filter((def) => {
    const isEnabled = sections[def.id] !== false;
    if (filterMode === 'enabled' && !isEnabled) return false;
    if (filterMode === 'disabled' && isEnabled) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        def.name.toLowerCase().includes(q) ||
        def.tagline.toLowerCase().includes(q) ||
        def.category.toLowerCase().includes(q) ||
        def.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCount = SECTION_DEFINITIONS.length;
  const enabledCount = SECTION_DEFINITIONS.filter((d) => sections[d.id] !== false).length;
  const disabledCount = totalCount - enabledCount;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#0E223D] to-[#0B192C] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#C5A059] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Modular Homepage Architect</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Homepage Layout & Section Manager
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Control the sequence and live visibility of all 11 curated corporate storefront sections.
              Turn individual modules on or off with 1 click without code changes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="View live homepage in action"
            >
              <ExternalLink className="w-4 h-4 text-[#C5A059]" />
              <span>Preview Live Site</span>
            </button>

            <button
              onClick={handleSaveLayout}
              disabled={isSaving}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                hasUnsavedChanges
                  ? 'bg-[#C5A059] text-[#0B192C] hover:bg-[#D8B76E] scale-102 ring-2 ring-[#C5A059]/50'
                  : 'bg-[#C5A059] text-[#0B192C] hover:bg-[#D8B76E]'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Publishing...' : hasUnsavedChanges ? 'Publish Changes *' : 'Save & Publish'}</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">Total Modules</div>
            <div className="font-serif text-2xl font-bold text-white mt-0.5">{totalCount}</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">Live & Visible</div>
            <div className="font-serif text-2xl font-bold text-emerald-400 mt-0.5">{enabledCount} Active</div>
          </div>
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <div className="text-[11px] text-rose-300 font-semibold uppercase tracking-wider">Hidden Modules</div>
            <div className="font-serif text-2xl font-bold text-rose-400 mt-0.5">{disabledCount} Hidden</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/20">
            <div className="text-[11px] text-[#C5A059] font-semibold uppercase tracking-wider">Storefront State</div>
            <div className="font-mono text-sm font-bold text-[#C5A059] mt-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Synchronized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Layout Presets Bar */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="font-bold text-[#0B192C]">Quick Layout Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleResetToAll}
            className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-[#C5A059] text-stone-800 font-semibold transition-colors cursor-pointer"
          >
            All 11 Modules (Default)
          </button>
          <button
            type="button"
            onClick={handleWealthAdvisoryPreset}
            className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-[#C5A059] text-stone-800 font-semibold transition-colors cursor-pointer"
          >
            Wealth Advisory Focus
          </button>
          <button
            type="button"
            onClick={handleMinimalistPreset}
            className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-[#C5A059] text-stone-800 font-semibold transition-colors cursor-pointer"
          >
            Minimalist Executive
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-white text-[#0B192C] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilterMode('enabled')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'enabled'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Active ({enabledCount})
          </button>
          <button
            onClick={() => setFilterMode('disabled')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'disabled'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Hidden ({disabledCount})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sections or features..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
          />
        </div>
      </div>

      {/* Sections Cards List */}
      <div className="space-y-4">
        {filteredList.map((def) => {
          const isEnabled = sections[def.id] !== false;
          const IconComp = def.icon;

          return (
            <div
              key={def.id}
              className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                isEnabled
                  ? 'bg-white border-stone-200 shadow-sm hover:border-[#C5A059]/60 hover:shadow-md'
                  : 'bg-stone-50/80 border-stone-200/80 opacity-75'
              }`}
            >
              {/* Left Column: Number, Icon, Title, Description */}
              <div className="flex items-start gap-4 flex-1">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    isEnabled
                      ? 'bg-[#0B192C] text-[#C5A059] shadow-sm'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                      SECTION {def.number}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
                      {def.category}
                    </span>
                    {isEnabled ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live on Homepage</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-600 border border-stone-300">
                        <EyeOff className="w-3 h-3" />
                        <span>Hidden from Public</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#0B192C]">
                    {def.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                    {def.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {def.keyElements.map((elem, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-600"
                      >
                        ✓ {elem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Toggle Switch & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100 shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-[#0B192C]">
                    {isEnabled ? 'Active & Visible' : 'Disabled'}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    {isEnabled ? 'Rendered for all visitors' : 'Section omitted'}
                  </div>
                </div>

                {/* Animated Switch Button */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={isEnabled}
                  onClick={() => handleToggle(def.id)}
                  className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:ring-offset-2 ${
                    isEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                      isEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  >
                    {isEnabled ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating / Sticky Save Bar if Unsaved */}
      {hasUnsavedChanges && (
        <div className="sticky bottom-6 z-40 bg-[#0B192C] text-white p-4 sm:p-5 rounded-3xl border border-[#C5A059]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C5A059] text-[#0B192C] flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">
                You have unsaved layout modifications.
              </div>
              <div className="text-[11px] text-stone-300">
                Click &ldquo;Publish Layout Now&rdquo; to sync these changes to the live corporate homepage.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setSections({
                  ...DEFAULT_SECTIONS_STATE,
                  ...(settings?.homepageSections || {}),
                });
                setHasUnsavedChanges(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 font-bold text-xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSaveLayout}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D8B76E] text-[#0B192C] font-bold text-xs transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Publishing...' : 'Publish Layout Now'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
