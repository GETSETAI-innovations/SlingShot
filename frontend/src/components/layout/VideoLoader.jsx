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

      {/* Main Full-Screen Loader Backdrop */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 text-slate-800 select-none overflow-hidden transition-opacity duration-700 ease-out ${
          isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Light Radial Ambient Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08)_0%,rgba(37,99,235,0.05)_45%,transparent_75%)] pointer-events-none" />

        {/* Decorative Target Circles in Background */}
        <div className="absolute w-[640px] h-[640px] rounded-full border border-slate-200/80 pointer-events-none animate-[spin_90s_linear_infinite]" />
        <div className="absolute w-[460px] h-[460px] rounded-full border border-orange-500/10 pointer-events-none" />
        <div className="absolute w-[290px] h-[290px] rounded-full border border-blue-500/10 pointer-events-none" />

        {/* Skip Button */}
        <button
          onClick={startLogoTransition}
          className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-slate-800 text-[11px] font-mono tracking-wider uppercase border border-slate-200 shadow-sm backdrop-blur-md transition-all cursor-pointer"
        >
          Skip Intro →
        </button>

        {/* Main Loader Content Frame */}
        <div
          className={`relative z-10 flex flex-col items-center w-full max-w-lg px-6 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Top Official Badge */}
          <div className="mb-5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-xs font-semibold tracking-wider text-[#F97316] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-ping" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#F97316] font-bold">
              Eastern Slingshot Athletic Federation
            </span>
          </div>

          {/* Video Screen Container on Clean White Card */}
          <div
            ref={videoCardRef}
            className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
          >
            {/* Subtle Corner HUD Markers in Saffron Orange */}
            <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#F97316] z-20 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#F97316] z-20 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#F97316] z-20 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#F97316] z-20 pointer-events-none" />

            {/* Loader Video Asset */}
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

          {/* Loader Progress Section */}
          <div className="w-full mt-6">
            {/* Status Label & Percentage */}
            <div className="flex items-center justify-between text-xs font-mono mb-2 px-1">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700 font-semibold tracking-wide uppercase text-[11px]">
                  {getStatusMessage(progress)}
                </span>
              </div>
              <span className="font-bold text-[#F97316] tracking-wider text-xs">
                {progress}%
              </span>
            </div>

            {/* Animated Glowing Progress Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-[2px] border border-slate-200 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-[#F97316] to-orange-600 rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Subtext info */}
            <div className="flex items-center justify-between mt-3 px-1 text-[10px] text-slate-400 uppercase tracking-widest font-mono font-medium">
              <span>OFFICIAL STATE PORTAL</span>
              <span>PRECISION TARGET SYSTEM</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
