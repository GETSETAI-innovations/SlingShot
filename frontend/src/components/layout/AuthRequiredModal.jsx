import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthRequiredModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] p-6 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Slingshot icon */}
          <div className="relative z-10 flex items-center justify-center mb-4">
            <svg
              className="w-16 h-16 text-orange-400 animate-float"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 3v6c0 3 2 5 5 5" />
              <path d="M17 3v6c0 3-2 5-5 5" />
              <path d="M12 14v7" strokeWidth="2" />
              <path d="M7 4c2.5 1 7.5 1 10 0" strokeDasharray="2 2" stroke="rgba(255,255,255,0.7)" />
              <circle cx="12" cy="7" r="2.5" fill="#F97316" stroke="#fff" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 text-center">
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">
              Performance Lab Access
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              Elite Slingshot Association of Chhattisgarh
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">
              Login Required
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              To view your performance data, shot telemetry, and athlete analytics, you need to login first with your ESAC athlete credentials.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/auth?mode=login"
              onClick={onClose}
              className="w-full py-3 px-4 bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Login to Access</span>
            </Link>

            <Link
              to="/auth?mode=signup"
              onClick={onClose}
              className="w-full py-3 px-4 bg-[#0A192F] hover:bg-[#112240] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Register ESAC ID</span>
            </Link>
          </div>

          {/* Helper text */}
          <p className="text-xs text-slate-500 text-center mt-4">
            Don't have an ESAC ID? <Link to="/auth?mode=signup" onClick={onClose} className="text-[#2563EB] hover:underline font-semibold">Register now</Link> to get your unique athlete identifier.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full text-xs text-slate-500 hover:text-slate-700 font-semibold py-2 transition"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
