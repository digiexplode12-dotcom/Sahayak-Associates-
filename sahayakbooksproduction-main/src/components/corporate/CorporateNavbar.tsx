import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';

export const CorporateNavbar: React.FC = () => {
  const { currentPath, navigate, cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, settings } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gurukulDropdown, setGurukulDropdown] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);

  const logoSrc = settings?.siteImages?.logoHidden
    ? null
    : (settings?.siteImages?.logo || settings?.mainLogo || settings?.logoUrl || 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev/branding/logo_permanent.webp');

  const gurukulRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (gurukulRef.current && !gurukulRef.current.contains(e.target as Node)) {
        setGurukulDropdown(false);
      }
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && (currentPath === '/' || currentPath === '')) return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setGurukulDropdown(false);
    setLoginDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all duration-300">
      {/* Top Regulatory & Contact Bar */}
      <div className="bg-[#051124] text-stone-300 text-[11px] py-1.5 px-4 border-b border-stone-800 hidden md:block">
        <div className="max-w-7xl xl:max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#DEBF6A] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DEBF6A] animate-pulse" />
              AMFI Registered Mutual Fund Distributor &amp; SIF Distributor · ARN 117295
            </span>
            <span className="text-stone-600">|</span>
            <span className="text-stone-400">Sector 31-A, Chandigarh, India</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <a href="tel:+919914146888" className="hover:text-[#DEBF6A] transition-colors flex items-center gap-1">
              <span>📞</span> +91 99141 46888
            </a>
            <span className="text-stone-600">|</span>
            <a href="mailto:info@sahayakassociates.com" className="hover:text-[#DEBF6A] transition-colors flex items-center gap-1">
              <span>✉️</span> info@sahayakassociates.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Corporate Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'shadow-md border-b border-stone-200/80 py-2 lg:py-2.5'
            : 'border-b border-stone-100 py-2.5 sm:py-3 lg:py-3.5'
        }`}
      >
        <div className="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center group text-left cursor-pointer focus:outline-none"
          aria-label="Sahayak Associates Home"
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="Sahayak Associates - Your Personal Family CFO"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="flex flex-col py-1">
              <span className="font-serif font-bold text-lg text-[#071526] tracking-tight">SAHAYAK</span>
              <span className="text-[9px] font-mono tracking-widest text-[#C9A24E] uppercase">ASSOCIATES</span>
            </div>
          )}
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[14.5px] xl:text-[15.5px] font-medium text-[#11243B]">
          <button
            onClick={() => handleNav('/')}
            className={`transition-colors cursor-pointer relative py-1.5 ${
              isActive('/')
                ? 'text-[#C9A24E] font-semibold'
                : 'hover:text-[#C9A24E]'
            }`}
          >
            Home
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A24E] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('/about')}
            className={`transition-colors cursor-pointer relative py-1 ${
              isActive('/about')
                ? 'text-[#C9A24E] font-semibold'
                : 'hover:text-[#C9A24E]'
            }`}
          >
            About us
            {isActive('/about') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A24E] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('/services')}
            className={`transition-colors cursor-pointer relative py-1 ${
              isActive('/services')
                ? 'text-[#C9A24E] font-semibold'
                : 'hover:text-[#C9A24E]'
            }`}
          >
            Our Services
            {isActive('/services') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A24E] rounded-full" />
            )}
          </button>

          {/* Sahayak Gurukul Dropdown */}
          <div className="relative" ref={gurukulRef}>
            <button
              onClick={() => setGurukulDropdown(!gurukulDropdown)}
              onMouseEnter={() => setGurukulDropdown(true)}
              className={`flex items-center gap-1 transition-colors cursor-pointer py-1 ${
                isActive('/gurukul') || isActive('/blogs')
                  ? 'text-[#C9A24E] font-semibold'
                  : 'hover:text-[#C9A24E]'
              }`}
            >
              Sahayak Gurukul
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  gurukulDropdown ? 'rotate-180 text-[#C9A24E]' : 'text-stone-400'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {gurukulDropdown && (
              <div
                onMouseLeave={() => setGurukulDropdown(false)}
                className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-stone-100 py-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50"
              >
                <button
                  onClick={() => handleNav('/gurukul')}
                  className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-[#F5F2EA] hover:text-[#C9A24E] transition-colors flex items-center justify-between"
                >
                  <span>Overview & Resources</span>
                  <span className="text-[10px] text-stone-400">Hub</span>
                </button>
                <button
                  onClick={() => handleNav('/books')}
                  className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-[#F5F2EA] hover:text-[#C9A24E] transition-colors flex items-center justify-between font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <span>📚</span>
                    <span>Sahayak Books</span>
                  </span>
                  <span className="text-[10px] text-[#C9A24E] font-semibold bg-[#F5F2EA] px-1.5 py-0.5 rounded">Store</span>
                </button>
                <button
                  onClick={() => handleNav('/blogs')}
                  className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-[#F5F2EA] hover:text-[#C9A24E] transition-colors flex items-center justify-between"
                >
                  <span>Financial Blogs</span>
                  <span className="text-[10px] text-stone-400">Articles</span>
                </button>
                <button
                  onClick={() => handleNav('/authors')}
                  className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-[#F5F2EA] hover:text-[#C9A24E] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <span>✍️</span>
                    <span>Authors & Faculty</span>
                  </span>
                  <span className="text-[10px] text-stone-400">Roster</span>
                </button>
                <button
                  onClick={() => handleNav('/gurukul/brochures')}
                  className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-[#F5F2EA] hover:text-[#C9A24E] transition-colors flex items-center justify-between"
                >
                  <span>Brochures & Guides</span>
                  <span className="text-[10px] text-stone-400">PDFs</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('/achievements')}
            className={`transition-colors cursor-pointer relative py-1.5 ${
              isActive('/achievements')
                ? 'text-[#C9A24E] font-semibold'
                : 'hover:text-[#C9A24E]'
            }`}
          >
            Achievements
            {isActive('/achievements') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A24E] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('/careers')}
            className={`transition-colors cursor-pointer relative py-1.5 ${
              isActive('/careers')
                ? 'text-[#C9A24E] font-semibold'
                : 'hover:text-[#C9A24E]'
            }`}
          >
            Careers
            {isActive('/careers') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A24E] rounded-full" />
            )}
          </button>

          {/* Login Dropdown */}
          <div className="relative" ref={loginRef}>
            <button
              onClick={() => setLoginDropdown(!loginDropdown)}
              onMouseEnter={() => setLoginDropdown(true)}
              className={`flex items-center gap-1 transition-colors cursor-pointer py-1 ${
                isActive('/login') || isActive('/account')
                  ? 'text-[#C9A24E] font-semibold'
                  : 'hover:text-[#C9A24E]'
              }`}
            >
              Login
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  loginDropdown ? 'rotate-180 text-[#C9A24E]' : 'text-stone-400'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {loginDropdown && (
              <div
                onMouseLeave={() => setLoginDropdown(false)}
                className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-stone-100 py-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50"
              >
                <button
                  onClick={() => handleNav('/login')}
                  className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#F5F2EA] hover:text-[#C9A24E] transition-colors"
                >
                  Client / Reader Portal
                </button>
                <button
                  onClick={() => handleNav('/account')}
                  className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#F5F2EA] hover:text-[#C9A24E] transition-colors"
                >
                  My Account & Orders
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right side CTAs & Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-stone-600 hover:text-[#C9A24E] transition-colors rounded-full hover:bg-[#F5F2EA]"
            aria-label="Wishlist"
            title="View Wishlist"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A24E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-stone-600 hover:text-[#C9A24E] transition-colors rounded-full hover:bg-[#F5F2EA]"
            aria-label="Shopping Cart"
            title="View Cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A24E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Gold Contact Us Button */}
          <button
            onClick={() => handleNav('/contact')}
            className="cursor-pointer inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-[14.5px] font-semibold tracking-wide text-[#071526] bg-gradient-to-r from-[#E5CA7E] via-[#DEBF6A] to-[#C9A24E] hover:shadow-lg hover:shadow-[#C9A24E]/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Contact Us</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-[#C9A24E] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              isActive('/') ? 'bg-[#F5F2EA] text-[#C9A24E]' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('/about')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              isActive('/about') ? 'bg-[#F5F2EA] text-[#C9A24E]' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            About us
          </button>
          <button
            onClick={() => handleNav('/services')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              isActive('/services') ? 'bg-[#F5F2EA] text-[#C9A24E]' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            Our Services
          </button>
          <button
            onClick={() => handleNav('/gurukul')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              isActive('/gurukul') ? 'bg-[#F5F2EA] text-[#C9A24E]' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            Sahayak Gurukul
          </button>
          <button
            onClick={() => handleNav('/blogs')}
            className="w-full text-left py-2 px-6 rounded-lg text-xs text-stone-500 hover:bg-stone-50"
          >
            • Financial Blogs & Insights
          </button>
          <button
            onClick={() => handleNav('/achievements')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              isActive('/achievements') ? 'bg-[#F5F2EA] text-[#C9A24E]' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => handleNav('/careers')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              isActive('/careers') ? 'bg-[#F5F2EA] text-[#C9A24E]' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            Careers
          </button>
          <button
            onClick={() => handleNav('/books')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-between ${
              isActive('/books') ? 'bg-[#F5F2EA] text-[#C9A24E]' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <span className="flex items-center gap-2">📚 Sahayak Books Store</span>
            <span className="text-[10px] bg-[#C9A24E] text-white px-2 py-0.5 rounded-full font-bold">Store</span>
          </button>
          <button
            onClick={() => handleNav('/login')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Client / Reader Login
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav('/contact')}
              className="w-full py-2.5 text-center text-xs font-bold text-[#071526] bg-[#C9A24E] rounded-full"
            >
              Contact Advisory Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
