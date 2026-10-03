import React from 'react';
import { Trophy, School, UserCheck, Wrench, Heart, Radio, ArrowRight } from 'lucide-react';

export default function PartnershipsCSR({ onOpenContactModal }) {
  const cards = [
    {
      title: 'Championship Sponsorship',
      icon: Trophy,
      desc: 'Exclusive naming rights and prime digital and venue branding across state championships, district leagues, and live telecasts.'
    },
    {
      title: 'Grassroots & School Outreach',
      icon: School,
      desc: 'CSR funding of starter kits, safe training nets, and certified coaches for government and rural tribal schools.'
    },
    {
      title: 'Athlete Development',
      icon: UserCheck,
      desc: 'Nutritional stipends, sports science assessments, equipment grants, and travel sponsorships for top ranked state contenders.'
    },
    {
      title: 'Equipment & Infrastructure',
      icon: Wrench,
      desc: 'Development of standardized 10m & 15m indoor ranges, electronic laser chronographs, and certified target backdrops in districts.'
    },
    {
      title: 'Youth & Women Participation',
      icon: Heart,
      desc: 'Special scholarship programs promoting young girls and underprivileged athletes entering competitive target sports.'
    },
    {
      title: 'Digital & Media Partnerships',
      icon: Radio,
      desc: 'Broadcasting live score telemetry, documentary features, athlete storytelling, and digital championship rights.'
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200" id="partnerships">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-esac-blue text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-esac-blue"></span>
            Institutional Collaboration
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-esac-navy uppercase tracking-tight">
            Partners in Sporting Development
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Inviting corporate CSR partners, sports foundations, and government initiatives to build the future of precision shooting in Chhattisgarh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-esac-blue/50 hover:bg-white transition duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 text-esac-saffron flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-esac-navy mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-esac-navy to-slate-900 rounded-2xl p-8 sm:p-10 text-white text-center shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-black uppercase">
              Join Our Mission As An Official Development Partner
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Collaborate directly with the state governing body to sponsor youth athletes and build sporting infrastructure.
            </p>
          </div>
          <a
            href="mailto:contact@eliteslingshot-cg.org?subject=Partnership%20Inquiry%20-%20ESAC"
            className="px-6 py-3.5 bg-esac-saffron hover:bg-esac-saffron-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
