import React from 'react';
import { ShieldCheck, Crosshair, Wrench, UserCheck, AlertTriangle, Users, HeartPulse, CheckCircle2 } from 'lucide-react';

export default function SafetySection() {
  const safetyProtocols = [
    {
      title: 'Controlled Shooting Lanes',
      icon: Crosshair,
      desc: 'Physical lane barriers, demarcated firing lines, and designated shooter aprons with minimum 1.5m clearance between competitor stations.'
    },
    {
      title: 'Equipment Inspection',
      icon: Wrench,
      desc: 'Pre-match inspection of slingshot fork integrity, band elongation, pouch binding, and steel ball caliber verification before entering firing line.'
    },
    {
      title: 'Qualified Supervision',
      icon: UserCheck,
      desc: 'Certified Range Safety Officers (RSO) oversee every firing session with authority to immediately halt any action compromising safety.'
    },
    {
      title: 'Clear Start/Stop Procedures',
      icon: AlertTriangle,
      desc: 'Standard acoustic whistle signals: 2 whistles (Line Up), 1 whistle (Load & Shoot), 3 whistles (Cease Fire, Unload & Stand Back).'
    },
    {
      title: 'Spectator Separation',
      icon: Users,
      desc: 'Guaranteed 5-meter safety perimeter and ballistic netting separating spectators and family members from active tournament ranges.'
    },
    {
      title: 'Emergency Readiness',
      icon: HeartPulse,
      desc: 'Certified first-aid personnel, dedicated eye-rinse stations, trauma kits, and direct emergency transport dispatch at all accredited venues.'
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden" id="safety-section">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            Mandatory Standard
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Safety Is Our Standard
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Competitive slingshot precision demands uncompromising safety protocols. Every range in Chhattisgarh operates under zero-tolerance safety compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyProtocols.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-md hover:border-red-500/50 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>State Certified Requirement</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
