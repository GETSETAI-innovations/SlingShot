import React, { useState, useEffect, useRef } from 'react';
import loaderVideo from '../../assets/Loader.mp4';

const HOME_PAGE_LOGO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCH2_4q5sCNyyX9W_J8WraLNdpr-UYP-_gjtHK-sfFxISJVBGrNNg5WDFkE0wMEbTEjjAbIgVZcmALGRqtCZ0CM1afR2y1tlx_q2kp-DneQ-v33KfA627ariaokiPaLFsY15O5Cs23t-rjbF_zNTx2_4sXLq9ZGsKhSGEdeSOyTzm9LhteL-0FFa8Yzz25hbyVqjdHexRk_sxRwK3CfK9MfX3znVM-_crcvXOkrs2N44jglMKl-MLsc';

export default function VideoLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [flyStyle, setFlyStyle] = useState(null);
  const [isDocked, setIsDocked] = useState(false);

  const videoRef = useRef(null);
  const videoCardRef = useRef(null);
  const hasFinishedRef = useRef(false);

  const startLogoTransition = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setProgress(100);

    // Give a brief moment (200ms) for the user to see the 100% complete loading bar and the video's final logo
    setTimeout(() => {
      setIsTransitioning(true);

      // 1. Measure the video/center logo position
      let startLeft = window.innerWidth / 2 - 100;
      let startTop = window.innerHeight / 2 - 100;
      let startWidth = 200;
      let startHeight = 200;

      if (videoCardRef.current) {
        const cardRect = videoCardRef.current.getBoundingClientRect();
        const cardSize = Math.min(cardRect.width * 0.75, cardRect.height * 0.85);
        startWidth = cardSize;
        startHeight = cardSize;
        startLeft = cardRect.left + (cardRect.width - startWidth) / 2;
        startTop = cardRect.top + (cardRect.height - startHeight) / 2;
      }

      // 2. Measure the destination (Home Page Hero Image/Logo)
      let destLeft = window.innerWidth * 0.55;
      let destTop = window.innerHeight * 0.25;
      let destWidth = 350;
      let destHeight = 350;

      const homeLogoEl = document.getElementById('home-page-hero-image');
      if (homeLogoEl) {
        const targetRect = homeLogoEl.getBoundingClientRect();
        if (targetRect.width > 0 && targetRect.height > 0) {
          destLeft = targetRect.left;
          destTop = targetRect.top;
          destWidth = targetRect.width;
          destHeight = targetRect.height;
        }
      }

      // Set initial position of the morphing home page logo
      setFlyStyle({
        position: 'fixed',
        left: `${startLeft}px`,
        top: `${startTop}px`,
        width: `${startWidth}px`,
        height: `${startHeight}px`,
        opacity: 1,
        zIndex: 10000,
        transition: 'none',
        borderRadius: '16px',
        filter: 'drop-shadow(0 12px 24px rgba(249, 115, 22, 0.35))',
      });

      // 3. Animate towards target home page logo in the next tick
      requestAnimationFrame(() => {
        setTimeout(() => {
          setFlyStyle({
            position: 'fixed',
            left: `${destLeft}px`,
            top: `${destTop}px`,
            width: `${destWidth}px`,
            height: `${destHeight}px`,
            opacity: 1,
            zIndex: 10000,
            transition: 'all 850ms cubic-bezier(0.16, 1, 0.3, 1)',
            borderRadius: '12px',
            filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.15))',
          });
        }, 30);
      });

      // 4. Complete transition and dock
      setTimeout(() => {
        setIsDocked(true);
        setTimeout(() => {
          onFinish();
        }, 150);
      }, 900);
    }, 200);
  };

  useEffect(() => {
    let animationFrameId;

    const updateProgress = () => {
      if (videoRef.current && videoRef.current.duration) {
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        const pct = Math.min(Math.round((current / total) * 100), 100);
        setProgress(pct);

        // When video naturally reaches completion (100% or ended)
        if (pct >= 100 && !hasFinishedRef.current) {
          startLogoTransition();
          return;
        }
      }
      if (!hasFinishedRef.current) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // Play video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if autoplay policy blocks
        const fallbackInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(fallbackInterval);
              startLogoTransition();
              return 100;
            }
            return Math.min(prev + 5, 100);
          });
        }, 80);
      });
    }

    // Safety fallback timeout
    const maxTimer = setTimeout(startLogoTransition, 9000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(maxTimer);
    };
  }, []);

  const getStatusMessage = (pct) => {
    if (pct < 25) return 'Initializing Arena Systems...';
    if (pct < 50) return 'Loading Athlete UID Registry & Districts...';
    if (pct < 75) return 'Connecting to State Championship Network...';
    if (pct < 95) return 'Calibrating Precision Metrics...';
    return 'System Ready • Launching...';
  };

  return (
    <>
      {/* Flying Morphing Logo (Shared Element to Home Page Hero) */}
      {flyStyle && (
        <div
          style={flyStyle}
          className={`pointer-events-none select-none overflow-hidden ${
            isDocked ? 'scale-105 transition-transform duration-500' : ''
          }`}
        >
          <img
            src={HOME_PAGE_LOGO_SRC}
            alt="Home Page Logo"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>
      )}

      {/* Main Full-Screen Loader Backdrop (Realistic Daylight Sports Arena) */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center text-slate-800 select-none overflow-hidden transition-opacity duration-700 ease-out ${
          isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #eef2f6 40%, #e2e8f0 100%)',
        }}
      >
        {/* Realistic Natural Sunlight & Arena Diffusion */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-amber-200/40 via-orange-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/50 via-sky-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

        {/* Realistic Target Range Precision Field Arcs */}
        <div className="absolute w-[750px] h-[750px] rounded-full border border-slate-300/40 pointer-events-none" />
        <div className="absolute w-[520px] h-[520px] rounded-full border border-orange-400/20 pointer-events-none" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-blue-400/15 pointer-events-none" />

        {/* Realistic Floating Pop-up Skip Button */}
        <button
          onClick={startLogoTransition}
          className="absolute top-6 right-6 z-30 px-4 py-2 rounded-full bg-white/95 hover:bg-orange-500 hover:text-white text-slate-700 text-xs font-bold tracking-wider uppercase border border-slate-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.35)] backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Skip Intro</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>

        {/* Center Loader Content */}
        <div
          className={`relative z-10 flex flex-col items-center w-full max-w-lg px-6 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Top Official Badge */}
          <div className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-orange-200/80 text-xs font-semibold text-orange-600 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-[11px] uppercase tracking-wider font-bold">
              Elite Slingshot Association • Chhattisgarh
            </span>
          </div>

          {/* Realistic Elevated Studio Display Card */}
          <div
            ref={videoCardRef}
            className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.15),0_10px_20px_-5px_rgba(249,115,22,0.08)]"
          >
            <video
              ref={videoRef}
              src={loaderVideo}
              autoPlay
              muted
              playsInline
              onEnded={startLogoTransition}
              onError={startLogoTransition}
              className="w-full h-full object-contain pointer-events-none select-none bg-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
