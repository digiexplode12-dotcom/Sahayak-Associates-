import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { BookCard } from '../../components/BookCard';

export const CorporateHomeView: React.FC = () => {
  const { navigate, books = [], settings, authors = [] } = useStore();

  const sections = settings?.homepageSections || {
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

  // Dynamic Site Images configured from Admin Panel
  const heroBackgroundUrl = settings?.siteImages?.heroBackgroundHidden
    ? null
    : (settings?.siteImages?.heroBackground || '/assets/corporate/hero_bull_bear.jpg');

  const officeEntranceUrl = settings?.siteImages?.officeEntranceHidden
    ? null
    : (settings?.siteImages?.officeEntrance || null);

  const officeLibraryUrl = settings?.siteImages?.officeLibraryHidden
    ? null
    : (settings?.siteImages?.officeLibrary || null);

  // Carousel state for "How We Add Value"
  const [valueIndex, setValueIndex] = useState(0);

  // Carousel state for "The Sahayak Product Basket"
  const [serviceIndex, setServiceIndex] = useState(0);

  // Accordion state for Goal Planning
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const valueCards = [
    {
      category: 'CLARITY',
      title: 'We Reduce Complexity',
      description: 'We highlight what is important and critical and what should be ignored.',
      icon: (
        <svg className="w-5 h-5 text-[#C9A24E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      category: 'EXECUTION',
      title: 'We Help You Take Action',
      description: 'We help clients take informed decisions and avoid procrastination.',
      icon: (
        <svg className="w-5 h-5 text-[#C9A24E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      category: 'CONFIDENCE',
      title: 'We Help Increase Your Conviction and Confidence',
      description: 'We share the latest updates, invite you for industry seminars and webinars to help you understand the journey of investments.',
      icon: (
        <svg className="w-5 h-5 text-[#C9A24E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
    {
      category: 'SECURITY',
      title: 'We Help You Feel Safer',
      description: 'We understand your concerns regarding your hard-earned money and are available to hold your hand through market volatility.',
      icon: (
        <svg className="w-5 h-5 text-[#C9A24E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const servicesList = [
    {
      id: 'mutual-funds',
      title: 'Mutual Funds Distribution',
      description: 'We help you invest in professionally managed mutual funds tailored to your goals and risk profile — with access to top fund houses across equity, debt, and hybrid categories.',
      icon: '📈',
    },
    {
      id: 'insurance',
      title: 'Insurance Products Distribution',
      description: 'Protect what matters most. We offer a curated range of life, health, and general insurance products to ensure financial security for you and your family.',
      icon: '🛡️',
    },
    {
      id: 'capital-markets',
      title: 'Capital Markets – Direct Equity & PMS',
      description: 'Invest confidently in the stock market with expert guidance. From individual stocks to PMS (Portfolio Management Services), we help build and manage portfolios for long-term growth.',
      icon: '🏛️',
    },
    {
      id: 'estate-planning',
      title: 'Estate Planning & Will Drafting',
      description: 'Ensure seamless transition of family wealth with tailored wills, private trusts, and generational asset protection mechanisms.',
      icon: '📜',
    },
    {
      id: 'fixed-income',
      title: 'Fixed Income & Corporate Fixed Deposits',
      description: 'Secure, high-credit fixed-income instruments and RBI-regulated bonds for steady cash flow and capital preservation.',
      icon: '💰',
    },
    {
      id: 'retirement',
      title: 'Retirement Planning & NPS',
      description: 'Structured retirement corpus creation, pension solutions, and National Pension System distribution to ensure financial independence for life.',
      icon: '🏖️',
    },
  ];

  const accordionItems = [
    {
      title: 'Complete Financial Health Check-Up',
      content: 'A comprehensive diagnosis of your net worth, liabilities, insurance adequacy, emergency reserves, and portfolio alignment.',
    },
    {
      title: 'Customized Investment Services',
      content: 'Tailored investment solutions designed around your risk profile, cash flow needs, tax bracket, and specific financial milestones.',
    },
    {
      title: 'Goal-Oriented Investing',
      content: 'Aligning each rupee invested to quantifiable life objectives: children higher education, dream home, business ventures, or retirement.',
    },
    {
      title: 'Risk Assessment & Asset Allocation',
      content: 'Scientific evaluation of Preference, Capacity, and Requirement (PCR) to construct optimal equity, debt, and gold ratios.',
    },
    {
      title: '360° Financial Services',
      content: 'One-stop Family CFO coordination covering insurance, tax efficiency, inheritance, legal wills, and day-to-day liquidity.',
    },
    {
      title: 'Regular Monitoring & Course Correction',
      content: 'Bi-annual formal reviews to rebalance portfolios, harvest profits, and adjust allocations as market dynamics shift.',
    },
    {
      title: 'Education & Empowerment',
      content: 'Workshops, curated literature, and personal sessions ensuring you fully understand every decision made with your wealth.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] text-[#11243B] overflow-hidden">
      {/* =========================================================================
          SECTION 1: PREMIUM HERO
          ========================================================================= */}
      {sections.heroBanner !== false && (
        <section className="relative w-full min-h-[620px] lg:min-h-[700px] xl:min-h-[740px] lg:h-[calc(100vh-250px)] max-h-none lg:max-h-[820px] bg-[#040D1A] text-white flex items-center overflow-hidden border-b border-stone-800">
        {/* Wireframe Bull & Bear Artwork Backdrop - Full Viewport Cover (Configurable via Admin Images Manager) */}
        {heroBackgroundUrl && (
          <div
            className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none transition-opacity duration-300"
            style={{
              backgroundImage: `url('${heroBackgroundUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          />
        )}
        {/* Subtle vignette/gradient overlays for perfect blending */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#040D1A] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#040D1A]/60 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-5 lg:space-y-5">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                <span className="w-8 h-px bg-[#C9A24E]" />
                <span>EST. 2017 — CHANDIGARH, INDIA</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-serif font-bold text-white tracking-tight leading-[1.12]">
                Your Personal <br />
                Family{' '}
                <span className="italic font-normal text-[#DEBF6A] border-b-2 border-[#C9A24E]/80 pb-0.5">
                  CFO.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-stone-300 max-w-xl font-sans leading-relaxed">
                We help families and business owners protect, grow, and pass on wealth — with the discipline of an institution and the care of a partner who treats your balance sheet as{' '}
                <strong className="text-white font-semibold">our own.</strong>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => navigate('/contact')}
                  className="cursor-pointer inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-sm font-semibold text-[#071526] bg-gradient-to-r from-[#DEBF6A] via-[#C9A24E] to-[#B08B43] hover:shadow-lg hover:shadow-[#C9A24E]/25 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>Request a consultation</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <button
                  onClick={() => navigate('/about')}
                  className="cursor-pointer px-6 sm:px-7 py-3 rounded-full text-sm font-medium text-stone-200 border border-stone-600/80 hover:border-[#C9A24E] hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
                >
                  Explore our practice
                </button>
              </div>

              {/* Trust Metric Strip */}
              <div className="pt-2 flex items-center gap-3 text-xs text-stone-300">
                <div className="flex -space-x-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#102542] border border-[#C9A24E]/50 text-[10px] font-bold text-[#DEBF6A]">
                    MS
                  </span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#102542] border border-[#C9A24E]/50 text-[10px] font-bold text-[#DEBF6A]">
                    PK
                  </span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#102542] border border-[#C9A24E]/50 text-[10px] font-bold text-[#DEBF6A]">
                    AK
                  </span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#C9A24E] text-[#071526] text-[10px] font-bold border border-white/40">
                    +
                  </span>
                </div>
                <div className="tracking-wide">
                  <span className="text-[#DEBF6A] font-semibold">₹500 Cr+</span> AUM &nbsp;·&nbsp;{' '}
                  <span className="text-white font-medium">1,500+</span> families &nbsp;·&nbsp;{' '}
                  <span className="text-white font-medium">98%</span> retention
                </div>
              </div>
            </div>

            {/* Right Column: 3I Framework Card - Perfectly Sized */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[440px] rounded-2xl bg-[#081528]/85 backdrop-blur-md border border-[#C9A24E]/25 p-6 shadow-2xl relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-stone-800">
                  <span className="text-[11px] font-mono font-semibold tracking-widest text-stone-400 uppercase">
                    THE 3I FRAMEWORK
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DEBF6A] shadow-[0_0_8px_#DEBF6A]" />
                </div>

                {/* 3 Pillars List */}
                <div className="space-y-3 py-3.5">
                  {/* Item 1: Insurance */}
                  <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="p-2 rounded-lg bg-[#C9A24E]/10 border border-[#C9A24E]/30 text-[#DEBF6A] shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-white tracking-wide">Insurance</h4>
                      <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                        Protection for life, health, and business.
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Investment (Highlighted Active Pill) */}
                  <div className="flex items-start gap-3.5 p-2.5 rounded-xl bg-white/[0.07] border border-white/10 shadow-sm transition-colors">
                    <div className="p-2 rounded-lg bg-[#C9A24E]/15 border border-[#C9A24E]/40 text-[#DEBF6A] shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-white tracking-wide">Investment</h4>
                      <p className="text-xs text-stone-200 mt-0.5 leading-relaxed">
                        Goal-based growth, disciplined for the long term.
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Inheritance */}
                  <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="p-2 rounded-lg bg-[#C9A24E]/10 border border-[#C9A24E]/30 text-[#DEBF6A] shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-white tracking-wide">Inheritance</h4>
                      <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                        Estate planning and a seamless transfer of legacy.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: AUM Counter */}
                <div className="mt-1 pt-3.5 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-wider text-stone-400 uppercase">
                    ASSETS UNDER MANAGEMENT
                  </span>
                  <span className="text-lg sm:text-xl font-serif font-bold text-[#DEBF6A]">
                    ₹500 Cr+
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-0.5 text-[9px] font-mono tracking-widest text-stone-400 uppercase pointer-events-none">
          <span>SCROLL</span>
          <svg className="w-3.5 h-3.5 text-[#C9A24E] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 2: ACHIEVEMENT COUNTERS STRIP (A LITTLE ABOVE THE BOTTOM)
          ========================================================================= */}
      {sections.statsRibbon !== false && (
        <section className="w-full bg-[#FAF7F2]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#E2DCCE] divide-y md:divide-y-0 md:divide-x divide-[#E2DCCE]">
            {/* Stat 1: 11+ */}
            <div className="py-4 sm:py-5 lg:py-6 px-4 text-center">
              <div className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#11243B] leading-none">
                11<span className="text-[#C9A24E] font-serif font-normal">+</span>
              </div>
              <div className="mt-2 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] text-[#738094] uppercase">
                Years of practice
              </div>
            </div>

            {/* Stat 2: 1,500+ */}
            <div className="py-4 sm:py-5 lg:py-6 px-4 text-center">
              <div className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#11243B] leading-none">
                1,500<span className="text-[#C9A24E] font-serif font-normal">+</span>
              </div>
              <div className="mt-2 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] text-[#738094] uppercase">
                Families served
              </div>
            </div>

            {/* Stat 3: 98% */}
            <div className="py-4 sm:py-5 lg:py-6 px-4 text-center">
              <div className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#11243B] leading-none">
                98<span className="text-[#C9A24E] font-serif font-normal">%</span>
              </div>
              <div className="mt-2 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] text-[#738094] uppercase">
                Client retention
              </div>
            </div>

            {/* Stat 4: ₹500 Cr+ (Rupee Gold, 500 Navy, Cr+ Gold) */}
            <div className="py-4 sm:py-5 lg:py-6 px-4 text-center">
              <div className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#11243B] leading-none">
                <span className="text-[#C9A24E] font-serif font-normal italic">₹</span>&nbsp;500<span className="text-[#C9A24E] font-serif font-normal italic">&nbsp;Cr+</span>
              </div>
              <div className="mt-2 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] text-[#738094] uppercase">
                Assets under management
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 3: ABOUT US (EXECUTIVE HERITAGE & INSTITUTIONAL TRUST)
          ========================================================================= */}
      {sections.aboutUs !== false && (
        <section className="w-full bg-[#FAF7F2] pt-20 sm:pt-28 lg:pt-32 pb-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Institutional Heritage & Credibility Showcase */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="w-full max-w-[460px] rounded-3xl bg-gradient-to-br from-[#071526] via-[#0D1F36] to-[#071526] border border-[#C9A24E]/30 p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A24E]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  {/* Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                    <span className="text-[11px] font-mono font-semibold tracking-widest text-[#DEBF6A] uppercase">
                      ESTD. 2017 · CHANDIGARH
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C9A24E]/20 text-[#DEBF6A] text-[10px] font-mono font-bold tracking-wider">
                      AMFI REG.
                    </span>
                  </div>

                  {/* Core Value Statement */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white tracking-wide leading-snug">
                      Your Personal <br />
                      <span className="italic font-normal text-[#DEBF6A]">Family CFO</span>
                    </h3>
                    <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                      Institutional wealth stewardship tailored for entrepreneurs, professionals, and discerning families across India and the diaspora.
                    </p>
                  </div>

                  {/* 3 Pillars of Stewardship */}
                  <div className="space-y-3.5 pt-1">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#C9A24E]/20 border border-[#C9A24E]/40 flex items-center justify-center text-[#DEBF6A] text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white tracking-wide">Fiduciary Discipline</div>
                        <div className="text-[11px] text-stone-400">Zero-conflict guidance focused strictly on your family goals.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#C9A24E]/20 border border-[#C9A24E]/40 flex items-center justify-center text-[#DEBF6A] text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white tracking-wide">Multi-Generational Legacy</div>
                        <div className="text-[11px] text-stone-400">Structured wealth transfer, business succession &amp; estate continuity.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#C9A24E]/20 border border-[#C9A24E]/40 flex items-center justify-center text-[#DEBF6A] text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white tracking-wide">Dynamic Portfolio Reviews</div>
                        <div className="text-[11px] text-stone-400">Review &amp; Rebalance Regularly (R4R) across shifting cycles.</div>
                      </div>
                    </div>
                  </div>

                  {/* Institutional Stats Strip */}
                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-center">
                    <div>
                      <div className="font-serif font-bold text-lg text-[#DEBF6A]">₹500 Cr+</div>
                      <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">AUM Under Care</div>
                    </div>
                    <div className="h-8 w-px bg-stone-800" />
                    <div>
                      <div className="font-serif font-bold text-lg text-white">1,500+</div>
                      <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Families</div>
                    </div>
                    <div className="h-8 w-px bg-stone-800" />
                    <div>
                      <div className="font-serif font-bold text-lg text-[#DEBF6A]">98%</div>
                      <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Retention</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                <span className="w-8 h-px bg-[#C9A24E]" />
                <span>ABOUT US</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#071526]">
                About <span className="italic font-normal text-[#C9A24E]">Us</span>
              </h2>

              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Sahayak Associates helps people to live up to their fullest potential and become financially independent, giving them the choice to follow their passion by ensuring they have enough financial resources.
                </p>
                <p>
                  Our Financial Distribution is simply the vehicle through which we can take these passions, apply them to the things that people need, and make a profit in the process.
                </p>
                <p>
                  In other words, Sahayak Associates, our business firm, is our <strong className="text-[#071526] font-semibold">&apos;Ikigai&apos;</strong>.
                </p>
                <p>
                  We have a strong belief that tremendous wealth is going to be created in the next 10 years in India when the economy moves from a $4.0 trillion GDP to a $10.0 trillion economy and the per capita income moves from $3000 to $8000.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border-l-4 border-[#C9A24E] shadow-sm">
                <p className="text-xs sm:text-sm text-stone-700 italic font-serif leading-relaxed">
                  &ldquo;Our purpose is not merely to distribute financial products, but to serve as a lifelong fiduciary anchor for families navigating the compounding journey.&rdquo;
                </p>
                <span className="block text-[11px] font-mono font-semibold text-[#071526] mt-2 uppercase tracking-wider">
                  — Sandeep Sahni, Founder &amp; Managing Director
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#071526] hover:text-[#C9A24E] transition-colors group"
                >
                  <span>Read our complete story</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 4: FINANCIAL PHILOSOPHY TICKER
          ========================================================================= */}
      {sections.marketTicker !== false && (
        <section className="w-full bg-[#071526] py-3.5 overflow-hidden border-y border-stone-800 text-white">
        <div className="animate-sa-marquee text-xs font-mono tracking-widest uppercase">
          {[
            'Client First Always — Goal Based Investment only',
            'Long term Orientation',
            'Nothing is in our control',
            'Believe in the power of Compounding',
            'Review and Rebalance Regularly (R4R)',
            'Asset Allocation is paramount',
            'Evaluate Risk PCR (Preference, Capacity and Requirement) and act on the same',
            'Understand Risk and the Human reaction to Risk and Panic',
          ].map((item, idx) => (
            <span key={idx} className="flex items-center mx-6">
              <span className="text-[#DEBF6A] mr-3">✦</span>
              <span className={idx % 2 === 0 ? 'text-stone-200' : 'text-[#DEBF6A]'}>{item}</span>
            </span>
          ))}
          {/* Repeat for seamless loop */}
          {[
            'Client First Always — Goal Based Investment only',
            'Long term Orientation',
            'Nothing is in our control',
            'Believe in the power of Compounding',
            'Review and Rebalance Regularly (R4R)',
            'Asset Allocation is paramount',
            'Evaluate Risk PCR (Preference, Capacity and Requirement) and act on the same',
            'Understand Risk and the Human reaction to Risk and Panic',
          ].map((item, idx) => (
            <span key={'rep-' + idx} className="flex items-center mx-6">
              <span className="text-[#DEBF6A] mr-3">✦</span>
              <span className={idx % 2 === 0 ? 'text-stone-200' : 'text-[#DEBF6A]'}>{item}</span>
            </span>
          ))}
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 5: HOW WE ADD VALUE
          ========================================================================= */}
      {sections.valueCards !== false && (
        <section className="w-full bg-[#F5F2EA] py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                <span className="w-8 h-px bg-[#C9A24E]" />
                <span>WHAT WE DO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#071526] mt-2">
                How we add value to your financial{' '}
                <span className="italic font-normal text-[#C9A24E]">journey.</span>
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
                From eliminating complexity to guiding long-term financial growth — we partner with you at every step.
              </p>
            </div>

            {/* Slider arrows */}
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setValueIndex((prev) => (prev > 0 ? prev - 1 : valueCards.length - 1))}
                className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#C9A24E] hover:text-[#C9A24E] flex items-center justify-center transition-colors bg-white shadow-sm"
                aria-label="Previous card"
              >
                ‹
              </button>
              <button
                onClick={() => setValueIndex((prev) => (prev < valueCards.length - 1 ? prev + 1 : 0))}
                className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#C9A24E] hover:text-[#C9A24E] flex items-center justify-center transition-colors bg-white shadow-sm"
                aria-label="Next card"
              >
                ›
              </button>
            </div>
          </div>

          {/* Cards Grid / Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueCards.map((card, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  valueIndex === idx
                    ? 'border-[#C9A24E] shadow-xl scale-[1.02]'
                    : 'border-stone-200/80 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-stone-200 flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <div className="text-[10px] font-mono tracking-widest text-[#C9A24E] uppercase font-semibold">
                    {card.category}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#071526] mt-2 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-8">
            {valueCards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setValueIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  valueIndex === idx ? 'w-6 bg-[#C9A24E]' : 'w-2 bg-stone-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 6: THE SAHAYAK PRODUCT BASKET (SERVICES)
          ========================================================================= */}
      {sections.productBasket !== false && (
        <section className="w-full bg-[#071526] text-white py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                <span className="w-8 h-px bg-[#C9A24E]" />
                <span>OUR SERVICES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
                The Sahayak{' '}
                <span className="italic font-normal text-[#DEBF6A]">Product Basket</span>
              </h2>
              <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl">
                A comprehensive suite of financial services — from growing your wealth to legacy preservation — built for every stage of your life.
              </p>
            </div>

            <button
              onClick={() => navigate('/services')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-stone-200 border border-stone-700 hover:border-[#C9A24E] hover:text-[#DEBF6A] transition-colors"
            >
              <span>View all 14 services</span>
              <span>→</span>
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((srv) => (
              <div
                key={srv.id}
                className="rounded-2xl bg-[#102542]/70 border border-stone-700/60 p-7 hover:border-[#C9A24E]/70 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
              >
                <div>
                  <div className="text-2xl mb-4 p-2.5 rounded-xl bg-[#050F1E] w-fit border border-stone-700">
                    {srv.icon}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-white group-hover:text-[#DEBF6A] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => navigate('/services')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#DEBF6A] hover:text-white transition-colors"
                  >
                    <span>Learn more</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Center CTA */}
          <div className="text-center pt-12">
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#071526] bg-gradient-to-r from-[#DEBF6A] via-[#C9A24E] to-[#B08B43] hover:shadow-lg hover:shadow-[#C9A24E]/20 transition-all"
            >
              <span>Explore all 14 services</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 7: WHAT MAKES SAHAYAK DIFFERENT?
          ========================================================================= */}
      {sections.whyDifferent !== false && (
        <section className="w-full bg-[#FAF7F2] py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
              <span className="w-8 h-px bg-[#C9A24E]" />
              <span>OUR EDGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#071526] mt-2">
              What makes Sahayak{' '}
              <span className="italic font-normal text-[#C9A24E]">different?</span>
            </h2>
          </div>

          {/* 6 Differentiators in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Diff 1 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-stone-200 flex items-center justify-center text-[#C9A24E] shrink-0">
                ♡
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#071526]">
                  Client-First, Always
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  We don&apos;t chase commissions or market trends. We focus on your goals, dreams, and peace of mind — with a deep sense of{' '}
                  <span className="text-[#071526] font-medium">responsibility and empathy.</span>
                </p>
              </div>
            </div>

            {/* Diff 2 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-stone-200 flex items-center justify-center text-[#C9A24E] shrink-0">
                🛡️
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#071526]">
                  Zero Speculation. Zero Debt. 100% Discipline.
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  We don&apos;t gamble with your money. We believe in{' '}
                  <span className="text-[#071526] font-medium">long-term growth</span> through smart, goal-based investing and the power of compounding.
                </p>
              </div>
            </div>

            {/* Diff 3 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-stone-200 flex items-center justify-center text-[#C9A24E] shrink-0">
                📋
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#071526]">
                  Proven 5-Step Financial Process
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  From understanding your needs to regular reviews, our{' '}
                  <span className="text-[#071526] font-medium">structured yet flexible</span> approach adapts as your life evolves.
                </p>
              </div>
            </div>

            {/* Diff 4 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-stone-200 flex items-center justify-center text-[#C9A24E] shrink-0">
                💎
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#071526]">
                  Holistic 3i Concept
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  We cover the full financial lifecycle —{' '}
                  <span className="text-[#C9A24E] font-medium">Insurance</span> for protection,{' '}
                  <span className="text-[#C9A24E] font-medium">Investment</span> for growth,{' '}
                  <span className="text-[#C9A24E] font-medium">Inheritance</span> for legacy.
                </p>
              </div>
            </div>

            {/* Diff 5 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-stone-200 flex items-center justify-center text-[#C9A24E] shrink-0">
                💡
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#071526]">
                  We Simplify Finance
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  We help you focus on what matters, take timely action, and feel confident —{' '}
                  <span className="text-[#071526] font-medium">no jargon, no overwhelm</span>, just clarity.
                </p>
              </div>
            </div>

            {/* Diff 6 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-stone-200 flex items-center justify-center text-[#C9A24E] shrink-0">
                🌐
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#071526]">
                  Global Standards, Local Relationships
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  Led by professionals with global credentials (IIM, CFA, CFP), we bring{' '}
                  <span className="text-[#071526] font-medium">world-class expertise</span> with a strong focus on personal relationships.
                </p>
              </div>
            </div>
          </div>

          {/* Highlight Card */}
          <div className="rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 text-center shadow-sm">
            <p className="text-base sm:text-lg font-serif text-[#071526]">
              <span className="text-[#C9A24E] mr-2">★</span>
              We&apos;re not just experts. We&apos;re your partners in{' '}
              <span className="italic text-[#C9A24E] font-semibold">wealth, peace, and purpose.</span>
            </p>
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 8: OUR PROCESS (5-STAGE CONNECTED TIMELINE)
          ========================================================================= */}
      {sections.ourProcess !== false && (
        <section className="w-full bg-[#050F1E] text-white py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
              <span className="w-8 h-px bg-[#C9A24E]" />
              <span>HOW WE WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
              OUR <span className="italic font-normal text-[#DEBF6A]">PROCESS</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              We understand that no two people are alike and that each client will have a unique set of objectives. We use a 5-stage process to ensure that the guidance we provide is suited to the client&apos;s current circumstances and adapts to their future needs.
            </p>
          </div>

          {/* Connected 5-Step Timeline */}
          <div className="relative pt-6">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-10 left-12 right-12 h-0.5 bg-gradient-to-r from-[#C9A24E]/40 via-[#C9A24E] to-[#C9A24E]/40" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Step 1 */}
              <div className="relative space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#102542] border-2 border-[#C9A24E] flex items-center justify-center text-xs font-mono font-bold text-[#DEBF6A] relative z-10">
                    01
                  </div>
                  <span className="text-stone-400 text-xs font-mono lg:hidden">STAGE 01</span>
                </div>
                <h3 className="font-serif font-semibold text-white text-base">
                  Meet and Understand
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  An introductory meeting for your financial health checkup, to discuss your immediate plans as well as your long-term needs and goals.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#102542] border-2 border-[#C9A24E] flex items-center justify-center text-xs font-mono font-bold text-[#DEBF6A] relative z-10">
                    02
                  </div>
                  <span className="text-stone-400 text-xs font-mono lg:hidden">STAGE 02</span>
                </div>
                <h3 className="font-serif font-semibold text-white text-base">
                  Analyze
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  We analyze your financial, human, and emotional priority of life goals, saving potential, and risk profile before crafting solutions.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#102542] border-2 border-[#C9A24E] flex items-center justify-center text-xs font-mono font-bold text-[#DEBF6A] relative z-10">
                    03
                  </div>
                  <span className="text-stone-400 text-xs font-mono lg:hidden">STAGE 03</span>
                </div>
                <h3 className="font-serif font-semibold text-white text-base">
                  Plan and Execute
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Your Relationship Manager draws up your personalized wealth blueprint and executes allocations with complete transparency.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#102542] border-2 border-[#C9A24E] flex items-center justify-center text-xs font-mono font-bold text-[#DEBF6A] relative z-10">
                    04
                  </div>
                  <span className="text-stone-400 text-xs font-mono lg:hidden">STAGE 04</span>
                </div>
                <h3 className="font-serif font-semibold text-white text-base">
                  Support
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Your dedicated Relationship Manager works alongside you throughout the year, adapting allocations as life milestones occur.
                </p>
              </div>

              {/* Step 5 */}
              <div className="relative space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#102542] border-2 border-[#C9A24E] flex items-center justify-center text-xs font-mono font-bold text-[#DEBF6A] relative z-10">
                    05
                  </div>
                  <span className="text-stone-400 text-xs font-mono lg:hidden">STAGE 05</span>
                </div>
                <h3 className="font-serif font-semibold text-white text-base">
                  Review
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Every six months, a comprehensive session is conducted by our team to review strategy, goal progress, and rebalance assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 9: WHY SAHAYAK ASSOCIATES?
          ========================================================================= */}
      {sections.whySahayak !== false && (
        <section className="w-full bg-[#F5F2EA] py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                <span className="w-8 h-px bg-[#C9A24E]" />
                <span>WHY CHOOSE US</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#071526]">
                Why Sahayak{' '}
                <span className="italic font-normal text-[#C9A24E]">Associates?</span>
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                We combine the rigorous governance of an institutional asset manager with the warmth of a family confidant.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: 'Qualified finance professionals to handle your investments.', icon: '🎓' },
                { title: 'Comprehensive, process-driven approach.', icon: '📊' },
                { title: '100% Digital Platform — Buy, sell, top up 24/7, sitting anywhere in the world.', icon: '💻' },
                { title: 'Complete financial health check up.', icon: '🩺' },
                { title: 'Solutions and goal-oriented financial plan & implementation.', icon: '🎯' },
                { title: 'Customised investment strategies to optimise returns.', icon: '⚡' },
                { title: 'Regular reviews and rebalancing.', icon: '🔄' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200/80 shadow-sm flex items-start gap-3.5 hover:border-[#C9A24E]/60 transition-colors"
                >
                  <span className="text-xl shrink-0 p-2 rounded-lg bg-[#FAF7F2]">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-[#071526] leading-snug">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 10: SAHAYAK GURUKUL
          ========================================================================= */}
      {sections.gurukul !== false && (
        <section className="w-full bg-[#FAF7F2] py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                <span className="w-8 h-px bg-[#C9A24E]" />
                <span>KNOWLEDGE CENTRE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#071526] mt-2">
                Sahayak <span className="italic font-normal text-[#C9A24E]">Gurukul.</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Gurukul is an attempt to share thoughts and knowledge on aspects related to Personal Finance and Wealth Services. We provide financial insights into the markets, economy and Investments. Whether you are new to the personal finance domain or a professional looking to make some extra cash, our blogs are curated to demystify investing, simplify complex personal finance topics and help you make better decisions about your money while keeping it entertaining and enjoyable.
              </p>
            </div>
          </div>

          {/* Executive Knowledge Hub Highlight Banner */}
          <div className="relative rounded-2xl bg-[#071526] text-white p-6 sm:p-8 border border-[#C9A24E]/30 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24E]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold tracking-widest text-[#DEBF6A] uppercase">
                  <span>CURATED FINANCIAL WISDOM &amp; RESEARCH</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Demystifying Finance. Empowering Generational Growth.
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                  Explore in-depth market commentaries, behavioral finance insights, and actionable wealth blueprints curated by seasoned practitioners.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => navigate('/blogs')}
                  className="px-5 py-2.5 rounded-xl bg-[#C9A24E] hover:bg-[#DEBF6A] text-[#071526] text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-lg"
                >
                  Read Latest Articles
                </button>
              </div>
            </div>
          </div>

          {/* 3 Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate('/blogs')}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#C9A24E] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl">📝</span>
                <h3 className="font-serif font-bold text-lg text-[#071526] mt-3">
                  Blogs
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Latest: 25 Best Articles I Read in Year 2025
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-[#C9A24E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Open</span>
                <span>→</span>
              </div>
            </div>

            <div
              onClick={() => navigate('/gurukul')}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#C9A24E] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl">📚</span>
                <h3 className="font-serif font-bold text-lg text-[#071526] mt-3">
                  Books / Articles We Are Reading
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Curated reading lists on economics, decision psychology &amp; compounding.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-[#C9A24E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Open</span>
                <span>→</span>
              </div>
            </div>

            <div
              onClick={() => navigate('/gurukul/brochures')}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#C9A24E] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl">📑</span>
                <h3 className="font-serif font-bold text-lg text-[#071526] mt-3">
                  Brochures
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Downloadable product baskets, wealth planning guides &amp; fund dossiers.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-[#C9A24E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Open</span>
                <span>→</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/gurukul')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#071526] hover:text-[#C9A24E] transition-colors"
            >
              <span>Explore Gurukul</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 11: FINANCIAL GOAL PLANNING ACCORDION + INTEGRATED BOOKSTORE SPOTLIGHT
          ========================================================================= */}
      {(sections.goalPlanning !== false || sections.bookstore !== false) && (
        <section className="w-full bg-[#F5F2EA] py-20 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {sections.goalPlanning !== false && (
              <>
                {/* Top: Goal Planning */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                      <span className="w-8 h-px bg-[#C9A24E]" />
                      <span>GOAL PLANNING</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#071526] mt-2">
                      How can we help you achieve your{' '}
                      <span className="italic font-normal text-[#C9A24E]">goals?</span>
                    </h2>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      At Sahayak Associates, we understand that your financial journey is personal. Whether you&apos;re planning for retirement, your child&apos;s education, buying your dream home, or simply seeking financial freedom — we&apos;re here to walk with you every step of the way. Here&apos;s how we help you turn goals into reality:
                    </p>
                  </div>
                </div>

                {/* Accordion List */}
                <div className="space-y-3">
                  {accordionItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-stone-50 transition-colors focus:outline-none"
                      >
                        <span className="font-serif font-semibold text-sm sm:text-base text-[#071526]">
                          {item.title}
                        </span>
                        <span className="text-xl font-light text-[#C9A24E] ml-4">
                          {openAccordion === idx ? '−' : '+'}
                        </span>
                      </button>
                      {openAccordion === idx && (
                        <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 leading-relaxed animate-in fade-in duration-200">
                          {item.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Integrated Sahayak Books Spotlight */}
            {sections.bookstore !== false && (
              <div className={sections.goalPlanning !== false ? "mt-16 pt-16 border-t border-stone-300" : ""}>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                      <span>PUBLISHING DIVISION</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#071526] mt-1">
                      Books by Sandeep Sahni &amp; Sahayak Associates
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1">
                      Thoughtfully written financial literature to educate, guide, and inspire.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/books')}
                    className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#071526] hover:text-[#C9A24E] transition-colors"
                  >
                    <span>Visit Bookstore</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Author Avatars Bar */}
                {authors.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Featured Authors:</span>
                    {authors.map((auth) => (
                      <button
                        key={auth.id}
                        onClick={() => navigate(`/authors/${auth.slug}`)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200/90 hover:border-[#C9A24E] shadow-sm transition-all group cursor-pointer"
                      >
                        {auth.avatar && !auth.avatar.includes('unsplash.com') ? (
                          <img
                            src={auth.avatar}
                            alt={auth.name}
                            className="w-6 h-6 rounded-full object-cover border border-[#C9A24E]"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-[#071526] text-[#DEBF6A] text-[10px] font-bold font-serif flex items-center justify-center border border-[#C9A24E]">
                            {auth.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                          </span>
                        )}
                        <span className="text-xs font-bold text-[#071526] group-hover:text-[#C9A24E] transition-colors">
                          {auth.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Book Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {books.slice(0, 4).map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
