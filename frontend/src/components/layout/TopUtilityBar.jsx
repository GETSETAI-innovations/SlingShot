import React, { useState } from 'react';

export default function TopUtilityBar() {
  const [lang, setLang] = useState('EN');

  return (
    <aside className="bg-slate-900 text-slate-200 text-xs border-b border-slate-700/60 sticky top-0 z-50" data-purpose="utility-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* State recognition & National affiliation badge */}
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            GOVT. RECOGNIZED
          </span>
          <span className="hidden md:inline text-slate-200">
            State Sports Association Recognized by Sports &amp; Youth Welfare Dept, Govt. of Chhattisgarh
          </span>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="text-slate-200 font-semibold">Affiliated to Elite Slingshot Federation of India (ESFI)</span>
        </div>

        {/* Quick contacts, Language & Portal links */}
        <div className="flex items-center gap-4 text-[11px]">
          <div className="hidden sm:flex items-center gap-3 text-slate-200">
            <a className="hover:text-amber-400 transition-colors flex items-center gap-1" href="tel:18002333722">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
              </svg>
              Toll-Free: 1800-233-ESAC
            </a>
            <span>•</span>
            <a className="hover:text-amber-400 transition-colors" href="mailto:contact@eliteslingshot-cg.org">
              contact@eliteslingshot-cg.org
            </a>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center border border-slate-700 rounded overflow-hidden">
            <button
              onClick={() => setLang('EN')}
              className={`px-2 py-0.5 font-bold text-[10px] transition ${lang === 'EN' ? 'bg-esac-blue text-white' : 'hover:bg-slate-800 text-slate-400 font-medium'}`}
              type="button"
            >
              EN
            </button>
            <button
              onClick={() => setLang('HI')}
              className={`px-2 py-0.5 font-bold text-[10px] transition ${lang === 'HI' ? 'bg-esac-blue text-white' : 'hover:bg-slate-800 text-slate-400 font-medium'}`}
              type="button"
            >
              हिन्दी
            </button>
          </div>

          {/* Athlete Portal shortcut */}
          <a className="inline-flex items-center gap-1 text-amber-400 hover:underline font-semibold" href="#certificate-verification">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Verify Certificate
          </a>
        </div>
      </div>
    </aside>
  );
}
