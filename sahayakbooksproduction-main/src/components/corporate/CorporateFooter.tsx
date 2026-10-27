import React from 'react';
import { useStore } from '../../context/StoreContext';

export const CorporateFooter: React.FC = () => {
  const { navigate, settings } = useStore();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLogoSrc = settings?.siteImages?.footerLogoHidden
    ? null
    : (settings?.siteImages?.footerLogo || settings?.siteImages?.logo || settings?.footerLogo || settings?.mainLogo || 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev/branding/footerLogo_permanent.webp');

  return (
    <footer className="w-full bg-[#050F1E] text-stone-300 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quote Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#071526] via-[#102542] to-[#071526] border border-[#C9A24E]/30 p-8 sm:p-10 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,78,0.1)_0%,transparent_70%)]" />
          <p className="relative z-10 text-xl sm:text-2xl md:text-3xl font-serif italic text-white tracking-wide">
            &ldquo;You dream it. We plan it. <span className="text-[#DEBF6A] font-semibold">Together, we will achieve it.</span>&rdquo;
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-4">
          {/* Column 1: Brand & AMFI ARN */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {footerLogoSrc && (
                <img
                  src={footerLogoSrc}
                  alt="Sahayak Associates"
                  className="h-12 w-auto bg-white/95 rounded p-1 shadow-sm"
                />
              )}
              <div>
                <div className="font-serif font-bold text-white tracking-wider text-base">
                  SAHAYAK ASSOCIATES
                </div>
                <div className="text-[10px] text-[#DEBF6A] tracking-widest uppercase">
                  Your Personal Family CFO
                </div>
              </div>
            </div>

            {/* ARN Registration Badge */}
            <div className="inline-block bg-[#102542] border border-[#C9A24E]/40 rounded-lg px-3 py-1.5 text-[11px] text-[#DEBF6A] font-medium tracking-wide shadow-inner">
              AMFI Registered Mutual Fund Distributor &amp; SIF Distributor · ARN 117295
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              A client-first, process-driven wealth services company offering holistic financial solutions across generations.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#102542] hover:bg-[#C9A24E] hover:text-[#071526] text-stone-300 flex items-center justify-center transition-colors text-xs border border-stone-800"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#102542] hover:bg-[#C9A24E] hover:text-[#071526] text-stone-300 flex items-center justify-center transition-colors text-xs border border-stone-800"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#102542] hover:bg-[#C9A24E] hover:text-[#071526] text-stone-300 flex items-center justify-center transition-colors text-xs border border-stone-800"
                aria-label="Instagram"
              >
                ig
              </a>
            </div>
          </div>

          {/* Column 2: Regulatory & Financial Infrastructure */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#DEBF6A] uppercase tracking-wider">
              REGULATORY &amp; SERVICES
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  SEBI (Securities &amp; Exchange Board of India)
                </a>
              </li>
              <li>
                <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  RBI (Reserve Bank of India)
                </a>
              </li>
              <li>
                <a href="https://www.bseindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  BSE (Bombay Stock Exchange)
                </a>
              </li>
              <li>
                <a href="https://www.nseindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  NSE (National Stock Exchange)
                </a>
              </li>
              <li>
                <a href="https://www.cdslindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  CDSL Depository
                </a>
              </li>
              <li>
                <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  AMFI India
                </a>
              </li>
              <li>
                <button onClick={() => handleNav('/gurukul')} className="hover:text-[#DEBF6A] transition-colors text-left">
                  Investor Awareness Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Market Media */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#DEBF6A] uppercase tracking-wider">
              COMPANY &amp; MEDIA
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-white transition-colors text-left">
                  About Sahayak Associates
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-white transition-colors text-left">
                  Our 14 Financial Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/books')} className="hover:text-[#DEBF6A] transition-colors text-left flex items-center gap-1.5">
                  <span>Sahayak Books Publishing</span>
                  <span className="text-[10px] bg-[#C9A24E]/20 text-[#DEBF6A] px-1.5 py-0.2 rounded font-medium">Store</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/achievements')} className="hover:text-white transition-colors text-left">
                  Company Milestones &amp; Honors
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/careers')} className="hover:text-white transition-colors text-left">
                  Careers &amp; Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/blogs')} className="hover:text-white transition-colors text-left">
                  Financial Articles &amp; Insights
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#DEBF6A] uppercase tracking-wider">
              CONTACT US
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <span className="text-[#DEBF6A] mt-0.5">📞</span>
                <div>
                  <a href="tel:+919914146888" className="hover:text-white transition-colors font-medium text-stone-200">
                    +91 99141 46888
                  </a>
                  <p className="text-[11px] text-stone-500">Mon - Sat, 9:30 AM - 6:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-[#DEBF6A] mt-0.5">✉️</span>
                <a href="mailto:info@sahayakassociates.com" className="hover:text-white transition-colors break-all">
                  info@sahayakassociates.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-[#DEBF6A] mt-0.5">📍</span>
                <p className="leading-relaxed">
                  First Floor, Progress Harmony Development Chamber, Sector 31-A, Chandigarh — 160 030
                </p>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center gap-3 text-[11px]">
                <button onClick={() => handleNav('/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
                <span>·</span>
                <button onClick={() => handleNav('/terms-conditions')} className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </button>
                <span>·</span>
                <button onClick={() => handleNav('/sitemap')} className="hover:text-white transition-colors">
                  Sitemap
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Box */}
        <div className="rounded-xl bg-[#071526] border border-stone-800 p-5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#DEBF6A] tracking-wide uppercase border-b border-stone-800 pb-2">
            <span>DISCLAIMER</span>
            <span>AMFI Registered Mutual Fund Distributor &amp; SIF Distributor</span>
          </div>
          <div className="max-h-24 overflow-y-auto text-[11px] text-stone-400 leading-relaxed pr-2 space-y-1.5 custom-scrollbar">
            <p>
              Any information provided by Sahayak and their associates does not constitute investment advice, offer, invitation, or inducement to invest in securities or other investments, and Sahayak is not soliciting any action based on it.
            </p>
            <p>
              Keep in mind that investing involves risk. The value of your investment will fluctuate over time, and you may gain or lose money/original capital. Guidance provided by Sahayak is purely educational and consultative. Sahayak doesn&apos;t guarantee that the information disseminated herein would result in any monetary or financial gains or loss as the information is purely educational and based on past returns and performance. Past performance is not a guide for future performance.
            </p>
          </div>
        </div>

        {/* Copyright & Statutory Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 border-t border-stone-800/80 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <p>© 2026 Sahayak Associates. All rights reserved.</p>
            <span className="text-stone-700">·</span>
            <button
              onClick={() => handleNav('/admin')}
              className="text-stone-600 hover:text-stone-300 transition-colors text-[11px] inline-flex items-center gap-1 cursor-pointer"
              title="Restricted Staff Portal"
            >
              <span>Admin Portal</span>
            </button>
          </div>
          <p className="text-right text-[11px] text-stone-400">
            Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully.
          </p>
        </div>
      </div>
    </footer>
  );
};
