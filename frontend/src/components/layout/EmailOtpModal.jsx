import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, CheckCircle2 } from 'lucide-react';
import { showToastSuccess, showToastError, showToastInfo } from '../../utils/toast';
import { apiPost } from '../../utils/api';

export default function EmailOtpModal({ isOpen, onClose, email, onSuccess }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState('idle'); // 'idle' | 'typing' | 'error' | 'success'
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  // Send OTP when modal opens
  useEffect(() => {
    if (isOpen && email) {
      handleSendOTP();
    }
  }, [isOpen, email]);

  // Send OTP to backend
  const handleSendOTP = async () => {
    if (!email || !email.trim()) {
      showToastError('Email is required');
      return;
    }

    setIsSending(true);
    try {
      const response = await apiPost('/api/email-verification/send', { email: email.trim() });
      const resData = await response.json();

      if (response.ok && resData.status === 'success') {
        setOtp(['', '', '', '', '', '']);
        setStatus('idle');
        setTimer(60);
        setCanResend(false);
        showToastSuccess('OTP sent successfully. Please check your email.');

        // Auto-focus first input
        setTimeout(() => {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 150);
      } else {
        showToastError(resData.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      showToastError('Failed to send OTP. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  // Resend Countdown Timer
  useEffect(() => {
    let interval = null;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, timer]);

  if (!isOpen) return null;

  // Handle individual digit input
  const handleDigitChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '');

    // Reset error on new input
    if (status === 'error') {
      setStatus('typing');
    } else {
      setStatus('typing');
    }

    const newOtp = [...otp];

    if (cleanVal.length > 1) {
      // Pasted multiple digits
      const digits = cleanVal.slice(0, 6).split('');
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(digits.length, 5);
      if (inputRefs.current[nextIdx]) {
        inputRefs.current[nextIdx].focus();
      }
      return;
    }

    newOtp[index] = cleanVal ? cleanVal[cleanVal.length - 1] : '';
    setOtp(newOtp);

    // Auto-focus next input if filled
    if (cleanVal && index < 5) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace / navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
      if (status === 'error') setStatus('typing');
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      handleVerify();
    }
  };

  // Handle Paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasteData[i] || '';
    }
    setOtp(newOtp);
    if (status === 'error') setStatus('typing');

    const focusIdx = Math.min(pasteData.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  // Verify OTP Code
  const handleVerify = async () => {
    const entered = otp.join('');
    if (entered.length < 6) {
      setStatus('error');
      showToastError('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await apiPost('/api/email-verification/verify', {
        email: email.trim(),
        otp: entered
      });
      const resData = await response.json();

      if (response.ok && resData.status === 'success') {
        setStatus('success');
        showToastSuccess('OTP verified successfully!');
        // Pass the verification proof to parent
        setTimeout(() => {
          onSuccess(resData.data.verificationProof);
          onClose();
        }, 1200);
      } else {
        setStatus('error');
        showToastError(resData.message || 'Incorrect OTP. Please try again.');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      setStatus('error');
      showToastError('Failed to verify OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!canResend) return;
    await handleSendOTP();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Pop-up Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dynamic Animated Emoji Reaction */}
        <div className="mb-4 flex justify-center">
          <motion.div
            animate={
              status === 'error'
                ? { x: [-12, 12, -8, 8, -4, 4, 0] }
                : status === 'success'
                ? { scale: [1, 1.15, 1], y: [0, -10, 0] }
                : status === 'typing'
                ? { y: [0, 2, 0] }
                : { y: [0, -3, 0] }
            }
            transition={
              status === 'error'
                ? { duration: 0.45, ease: 'easeInOut' }
                : status === 'success'
                ? { duration: 0.6, repeat: 1 }
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md select-none"
            >
              <defs>
                {/* Face Gradients */}
                <radialGradient id="faceGradDefault" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="70%" stopColor="#FFCA28" />
                  <stop offset="100%" stopColor="#FFA000" />
                </radialGradient>
                <radialGradient id="faceGradError" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFCDD2" />
                  <stop offset="65%" stopColor="#EF9A9A" />
                  <stop offset="100%" stopColor="#E57373" />
                </radialGradient>
                <radialGradient id="faceGradSuccess" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFF176" />
                  <stop offset="65%" stopColor="#FFD54F" />
                  <stop offset="100%" stopColor="#FFB300" />
                </radialGradient>

                {/* Eye reflection */}
                <linearGradient id="eyeShine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E0E0E0" />
                </linearGradient>
              </defs>

              {/* Main Face Circle */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill={
                  status === 'error'
                    ? 'url(#faceGradError)'
                    : status === 'success'
                    ? 'url(#faceGradSuccess)'
                    : 'url(#faceGradDefault)'
                }
                stroke={
                  status === 'error'
                    ? '#E53935'
                    : status === 'success'
                    ? '#F57F17'
                    : '#FB8C00'
                }
                strokeWidth="2.5"
              />

              {/* Blush Cheeks */}
              <circle
                cx="24"
                cy="58"
                r="7"
                fill={status === 'error' ? '#EF5350' : '#FF7043'}
                opacity={status === 'error' ? 0.6 : 0.35}
              />
              <circle
                cx="76"
                cy="58"
                r="7"
                fill={status === 'error' ? '#EF5350' : '#FF7043'}
                opacity={status === 'error' ? 0.6 : 0.35}
              />

              {/* EXPRESSION STATES */}
              {status === 'error' && (
                /* SAD / CRYING REACTION */
                <g>
                  {/* Sad Eyebrows slanted inward */}
                  <path
                    d="M26 31 Q35 36 41 33"
                    fill="none"
                    stroke="#4E342E"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M74 31 Q65 36 59 33"
                    fill="none"
                    stroke="#4E342E"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Sad Teary Eyes */}
                  <ellipse cx="34" cy="43" rx="5" ry="6" fill="#4E342E" />
                  <ellipse cx="66" cy="43" rx="5" ry="6" fill="#4E342E" />
                  <circle cx="32" cy="41" r="2" fill="#FFFFFF" />
                  <circle cx="64" cy="41" r="2" fill="#FFFFFF" />

                  {/* Sad Downturned Mouth */}
                  <path
                    d="M34 68 Q50 54 66 68"
                    fill="none"
                    stroke="#4E342E"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Falling Blue Tear */}
                  <motion.path
                    initial={{ y: 0, opacity: 0.8 }}
                    animate={{ y: [0, 8, 14], opacity: [0.8, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeIn' }}
                    d="M25 54 C22 58 20 62 25 67 C30 62 28 58 25 54 Z"
                    fill="#42A5F5"
                  />
                </g>
              )}

              {status === 'success' && (
                /* HAPPY / SMILING REACTION */
                <g>
                  {/* Joyful Curved Laughing Eyes */}
                  <path
                    d="M25 43 Q34 32 43 43"
                    fill="none"
                    stroke="#3E2723"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M57 43 Q66 32 75 43"
                    fill="none"
                    stroke="#3E2723"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />

                  {/* Wide Happy Smiling Open Mouth */}
                  <path
                    d="M28 57 Q50 84 72 57 Z"
                    fill="#C62828"
                    stroke="#3E2723"
                    strokeWidth="2.5"
                  />
                  {/* Tongue */}
                  <path
                    d="M38 68 Q50 84 62 68 Q50 63 38 68 Z"
                    fill="#FF8A80"
                  />
                  {/* Upper Teeth highlight */}
                  <path
                    d="M32 58 Q50 64 68 58"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Sparkle star top right */}
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                  >
                    <path
                      d="M84 18 L86 24 L92 26 L86 28 L84 34 L82 28 L76 26 L82 24 Z"
                      fill="#FFD700"
                    />
                  </motion.g>
                </g>
              )}

              {status === 'typing' && (
                /* CURIOUS / TYPING REACTION (Eyes looking down at inputs) */
                <g>
                  {/* Eyebrows raised with interest */}
                  <path
                    d="M28 32 Q35 28 42 32"
                    fill="none"
                    stroke="#5D4037"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M72 32 Q65 28 58 32"
                    fill="none"
                    stroke="#5D4037"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Eyes looking downwards towards the OTP inputs */}
                  <ellipse cx="35" cy="46" rx="5" ry="6" fill="#5D4037" />
                  <ellipse cx="65" cy="46" rx="5" ry="6" fill="#5D4037" />
                  {/* Pupil highlight */}
                  <circle cx="34" cy="48" r="2.2" fill="#FFFFFF" />
                  <circle cx="64" cy="48" r="2.2" fill="#FFFFFF" />

                  {/* Curious focused smile */}
                  <path
                    d="M37 62 Q50 71 63 62"
                    fill="none"
                    stroke="#5D4037"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {status === 'idle' && (
                /* IDLE / FRIENDLY REACTION */
                <g>
                  {/* Friendly Eyebrows */}
                  <path
                    d="M28 33 Q35 30 42 33"
                    fill="none"
                    stroke="#5D4037"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M72 33 Q65 30 58 33"
                    fill="none"
                    stroke="#5D4037"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Friendly Shiny Eyes */}
                  <circle cx="35" cy="43" r="5" fill="#5D4037" />
                  <circle cx="65" cy="43" r="5" fill="#5D4037" />
                  <circle cx="33" cy="41" r="2" fill="#FFFFFF" />
                  <circle cx="63" cy="41" r="2" fill="#FFFFFF" />

                  {/* Calm Sweet Smile */}
                  <path
                    d="M36 60 Q50 72 64 60"
                    fill="none"
                    stroke="#5D4037"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </svg>
          </motion.div>
        </div>

        {/* Modal Header */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          Enter OTP Code
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
          Please enter the 6-digit verification code sent to{' '}
          <span className="font-semibold text-slate-700">{email || 'your email'}</span>.
        </p>

        {/* OTP Input Boxes: 6 digits */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-6">
          {otp.map((digit, index) => {
            const isFilled = digit !== '';
            const isError = status === 'error';
            const isSuccess = status === 'success';

            // Box styling according to state:
            // 1) Error: All boxes turn RED!
            // 2) Filled: Turns GREEN!
            // 3) Default: Clean light gray
            let boxClasses = 'bg-slate-100 border border-slate-200 text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/30';

            if (isError) {
              boxClasses = 'bg-red-50 border-2 border-red-500 text-red-600 shadow-sm shadow-red-200';
            } else if (isSuccess) {
              boxClasses = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700 shadow-sm shadow-emerald-200';
            } else if (isFilled) {
              boxClasses = 'bg-emerald-50/80 border-2 border-emerald-500 text-emerald-800 shadow-sm shadow-emerald-100';
            }

            return (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-10 h-14 sm:w-12 sm:h-16 rounded-2xl text-center text-lg sm:text-xl font-black outline-none transition-all duration-200 ${boxClasses}`}
              />
            );
          })}
        </div>

        {/* Error message text */}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold text-red-500 mb-4"
          >
            Wrong OTP code. Please try again!
          </motion.p>
        )}

        {/* Success message text */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 mb-4"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>OTP Verified Successfully!</span>
          </motion.div>
        )}

        {/* Resend Code Link with countdown */}
        <div className="mb-6">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-600 underline underline-offset-4 transition cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resend Code</span>
            </button>
          ) : (
            <p className="text-xs text-slate-400">
              Resend Code in <span className="font-bold text-slate-600">{timer}s</span>
            </p>
          )}
        </div>

        {/* Green Verify Code Button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={status === 'success' || isVerifying || isSending}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#82C341] hover:bg-[#72b033] active:scale-[0.99] text-white text-sm sm:text-base font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-lime-500/25 hover:shadow-lime-500/40 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Verifying...</span>
            </>
          ) : status === 'success' ? (
            'Verified!'
          ) : (
            'Verify Code'
          )}
        </button>
      </motion.div>
    </div>
  );
}
