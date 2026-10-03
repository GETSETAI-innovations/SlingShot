import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { showToastSuccess } from '../../utils/toast';
import AuthRequiredModal from './AuthRequiredModal';

export default function Header({ onOpenRegistrationModal }) {
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutModalOpen(false);
    setMobileMenuOpen(false);
    showToastSuccess('Logged out successfully!');
    window.location.href = '/';
  };

  // Helper function to get user name
  const getUserName = () => {
    if (!user) return '';
    return user.fullName || user.name || user.email || 'User';
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur shadow-md sticky top-[33px] z-40 border-b border-slate-200" data-purpose="federation-main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Official Logo & Bilingual Titles */}
          <Link className="flex items-center gap-3 group" to="/">
            <img
              id="header-federation-logo"
              alt="Official Crest of Elite Slingshot Association of Chhattisgarh"
              className="h-16 w-16 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Kq1Qhu61VwrEpMR1aCaZe0DJVUGNiBy0ErOZ_AkjE0Xc7tQKOCu8Q3tWLHnKWqsDAoCpIlzUqBHh-E37hkW8fQjFUKK4QQFYu8NB3_PdD045PVvDH74M2nhTOrPoXg2pkOMpmS8wl7XELzOK6YulzVNqpSN4srydvpCzBiW7G3gVYJn1fRovUs5Nx9HZz6pDnw_NUHx9wwKylp-tksG6HlzEd7kGg_g6LQfXrHUxOwpcR6r8NzfJ"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-esac-saffron">State Sports Governing Body</span>
              <span className="text-base sm:text-lg lg:text-xl font-black text-esac-navy leading-tight tracking-tight uppercase">
                Elite Slingshot Association of Chhattisgarh
              </span>
              <span className="text-xs text-slate-500 font-medium">
                छ.ग. एलीट स्लिंगशॉट संघ | <span className="italic text-esac-blue font-semibold">Aim. Focus. Compete. Excel.</span>
              </span>
            </div>
          </Link>

          {/* Desktop Quick Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  className="px-3.5 py-2 text-xs font-bold text-esac-blue bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center gap-1.5 transition shadow-xs"
                  to="/athlete-analytics"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-esac-saffron opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-esac-saffron"></span>
                  </span>
                  🎯 {getUserName()}'s Performance Lab
                </Link>
                <button
                  onClick={() => setLogoutModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm hover:shadow transition transform active:scale-95 flex items-center gap-1.5"
                  type="button"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-3.5 py-2 text-xs font-bold text-esac-blue bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center gap-1.5 transition shadow-xs"
                  type="button"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-esac-saffron opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-esac-saffron"></span>
                  </span>
                  🎯 Performance Lab
                </button>
                <Link
                  to="/auth"
                  className="px-4 py-2 text-xs font-bold bg-esac-saffron hover:bg-esac-saffron-dark text-white rounded-lg shadow-sm hover:shadow transition transform active:scale-95 flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Athlete ESAC-ID Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              type="button"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Main Navigation Menu Bar */}
        <nav className="border-t border-slate-100 py-1.5 overflow-x-auto flex items-center justify-between text-xs font-semibold text-slate-700 scrollbar-none" data-purpose="primary-navigation">
          <div className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
            <Link className={`px-3 py-1.5 rounded-md transition ${isActive('/') ? 'text-esac-blue bg-blue-50 font-bold' : 'hover:text-esac-blue hover:bg-slate-50'}`} to="/">HOME</Link>
            <Link className={`px-3 py-1.5 rounded-md transition ${isActive('/about') ? 'text-esac-blue bg-blue-50 font-bold' : 'hover:text-esac-blue hover:bg-slate-50'}`} to="/about">ABOUT US</Link>
            <Link className={`px-3 py-1.5 rounded-md transition ${isActive('/sports-and-rules') ? 'text-esac-blue bg-blue-50 font-bold' : 'hover:text-esac-blue hover:bg-slate-50'}`} to="/sports-and-rules">THE SPORT &amp; RULES</Link>
            <Link className={`px-3 py-1.5 rounded-md transition ${isActive('/athletes-and-rankings') ? 'text-esac-blue bg-blue-50 font-bold' : 'hover:text-esac-blue hover:bg-slate-50'}`} to="/athletes-and-rankings">ATHLETES &amp; RANKINGS</Link>
            <Link className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${isActive('/competitions') ? 'text-esac-blue bg-blue-50 font-bold' : 'hover:text-esac-blue hover:bg-slate-50'}`} to="/competitions">
              COMPETITIONS
              <span className="px-1.5 py-0.2 bg-red-100 text-red-600 rounded text-[9px] font-black">2026</span>
            </Link>
            <Link className={`px-3 py-1.5 rounded-md transition ${isActive('/districts') ? 'text-esac-blue bg-blue-50 font-bold' : 'hover:text-esac-blue hover:bg-slate-50'}`} to="/districts">33 DISTRICTS</Link>
            <Link className={`px-3 py-1.5 rounded-md transition ${isActive('/talent-hunt-documents') ? 'text-esac-blue bg-blue-50 font-bold' : 'text-esac-saffron font-bold hover:text-esac-blue hover:bg-slate-50'}`} to="/talent-hunt-documents">TALENT HUNT &amp; DOCUMENTS</Link>
            <Link className={`px-3 py-1.5 rounded-md transition ${isActive('/partnerships') ? 'text-esac-blue bg-blue-50 font-bold' : 'hover:text-esac-blue hover:bg-slate-50'}`} to="/partnerships">PARTNERSHIPS</Link>
            <Link className={`px-3 py-1.5 rounded-md transition ${isActive('/safety') ? 'text-esac-blue bg-blue-50 font-bold' : 'hover:text-esac-blue hover:bg-slate-50'}`} to="/safety">SAFETY</Link>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-2">
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  <Link onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-esac-blue bg-blue-50 rounded-lg flex items-center gap-1.5" to="/athlete-analytics">
                    🎯 {getUserName()}'s Performance Lab
                  </Link>
                  <button
                    onClick={() => {
                      setLogoutModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 text-xs font-bold bg-red-600 text-white rounded-lg flex items-center justify-center gap-1.5"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 text-xs font-bold text-esac-blue bg-blue-50 rounded-lg flex items-center gap-1.5"
                    type="button"
                  >
                    🎯 Performance Lab
                  </button>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/auth"
                    className="px-3 py-2 text-xs font-bold bg-esac-saffron text-white rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Athlete ESAC-ID Register
                  </Link>
                </>
              )}
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-1 pt-2 border-t border-slate-100">
                <Link onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 text-xs font-semibold rounded-lg ${isActive('/') ? 'text-esac-blue bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`} to="/">HOME</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 text-xs font-semibold rounded-lg ${isActive('/about') ? 'text-esac-blue bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`} to="/about">ABOUT US</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 text-xs font-semibold rounded-lg ${isActive('/sports-and-rules') ? 'text-esac-blue bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`} to="/sports-and-rules">THE SPORT & RULES</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 text-xs font-semibold rounded-lg ${isActive('/athletes-and-rankings') ? 'text-esac-blue bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`} to="/athletes-and-rankings">ATHLETES & RANKINGS</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 text-xs font-semibold rounded-lg ${isActive('/competitions') ? 'text-esac-blue bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`} to="/competitions">COMPETITIONS</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 text-xs font-semibold rounded-lg ${isActive('/districts') ? 'text-esac-blue bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`} to="/districts">33 DISTRICTS</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 text-xs font-semibold rounded-lg ${isActive('/talent-hunt-documents') ? 'text-esac-blue bg-blue-50' : 'text-esac-saffron hover:bg-slate-50'}`} to="/talent-hunt-documents">TALENT HUNT & DOCUMENTS</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 text-xs font-semibold rounded-lg ${isActive('/partnerships') ? 'text-esac-blue bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`} to="/partnerships">PARTNERSHIPS</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 text-xs font-semibold rounded-lg ${isActive('/safety') ? 'text-esac-blue bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`} to="/safety">SAFETY</Link>
              </div>
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-semibold">Language / भाषा:</span>
                <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                  <button
                    onClick={() => setLanguage('EN')}
                    className={`px-3 py-1 font-bold text-xs transition ${
                      language === 'EN' ? 'bg-[#2563EB] text-white' : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    type="button"
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('HI')}
                    className={`px-3 py-1 font-bold text-xs transition ${
                      language === 'HI' ? 'bg-[#F97316] text-white' : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    type="button"
                  >
                    हिन्दी
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Required Modal */}
      <AuthRequiredModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {logoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setLogoutModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-500"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-6 text-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </motion.div>
                </div>

                <div className="relative z-10 text-center">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-black uppercase tracking-tight mb-2"
                  >
                    Confirm Logout
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-red-100 font-medium"
                  >
                    Elite Slingshot Association of Chhattisgarh
                  </motion.p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-6"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">
                    Are you sure you want to logout?
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    You will be logged out of your Performance Lab. Your session data will be saved automatically.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Yes, Logout</span>
                  </button>

                  <button
                    onClick={() => setLogoutModalOpen(false)}
                    className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cancel</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
