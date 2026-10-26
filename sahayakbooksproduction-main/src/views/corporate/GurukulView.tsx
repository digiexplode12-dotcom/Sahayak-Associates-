import React from 'react';
import { useStore } from '../../context/StoreContext';

export const GurukulView: React.FC = () => {
  const { navigate, blogs, settings } = useStore();

  const officeLibraryUrl = null;

  const curatedReadingList = [
    {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      note: 'Timeless lessons on wealth, greed, and happiness.',
    },
    {
      title: 'Common Stocks and Uncommon Profits',
      author: 'Philip A. Fisher',
      note: 'The pioneer of scuttlebutt investment research.',
    },
    {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      note: 'Mastering cognitive biases in risk taking.',
    },
    {
      title: 'Dear Son: Life Lessons from a Father',
      author: 'Sandeep Sahni',
      note: 'A father’s timeless financial and moral compass for the next generation.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] text-[#11243B]">
      {/* Hero Header */}
      <section className="bg-[#071526] text-white py-20 border-b border-stone-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
            <span>FINANCIAL KNOWLEDGE DESK</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Sahayak <span className="italic font-normal text-[#DEBF6A]">Gurukul</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our commitment to demystifying personal finance, building investor temperament, and nurturing financial independence across families.
          </p>
        </div>
      </section>

      {/* Philosophy & Executive Wisdom Showcase */}
      <section className="py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="text-3xl font-serif font-bold text-[#071526]">
                Knowledge Before <span className="text-[#C9A24E] italic font-normal">Action</span>
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Gurukul is an attempt to share thoughts and knowledge on aspects related to Personal Finance and Wealth Services. We provide financial insights into the markets, economy and investments.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Whether you are new to the personal finance domain or a seasoned professional looking to optimize your family portfolio, our resources are curated to remove jargon, instill emotional discipline, and encourage long-term compounding.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => navigate('/blogs')}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#071526] bg-[#C9A24E] hover:bg-[#DEBF6A] transition-colors"
                >
                  Explore Articles →
                </button>
                <button
                  onClick={() => navigate('/gurukul/brochures')}
                  className="px-6 py-2.5 rounded-full text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:border-[#C9A24E] transition-colors"
                >
                  Download Brochures
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-gradient-to-br from-[#071526] via-[#0D1F36] to-[#071526] border border-[#C9A24E]/30 p-8 text-white shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <span className="text-[11px] font-mono tracking-widest text-[#DEBF6A] uppercase">SAHAYAK GURUKUL DESK</span>
                  <span className="text-xs text-[#DEBF6A]">✦ ✦ ✦</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Three Pillars of Investor Wisdom</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <span className="text-lg">📈</span>
                    <div>
                      <h4 className="text-xs font-bold text-[#DEBF6A]">Compounding &amp; Time Horizon</h4>
                      <p className="text-[11px] text-stone-300 mt-0.5">Understanding that wealth is built through patience and staying invested across cycles.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <span className="text-lg">🧠</span>
                    <div>
                      <h4 className="text-xs font-bold text-[#DEBF6A]">Behavioral &amp; Emotional Discipline</h4>
                      <p className="text-[11px] text-stone-300 mt-0.5">Conquering greed and fear — avoiding the costly instinct to time the market.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <span className="text-lg">🛡️</span>
                    <div>
                      <h4 className="text-xs font-bold text-[#DEBF6A]">Asset Allocation as Paramount</h4>
                      <p className="text-[11px] text-stone-300 mt-0.5">Evaluating Risk PCR (Preference, Capacity, Requirement) to construct resilient portfolios.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars: Blogs, Reading List, Brochures */}
      <section className="py-20 border-b border-stone-200 bg-[#F5F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-[#071526]">
              Gurukul Resource Pillars
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Explore our articles, recommended reading lists, and corporate brochures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Blogs */}
            <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl">📝</span>
                <h3 className="font-serif font-bold text-lg text-[#071526] mt-4">
                  Financial Blogs
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Regular deep-dives on budgeting, asset allocation, equity compounding, and economic updates.
                </p>
                <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                  <div className="text-[11px] font-semibold text-[#C9A24E] uppercase">Recent Highlights:</div>
                  {blogs.slice(0, 3).map((blog) => (
                    <div
                      key={blog.id}
                      onClick={() => navigate(`/blogs/${blog.slug}`)}
                      className="text-xs text-stone-700 hover:text-[#C9A24E] cursor-pointer line-clamp-1"
                    >
                      • {blog.title}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate('/blogs')}
                className="mt-6 w-full py-2.5 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#C9A24E] hover:text-white transition-colors border border-stone-200 text-[#071526]"
              >
                Browse All Blogs →
              </button>
            </div>

            {/* Pillar 2: Books & Articles */}
            <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl">📚</span>
                <h3 className="font-serif font-bold text-lg text-[#071526] mt-4">
                  Books We Are Reading
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Carefully selected literature that shaped our investment discipline and family office philosophy.
                </p>
                <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                  <div className="text-[11px] font-semibold text-[#C9A24E] uppercase">Curated Reading List:</div>
                  {curatedReadingList.map((item, idx) => (
                    <div key={idx} className="text-xs text-stone-700">
                      <div className="font-semibold line-clamp-1">{item.title}</div>
                      <div className="text-[11px] text-stone-500">{item.author}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate('/books')}
                className="mt-6 w-full py-2.5 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#C9A24E] hover:text-white transition-colors border border-stone-200 text-[#071526]"
              >
                Visit Sahayak Books Store →
              </button>
            </div>

            {/* Pillar 3: Brochures */}
            <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl">📑</span>
                <h3 className="font-serif font-bold text-lg text-[#071526] mt-4">
                  Brochures &amp; Whitepapers
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Downloadable PDFs providing comprehensive overviews of mutual funds, estate planning, and tax structures.
                </p>
                <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                  <div className="text-[11px] font-semibold text-[#C9A24E] uppercase">Available Documents:</div>
                  <div className="text-xs text-stone-700">• Sahayak Corporate Profile 2026</div>
                  <div className="text-xs text-stone-700">• 3I Framework Investor Handbook</div>
                  <div className="text-xs text-stone-700">• Mutual Fund KYC &amp; SIP Checklist</div>
                </div>
              </div>
              <button
                onClick={() => navigate('/gurukul/brochures')}
                className="mt-6 w-full py-2.5 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#C9A24E] hover:text-white transition-colors border border-stone-200 text-[#071526]"
              >
                Download Brochures →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
