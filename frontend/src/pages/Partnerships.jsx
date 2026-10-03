import React from 'react';
import { Trophy, School, UserCheck, Wrench, Heart, Radio, ArrowRight, Handshake } from 'lucide-react';

export default function Partnerships() {
  const partnershipAreas = [
    {
      icon: Trophy,
      iconBg: 'bg-blue-100 text-esac-blue',
      hoverBorder: 'hover:border-esac-blue',
      title: 'Championship Sponsorship',
      desc: 'Exclusive naming rights and prime digital and venue branding across state championships, district leagues, and live telecasts.'
    },
    {
      icon: School,
      iconBg: 'bg-orange-100 text-esac-saffron',
      hoverBorder: 'hover:border-esac-saffron',
      title: 'Grassroots & School Outreach',
      desc: 'CSR funding of starter kits, safe training nets, and certified coaches for government and rural tribal schools.'
    },
    {
      icon: UserCheck,
      iconBg: 'bg-emerald-100 text-emerald-600',
      hoverBorder: 'hover:border-emerald-500',
      title: 'Athlete Development',
      desc: 'Nutritional stipends, sports science assessments, equipment grants, and travel sponsorships for top ranked state contenders.'
    },
    {
      icon: Wrench,
      iconBg: 'bg-purple-100 text-purple-600',
      hoverBorder: 'hover:border-purple-600',
      title: 'Equipment & Infrastructure',
      desc: 'Development of standardized 10m & 15m indoor ranges, electronic laser chronographs, and certified target backdrops in districts.'
    },
    {
      icon: Heart,
      iconBg: 'bg-rose-100 text-rose-600',
      hoverBorder: 'hover:border-rose-500',
      title: 'Youth & Women Participation',
      desc: 'Special scholarship programs promoting young girls and underprivileged athletes entering competitive target sports.'
    },
    {
      icon: Radio,
      iconBg: 'bg-amber-100 text-amber-600',
      hoverBorder: 'hover:border-amber-500',
      title: 'Digital & Media Partnerships',
      desc: 'Broadcasting live score telemetry, documentary features, athlete storytelling, and digital championship rights.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
      <section className="py-16 bg-white" data-purpose="partnerships-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black tracking-widest text-esac-saffron uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Institutional Collaboration
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-esac-navy tracking-tight mt-3 uppercase">Partnerships &amp; Sponsorships</h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Inviting corporate CSR partners, sports foundations, and government initiatives to build the future of precision shooting in Chhattisgarh.
            </p>
          </div>

          {/* Partnership Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {partnershipAreas.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`p-6 rounded-2xl bg-slate-50 border border-slate-200 ${item.hoverBorder} transition`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-esac-navy text-base">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 text-slate-800 rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <span className="text-esac-saffron text-xs font-bold uppercase tracking-wider">Become an Official Partner</span>
                <h3 className="text-xl font-black text-esac-navy mt-1">Join Our Mission As A Development Partner</h3>
                <p className="text-slate-600 text-sm mt-2">
                  Collaborate directly with the state governing body to sponsor youth athletes and build sporting infrastructure.
                </p>
              </div>
              <a
                href="mailto:contact@eliteslingshot-cg.org?subject=Partnership%20Inquiry%20-%20ESAC"
                className="px-6 py-3.5 bg-esac-saffron hover:bg-esac-saffron-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm flex items-center gap-2 whitespace-nowrap"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
