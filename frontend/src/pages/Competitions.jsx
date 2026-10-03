import React from 'react';
import { competitions } from '../data/competitionsData';
import { showToastInfo } from '../utils/toast';

export default function Competitions() {
  const handleApply = (competitionName) => {
    showToastInfo(`Applying for: ${competitionName}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 bg-red-100 text-red-600 text-[11px] font-black uppercase rounded-full tracking-wider shadow-sm">
              Competition Calendar 2026
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 uppercase text-esac-navy">
              Upcoming Championships
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Register for official ESAC-sanctioned tournaments across Chhattisgarh. Compete for state rankings, national qualifications, and international representation.
            </p>
          </div>

          {/* Competitions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((comp) => (
              <div key={comp.id} className="bg-white rounded-2xl border border-slate-200 hover:border-esac-blue hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${comp.statusColor}`}>
                      {comp.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{comp.discipline}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{comp.name}</h3>
                  <p className="text-xs text-slate-600 mt-1">{comp.category}</p>
                </div>

                {/* Body */}
                <div className="p-5 bg-slate-50 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Date</div>
                      <div className="text-xs font-semibold text-slate-800">{comp.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Venue</div>
                      <div className="text-xs font-semibold text-slate-800">{comp.venue}</div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-100">
                  <button
                    onClick={() => handleApply(comp.name)}
                    disabled={comp.status === 'By Invitation'}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                      comp.status === 'By Invitation'
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-esac-saffron hover:bg-esac-saffron-dark text-white shadow-md hover:shadow-lg'
                    }`}
                    type="button"
                  >
                    {comp.status === 'By Invitation' ? 'By Invitation Only' : 'Apply Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
