import React from 'react';
import { useStore } from '../context/StoreContext';
import { Award, ShieldCheck, Users, Target, Compass, ArrowRight, BookOpen } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigate, settings, authors = [] } = useStore();

  const officeEntranceUrl = settings?.siteImages?.officeEntranceHidden
    ? null
    : (settings?.siteImages?.officeEntrance || '/assets/corporate/office_entrance.jpg');

  const sandeepAuthor = authors.find(
    (a) => a.id === 'author-sandeep-sahni' || a.slug === 'sandeep-sahni' || a.name.toLowerCase().includes('sandeep')
  );

  const founderPortraitUrl = settings?.siteImages?.founderPortraitHidden
    ? null
    : (sandeepAuthor?.avatar || settings?.siteImages?.founderPortrait || '/sandeep_sahni.jpg');

  return (
    <div id="about-page" className="w-full bg-[#FAF7F2] text-[#11243B]">
      {/* Corporate Header */}
      <section className="bg-[#071526] text-white py-20 border-b border-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,78,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
            <span className="w-8 h-px bg-[#C9A24E]" />
            <span>EST. 2017 · CHANDIGARH, INDIA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            About <span className="italic font-normal text-[#DEBF6A]">Sahayak Associates</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Your Personal Family CFO — Helping families and business owners protect, grow, and pass on wealth with institutional discipline and fiduciary care.
          </p>
        </div>
      </section>

      {/* Main Story & Office Photograph */}
      <section className="py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Office Entrance Image */}
            {officeEntranceUrl && (
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-[460px] transition-transform duration-300 hover:scale-[1.01] group">
                  <img
                    src={officeEntranceUrl}
                    alt="Sahayak Associates Office in Chandigarh"
                    className="w-full h-[320px] sm:h-[420px] object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/corporate/office_entrance.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono tracking-widest text-[#DEBF6A] uppercase">
                      EST. 2017 · CHANDIGARH
                    </span>
                    <p className="text-sm font-serif font-bold text-white mt-0.5">
                      Sahayak Associates Corporate Office
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Right: Story & Ikigai */}
            <div className={`${officeEntranceUrl ? 'lg:col-span-7' : 'lg:col-span-12 max-w-4xl mx-auto'} space-y-6`}>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                <span>OUR STORY &amp; ETHOS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#071526]">
                Guiding Generations Toward Financial Independence
              </h2>
              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Sahayak Associates helps people to live up to their fullest potential and become financially independent, giving them the choice to follow their passion by ensuring they have enough financial resources.
                </p>
                <p>
                  Our Financial Distribution is simply the vehicle through which we can take these passions, apply them to the things that people need, and make a profit in the process. In other words, Sahayak Associates, our business firm, is our <strong className="text-[#071526] font-semibold">&apos;Ikigai&apos;</strong>.
                </p>
                <p>
                  We hold a deep conviction that tremendous wealth will be created in the next decade in India as our nation transitions from a $4.0 trillion GDP toward a $10.0 trillion economic powerhouse, with per capita income rising from $3,000 to $8,000. Our role is to ensure our client families participate responsibly in this historic compounding era.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => navigate('/services')}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-[#071526] bg-[#C9A24E] hover:bg-[#DEBF6A] transition-colors"
                >
                  Explore Our Services →
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-6 py-3 rounded-full text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:border-[#C9A24E] transition-colors"
                >
                  Contact Advisory Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3I Framework Deep Dive */}
      <section className="py-20 border-b border-stone-200 bg-[#F5F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24E]">
              CORE INVESTMENT DOCTRINE
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#071526] mt-1">
              The 3I Concept
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2">
              Every sustainable family balance sheet rests upon three interdependent pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-stone-200 text-[#C9A24E] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif font-bold text-xl text-[#071526]">Insurance</h3>
              <div className="text-xs text-[#C9A24E] font-medium uppercase tracking-wider">Protection First</div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Before creating wealth, we ring-fence your existing assets against unpredictable life catastrophes, medical emergencies, and liabilities.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-stone-200 text-[#C9A24E] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif font-bold text-xl text-[#071526]">Investment</h3>
              <div className="text-xs text-[#C9A24E] font-medium uppercase tracking-wider">Goal-Based Compounding</div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Disciplined allocation across mutual funds, direct equities, PMS, and fixed income aligned to measurable milestones without speculation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-stone-200 text-[#C9A24E] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif font-bold text-xl text-[#071526]">Inheritance</h3>
              <div className="text-xs text-[#C9A24E] font-medium uppercase tracking-wider">Generational Legacy</div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Structured wills, private family trusts, and smooth succession planning ensuring the fruits of your life&apos;s work pass seamlessly to the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Profile: Sandeep Sahni */}
      <section className="py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {founderPortraitUrl && (
              <div className="md:col-span-4 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-stone-200 shadow-xl max-w-xs">
                  <img
                    src={founderPortraitUrl}
                    alt="Sandeep Sahni — Founder & MD"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/sandeep_sahni.jpg';
                    }}
                  />
                </div>
              </div>
            )}

            <div className={`${founderPortraitUrl ? 'md:col-span-8' : 'md:col-span-12 max-w-3xl mx-auto'} space-y-4`}>
              <div className="text-xs font-semibold text-[#C9A24E] uppercase tracking-widest">
                FOUNDER &amp; MANAGING DIRECTOR
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#071526]">
                Sandeep Sahni
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Sandeep Sahni is the driving force behind Sahayak Associates and the author of acclaimed financial and life-lesson publications. With more than two decades in financial services, Sandeep has advised hundreds of entrepreneurs, corporate executives, and NRI families on long-term wealth stewardship.
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Under his leadership, Sahayak Associates has achieved ₹500 Cr+ in client assets under management and maintained an exemplary 98% client retention rate through transparent, process-driven advisory.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => navigate('/books')}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#071526] bg-[#C9A24E] hover:bg-[#DEBF6A] transition-colors"
                >
                  View Books Authored By Sandeep →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publishing Imprint: Sahayak Books */}
      <section className="py-16 bg-[#071526] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono font-semibold text-[#DEBF6A] uppercase tracking-widest">
            PUBLISHING DIVISION
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Sahayak Books
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Our dedicated publishing division publishes landmark titles on personal finance, fatherhood, youth mentorship, and investment terminology.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/books')}
              className="px-7 py-3 rounded-full text-xs font-semibold text-[#071526] bg-[#C9A24E] hover:bg-[#DEBF6A] transition-colors"
            >
              Browse Bookstore Catalog →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
