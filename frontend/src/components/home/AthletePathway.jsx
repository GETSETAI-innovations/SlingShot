import React from 'react';
import { Compass, BookOpen, Trophy, CheckCircle, Flag, Award } from 'lucide-react';

export default function AthletePathway() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      subtitle: 'Grassroots Talent Scouting',
      desc: 'Identifying potential in schools, sports day meets, and tribal traditional sports gatherings.',
      icon: Compass,
      color: 'bg-blue-50 text-esac-blue border-blue-200'
    },
    {
      num: '02',
      title: 'Introduce',
      subtitle: 'Fundamentals & Safety',
      desc: 'Standard stance, grip, anchor-point discipline, and safety certification under licensed trainers.',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      num: '03',
      title: 'Compete',
      subtitle: 'District-Level Leagues',
      desc: 'First competitive exposure in 10m precision rounds across 33 recognized district championship meets.',
      icon: Trophy,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      num: '04',
      title: 'Select',
      subtitle: 'State Trials & Camps',
      desc: 'Merit-based qualification for the State Championship and high-performance conditioning camps.',
      icon: CheckCircle,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      num: '05',
      title: 'Represent',
      subtitle: 'National Contingent',
      desc: 'Wearing the Chhattisgarh state jersey at National Slingshot Federation of India (ESFI) games.',
      icon: Flag,
      color: 'bg-orange-50 text-esac-saffron border-orange-200'
    },
    {
      num: '06',
      title: 'Progress',
      subtitle: 'Podium & Career Pathways',
      desc: 'National rankings, sports scholarships, coaching license eligibility, and referee certification.',
      icon: Award,
      color: 'bg-red-50 text-red-700 border-red-200'
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200" id="athlete-pathway">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Structured Progression
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-esac-navy uppercase tracking-tight">
            Athlete Development Pathway
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            A defined progression pipeline transforming grassroots shooters into national champions.
          </p>
        </div>

        {/* Desktop / Tablet Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting track line */}
          <div className="absolute top-10 left-12 right-12 h-1 bg-gradient-to-r from-esac-blue via-esac-saffron to-emerald-600 rounded-full z-0 opacity-40"></div>

          <div className="grid grid-cols-6 gap-4 relative z-10">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="flex flex-col items-center text-center group">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-2xl bg-white border-2 border-slate-200 shadow-md group-hover:border-esac-blue group-hover:scale-105 transition duration-300 flex flex-col items-center justify-center p-2">
                      <span className="text-xs font-black text-slate-400 group-hover:text-esac-blue">{s.num}</span>
                      <Icon className="w-6 h-6 text-esac-navy mt-1 group-hover:text-esac-blue transition" />
                    </div>
                    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-900 text-white shadow-xs">
                      Step {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-esac-navy mt-2 group-hover:text-esac-blue transition">
                    {s.title}
                  </h3>
                  <div className="text-[11px] font-bold text-esac-saffron uppercase tracking-wider mt-0.5">
                    {s.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Small Tablet Vertical Timeline */}
        <div className="lg:hidden relative border-l-2 border-esac-blue/30 ml-4 pl-6 space-y-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="relative">
                {/* Node icon */}
                <div className="absolute -left-[37px] top-0 w-8 h-8 rounded-full bg-esac-blue text-white flex items-center justify-center font-bold text-xs shadow">
                  {s.num}
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-esac-blue" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 0{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-black text-esac-navy">
                    {s.title} — <span className="text-esac-saffron text-sm font-bold">{s.subtitle}</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
