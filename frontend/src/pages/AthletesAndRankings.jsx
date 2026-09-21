import React, { useState } from 'react';
import { rankingCategories, seniorMenRankings, districtMedalTally } from '../data/rankingsData';

export default function AthletesAndRankings() {
  const [selectedTab, setSelectedTab] = useState("Men's Senior (10m)");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
      <section className="py-16 bg-white" data-purpose="rankings-and-medals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-esac-blue uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Official Standings 2025-2026
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-esac-navy tracking-tight mt-2 uppercase">Chhattisgarh State Rankings</h2>
            <p className="text-slate-600 text-sm mt-2">Certified federation merit points calculated across sanctioned district and state championships.</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {rankingCategories.map((tab) => {
              const isActive = selectedTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                    isActive
                      ? 'bg-esac-navy text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  type="button"
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Top Athletes Preview List (Left 8 Cols) */}
            <div className="lg:col-span-8 space-y-3">
              {/* Rank 1 */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-white rounded-xl border-2 border-amber-300 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-black text-lg shadow">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{seniorMenRankings[0].name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-200 text-amber-900">
                        {seniorMenRankings[0].badge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-esac-navy">{seniorMenRankings[0].district}</span>
                      <span>•</span>
                      <span>Discipline: {seniorMenRankings[0].discipline}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-esac-navy font-mono">
                    {seniorMenRankings[0].pts} <span className="text-xs font-normal text-slate-500">PTS</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-600">{seniorMenRankings[0].medals}</span>
                </div>
              </div>

              {/* Rank 2 */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between shadow-sm transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-black text-lg">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{seniorMenRankings[1].name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                        {seniorMenRankings[1].badge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-esac-navy">{seniorMenRankings[1].district}</span>
                      <span>•</span>
                      <span>Discipline: {seniorMenRankings[1].discipline}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-esac-navy font-mono">
                    {seniorMenRankings[1].pts} <span className="text-xs font-normal text-slate-500">PTS</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600">{seniorMenRankings[1].medals}</span>
                </div>
              </div>

              {/* Rank 3 */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between shadow-sm transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-700/20 text-amber-900 flex items-center justify-center font-black text-lg">
                    3
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{seniorMenRankings[2].name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {seniorMenRankings[2].badge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-esac-navy">{seniorMenRankings[2].district}</span>
                      <span>•</span>
                      <span>Discipline: {seniorMenRankings[2].discipline}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-esac-navy font-mono">
                    {seniorMenRankings[2].pts} <span className="text-xs font-normal text-slate-500">PTS</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-800">{seniorMenRankings[2].medals}</span>
                </div>
              </div>

              {/* Rank 4 & 5 Compact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-white font-bold text-xs flex items-center justify-center border border-slate-300">4</span>
                    <div>
                      <div className="font-bold text-xs text-slate-900">{seniorMenRankings[3].name}</div>
                      <div className="text-[10px] text-slate-500">{seniorMenRankings[3].district} • {seniorMenRankings[3].pts}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600">Streak: {seniorMenRankings[3].streak}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-white font-bold text-xs flex items-center justify-center border border-slate-300">5</span>
                    <div>
                      <div className="font-bold text-xs text-slate-900">{seniorMenRankings[4].name}</div>
                      <div className="text-[10px] text-slate-500">{seniorMenRankings[4].district} • {seniorMenRankings[4].pts}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600">Streak: {seniorMenRankings[4].streak}</span>
                </div>
              </div>
            </div>

            {/* District Medal Tally Table (Right 4 Cols) */}
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-bold text-esac-navy text-sm uppercase">District Medal Tally 2025-26</h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">All Meets</span>
              </div>
              <table className="w-full text-left text-xs mt-3">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-200">
                    <th className="py-2">District</th>
                    <th className="py-2 text-center text-amber-500">🥇 G</th>
                    <th className="py-2 text-center text-slate-400">🥈 S</th>
                    <th className="py-2 text-center text-amber-700">🥉 B</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 font-mono">
                  {districtMedalTally.map((d) => (
                    <tr key={d.rank}>
                      <td className="py-2 font-sans font-bold text-slate-800">{d.rank}. {d.name}</td>
                      <td className="text-center font-bold text-amber-600">{d.gold}</td>
                      <td className="text-center text-slate-600">{d.silver}</td>
                      <td className="text-center text-slate-600">{d.bronze}</td>
                      <td className="text-right font-bold text-slate-900">{d.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 pt-3 border-t border-slate-200 text-center">
                <a className="text-xs font-bold text-esac-blue hover:underline" href="#districts">
                  View Complete 33 Districts Tally →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
