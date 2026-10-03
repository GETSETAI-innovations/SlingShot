import React, { useState } from 'react';
import { Calendar, Tag, ArrowRight, Trophy, Bell, Camera, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsEventsStories() {
  const [activeTab, setActiveTab] = useState('All');

  const articles = [
    {
      id: 1,
      category: 'Official Announcement',
      title: 'State Technical Committee Releases 2026 Competition Rulebook',
      date: 'Jan 10, 2026',
      summary: 'Mandatory steel projectile weights (9mm and 11mm) and standardized 10m target dimensions updated for all district meets.',
      icon: Bell,
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 2,
      category: 'Competition Updates',
      title: 'Raipur to Host 4th Chhattisgarh State Championship Finals',
      date: 'Jan 14, 2026',
      summary: 'Sardar Vallabhbhai Patel Indoor Range readied for 300+ competitors with optical telemetry electronic scoring systems.',
      icon: Trophy,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 3,
      category: 'Results',
      title: 'Devendra Netam Sets State Record with 298/300 Precision Score',
      date: 'Jan 18, 2026',
      summary: 'Bastar contingent marksman hits 29 consecutive 10-rings in the Men’s Senior 10m Precision finals round.',
      icon: Trophy,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 4,
      category: 'Athlete Achievements',
      title: 'Sandeep Mandavi Selected for National Elite Training Camp',
      date: 'Feb 02, 2026',
      summary: 'Representing Chhattisgarh, Mandavi earns merit scholarship after exceptional consistency across 4 district selection trials.',
      icon: UserCheck,
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 5,
      category: 'Training Activities',
      title: 'Level-1 Coach & Range Safety Officer Certification in Bilaspur',
      date: 'Feb 15, 2026',
      summary: '32 new physical education teachers and sports officers complete practical range setup and whistle protocol modules.',
      icon: UserCheck,
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 6,
      category: 'Event Photography',
      title: 'Grassroots Talent Hunt Photo Highlights from Surguja & Dantewada',
      date: 'Mar 01, 2026',
      summary: 'Over 450 school students participated in introductory clinics; photo gallery available in the media archive.',
      icon: Camera,
      badgeColor: 'bg-rose-100 text-rose-800'
    }
  ];

  const categories = ['All', 'Official Announcement', 'Competition Updates', 'Results', 'Athlete Achievements'];

  const filtered = activeTab === 'All' ? articles : articles.filter(a => a.category === activeTab);

  return (
    <section className="py-16 bg-white border-t border-slate-200" id="news-events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-esac-blue text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-esac-blue"></span>
              Bulletin &amp; Dispatches
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-esac-navy uppercase tracking-tight">
              News, Events &amp; Athlete Stories
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Latest circulars, tournament results, and athlete spotlights from across Chhattisgarh.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === cat
                    ? 'bg-esac-blue text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-esac-blue/50 hover:bg-white transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${item.badgeColor}`}>
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-esac-navy leading-snug hover:text-esac-blue transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-esac-blue">
                  <span className="hover:underline flex items-center gap-1 cursor-pointer">
                    Read Circular <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
