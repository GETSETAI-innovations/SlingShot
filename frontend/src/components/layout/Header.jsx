import React, { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur shadow-md sticky top-[33px] z-40 border-b border-slate-200" data-purpose="federation-main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Official Logo & Bilingual Titles */}
          <a className="flex items-center gap-3 group" href="#">
            <img
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
          </a>

          {/* Desktop Quick Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a className="px-3.5 py-2 text-xs font-bold text-esac-navy hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1.5 transition" href="#live-dashboard">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Scores
            </a>
            <a className="px-4 py-2 text-xs font-bold bg-esac-saffron hover:bg-esac-saffron-dark text-white rounded-lg shadow-sm hover:shadow transition transform active:scale-95 flex items-center gap-1.5" href="#athlete-registration">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Athlete ESAC-ID Register
            </a>
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
            <a className="px-3 py-1.5 text-esac-blue bg-blue-50 rounded-md font-bold" href="#">HOME</a>
            <a className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" href="#about-section">ABOUT US</a>
            <a className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" href="#disciplines">THE SPORT &amp; RULES</a>
            <a className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" href="#rankings">ATHLETES &amp; RANKINGS</a>
            <a className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition flex items-center gap-1" href="#competitions">
              COMPETITIONS
              <span className="px-1.5 py-0.2 bg-red-100 text-red-600 rounded text-[9px] font-black">2026</span>
            </a>
            <a className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" href="#districts">33 DISTRICTS</a>
            <a className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition text-esac-saffron font-bold" href="#talent-hunt">TALENT HUNT 2026</a>
            <a className="px-3 py-1.5 hover:text-esac-blue hover:bg-slate-50 rounded-md transition" href="#resources">DOCUMENTS &amp; RTI</a>
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
              <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-esac-navy hover:bg-slate-100 rounded-lg flex items-center gap-1.5" href="#live-dashboard">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Scores
              </a>
              <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold bg-esac-saffron text-white rounded-lg flex items-center gap-1.5" href="#athlete-registration">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Athlete ESAC-ID Register
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
