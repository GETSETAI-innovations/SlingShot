import React, { useState } from 'react';
import { districts } from '../data/districtsData';

export default function Districts() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.coordinator.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.centralRange.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
      <section className="py-16 bg-white border-t border-slate-200" data-purpose="districts-network">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-black tracking-widest text-esac-blue uppercase">Full State Coverage</span>
              <h2 className="text-2xl sm:text-4xl font-black text-esac-navy tracking-tight mt-1 uppercase">33 District Association Units</h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">Connect with your official district slingshot coordinator and authorized range academy.</p>
            </div>
            <div className="w-full md:w-72">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 px-3.5 py-2.5 focus:border-esac-blue focus:ring-1 focus:ring-esac-blue"
                placeholder="Search your district (e.g. Bastar, Durg)..."
                type="text"
              />
            </div>
          </div>

          {/* District Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredDistricts.map((dist, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 hover:border-esac-blue hover:shadow-md transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-sm text-esac-navy uppercase">{dist.name}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800">{dist.status}</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Coordinator: <strong className="text-slate-800">{dist.coordinator}</strong></div>
                  <div>Central Range: <span className="text-slate-500">{dist.centralRange}</span></div>
                  <div className="text-esac-blue font-semibold pt-2 text-[11px]">{dist.athletesCount}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500">
            Showing {filteredDistricts.length} of 33 recognized district associations. Affiliated under ESAC Constitution Clause 12(B).
          </div>
        </div>
      </section>
    </div>
  );
}
