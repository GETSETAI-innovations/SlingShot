import React from 'react';
import { Target, CheckCircle } from 'lucide-react';

export default function FiveYearVision() {
  const roadmap = [
    {
      year: 'Year 1',
      title: 'Foundation',
      period: '2024–2025',
      summary: 'Accreditation of all 33 district units, codifying unified rules, and training first 50 Range Safety Officers.'
    },
    {
      year: 'Year 2',
      title: 'Expansion',
      period: '2025–2026',
      summary: 'Inter-school league rollout, 15 certified indoor 10m ranges, and surpassing 2,500 registered athletes.'
    },
    {
      year: 'Year 3',
      title: 'Standardisation',
      period: '2026–2027',
      summary: 'Full electronic telemetry scoring at district meets and launch of state ranking points circuit.'
    },
    {
      year: 'Year 4',
      title: 'Performance',
      period: '2027–2028',
      summary: 'High-altitude conditioning in Mainpat, specialized coaching clinics, and top podium finishes at Nationals.'
    },
    {
      year: 'Year 5',
      title: 'Excellence',
      period: '2028–2029',
      summary: 'Hosting the National Slingshot Games in Raipur and preparing athletes for international invitational meets.'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200" id="vision-roadmap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Strategic Roadmap
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-esac-navy uppercase tracking-tight">
            Five-Year Strategic Vision
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            A step-by-step masterplan for transforming slingshot into Chhattisgarh’s premier precision target sport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {roadmap.map((step, idx) => (
            <div
              key={step.year}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-esac-blue/50 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-esac-blue uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    {step.year}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {step.period}
                  </span>
                </div>
                <h3 className="text-base font-black text-esac-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.summary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Phase 0{idx + 1} Target</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
