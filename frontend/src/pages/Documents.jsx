import React from 'react';
import { officialDocuments } from '../data/documentsData';

export default function Documents() {
  const handleDownload = (docTitle) => {
    alert(`Downloading official document: ${docTitle}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
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
