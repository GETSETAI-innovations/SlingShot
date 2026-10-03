import React, { useState, useMemo } from 'react';
import { rankingCategories, seniorMenRankings, districtMedalTally } from '../data/rankingsData';
import { Search, X, Trophy, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AthletesAndRankings() {
  const [selectedTab, setSelectedTab] = useState("Men's Senior (10m)");
  const [searchQuery, setSearchQuery] = useState('');

  // Filter athletes based on search query
  const filteredAthletes = useMemo(() => {
    if (!searchQuery.trim()) return seniorMenRankings;
    const q = searchQuery.toLowerCase();
    return seniorMenRankings.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.district.toLowerCase().includes(q) ||
        a.discipline.toLowerCase().includes(q) ||
        (a.badge && a.badge.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Filter medal tally based on search query
  const filteredTally = useMemo(() => {
    if (!searchQuery.trim()) return districtMedalTally;
    const q = searchQuery.toLowerCase();
    return districtMedalTally.filter((d) => d.name.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
      <section className="py-12 sm:py-16 bg-white" data-purpose="rankings-and-medals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Search Bar on Right Top */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-black tracking-widest text-esac-blue uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-2">
                Official Standings 2025-2026
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-esac-navy tracking-tight uppercase">
                Chhattisgarh State Rankings
              </h1>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Certified federation merit points calculated across sanctioned district and state championships.
              </p>
            </div>

            {/* Right Top Search Bar */}
            <div className="relative w-full md:w-80 shrink-0">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-8 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-esac-blue/20 focus:border-esac-blue shadow-xs transition"
                placeholder="Search athletes, district, club..."
                type="text"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Clear search"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {rankingCategories.map((tab) => {
              const isActive = selectedTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
                    isActive
                      ? 'bg-esac-navy text-white shadow-xs'
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
            {/* Athletes List (Left 8 Cols) */}
            <div className="lg:col-span-8 space-y-3">
              {filteredAthletes.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-slate-500 text-sm font-semibold">
                    No athletes found matching "{searchQuery}".
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-xs font-bold text-esac-blue hover:underline cursor-pointer"
                  >
                    Clear Search Filter
                  </button>
                </div>
              ) : (
                filteredAthletes.map((athlete, idx) => {
                  const isFirst = athlete.rank === 1;
                  const isSecond = athlete.rank === 2;
                  const isThird = athlete.rank === 3;

                  return (
                    <div
                      key={athlete.rank}
                      className={`p-4 rounded-xl border flex items-center justify-between shadow-xs transition ${
                        isFirst
                          ? 'bg-gradient-to-r from-amber-50 to-white border-2 border-amber-300'
                          : isSecond
                          ? 'bg-white border-slate-200 hover:border-slate-300'
                          : isThird
                          ? 'bg-white border-slate-200 hover:border-slate-300'
                          : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-base shadow-xs ${
                            isFirst
                              ? 'bg-amber-400 text-slate-900'
                              : isSecond
                              ? 'bg-slate-200 text-slate-800'
                              : isThird
                              ? 'bg-amber-700/20 text-amber-900'
                              : 'bg-white text-slate-600 border border-slate-200 text-sm'
                          }`}
                        >
                          {athlete.rank}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-base">{athlete.name}</h4>
                            {athlete.badge && (
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                  isFirst
                                    ? 'bg-amber-200 text-amber-900'
                                    : isSecond
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {athlete.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="font-semibold text-esac-navy">{athlete.district}</span>
                            <span>•</span>
                            <span>Discipline: {athlete.discipline}</span>
                            {athlete.streak && (
                              <>
                                <span>•</span>
                                <span className="text-emerald-600 font-semibold font-mono">Streak: {athlete.streak}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-esac-navy font-mono">
                          {athlete.pts} <span className="text-xs font-normal text-slate-500">PTS</span>
                        </div>
                        {athlete.medals && (
                          <span
                            className={`text-[11px] font-bold ${
                              isFirst ? 'text-amber-600' : isThird ? 'text-amber-800' : 'text-slate-600'
                            }`}
                          >
                            {athlete.medals}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
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
                  {filteredTally.map((d) => (
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
                <Link className="text-xs font-bold text-esac-blue hover:underline" to="/districts">
                  View Complete 33 Districts Tally →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
