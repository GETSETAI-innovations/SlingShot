import React, { useState } from 'react';

export default function AthleteRegistrationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    homeDistrict: 'Raipur',
    primaryDiscipline: '10m Precision Target',
    category: 'Senior Open (Men)',
    mobileNumber: '',
    emailAddress: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Athlete application submitted successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl overflow-y-auto max-h-[96vh] scrollbar-none [&::-webkit-scrollbar]:hidden my-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 md:p-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Section */}
        <div className="text-center mb-7">
          <div className="inline-block">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wider text-[#F97316] bg-orange-50 border border-orange-200 uppercase">
              Official Athlete Enrollment
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A192F] uppercase tracking-tight mt-3">
            Apply For ESAC Athlete Card (UID)
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 max-w-2xl mx-auto font-medium leading-relaxed">
            Mandatory for participating in district trials, state ranking events, and national team selections.
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          {/* Row 1: Full Name & Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                Full Name (As per Aadhaar) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Ramesh Kumar Netam"
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none transition bg-white"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none transition bg-white"
                required
              />
            </div>
          </div>

          {/* Row 2: Home District, Primary Discipline, Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-5">
            {/* Home District */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                Home District <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.homeDistrict}
                  onChange={(e) => setFormData({ ...formData, homeDistrict: e.target.value })}
                  className="w-full appearance-none text-xs sm:text-sm rounded-xl border border-slate-300 px-4 py-3 pr-10 text-slate-800 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none transition bg-white cursor-pointer"
                  required
                >
                  <option value="Raipur">Raipur</option>
                  <option value="Bastar">Bastar</option>
                  <option value="Bilaspur">Bilaspur</option>
                  <option value="Durg">Durg</option>
                  <option value="Surguja">Surguja</option>
                  <option value="Kanker">Kanker</option>
                  <option value="Rajnandgaon">Rajnandgaon</option>
                  <option value="Korba">Korba</option>
                  <option value="Dantewada">Dantewada</option>
                  <option value="Jashpur">Jashpur</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Primary Discipline */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                Primary Discipline <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.primaryDiscipline}
                  onChange={(e) => setFormData({ ...formData, primaryDiscipline: e.target.value })}
                  className="w-full appearance-none text-xs sm:text-sm rounded-xl border border-slate-300 px-4 py-3 pr-10 text-slate-800 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none transition bg-white cursor-pointer"
                  required
                >
                  <option value="10m Precision Target">10m Precision Target</option>
                  <option value="15m Distance Bullseye">15m Distance Bullseye</option>
                  <option value="Timed Sprint">Timed Sprint</option>
                  <option value="Traditional Slingshot">Traditional Slingshot</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full appearance-none text-xs sm:text-sm rounded-xl border border-slate-300 px-4 py-3 pr-10 text-slate-800 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none transition bg-white cursor-pointer"
                  required
                >
                  <option value="Senior Open (Men)">Senior Open (Men)</option>
                  <option value="Senior Open (Women)">Senior Open (Women)</option>
                  <option value="Junior Boys (U-17)">Junior Boys (U-17)</option>
                  <option value="Junior Girls (U-17)">Junior Girls (U-17)</option>
                  <option value="Youth (U-14)">Youth (U-14)</option>
                  <option value="Para/Adaptive">Para/Adaptive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Mobile / WhatsApp Number & Email Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
            {/* Mobile / WhatsApp Number */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                Mobile / WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none transition bg-white"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.emailAddress}
                onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                placeholder="athlete@example.com"
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none transition bg-white"
              />
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start gap-3 mb-8">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-[#F97316] focus:ring-[#F97316] cursor-pointer"
              required
            />
            <label htmlFor="terms" className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal cursor-pointer select-none">
              I hereby agree to abide by the ESAC Code of Conduct, Anti-Doping Regulations, and standard slingshot safety protocols. All tribal/rural youth eligible for zero registration fee under state talent grant.
            </label>
          </div>

          {/* Submit Button aligned to bottom right */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all uppercase tracking-wider cursor-pointer"
            >
              Submit Athlete Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
