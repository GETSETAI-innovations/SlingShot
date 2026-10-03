import React from 'react';
import { officialDocuments } from '../data/documentsData';
import { showToastInfo } from '../utils/toast';

export default function TalentHuntDocuments() {
  const stages = [
    { number: 'STAGE 01', color: 'text-esac-saffron', title: 'DISCOVER', desc: 'School & block level trials in 33 districts.', isGold: false },
    { number: 'STAGE 02', color: 'text-esac-blue', title: 'ASSESS', desc: 'Laser accuracy & stance stability tests.', isGold: false },
    { number: 'STAGE 03', color: 'text-emerald-600', title: 'TRAIN', desc: '21-day residential summer state camp.', isGold: false },
    { number: 'STAGE 04', color: 'text-amber-600', title: 'COMPETE', desc: 'District League & CG State Championship.', isGold: false },
    { number: 'STAGE 05', color: 'text-purple-600', title: 'DEVELOP', desc: 'National squad camp selection trials.', isGold: false },
    { number: 'STAGE 06', color: 'text-amber-700', title: 'EXCEL', desc: 'International representation with ESFI.', isGold: true }
  ];

  const handleDownload = (docTitle) => {
    showToastInfo(`Downloading official document: ${docTitle}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
      
      {/* Talent Hunt Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50/50 via-slate-50 to-orange-50/40 text-slate-900 border-t border-slate-200 relative overflow-hidden" data-purpose="talent-hunt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="px-3 py-1 bg-esac-saffron text-white text-[11px] font-black uppercase rounded-full tracking-wider shadow-sm">
              Grassroots Talent Scouting Scheme 2026
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 uppercase text-esac-navy">
              From Jungle Ranges to State &amp; National Podiums
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              The Chhattisgarh Slingshot Grassroots Initiative bridges indigenous youth skill with high-performance sport science. We provide free standardized slingshots, ammo bearings, eye protection, and certified NIS coaching.
            </p>
          </div>

          {/* 6-Stage Roadmap Steps */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-12">
            {stages.map((stage, idx) => (
              <div key={idx} className={`p-4 rounded-xl shadow-sm ${stage.isGold ? 'bg-amber-50 border border-amber-300' : 'bg-white border border-slate-200'}`}>
                <div className={`font-black text-sm ${stage.color}`}>{stage.number}</div>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{stage.title}</h4>
                <p className={`text-[11px] mt-1 ${stage.isGold ? 'text-slate-600' : 'text-slate-500'}`}>{stage.desc}</p>
              </div>
            ))}
          </div>

          {/* Action Box */}
          <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-esac-saffron text-white flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
                🎯
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Tribal &amp; Rural Youth Athletic Scholarship Fund</h4>
                <p className="text-xs text-slate-600">Free equipment and travel grants provided for athletes from Bastar, Dantewada, Sukma, Bijapur, and Surguja.</p>
              </div>
            </div>
            <a className="px-6 py-3 bg-esac-saffron hover:bg-esac-saffron-dark text-white text-xs font-bold rounded-xl transition whitespace-nowrap shadow-md" href="#athlete-registration">
              Apply for Grassroots Scouting Camp
            </a>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-14 bg-slate-50 border-t border-slate-200" data-purpose="resources-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-black tracking-widest text-esac-blue uppercase">Official Publications</span>
              <h2 className="text-2xl font-black text-esac-navy uppercase">Rules, Circulars &amp; Downloads</h2>
            </div>
            <a className="text-xs font-bold text-esac-blue hover:underline" href="#">View All Government Gazette Records →</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {officialDocuments.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-lg text-lg font-bold ${doc.typeColor}`}>{doc.type}</span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">{doc.title}</h4>
                    <span className="text-[10px] text-slate-500">{doc.info}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(doc.title)}
                  className="text-esac-blue hover:text-esac-blue-dark font-bold text-xs p-1 cursor-pointer"
                  type="button"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
