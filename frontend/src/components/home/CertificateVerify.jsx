import React, { useState } from 'react';

export default function CertificateVerify() {
  const [certId, setCertId] = useState('ESAC-CERT-2026-0841');
  const [verifiedRecord, setVerifiedRecord] = useState({
    athlete: 'Devendra Kumar Netam',
    certificateId: 'ESAC-CERT-2026-0841',
    championship: '4th Chhattisgarh State Slingshot Championship 2026',
    discipline: "Men's Senior 10m Precision Target",
    result: 'Gold Medalist & State Champion (298/300 pts)',
    signatory: 'General Secretary, ESAC & Govt Observer',
    hash: '9A81-CG26'
  });

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setVerifiedRecord({
      athlete: certId.includes('0891') ? 'Sandeep Mandavi' : 'Devendra Kumar Netam',
      certificateId: certId.toUpperCase(),
      championship: '4th Chhattisgarh State Slingshot Championship 2026',
      discipline: "Men's Senior 10m Precision Target",
      result: 'Gold Medalist & State Champion (298/300 pts)',
      signatory: 'General Secretary, ESAC & Govt Observer',
      hash: `9A81-${certId.slice(-4)}`
    });
  };

  return (
    <section className="py-16 bg-slate-100 border-t border-slate-200" data-purpose="verify-portal" id="certificate-verification">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-amber-50/40 text-slate-900 p-6 sm:p-8 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-4">
              <img
                alt="ESAC Crest"
                className="w-14 h-14 object-contain rounded-full bg-white p-1 shadow-sm border border-slate-200"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxqFaJG0YeqFq3AkGSc6vkzH2umd_L1zGd4kwQxP8pE8GKEgB_-t2nOWmiYVoXReSIvTa3CIm9AEtlviUrhPZ1uv9JpK-hWUeU7qQynNkgd1PZxFIVdRGc9kwrdbJWagRwRCPyVl1T2nWnSbfdUQ_LO17g6_zsCQ-ZGqBMpnVwcFPcHO3TlCDsQpZchdFDnIK9TzPqSVUZUAqi7-qWAJknI5zLe46NlUtXtk2fJVfaEiHvlj6LryQ4"
              />
              <div>
                <span className="text-xs font-bold text-esac-saffron uppercase tracking-widest">Public Verification Service</span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-esac-navy">Verify State Merit Certificate</h3>
                <p className="text-xs text-slate-600">Authenticate digital participation and championship medal certificates.</p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-mono font-bold">
                SSL SECURED
              </span>
            </div>
          </div>

          {/* Verification Search Input */}
          <div className="p-6 sm:p-8">
            <form className="space-y-4" onSubmit={handleVerify}>
              <label className="block text-xs font-bold uppercase text-slate-700">Enter Official Certificate / UID Number</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="flex-1 text-sm font-mono uppercase rounded-xl border border-slate-300 px-4 py-3 focus:border-esac-blue focus:ring-2 focus:ring-esac-blue/20"
                  placeholder="e.g. ESAC-CERT-2026-0841"
                  type="text"
                />
                <button className="px-6 py-3 bg-esac-blue hover:bg-esac-blue-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow cursor-pointer" type="submit">
                  Verify Document
                </button>
              </div>
            </form>

            {/* Verified Result Preview Box */}
            {verifiedRecord && (
              <div className="mt-8 p-6 rounded-xl bg-slate-50 border-2 border-emerald-500/40 relative">
                <div className="sm:absolute sm:top-4 sm:right-4 mb-4 sm:mb-0 inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  <svg className="w-4 h-4 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  AUTHENTIC RECORD VERIFIED
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-3 text-center">
                    <div className="w-24 h-24 mx-auto bg-white rounded-xl overflow-hidden border border-slate-300 p-1 flex items-center justify-center shadow-xs">
                      {/* QR Code Mock */}
                      <div className="w-full h-full bg-white p-1 flex flex-col justify-between">
                        <div className="grid grid-cols-4 gap-0.5 h-full">
                          <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                          <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                          <div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div>
                          <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block mt-1">HASH: {verifiedRecord.hash}</span>
                  </div>
                  <div className="sm:col-span-9 space-y-1.5 text-xs text-slate-700">
                    <div>Athlete: <strong className="text-sm font-bold text-slate-900">{verifiedRecord.athlete}</strong></div>
                    <div>Certificate ID: <span className="font-mono font-bold text-esac-blue">{verifiedRecord.certificateId}</span></div>
                    <div>Championship: <span className="font-semibold text-slate-800">{verifiedRecord.championship}</span></div>
                    <div>Discipline: <span className="font-semibold text-slate-800">{verifiedRecord.discipline}</span></div>
                    <div>Result: <span className="font-bold text-amber-700">{verifiedRecord.result}</span></div>
                    <div>Authorized Signatory: <span className="font-semibold text-slate-800">{verifiedRecord.signatory}</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
