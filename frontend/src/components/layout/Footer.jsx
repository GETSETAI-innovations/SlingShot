import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthRequiredModal from './AuthRequiredModal';

export default function Footer() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Helper function to get user name
  const getUserName = () => {
    if (!user) return '';
    return user.fullName || user.name || user.email || 'User';
  };
  return (
    <footer className="bg-slate-100 text-slate-700 pt-16 pb-12 border-t-4 border-esac-saffron" data-purpose="official-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Association Crest & Summary */}
        <div className="pb-10 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                alt="ESAC Emblem"
                className="w-16 h-16 object-contain rounded-full bg-white p-1 border border-slate-200 shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU6zoaJPejqKTKm79QWfLKS53BZCwuLvh5wdKAcR0F1KgZQJwdvrYSO1Vr2xITRBcNJ7a_u1Gy03cOQMHgtFlCgw2WyzjyYnQXwiZ8r0cKAAp7k5h7Wb9OsVHKcLK0LEWdmdQ9z7_y_kjZXiBv-blGwN95XrvuGKh1G7zIrzRbUnp-0KIFDOk8WQ0nKpdTiJZcIsDxScOmZuyFpvdte6yeFVD8r8r49nPQfb4alUfnwsPZ5OUNx_st"
              />
              <div>
                <span className="text-xs font-black uppercase text-esac-saffron block">Apex State Sports Governing Body</span>
                <span className="font-black text-esac-navy text-lg tracking-tight uppercase leading-tight block">
                  Elite Slingshot Association of Chhattisgarh
                </span>
                <span className="text-xs text-slate-500 font-semibold">छ.ग. एलीट स्लिंगशॉट संघ | State Sports Ecosystem</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#certificate-verification"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-esac-blue hover:bg-esac-blue-dark text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify State Certificate</span>
              </a>
              {user ? (
                <Link
                  to="/athlete-analytics"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-esac-saffron hover:bg-esac-saffron-dark text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <span>{getUserName()}'s Performance Lab</span>
                </Link>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-esac-saffron hover:bg-esac-saffron-dark text-white rounded-xl text-xs font-bold transition shadow-xs"
                  type="button"
                >
                  <span>Performance Lab</span>
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-4xl mt-4">
            Recognized by the Directorate of Sports and Youth Welfare, Government of Chhattisgarh. Affiliated with the Elite Slingshot Federation of India (ESFI). Regulating competitive precision slingshot shooting across all 33 administrative districts.
          </p>
        </div>

        {/* 6 Structured Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-10 border-b border-slate-200">
          {/* Col 1: Association */}
          <div className="space-y-3">
            <h4 className="text-esac-navy font-black text-xs uppercase tracking-wider">Association</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><Link className="hover:text-esac-blue transition" to="/about">About ESAC</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/about">Executive Council</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/districts">33 District Units</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/partnerships">Partnerships &amp; Sponsorships</Link></li>
              <li><a className="hover:text-esac-blue transition" href="#coaching-capacity">Technical Council</a></li>
              <li><a className="hover:text-esac-blue transition" href="#vision-roadmap">Five-Year Vision</a></li>
            </ul>
          </div>

          {/* Col 2: Sport & Athletes */}
          <div className="space-y-3">
            <h4 className="text-esac-navy font-black text-xs uppercase tracking-wider">Sport &amp; Athletes</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><Link className="hover:text-esac-blue transition" to="/sports-and-rules">The Sport &amp; Rules</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/athletes-and-rankings">Athletes Directory</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/athletes-and-rankings">State Rankings</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/talent-hunt">Talent Hunt 2026</Link></li>
              {user ? <li><Link className="hover:text-esac-blue transition" to="/athlete-analytics">Athlete Analytics Lab</Link></li> : null}
            </ul>
          </div>

          {/* Col 3: Competitions */}
          <div className="space-y-3">
            <h4 className="text-esac-navy font-black text-xs uppercase tracking-wider">Competitions</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><Link className="hover:text-esac-blue transition" to="/competitions">State Championships</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/competitions">District Tournaments</Link></li>
              {user ? <li><Link className="hover:text-esac-blue transition" to="/athlete-analytics">Shot Telemetry Lab</Link></li> : null}
              <li><Link className="hover:text-esac-blue transition" to="/competitions">Youth Qualifiers</Link></li>
              <li><a className="hover:text-esac-blue transition" href="#live-dashboard">Live Match Centre</a></li>
            </ul>
          </div>

          {/* Col 4: Documents & RTI */}
          <div className="space-y-3">
            <h4 className="text-esac-navy font-black text-xs uppercase tracking-wider">Documents &amp; RTI</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><Link className="hover:text-esac-blue transition" to="/documents">ESAC Constitution</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/documents">Official Rulebook 2026</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/documents">RTI Disclosures</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/documents">Annual Audit Reports</Link></li>
              <li><Link className="hover:text-esac-blue transition" to="/safety">Safety Protocols</Link></li>
              <li><a className="hover:text-esac-blue transition" href="#safety-section">Safety Protocol Circular</a></li>
            </ul>
          </div>

          {/* Col 5: Verification */}
          <div className="space-y-3">
            <h4 className="text-esac-navy font-black text-xs uppercase tracking-wider">Verification</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a className="hover:text-esac-blue transition" href="#certificate-verification">Merit Certificate Lookup</a></li>
              <li><a className="hover:text-esac-blue transition" href="#certificate-verification">ESAC-UID Validation</a></li>
              <li><a className="hover:text-esac-blue transition" href="#certificate-verification">QR Code Authentication</a></li>
              <li><Link className="hover:text-esac-blue transition" to="/districts">District Club Affiliation</Link></li>
              <li><a className="hover:text-esac-blue transition" href="#coaching-capacity">Referee Credentials</a></li>
            </ul>
          </div>

          {/* Col 6: Contact */}
          <div className="space-y-3">
            <h4 className="text-esac-navy font-black text-xs uppercase tracking-wider">Contact</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div>
                <span className="block text-slate-500 text-[10px] uppercase font-bold">Helpline (Toll-Free):</span>
                <strong className="text-amber-700 text-sm font-mono font-bold">1800-233-ESAC</strong>
              </div>
              <div>
                <span className="block text-slate-500 text-[10px] uppercase font-bold">Official Email:</span>
                <a className="text-esac-blue hover:underline break-all" href="mailto:contact@eliteslingshot-cg.org">
                  contact@eliteslingshot-cg.org
                </a>
              </div>
              <div>
                <span className="block text-slate-500 text-[10px] uppercase font-bold">Secretariat:</span>
                <span className="text-slate-700 text-[11px] leading-tight block">
                  Hall 4, Sardar Patel Sports Complex, Raipur, CG 492001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Elite Slingshot Association of Chhattisgarh (ESAC). All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
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
      
      {/* Auth Required Modal */}
      <AuthRequiredModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </footer>
  );
}
