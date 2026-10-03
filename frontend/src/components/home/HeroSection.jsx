import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function HeroSection({ onOpenRegistrationModal }) {
  const { user } = useAuth();
  return (
    <section className="relative bg-light-sports text-slate-900 pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-slate-200 shadow-sm" data-purpose="hero-banner" id="competitions">
      {/* Watermark official emblem in background */}
      <img
        alt="Watermark Seal"
        className="absolute -right-20 -bottom-20 w-96 h-96 opacity-5 pointer-events-none filter grayscale"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw_NyPDztV4z3hhJ4qMoIX-WF9m_lbQJCTDv5OmzCgdSP6pvOYtcS2KJ_FsCkUqMgAhPBDZib-_zYgJY4IOUHTYSf4LCLCm4Dz36tBMr5ZcuNiDISnYZsAQXgGv5NtU4c_yhwB_38aZu9GgcxFChiAIJ0am0A0WQr7wIn1ccSq_IWczn1jmAdQ0z79WqHecJ0YyENUOM00dSuBvAoxrhzJtgmWzcpV8nlXymHovqTH69xzuQtkP2SI"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Hero Column: Official Manifesto & Calls-to-Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-esac-blue text-xs font-semibold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-esac-saffron"></span>
              STATE-LEVEL SPORTING PLATFORM
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-esac-navy uppercase">
              Precision.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-esac-blue via-orange-600 to-amber-600">
                Discipline. Excellence.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              Building a structured sporting ecosystem for competitive Slingshot Sport across Chhattisgarh — connecting athletes, districts, clubs, coaches and competitions.
            </p>

            {/* Action CTA Group */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <Link
                className="px-6 py-3.5 bg-esac-blue hover:bg-esac-blue-dark text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                to="/competitions"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore Tournaments &amp; Results
              </Link>
              {!user && (
                <Link
                  to="/auth?mode=signup"
                  className="px-6 py-3.5 bg-esac-saffron hover:bg-esac-saffron-dark text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Register for ESAC-ID (Athlete Card)
                </Link>
              )}
            </div>

            {/* Feature Assurance Badges */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-3 text-slate-700 text-xs">
              <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-slate-200/80 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shrink-0 font-bold">⚡</div>
                <span className="font-semibold text-slate-800">Live Digital Score Telemetry</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-slate-200/80 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-600 shrink-0 font-bold">🎯</div>
                <span className="font-semibold text-slate-800">10m &amp; 15m Standard Steel Range</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-slate-200/80 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-600 shrink-0 font-bold">🏆</div>
                <span className="font-semibold text-slate-800">Govt. Valid Merit Certificates</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Hero Artwork with Precision HUD */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-white p-3 border border-slate-200 shadow-xl">
              {/* Tribal Heritage & Athletic Precision Artwork */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-50 to-amber-50/30 aspect-square flex items-center justify-center p-2 border border-slate-100">
                <img
                  id="home-page-hero-image"
                  alt="Tribal Heritage and Precision Athletic Slingshot Shooter in Chhattisgarh"
                  className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH2_4q5sCNyyX9W_J8WraLNdpr-UYP-_gjtHK-sfFxISJVBGrNNg5WDFkE0wMEbTEjjAbIgVZcmALGRqtCZ0CM1afR2y1tlx_q2kp-DneQ-v33KfA627ariaokiPaLFsY15O5Cs23t-rjbF_zNTx2_4sXLq9ZGsKhSGEdeSOyTzm9LhteL-0FFa8Yzz25hbyVqjdHexRk_sxRwK3CfK9MfX3znVM-_crcvXOkrs2N44jglMKl-MLsc"
                />
                {/* Telemetry HUD Overlay overlay top-left */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-slate-200 shadow-md rounded-lg p-2 text-[10px] space-y-0.5">
                  <div className="text-emerald-700 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    TARGET LOCK: 10M STEEL
                  </div>
                  <div className="text-slate-600 font-mono">Accuracy: <span className="text-slate-900 font-bold">99.4%</span></div>
                  <div className="text-slate-600 font-mono">Velocity: <span className="text-slate-900 font-bold">82.4 m/s</span></div>
                </div>

                {/* Official Federation Logo Badge bottom-right */}
                <div className="absolute bottom-4 right-4 bg-white rounded-xl p-1.5 shadow-md border border-slate-200 flex items-center gap-2 max-w-[175px]">
                  <img
                    alt="ESAC Seal"
                    className="w-10 h-10 object-contain shrink-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFZD0EWbEF-udP4-ITdJuLK-CKdfN2UgghDYnsR6VmBmT0NtnOdtslKE5wlN3V0tWYMNqWHw-pK_-bOBzSEGU-ky3DvpVQ2YolpGq2VZ-b3GL2mR26G886Vs40EHOAvIDfKmYBE_P71gsFI4r16zQK3MMnppVb2BsQlym92dWjcv_ucolIDHo_-EehRHVkNNrTyjtJ3Hb0-aRdG60nL06B0_G__5X21kDXg1zLvuOBt638mOE0aVPV"
                  />
                  <div className="text-[10px] text-slate-800 leading-tight">
                    <span className="font-black block uppercase text-[9px] text-esac-blue">Official Body</span>
                    State Federation Chhattisgarh
                  </div>
                </div>
              </div>

              {/* Floating Live Event Card in bottom edge */}
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-orange-100 text-esac-saffron flex items-center justify-center font-black text-sm border border-orange-200">
                    4th
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">4th CG State Championship</div>
                    <div className="text-[11px] text-slate-600">Current Leader: <span className="text-orange-600 font-semibold">D. Netam (Kanker) 298/300</span></div>
                  </div>
                </div>
                <Link className="px-2.5 py-1 text-[11px] font-bold bg-esac-blue hover:bg-esac-blue-dark text-white rounded transition shadow-sm" to="/competitions">
                  View Championship
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
