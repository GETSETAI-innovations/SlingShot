import React from 'react';
import { Users, Trophy, GraduationCap, ShieldCheck, Network, Handshake, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SportingEcosystem() {
  const cards = [
    {
      title: 'Athlete Development',
      badge: 'Pathways & Training',
      icon: Users,
      desc: 'Systematic grassroots identification, biomechanics coaching, and phased progression from school clubs to state & national squads.',
      link: '/athletes-and-rankings',
      color: 'blue'
    },
    {
      title: 'Competitions',
      badge: 'State & National',
      icon: Trophy,
      desc: 'Sanctioned 10m & 15m precision championships, district leagues, ranking opens, and national trial qualification circuits.',
      link: '/competitions',
      color: 'amber'
    },
    {
      title: 'Coaching & Training',
      badge: 'Standardized Syllabus',
      icon: GraduationCap,
      desc: 'Licensed coach accreditation clinics, continuous technical development, stance mechanics, and sports science mentorship.',
      link: '/sports-and-rules',
      color: 'emerald'
    },
    {
      title: 'Safety & Standards',
      badge: 'Certified Protocol',
      icon: ShieldCheck,
      desc: 'Strict Range Safety Officer (RSO) protocols, ammunition & band inspection, controlled firing lanes, and emergency readiness.',
      link: '/safety',
      color: 'red'
    },
    {
      title: 'District Network',
      badge: 'All 33 Districts',
      icon: Network,
      desc: 'Grassroots federation presence across all 33 administrative units, linking local clubs, village talukas, and central sports complexes.',
      link: '/districts',
      color: 'purple'
    },
    {
      title: 'Partnerships & CSR',
      badge: 'Institutional Growth',
      icon: Handshake,
      desc: 'Collaborations with government sports bodies, educational institutions, industry partners, and community youth initiatives.',
      link: '/partnerships',
      color: 'orange'
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200" id="sporting-ecosystem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-esac-blue text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-esac-blue"></span>
            Federation Architecture
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-esac-navy uppercase tracking-tight">
            Complete State-Level Sporting Ecosystem
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            A comprehensive, structured federation framework empowering athletes, coaches, and administrators across Chhattisgarh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-esac-blue/50 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-esac-blue group-hover:bg-esac-blue group-hover:text-white transition duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-esac-navy group-hover:text-esac-blue transition">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    to={c.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-esac-blue hover:text-esac-blue-dark transition group-hover:translate-x-1"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
