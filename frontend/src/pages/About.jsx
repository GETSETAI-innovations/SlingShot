import React from 'react';

export default function About() {
  const pillars = [
    {
      icon: '🎯',
      iconBg: 'bg-blue-100 text-esac-blue',
      hoverBorder: 'hover:border-esac-blue',
      title: 'Standardized Rules & Ranges',
      desc: 'Implementing ESFI & World Slingshot Federation rules with laser-calibrated 10m and 15m safety drop-target steel systems.'
    },
    {
      icon: '🌿',
      iconBg: 'bg-orange-100 text-esac-saffron',
      hoverBorder: 'hover:border-esac-saffron',
      title: 'Indigenous Talent Incubation',
      desc: 'Harnessing the innate marksmanship of youth across Bastar, Dantewada, Kanker, and Surguja through free equipment kits.'
    },
    {
      icon: '🛡️',
      iconBg: 'bg-emerald-100 text-emerald-600',
      hoverBorder: 'hover:border-emerald-500',
      title: 'Athlete Welfare & Grants',
      desc: 'Comprehensive sports insurance coverage, dietary stipends for state camp trainees, and national travel allowance grants.'
    },
    {
      icon: '⚖️',
      iconBg: 'bg-purple-100 text-purple-600',
      hoverBorder: 'hover:border-purple-600',
      title: 'Transparent State Selection',
      desc: 'Purely digital score-based open trials observed by neutral state referees ensuring unbiased merit selection for National Games.'
    }
  ];

  const leaders = [
    { initials: 'PC', role: 'Hon. Patron-in-Chief', dept: 'Directorate of Sports, CG', bg: 'bg-amber-50 border-amber-400 text-amber-700' },
    { initials: 'SP', role: 'State President', dept: 'ESAC Executive Body', bg: 'bg-blue-50 border-esac-blue text-esac-blue' },
    { initials: 'GS', role: 'General Secretary', dept: 'Admin & ESFI Liaison', bg: 'bg-emerald-50 border-emerald-400 text-emerald-700' },
    { initials: 'TD', role: 'Technical Director', dept: 'Target Range & Ballistics', bg: 'bg-purple-50 border-purple-400 text-purple-700' },
    { initials: 'CR', role: 'Chief Range Referee', dept: 'National Judge Council', bg: 'bg-orange-50 border-esac-saffron text-orange-600', extraClass: 'col-span-2 md:col-span-1' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
      <section className="py-16 bg-white" data-purpose="about-governance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black tracking-widest text-esac-blue uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Official Association Profile
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-esac-navy tracking-tight mt-3 uppercase">About ESAC &amp; Governance</h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              The Elite Slingshot Association of Chhattisgarh (ESAC) is the apex governing body established to nurture, professionalize, and elevate precision target slingshot from its deep indigenous roots into a globally competitive sport.
            </p>
          </div>

          {/* 4 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {pillars.map((pillar, idx) => (
              <div key={idx} className={`p-6 rounded-2xl bg-slate-50 border border-slate-200 ${pillar.hoverBorder} transition`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mb-4 ${pillar.iconBg}`}>
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-esac-navy text-base">{pillar.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Leadership Showcase Strip */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 text-slate-800 rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between pb-6 border-b border-slate-200 gap-4">
              <div>
                <span className="text-esac-saffron text-xs font-bold uppercase tracking-wider">Apex Executive Council</span>
                <h3 className="text-xl font-black text-esac-navy">Office Bearers &amp; Technical Directorate</h3>
              </div>
              <a className="text-xs font-bold text-esac-blue hover:text-esac-blue-dark underline flex items-center gap-1" href="#resources">
                Download ESAC Constitution PDF →
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-6 text-center">
              {leaders.map((ldr, idx) => (
                <div key={idx} className={`space-y-2 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs ${ldr.extraClass || ''}`}>
                  <div className={`w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center text-xl font-black shadow-sm ${ldr.bg}`}>
                    {ldr.initials}
                  </div>
                  <div className="font-bold text-sm text-slate-900">{ldr.role}</div>
                  <div className="text-[11px] text-slate-500">{ldr.dept}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
