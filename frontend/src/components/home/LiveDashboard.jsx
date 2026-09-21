import React, { useState } from 'react';
import { liveMatchTop5 } from '../../data/rankingsData';

export default function LiveDashboard() {
  const [activeRound, setActiveRound] = useState('Round 4 (Active)');
  const rounds = ['Round 1', 'Round 2', 'Round 3', 'Round 4 (Active)', 'Finals'];

  return (
    <section className="py-16 bg-slate-100 text-slate-900 border-t border-slate-200 relative" data-purpose="live-match-centre" id="live-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-xs font-bold tracking-widest text-red-600 uppercase">Live Championship Match Centre</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 uppercase text-esac-navy">4th CG State Championship • Men’s 10m Precision Final</h2>
            <p className="text-slate-600 text-xs">Venue: Sardar Vallabhbhai Patel Indoor Range, Raipur | Official Court #1</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 text-xs shadow-sm overflow-x-auto">
            {rounds.map((round) => {
              const isActive = activeRound === round;
              return (
                <button
                  key={round}
                  onClick={() => setActiveRound(round)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  type="button"
                >
                  {round}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Scoreboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
          {/* Live Athletes Head-to-Head Card (Left) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
              <span>Gold Medal Bout</span>
              <span className="text-emerald-600 font-mono font-bold">SHOT 4 OF 6</span>
            </div>
            {/* Athlete 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">RAIPUR</span>
                  <div className="text-base font-bold text-slate-900 mt-1">Aryan Kashyap</div>
                  <div className="text-[11px] text-slate-500">ESAC ID: CG-RAI-2024-0012</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-amber-600 font-mono">289</div>
                  <div className="text-[10px] font-bold text-emerald-600">Hits: 29/30</div>
                </div>
              </div>
            </div>
            <div className="text-center font-black text-slate-400 text-xs tracking-widest uppercase">— VERSUS —</div>
            {/* Athlete 2 */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-300 relative overflow-hidden">
              <div className="absolute -right-1 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">BASTAR</span>
                  <div className="text-base font-bold text-slate-900 mt-1">Sandeep Mandavi</div>
                  <div className="text-[11px] text-slate-500">ESAC ID: CG-BAS-2023-0891</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-emerald-600 font-mono">294</div>
                  <div className="text-[10px] font-bold text-emerald-600">Hits: 30/30 (LEAD)</div>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-600 flex justify-between items-center pt-2 border-t border-slate-100">
              <span>Laser Chronograph: <strong className="text-slate-900 font-mono">84.1 m/s</strong></span>
              <span>Referee: <strong className="text-slate-900">M. K. Verma</strong></span>
            </div>
          </div>

          {/* Target Visualization Card (Center) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Target Visual Hit-Map (10m)</div>
            {/* Virtual concentric circular target with crisp high-contrast sports appearance */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-slate-100 border-4 border-slate-300 shadow-inner flex items-center justify-center overflow-hidden">
              {/* Outer rings */}
              <div className="target-ring w-[90%] h-[90%] border-2 border-slate-300 bg-white"></div>
              <div className="target-ring w-[72%] h-[72%] border-2 border-blue-200 bg-blue-50/70"></div>
              <div className="target-ring w-[54%] h-[54%] border-2 border-red-200 bg-red-50/80"></div>
              <div className="target-ring w-[36%] h-[36%] border-2 border-amber-300 bg-amber-50"></div>
              {/* Bullseye 10-Ring */}
              <div className="target-ring w-[18%] h-[18%] bg-amber-400 rounded-full border-2 border-amber-600 flex items-center justify-center shadow-xs">
                <span className="text-[9px] font-black text-slate-900">10X</span>
              </div>
              {/* Virtual impact coordinates */}
              <span className="absolute top-[48%] left-[51%] w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-md animate-ping"></span>
              <span className="absolute top-[48%] left-[51%] w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-md"></span>
              <span className="absolute top-[44%] left-[47%] w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white shadow-xs"></span>
              <span className="absolute top-[52%] left-[49%] w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white shadow-xs"></span>
              <span className="absolute top-[40%] left-[55%] w-2.5 h-2.5 bg-blue-600 rounded-full border border-white shadow-xs"></span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-600 mt-4">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Aryan K.</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span> Sandeep M.</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> 10X Bullseye</span>
            </div>
          </div>

          {/* Live Standings Table (Right) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-3 border-b border-slate-200 flex justify-between items-center">
              <span>Current Flight Top 5</span>
              <span className="text-[10px] font-bold text-esac-saffron bg-orange-50 px-2 py-0.5 rounded border border-orange-200">Auto-refresh 5s</span>
            </div>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="py-2">#</th>
                    <th className="py-2">Athlete</th>
                    <th className="py-2">Dist.</th>
                    <th className="py-2 text-right">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {liveMatchTop5.map((row) => (
                    <tr key={row.rank} className={row.highlight ? 'text-emerald-700 font-bold bg-emerald-50/50' : ''}>
                      <td className={`py-2.5 ${row.isSecond ? 'text-amber-700 font-bold' : (!row.highlight ? 'text-slate-500' : '')}`}>
                        {row.rank}
                      </td>
                      <td className={`font-sans ${row.highlight ? 'text-slate-900' : (row.isSecond ? 'text-slate-800' : 'text-slate-700')}`}>
                        {row.name}
                      </td>
                      <td className="text-slate-500">{row.dist}</td>
                      <td className={`text-right ${row.highlight ? 'text-emerald-600' : 'text-slate-700'}`}>
                        {row.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
