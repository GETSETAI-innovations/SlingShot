import React, { useState, useEffect, useRef } from 'react';
import loaderVideo from '../../assets/Loader.mp4';

export default function VideoLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);
  const hasFinishedRef = useRef(false);

  const completeLoading = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 700);
  };

  useEffect(() => {
    let animationFrameId;

    const updateProgress = () => {
      if (videoRef.current && videoRef.current.duration) {
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        const pct = Math.min(Math.round((current / total) * 100), 100);
        setProgress(pct);
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
              completeLoading();
              return 100;
            }
            return prev + 10;
          });
        }, 180);
      });
    }

    // Safety fallback timeout
    const maxTimer = setTimeout(completeLoading, 7500);

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
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 text-slate-800 select-none overflow-hidden transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Light Radial Ambient Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08)_0%,rgba(37,99,235,0.05)_45%,transparent_75%)] pointer-events-none" />

      {/* Decorative Target Circles in Background (Light/Sport Theme) */}
      <div className="absolute w-[640px] h-[640px] rounded-full border border-slate-200/80 pointer-events-none animate-[spin_90s_linear_infinite]" />
      <div className="absolute w-[460px] h-[460px] rounded-full border border-orange-500/10 pointer-events-none" />
      <div className="absolute w-[290px] h-[290px] rounded-full border border-blue-500/10 pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={completeLoading}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-slate-800 text-[11px] font-mono tracking-wider uppercase border border-slate-200 shadow-sm backdrop-blur-md transition-all cursor-pointer"
      >
        Skip Intro →
      </button>

      {/* Main Loader Content Frame */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6">
        {/* Top Official Badge */}
        <div className="mb-5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-xs font-semibold tracking-wider text-[#F97316] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#F97316] animate-ping" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#F97316] font-bold">
            Eastern Slingshot Athletic Federation
          </span>
        </div>

        {/* Video Screen Container on Clean White Card */}
        <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
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
            onEnded={completeLoading}
            onError={completeLoading}
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
  );
}
