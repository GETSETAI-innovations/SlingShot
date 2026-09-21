import React from 'react';
import { disciplines, technicalSpecs } from '../../data/disciplinesData';

export default function Disciplines() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200" data-purpose="disciplines-section" id="disciplines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-black tracking-widest text-esac-saffron uppercase">Official Regulations &amp; Categories</span>
            <h2 className="text-2xl sm:text-4xl font-black text-esac-navy tracking-tight mt-1 uppercase">Disciplines of Competitive Slingshot</h2>
          </div>
          {/* Technical Spec Pill Banner */}
          <div className="bg-blue-50 border border-blue-200 text-esac-navy px-4 py-2 rounded-xl text-xs flex flex-wrap items-center gap-3 shadow-xs">
            <span className="font-bold text-esac-blue">Standard Specs:</span>
            <span>{technicalSpecs.ammo}</span>
            <span className="text-slate-400">|</span>
            <span>{technicalSpecs.bands}</span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-700 font-semibold">{technicalSpecs.safety}</span>
          </div>
        </div>

        {/* 6 Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((item) => (
            <div key={item.id} className={`bg-white rounded-xl p-6 border border-slate-200 ${item.hoverBorder} shadow-sm hover:shadow-md transition`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-black px-2.5 py-1 rounded ${item.badgeClass}`}>
                  DISCIPLINE {item.number}
                </span>
                <span className="text-xs font-bold text-slate-400">{item.distance}</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{item.targetLabel ? `${item.targetLabel}: ` : ''}{item.targets}</span>
                <span className="font-semibold text-slate-700">{item.scoreLabel ? `${item.scoreLabel}: ` : ''}{item.maxScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
