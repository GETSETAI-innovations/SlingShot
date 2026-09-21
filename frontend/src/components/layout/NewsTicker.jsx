import React from 'react';

export default function NewsTicker() {
  return (
    <section className="bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 text-white text-xs py-1.5 px-4 overflow-hidden border-b border-red-800 flex items-center shadow-inner" data-purpose="live-ticker">
      <div className="flex items-center shrink-0 pr-3 border-r border-red-400/50 z-10 bg-inherit font-black text-[11px] tracking-wider uppercase text-amber-200">
        <span className="inline-block w-2.5 h-2.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
        LIVE BULLETIN
      </div>
      <div className="overflow-hidden w-full ml-3">
        <div className="animate-marquee inline-block font-medium">
          🎯 <span className="font-bold text-amber-200">4th Chhattisgarh State Slingshot Championship (Raipur 2026):</span> Qualification Round 2 in progress • 
          Men’s 10m Precision Final starts 16:00 IST • 
          <span className="font-bold text-emerald-200">Bastar District Contingent</span> leads the overall Junior medal tally with 5 Golds • 
          Online Affiliation Renewals for 2026-27 now open for all 33 District Units • 
          Anti-Doping &amp; Safe Sport Guidelines circular PDF uploaded under Resources tab.
        </div>
      </div>
    </section>
  );
}
