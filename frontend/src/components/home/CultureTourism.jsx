import React from 'react';
import { Mountain, Compass, Sparkles, Building2, MapPin } from 'lucide-react';

export default function CultureTourism() {
  const destinations = [
    {
      title: 'Bastar & Tribal Heritage',
      tag: 'Indigenous Roots',
      location: 'Southern Chhattisgarh',
      icon: Sparkles,
      gradient: 'from-amber-600 to-orange-700',
      desc: 'Centuries of indigenous hunting tradition and rosewood carving heritage refined into modern precision sportsmanship across Bastar, Dantewada and Kondagaon.'
    },
    {
      title: 'Chitrakote',
      tag: 'Eco-Sports Arena',
      location: 'Indravati River Basin',
      icon: Compass,
      gradient: 'from-blue-600 to-cyan-700',
      desc: 'Known as the Niagara of India, Chitrakote provides a backdrop for regional outdoor invitational ranges and adventure shooting demonstrations.'
    },
    {
      title: 'Sirpur',
      tag: 'Historic Precision',
      location: 'Mahanadi Valley',
      icon: Mountain,
      gradient: 'from-stone-600 to-amber-800',
      desc: 'Ancient 5th–8th century archaeological site where centuries of sculpture and archery discipline inspire state athletes to master precision and focus.'
    },
    {
      title: 'Mainpat',
      tag: 'High-Altitude Conditioning',
      location: 'Surguja Plateau',
      icon: Mountain,
      gradient: 'from-emerald-600 to-teal-800',
      desc: 'The "Shimla of Chhattisgarh" situated at 1,100m elevation, hosting high-altitude summer endurance camps and calm-wind target training clinics.'
    },
    {
      title: 'Raipur',
      tag: 'State Capital & Apex Arena',
      location: 'Central Chhattisgarh',
      icon: Building2,
      gradient: 'from-blue-800 to-indigo-900',
      desc: 'Headquarters of ESAC and the central hub at Sardar Vallabhbhai Patel Complex, hosting the State Championships and national qualifying trials.'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200" id="culture-tourism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-esac-saffron text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-esac-saffron"></span>
            Heritage &amp; Geography
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-esac-navy uppercase tracking-tight">
            Sport. Culture. Chhattisgarh.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Connecting our ancient indigenous marksman heritage with modern Olympic-format precision across iconic Chhattisgarh landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {destinations.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md hover:border-esac-blue/50 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`h-28 bg-gradient-to-br ${d.gradient} p-4 flex flex-col justify-between text-white relative`}>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 backdrop-blur-xs px-2 py-0.5 rounded-full w-fit">
                      {d.tag}
                    </span>
                    <div className="flex items-center justify-between">
                      <Icon className="w-6 h-6 text-white/90" />
                      <span className="text-[10px] font-medium text-white/80 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {d.location}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-black text-esac-navy">{d.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <div className="text-[10px] font-bold text-esac-blue uppercase tracking-wider">
                    Regional Sports Circuit
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
