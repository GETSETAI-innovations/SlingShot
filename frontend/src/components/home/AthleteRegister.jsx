import React, { useState } from 'react';

export default function AthleteRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    district: 'Raipur',
    discipline: '10m Precision Target',
    category: 'Senior Open (Men)',
    phone: '',
    email: '',
    agreeTerms: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200" data-purpose="athlete-registration-form" id="athlete-registration">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black tracking-widest text-esac-saffron uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Official Athlete Enrollment
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-esac-navy tracking-tight mt-2 uppercase">Apply for ESAC Athlete Card (UID)</h2>
          <p className="text-slate-600 text-sm mt-1">Mandatory for participating in district trials, state ranking events, and national team selections.</p>
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-xl border border-emerald-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-bold text-slate-900">Application Submitted Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Your provisional ESAC Athlete Registration has been recorded. Your regional coordinator will reach out for physical verification.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-esac-blue text-white rounded-xl text-xs font-bold hover:bg-esac-blue-dark transition cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (As per Aadhaar) *</label>
                  <input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full text-xs rounded-lg border border-slate-300 focus:ring-esac-blue focus:border-esac-blue p-2.5 bg-white"
                    placeholder="e.g. Ramesh Kumar Netam"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                    className="w-full text-xs rounded-lg border border-slate-300 focus:ring-esac-blue focus:border-esac-blue p-2.5 bg-white"
                    type="date"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Home District *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-300 focus:ring-esac-blue focus:border-esac-blue p-2.5 bg-white"
                  >
                    <option value="">Select District...</option>
                    <option value="Raipur">Raipur</option>
                    <option value="Bastar">Bastar (Jagdalpur)</option>
                    <option value="Bilaspur">Bilaspur</option>
                    <option value="Durg">Durg</option>
                    <option value="Surguja">Surguja</option>
                    <option value="Kanker">Kanker</option>
                    <option value="Dantewada">Dantewada</option>
                    <option value="Rajnandgaon">Rajnandgaon</option>
                    <option value="Korba">Korba</option>
                    <option value="Jashpur">Jashpur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Discipline *</label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-300 focus:ring-esac-blue focus:border-esac-blue p-2.5 bg-white"
                  >
                    <option value="10m Precision Target">10m Precision Target</option>
                    <option value="15m Distance Bullseye">15m Distance Bullseye</option>
                    <option value="Rapid Speed Fire">Rapid Speed Fire</option>
                    <option value="Para Adaptive Division">Para Adaptive Division</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-300 focus:ring-esac-blue focus:border-esac-blue p-2.5 bg-white"
                  >
                    <option value="Sub-Junior (U-14)">Sub-Junior (U-14)</option>
                    <option value="Junior (U-17)">Junior (U-17)</option>
                    <option value="Senior Open (Men)">Senior Open (Men)</option>
                    <option value="Senior Open (Women)">Senior Open (Women)</option>
                    <option value="Masters (35+)">Masters (35+)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full text-xs rounded-lg border border-slate-300 focus:ring-esac-blue focus:border-esac-blue p-2.5 bg-white"
                    placeholder="+91 98765 43210"
                    type="tel"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-300 focus:ring-esac-blue focus:border-esac-blue p-2.5 bg-white"
                    placeholder="athlete@example.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  required
                  className="rounded border-slate-300 text-esac-blue focus:ring-esac-blue mt-0.5"
                  id="terms"
                  type="checkbox"
                />
                <label className="text-xs text-slate-600" htmlFor="terms">
                  I hereby agree to abide by the ESAC Code of Conduct, Anti-Doping Regulations, and standard slingshot safety protocols. All tribal/rural youth eligible for zero registration fee under state talent grant.
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  className="px-8 py-3 bg-esac-saffron hover:bg-esac-saffron-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow cursor-pointer"
                  type="submit"
                >
                  Submit Athlete Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
