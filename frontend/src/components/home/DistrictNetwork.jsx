import React from 'react';
import { MapPin, Network, ArrowRight, ShieldCheck, Users, Building, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { districts } from '../../data/districtsData';

export default function DistrictNetwork() {
  const divisions = [
    {
      name: 'Raipur Division',
      headquarters: 'Raipur Sports Complex',
      districtsCount: '5 Districts',
      activeRanges: 'Raipur, Balodabazar, Gariaband, Dhamtari, Mahasamund',
      athletes: '380+ Athletes'
    },
    {
      name: 'Durg Division',
      headquarters: 'Jayanti Stadium, Bhilai',
      districtsCount: '7 Districts',
      activeRanges: 'Durg, Rajnandgaon, Balod, Bemetara, Kabirdham, Khairagarh, Mohla-Manpur',
      athletes: '420+ Athletes'
    },
    {
      name: 'Bilaspur Division',
      headquarters: 'Raja Raghuraj Stadium',
      districtsCount: '8 Districts',
      activeRanges: 'Bilaspur, Korba, Raigarh, Janjgir-Champa, Mungeli, Gaurela-Pendra-Marwahi, Sakti, Sarangarh',
      athletes: '390+ Athletes'
    },
    {
      name: 'Bastar Division',
      headquarters: 'Dharampura Archery & Slingshot Hub',
      districtsCount: '7 Districts',
      activeRanges: 'Bastar, Dantewada, Kanker, Kondagaon, Narayanpur, Sukma, Bijapur',
      athletes: '450+ Athletes'
    },
    {
      name: 'Surguja Division',
      headquarters: 'Gandhi Stadium, Ambikapur',
      districtsCount: '6 Districts',
      activeRanges: 'Surguja, Surajpur, Balrampur, Koriya, Manendragarh-Chirmiri-Bharatpur, Jashpur',
      athletes: '210+ Athletes'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200" id="districts-network">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            Statewide Footprint
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-esac-navy uppercase tracking-tight">
            33 Districts. One Sporting Network.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Unifying traditional shooting prowess across all five administrative divisions under uniform national safety and scoring standards.
          </p>
        </div>

        {/* Organizational Flow Strip */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center mb-6">
            Federation Operational Hierarchy &amp; Grassroots Delivery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-esac-blue flex items-center justify-center font-bold mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-esac-navy uppercase">State Association</span>
              <span className="text-[11px] text-slate-500 mt-1">ESAC Apex Council &amp; State Rules Commission</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-esac-saffron flex items-center justify-center font-bold mb-2">
                <Network className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-esac-navy uppercase">District / Regional Units</span>
              <span className="text-[11px] text-slate-500 mt-1">33 District Associations &amp; Licensed Coordinators</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
                <Building className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-esac-navy uppercase">Clubs &amp; Academies</span>
              <span className="text-[11px] text-slate-500 mt-1">24 Certified 10m Ranges &amp; School Training Wings</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-2">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-esac-navy uppercase">Athletes</span>
              <span className="text-[11px] text-slate-500 mt-1">1,850+ Registered Men, Women, Junior Shooters</span>
            </div>
          </div>
        </div>

        {/* 5 Divisional Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {divisions.map((div) => (
            <div key={div.name} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-esac-blue/50 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{div.districtsCount}</span>
                </div>
                <h4 className="text-base font-black text-esac-navy">{div.name}</h4>
                <p className="text-[11px] font-semibold text-esac-blue mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{div.headquarters}</span>
                </p>
                <div className="text-[11px] text-slate-600 mt-2.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-800 block text-[10px] uppercase text-slate-500">Districts Covered:</span>
                  {div.activeRanges}
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-slate-700">
                {div.athletes}
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="text-center">
          <Link
            to="/districts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-esac-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow"
          >
            <span>Explore All 33 District Units &amp; Local Coordinators</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
