import React from 'react';

export default function StatisticsStrip() {
  const stats = [
    { value: '33/33', title: 'Recognized Districts', subtitle: '100% State Coverage', titleColor: 'text-esac-saffron' },
    { value: '1,850+', title: 'Registered Athletes', subtitle: 'Active ESAC-UID Holders', titleColor: 'text-esac-blue' },
    { value: '42', title: 'State & District Meets', subtitle: 'Conducted Since 2021', titleColor: 'text-slate-600' },
    { value: '280+', title: 'National & State Medals', subtitle: 'Proud Chattisgarh Laurels', titleColor: 'text-amber-700' },
    { value: '24', title: 'Certified Academies', subtitle: 'Standardized 10m Ranges', titleColor: 'text-esac-emerald' },
    { value: '65+', title: 'Licensed Referees', subtitle: 'National Certified Judges', titleColor: 'text-purple-600' }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200 mt-12" data-purpose="statistics-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="text-3xl lg:text-4xl font-black text-esac-navy">{item.value}</div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${item.titleColor}`}>{item.title}</div>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
