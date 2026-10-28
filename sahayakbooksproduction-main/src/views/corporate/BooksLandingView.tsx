import React, { useState, useMemo } from 'react';
import { useStore, resolveAuthorAvatar } from '../../context/StoreContext';
import { BookCard } from '../../components/BookCard';
import { Book } from '../../types';

export const BooksLandingView: React.FC = () => {
  const { books, categories, navigate, settings, authors = [] } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const sandeepAuthor = authors.find(
    (a) => a.id === 'author-sandeep-sahni' || a.slug === 'sandeep-sahni' || a.name.toLowerCase().includes('sandeep')
  );

  const founderPortraitUrl = settings?.siteImages?.founderPortraitHidden
    ? null
    : (sandeepAuthor?.avatar || settings?.siteImages?.founderPortrait || 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev/branding/author_sandeep_sahni_permanent.jpg');

  // Filtered and sorted books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesCategory =
          selectedCategory === 'all' ||
          book.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // default featured order
      });
  }, [books, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full bg-[#FAF7F2] text-[#11243B]">
      {/* Editorial Books Hero */}
      <section className="bg-[#071526] text-white py-20 border-b border-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,78,0.1)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Headline & Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                <span className="w-6 h-px bg-[#C9A24E]" />
                <span>SAHAYAK BOOKS · PUBLISHING IMPRINT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                Books That Inform. <br />
                <span className="italic font-normal text-[#DEBF6A]">Ideas That Inspire.</span>
              </h1>

              <p className="text-stone-300 text-base sm:text-lg max-w-xl font-sans leading-relaxed">
                Discover thoughtfully written books from Sahayak Associates designed to educate, guide, and inspire readers across governance, economics, personal finance, and generational legacy.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#catalog"
                  className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#071526] bg-gradient-to-r from-[#DEBF6A] via-[#C9A24E] to-[#B08B43] hover:shadow-lg transition-all"
                >
                  Explore Books ↓
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium text-stone-200 border border-stone-700 hover:border-[#C9A24E] hover:text-white transition-colors"
                >
                  View All 4 Landmark Titles
                </button>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-stone-400">
                <span className="text-[#DEBF6A]">★★★★★</span>
                <span>4.9/5 Rating from over 12,000+ readers, families &amp; executives</span>
              </div>
            </div>

            {/* Right: Book Covers Display */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                {books.slice(0, 4).map((book, idx) => (
                  <div
                    key={book.id}
                    onClick={() => navigate(`/books/${book.slug}`)}
                    className={`rounded-xl overflow-hidden shadow-2xl border-2 border-stone-700/80 hover:border-[#C9A24E] transition-all transform hover:-translate-y-2 cursor-pointer group ${
                      idx % 2 === 1 ? 'translate-y-4' : ''
                    }`}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars of Sahayak Books */}
      <section className="py-12 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100">
            <div className="p-2">
              <div className="text-xl">✍️</div>
              <div className="font-serif font-bold text-xs sm:text-sm text-[#071526] mt-2">Expertly Written</div>
              <div className="text-[11px] text-stone-500 mt-1">Authored by industry veteran Sandeep Sahni</div>
            </div>
            <div className="p-2">
              <div className="text-xl">📈</div>
              <div className="font-serif font-bold text-xs sm:text-sm text-[#071526] mt-2">Practical Knowledge</div>
              <div className="text-[11px] text-stone-500 mt-1">Actionable decision models &amp; real examples</div>
            </div>
            <div className="p-2">
              <div className="text-xl">📖</div>
              <div className="font-serif font-bold text-xs sm:text-sm text-[#071526] mt-2">Quality Publishing</div>
              <div className="text-[11px] text-stone-500 mt-1">Premium print edition &amp; instant digital delivery</div>
            </div>
            <div className="p-2">
              <div className="text-xl">🛡️</div>
              <div className="font-serif font-bold text-xs sm:text-sm text-[#071526] mt-2">Trusted Information</div>
              <div className="text-[11px] text-stone-500 mt-1">Grounded in proven financial principles</div>
            </div>
            <div className="p-2">
              <div className="text-xl">👥</div>
              <div className="font-serif font-bold text-xs sm:text-sm text-[#071526] mt-2">Reader-Focused</div>
              <div className="text-[11px] text-stone-500 mt-1">Clear margins, study notes &amp; reader guides</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Books Catalog Section */}
      <section id="catalog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
                CURATED IMPRINTS
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#071526] mt-1">
                Featured Books &amp; Publications
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Distinguished works rigorously peer-reviewed and recommended by leading financial minds.
              </p>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-full border border-stone-300 text-xs bg-white focus:outline-none focus:border-[#C9A24E] w-56"
                />
                <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-full border border-stone-300 text-xs bg-white focus:outline-none focus:border-[#C9A24E]"
              >
                <option value="featured">Featured Order</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#071526] text-white font-semibold'
                  : 'bg-white text-stone-600 hover:bg-[#F5F2EA] border border-stone-200'
              }`}
            >
              All Publications ({books.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-[#071526] text-white font-semibold'
                    : 'bg-white text-stone-600 hover:bg-[#F5F2EA] border border-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Book Cards Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredBooks.map((book: Book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
              <span className="text-3xl">📚</span>
              <h3 className="font-serif font-bold text-lg text-[#071526] mt-3">
                No matching books found
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Try clearing your search query or choosing another category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold text-[#071526] bg-[#C9A24E] rounded-full"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Sandeep Sahni Author Spotlight */}
          <div className="mt-16 rounded-2xl bg-[#071526] text-white p-8 sm:p-10 border border-stone-800 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {founderPortraitUrl && (
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#C9A24E]/50 max-w-xs shadow-2xl">
                    <img
                      src={founderPortraitUrl}
                      alt="Sandeep Sahni — Author & Founder"
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
                  MEET THE AUTHOR &amp; FOUNDER
                </div>
                <h3 className="text-3xl font-serif font-bold text-white">
                  Sandeep Sahni
                </h3>
                <div className="text-xs text-[#DEBF6A] font-medium">
                  Founder &amp; Managing Director, Sahayak Associates
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Sandeep Sahni is an author, financial educator, and the founder of Sahayak Associates. With over two decades of experience in Indian financial distribution, wealth stewardship, and mentoring, he has authored multiple bestselling books including &ldquo;Dear Son&rdquo; and &ldquo;Heyy 18&rdquo;.
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => navigate('/authors/sandeep-sahni')}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#071526] bg-[#C9A24E] hover:bg-[#DEBF6A] transition-colors"
                  >
                    View Author Profile &amp; Bio →
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-6 py-2.5 rounded-full text-xs font-medium text-stone-300 border border-stone-700 hover:border-[#C9A24E] hover:text-white transition-colors"
                  >
                    Invite for Keynote / Seminar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Authors & Faculty Roster Showcase */}
          {authors.length > 0 && (
            <div className="mt-14 pt-10 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-semibold text-[#C9A24E] uppercase tracking-widest">
                    AUTHORS &amp; EDITORIAL FACULTY
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#071526] mt-1">
                    Meet Our Published Authors
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/authors')}
                  className="text-xs font-semibold text-[#071526] hover:text-[#C9A24E] transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  <span>View All Faculty Profiles</span>
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {authors.map((auth) => (
                  <div
                    key={auth.id}
                    onClick={() => navigate(`/authors/${auth.slug}`)}
                    className="p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-[#C9A24E] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9A24E] shrink-0 bg-stone-100 shadow-sm flex items-center justify-center">
                      <img
                        src={resolveAuthorAvatar(auth)}
                        alt={auth.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          const fallback = (auth.name || '').toLowerCase().includes('sanjit') || (auth.slug || '').includes('sanjit')
                            ? '/sanjit_singh_paul.jpg'
                            : '/sandeep_sahni.jpg';
                          const target = e.currentTarget;
                          if (!target.src.endsWith(fallback)) {
                            target.src = fallback;
                          }
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif font-bold text-base text-[#071526] group-hover:text-[#C9A24E] transition-colors truncate">
                        {auth.name}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{auth.title}</p>
                      <span className="text-[11px] font-semibold text-[#C9A24E] mt-1 inline-block">
                        {auth.publishedBookCount || 1} Published Book{(auth.publishedBookCount || 1) === 1 ? '' : 's'} →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
