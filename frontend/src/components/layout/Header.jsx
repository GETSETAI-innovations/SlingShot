import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Header({ onOpenRegistrationModal }) {
  const { language, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur shadow-md sticky top-[33px] z-40 border-b border-slate-200" data-purpose="federation-main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Official Logo & Bilingual Titles */}
          <Link className="flex items-center gap-3 group" to="/">
            <img
              id="header-federation-logo"
              alt="Official Crest of Elite Slingshot Association of Chhattisgarh"
              className="h-16 w-16 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Kq1Qhu61VwrEpMR1aCaZe0DJVUGNiBy0ErOZ_AkjE0Xc7tQKOCu8Q3tWLHnKWqsDAoCpIlzUqBHh-E37hkW8fQjFUKK4QQFYu8NB3_PdD045PVvDH74M2nhTOrPoXg2pkOMpmS8wl7XELzOK6YulzVNqpSN4srydvpCzBiW7G3gVYJn1fRovUs5Nx9HZz6pDnw_NUHx9wwKylp-tksG6HlzEd7kGg_g6LQfXrHUxOwpcR6r8NzfJ"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-esac-saffron">State Sports Governing Body</span>
              <span className="text-base sm:text-lg lg:text-xl font-black text-esac-navy leading-tight tracking-tight uppercase">
                Elite Slingshot Association of Chhattisgarh
              </span>
              <span className="text-xs text-slate-500 font-medium">
                छ.ग. एलीट स्लिंगशॉट संघ | <span className="italic text-esac-blue font-semibold">Aim. Focus. Compete. Excel.</span>
              </span>
            </div>
          </Link>

          {/* Desktop Quick Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link className="px-3.5 py-2 text-xs font-bold text-esac-navy hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1.5 transition" to="/live-scores">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Scores
            </Link>
            <button
              onClick={onOpenRegistrationModal}
              className="px-4 py-2 text-xs font-bold bg-esac-saffron hover:bg-esac-saffron-dark text-white rounded-lg shadow-sm hover:shadow transition transform active:scale-95 flex items-center gap-1.5"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Athlete ESAC-ID Register
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              type="button"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Main Navigation Menu Bar */}
        <nav className="border-t border-slate-100 py-1.5 overflow-x-auto flex items-center justify-between text-xs font-semibold text-slate-700 scrollbar-none" data-purpose="primary-navigation">
          <div className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
            <Link className="px-3 py-1.5 text-esac-blue bg-blue-50 rounded-md font-bold" to="/">HOME</Link>
            <Link className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" to="/about">ABOUT US</Link>
            <Link className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" to="/sports-and-rules">THE SPORT &amp; RULES</Link>
            <Link className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" to="/athletes-and-rankings">ATHLETES &amp; RANKINGS</Link>
            <Link className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition flex items-center gap-1" to="/competitions">
              COMPETITIONS
              <span className="px-1.5 py-0.2 bg-red-100 text-red-600 rounded text-[9px] font-black">2026</span>
            </Link>
            <Link className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" to="/districts">33 DISTRICTS</Link>
            <Link className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition text-esac-saffron font-bold" to="/talent-hunt">TALENT HUNT 2026</Link>
            <Link className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" to="/documents">DOCUMENTS &amp; RTI</Link>
          </div>
          <div className="hidden md:flex items-center pl-4">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs bg-slate-100 border border-slate-200 rounded-full pl-7 pr-3 py-1 w-44 focus:w-60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-esac-blue transition-all"
                placeholder="Search athletes, clubs, circulars..."
                type="text"
              />
              <svg className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-2">
            <div className="flex flex-col gap-2">
              <Link onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-esac-navy hover:bg-slate-100 rounded-lg flex items-center gap-1.5" to="/live-scores">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Scores
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegistrationModal();
                }}
                className="px-3 py-2 text-xs font-bold bg-esac-saffron text-white rounded-lg flex items-center gap-1.5"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Athlete ESAC-ID Register
              </button>
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-semibold">Language / भाषा:</span>
                <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                  <button
                    onClick={() => setLanguage('EN')}
                    className={`px-3 py-1 font-bold text-xs transition ${
                      language === 'EN' ? 'bg-[#2563EB] text-white' : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    type="button"
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('HI')}
                    className={`px-3 py-1 font-bold text-xs transition ${
                      language === 'HI' ? 'bg-[#F97316] text-white' : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    type="button"
                  >
                    हिन्दी
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
