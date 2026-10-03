import React, { useState } from 'react';
import { districts } from '../data/districtsData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Districts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const districtsPerSlide = 11;

  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.coordinator.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.centralRange.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSlides = Math.ceil(filteredDistricts.length / districtsPerSlide);
  const currentDistricts = filteredDistricts.slice(
    currentSlide * districtsPerSlide,
    (currentSlide + 1) * districtsPerSlide
  );

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : Math.max(totalSlides - 1, 0)));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

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
            {currentDistricts.map((dist, idx) => (
              <div key={`${currentSlide}-${idx}`} className="p-5 rounded-xl border border-slate-200 hover:border-esac-blue hover:shadow-md transition">
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

          {/* Navigation Controls */}
          {filteredDistricts.length > 0 && totalSlides > 0 && (
            <div className="relative mt-8">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={goToPrevious}
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  disabled={totalSlides <= 1}
                  type="button"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition ${
                        index === currentSlide ? 'bg-esac-blue' : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                      type="button"
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  disabled={totalSlides <= 1}
                  type="button"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Slide Info */}
          {totalSlides > 0 && filteredDistricts.length > 0 && (
            <div className="mt-6 text-center text-xs text-slate-500">
              Showing {currentSlide * districtsPerSlide + 1}-{Math.min((currentSlide + 1) * districtsPerSlide, filteredDistricts.length)} of {filteredDistricts.length} districts
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
