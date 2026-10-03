import React from 'react';
import { UserCheck, ShieldCheck, CalendarCheck, Award, CheckCircle2 } from 'lucide-react';

export default function CoachingTechCapacity() {
  const cards = [
    {
      title: 'Licensed Coaches',
      badge: 'Level 1 & Level 2',
      icon: Award,
      desc: 'Accredited training programs focusing on high-precision mechanics, draw consistency, anchor point stability, breath control, and youth sports pedagogy.',
      points: ['Biomechanics & Stance Clinics', 'Standardized Training Curriculum', 'Grassroots Club Mentorship']
    },
    {
      title: 'Competition Officials',
      badge: 'National Certified',
      icon: UserCheck,
      desc: 'Certified range judges, score stewards, and rules arbiters executing official 10m & 15m tournament scoring and millimeter target verification.',
      points: ['Electronic Target Validation', 'Millimeter Score Scrutiny', 'National ESFI Rulebook Protocol']
    },
    {
      title: 'Safety Personnel',
      badge: 'Certified RSO',
      icon: ShieldCheck,
      desc: 'Trained Range Safety Officers enforcing mandatory eye protection, ammunition inspection, strict whistle command sequence, and emergency first response.',
      points: ['Ammunition & Band Inspection', 'Controlled Shooting Lanes', 'Emergency Medical Readiness']
    },
    {
      title: 'Event Coordinators',
      badge: 'Digital Operations',
      icon: CalendarCheck,
      desc: 'Specialized logistical teams managing athlete accreditation, bracket scheduling, live telemetry scoring pipelines, and district venue operations.',
      points: ['Live Digital Score Telemetry', 'ESAC-UID Registration Checks', 'Tournament Brackets & Schedule']
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200" id="coaching-capacity">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-esac-saffron"></span>
            Technical Bench Strength
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-esac-navy uppercase tracking-tight">
            Coaching &amp; Technical Capacity
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Developing certified human capital to run fair, standardized, and world-class slingshot tournaments across the state.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-esac-blue/50 hover:bg-white transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100/60 text-esac-blue flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-esac-navy">{c.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200 space-y-1.5">
                  {c.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
