import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-700 pt-16 pb-12 border-t-4 border-esac-saffron" data-purpose="official-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Col 1: Crest & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="ESAC Emblem"
                className="w-16 h-16 object-contain rounded-full bg-white p-1 border border-slate-200 shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU6zoaJPejqKTKm79QWfLKS53BZCwuLvh5wdKAcR0F1KgZQJwdvrYSO1Vr2xITRBcNJ7a_u1Gy03cOQMHgtFlCgw2WyzjyYnQXwiZ8r0cKAAp7k5h7Wb9OsVHKcLK0LEWdmdQ9z7_y_kjZXiBv-blGwN95XrvuGKh1G7zIrzRbUnp-0KIFDOk8WQ0nKpdTiJZcIsDxScOmZuyFpvdte6yeFVD8r8r49nPQfb4alUfnwsPZ5OUNx_st"
              />
              <div>
                <span className="text-xs font-black uppercase text-esac-saffron block">Apex State Sports Authority</span>
                <span className="font-black text-esac-navy text-base tracking-tight uppercase leading-tight block">
                  Elite Slingshot Association of Chhattisgarh
                </span>
                <span className="text-xs text-slate-500 font-semibold">छ.ग. एलीट स्लिंगशॉट संघ</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pr-6">
              Recognized by the Directorate of Sports and Youth Welfare, Government of Chhattisgarh. Affiliated with the Elite Slingshot Federation of India (ESFI). Committed to ethical sport, grassroots talent, and athletic pride.
            </p>
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900 block font-bold">Official State Secretariat:</strong>
              Hall 4, Sardar Vallabhbhai Patel International Sports Complex, Raipur, Chhattisgarh — 492001
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-esac-navy font-black text-xs uppercase tracking-wider">Federation</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a className="hover:text-esac-blue transition" href="#about-section">About Association</a></li>
              <li><a className="hover:text-esac-blue transition" href="#about-section">Executive Council</a></li>
              <li><a className="hover:text-esac-blue transition" href="#resources">ESAC Constitution</a></li>
              <li><a className="hover:text-esac-blue transition" href="#resources">RTI Disclosures</a></li>
              <li><a className="hover:text-esac-blue transition" href="#about-section">Annual Audit Reports</a></li>
            </ul>
          </div>

          {/* Col 3: Competitions & Athletes */}
          <div className="space-y-3">
            <h4 className="text-esac-navy font-black text-xs uppercase tracking-wider">Sport &amp; Athletes</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a className="hover:text-esac-blue transition" href="#live-dashboard">Live Match Scoreboard</a></li>
              <li><a className="hover:text-esac-blue transition" href="#rankings">State Ranking Table</a></li>
              <li><a className="hover:text-esac-blue transition" href="#disciplines">10m &amp; 15m Regulations</a></li>
              <li><a className="hover:text-esac-blue transition" href="#talent-hunt">Grassroots Talent Hunt</a></li>
              <li><a className="hover:text-esac-blue transition" href="#athlete-registration">Register for ESAC Card</a></li>
            </ul>
          </div>

          {/* Col 4: Verification & Contact */}
          <div className="space-y-3">
            <h4 className="text-esac-navy font-black text-xs uppercase tracking-wider">Official Helpdesk</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div>
                <span className="block text-slate-500">Helpline (Toll-Free):</span>
                <strong className="text-amber-700 text-sm font-mono font-bold">1800-233-ESAC</strong>
              </div>
              <div>
                <span className="block text-slate-500">Official Correspondence:</span>
                <a className="text-esac-blue hover:underline" href="mailto:contact@eliteslingshot-cg.org">contact@eliteslingshot-cg.org</a>
              </div>
              <div>
                <span className="block text-slate-500">Media &amp; Press Inquiries:</span>
                <span className="text-slate-700">media@eliteslingshot-cg.org</span>
              </div>
              <div className="pt-2">
                <a className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-esac-blue hover:bg-esac-blue-dark text-white rounded text-xs font-bold transition shadow-xs" href="#certificate-verification">
                  <span>✓</span> Verify Digital Certificate
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Elite Slingshot Association of Chhattisgarh (ESAC). All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6 text-slate-600 font-medium">
            <a className="hover:text-esac-blue transition" href="#">Privacy Policy</a>
            <span>•</span>
            <a className="hover:text-esac-blue transition" href="#">Terms of Service</a>
            <span>•</span>
            <a className="hover:text-esac-blue transition" href="#">Anti-Doping Policy</a>
            <span>•</span>
            <a className="hover:text-esac-blue transition" href="#">State Sports Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
