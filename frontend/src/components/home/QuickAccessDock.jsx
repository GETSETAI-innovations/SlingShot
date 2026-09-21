import React from 'react';

export default function QuickAccessDock() {
  return (
    <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-purpose="quick-dock">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        <a className="bg-white hover:bg-blue-50 border border-slate-200 hover:border-esac-blue p-4 rounded-xl shadow-md transition group text-center flex flex-col items-center" href="#competitions">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-esac-blue group-hover:bg-esac-blue group-hover:text-white flex items-center justify-center mb-2 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-900 group-hover:text-esac-blue">2026 Calendar</span>
          <span className="text-[10px] text-slate-500">State &amp; District Meets</span>
        </a>

        <a className="bg-white hover:bg-orange-50 border border-slate-200 hover:border-esac-saffron p-4 rounded-xl shadow-md transition group text-center flex flex-col items-center" href="#athlete-registration">
          <div className="w-10 h-10 rounded-full bg-orange-100 text-esac-saffron group-hover:bg-esac-saffron group-hover:text-white flex items-center justify-center mb-2 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-900 group-hover:text-esac-saffron">Athlete Registration</span>
          <span className="text-[10px] text-slate-500">Get ESAC Unique UID</span>
        </a>

        <a className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-esac-emerald p-4 rounded-xl shadow-md transition group text-center flex flex-col items-center" href="#live-dashboard">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-esac-emerald group-hover:bg-esac-emerald group-hover:text-white flex items-center justify-center mb-2 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-900 group-hover:text-esac-emerald">Live Scoreboard</span>
          <span className="text-[10px] text-slate-500">Real-time Telemetry</span>
        </a>

        <a className="bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-600 p-4 rounded-xl shadow-md transition group text-center flex flex-col items-center" href="#districts">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center mb-2 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-900 group-hover:text-purple-600">33 Districts</span>
          <span className="text-[10px] text-slate-500">Unit Contacts &amp; Coaches</span>
        </a>

        <a className="col-span-2 md:col-span-1 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-500 p-4 rounded-xl shadow-md transition group text-center flex flex-col items-center" href="#certificate-verification">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center mb-2 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600">Verify Certificate</span>
          <span className="text-[10px] text-slate-500">QR Digital Authentication</span>
        </a>
      </div>
    </section>
  );
}
