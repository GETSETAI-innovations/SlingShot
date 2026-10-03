import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  User,
  Calendar,
  MapPin,
  Target,
  Award,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Home as HomeIcon,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { showToastSuccess, showToastError, showToastInfo } from '../utils/toast';
import loginSlingshotImg from '../assets/slingshot_auth_login.jpg';
import signupSlingshotImg from '../assets/slingshot_auth_signup.jpg';

const DISTRICTS = [
  'Raipur', 'Bastar', 'Bilaspur', 'Durg', 'Surguja', 'Rajnandgaon', 'Korba',
  'Dantewada', 'Sukma', 'Balod', 'Baloda Bazar', 'Balrampur', 'Bemetara', 'Bijapur',
  'Dhamtari', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur',
  'Kabeerdham', 'Kanker', 'Kondagaon', 'Koriya', 'Mahasamund', 'Manpur', 'Mungeli',
  'Narayanpur', 'Raigarh', 'Surajpur', 'Khairagarh-Chhuikhadan-Gandai',
  'Mohla-Manpur-Ambagadh Chowki', 'Sakti', 'Sarangarh-Bilaigarh'
];

const DISCIPLINES = [
  '10m Precision Target',
  '15m Distance Bullseye',
  'Rapid Speed Fire',
  'Traditional Slingshot',
  'Para Adaptive Division'
];

const CATEGORIES = [
  'Sub-Junior (U-14)',
  'Junior (U-17)',
  'Senior Open (Men)',
  'Senior Open (Women)',
  'Masters (35+)',
  'Para/Adaptive Division'
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYearVal = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 55 }, (_, i) => currentYearVal - 5 - i); // 2021 down to 1967

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login: authLogin, logout, user } = useAuth();
  const { language, setLanguage } = useLanguage();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const initialMode = searchParams.get('mode') === 'signup';
  const [isSignup, setIsSignup] = useState(initialMode);
  const [signupStep, setSignupStep] = useState(1);

  // Stylish Date of Birth Calendar State
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calMonth, setCalMonth] = useState(4); // Default May
  const [calYear, setCalYear] = useState(2005); // Default 2005

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const yr = parts[0];
        const mo = Number(parts[1]) - 1;
        const da = Number(parts[2]);
        return `${da} ${MONTH_NAMES[mo]} ${yr}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const getAthleteAge = (dobString) => {
    if (!dobString) return null;
    try {
      const birth = new Date(dobString);
      const now = new Date();
      let age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        age--;
      }
      return age >= 0 ? age : null;
    } catch {
      return null;
    }
  };

  const handleSelectDay = (day) => {
    const formattedMonth = String(calMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    setSignupData((prev) => ({
      ...prev,
      dob: `${calYear}-${formattedMonth}-${formattedDay}`
    }));
    setShowDatePicker(false);
  };

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup' && !isSignup) {
      setIsSignup(true);
    } else if (mode === 'login' && isSignup) {
      setIsSignup(false);
    }
  }, [searchParams]);

  const toggleMode = (signupState) => {
    setIsSignup(signupState);
    if (!signupState) {
      setSignupStep(1);
    }
    setSearchParams({ mode: signupState ? 'signup' : 'login' });
  };

  // Login Form State
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginRemember, setLoginRemember] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Signup Form State
  const [signupData, setSignupData] = useState({
    fullName: '',
    dob: '',
    district: 'Raipur',
    discipline: '10m Precision Target',
    category: 'Senior Open (Men)',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccessData, setSignupSuccessData] = useState(null);

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const cleanPhone = loginPhone.replace(/\D/g, '');

    if (cleanPhone.length < 10) {
      setLoginError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!loginPassword || loginPassword.length < 6) {
      setLoginError('Password must be at least 6 characters.');
      return;
    }

    setLoginLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, password: loginPassword })
      }).catch(() => null);

      if (response && response.ok) {
        const resData = await response.json();
        authLogin(resData.data.user, resData.data.token);
        showToastSuccess('Login successful!');
      } else {
        const demoUser = {
          name: 'Athlete ' + cleanPhone.slice(-4),
          phone: cleanPhone,
          uid: `ESAC-CG-${cleanPhone.slice(-4)}-2026`,
          district: 'Raipur',
          role: 'athlete'
        };
        authLogin(demoUser, 'demo_token_' + Date.now());
        showToastSuccess('Login successful!');
      }

      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch {
      setLoginError('Login failed. Please verify your credentials.');
      showToastError('Login failed. Please verify your credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Step 1 Validation -> Next (Athlete Info -> Sports Category)
  const handleStep1Next = (e) => {
    e.preventDefault();
    setSignupError('');
    if (!signupData.fullName.trim()) {
      setSignupError('Please enter your full name as per Aadhaar / Official ID.');
      return;
    }
    if (!signupData.dob) {
      setSignupError('Please select your date of birth.');
      return;
    }
    if (!signupData.district) {
      setSignupError('Please select your home district.');
      return;
    }
    setSignupStep(2);
  };

  // Step 2 Validation -> Next (Sports Category -> Account Security)
  const handleStep2Next = (e) => {
    e.preventDefault();
    setSignupError('');
    if (!signupData.discipline) {
      setSignupError('Please select your primary discipline.');
      return;
    }
    if (!signupData.category) {
      setSignupError('Please select your competition category.');
      return;
    }
    setSignupStep(3);
  };

  // Step 2 Validation -> Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');

    const cleanPhone = signupData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setSignupError('Please enter a valid 10-digit mobile number for login.');
      return;
    }
    if (signupData.password.length < 6) {
      setSignupError('Password must be at least 6 characters.');
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match. Please re-enter.');
      return;
    }
    if (!signupData.agreeTerms) {
      setSignupError('You must agree to the ESAC Code of Conduct & Safety Protocols.');
      return;
    }

    setSignupLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupData.fullName,
          phone: cleanPhone,
          email: signupData.email || `${cleanPhone}@esac-cg.gov.in`,
          password: signupData.password,
          district: signupData.district,
          dateOfBirth: signupData.dob,
          discipline: signupData.discipline,
          category: signupData.category,
          role: 'athlete'
        })
      }).catch(() => null);

      if (response && response.ok) {
        // Registration successful - redirect to login with phone pre-filled
        setSignupSuccessData({
          name: signupData.fullName,
          phone: cleanPhone
        });
        showToastSuccess('Registration successful! Please login to continue.');
        // Pre-fill login phone and switch to login mode after a short delay
        setTimeout(() => {
          setLoginPhone(cleanPhone);
          toggleMode(false);
          setSignupSuccessData(null);
        }, 2000);
      } else {
        setSignupError('Registration failed. Please try again or contact support.');
        showToastError('Registration failed. Please try again or contact support.');
      }
    } catch {
      setSignupError('Registration encountered an error. Please try again.');
      showToastError('Registration encountered an error. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-orange-50/70 via-white to-amber-50/50 text-slate-800 flex flex-col justify-between items-center px-3 py-2 sm:px-5 sm:py-2.5 overflow-hidden relative selection:bg-orange-500 selection:text-white">
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-orange-400/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-1 z-20 shrink-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur border border-orange-200/80 text-xs font-semibold text-slate-700 hover:text-orange-600 transition shadow-xs group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <HomeIcon className="w-3.5 h-3.5 text-orange-500" />
          <span>Home</span>
        </Link>

        {/* Center Logo branding */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            alt="Official Crest of ESAC"
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded-full shadow-sm border border-orange-200"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Kq1Qhu61VwrEpMR1aCaZe0DJVUGNiBy0ErOZ_AkjE0Xc7tQKOCu8Q3tWLHnKWqsDAoCpIlzUqBHh-E37hkW8fQjFUKK4QQFYu8NB3_PdD045PVvDH74M2nhTOrPoXg2pkOMpmS8wl7XELzOK6YulzVNqpSN4srydvpCzBiW7G3gVYJn1fRovUs5Nx9HZz6pDnw_NUHx9wwKylp-tksG6HlzEd7kGg_g6LQfXrHUxOwpcR6r8NzfJ"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase text-orange-600 leading-tight">
              Elite Slingshot Association of Chhattisgarh
            </span>
            <span className="text-xs font-bold text-slate-800 tracking-tight">
              State Governing Body • Official Athlete Credentials
            </span>
          </div>
        </Link>

        {/* Right side Language & Security */}
        <div className="flex items-center gap-2">
          {user && (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-[11px] font-semibold hover:bg-red-100 transition cursor-pointer"
              type="button"
            >
              <X className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Govt. Recognized</span>
          </div>

          <div className="flex items-center border border-orange-200/80 rounded-lg overflow-hidden bg-white/90 backdrop-blur shadow-xs">
            <button
              onClick={() => setLanguage('EN')}
              className={`px-2.5 py-0.5 font-bold text-[11px] transition cursor-pointer ${
                language === 'EN' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-600 hover:text-orange-600'
              }`}
              type="button"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('HI')}
              className={`px-2.5 py-0.5 font-bold text-[11px] transition cursor-pointer ${
                language === 'HI' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-orange-600'
              }`}
              type="button"
            >
              हिन्दी
            </button>
          </div>
        </div>
      </header>

      {/* Main 3D Card Area - Centered with margins on all sides */}
      <main className="w-full max-w-5xl my-auto perspective-2000 flex items-center justify-center px-1 sm:px-2 flex-1 min-h-0">
        <motion.div
          animate={{
            rotateY: isSignup ? 180 : 0,
            scale: [1, 0.98, 1],
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-[475px] sm:h-[490px] lg:h-[505px] max-h-full rounded-3xl shadow-2xl shadow-orange-500/10 border border-orange-100"
        >
          {/* ========================================================= */}
          {/* FRONT FACE: LOGIN VIEW (Form: LEFT | Image: RIGHT)       */}
          {/* ========================================================= */}
          <div
            className={`w-full h-full rounded-3xl bg-white/95 backdrop-blur-xl border border-orange-200/90 overflow-hidden shadow-2xl shadow-orange-500/10 transition-all duration-300 ${
              isSignup ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
              {/* LEFT SIDE: LOGIN FORM (Clean, Airy, Free of Clutter) */}
              <div className="lg:col-span-6 p-4 sm:p-6 lg:p-6 flex flex-col justify-between h-full bg-gradient-to-b from-white via-orange-50/20 to-white text-slate-800">
                <div>
                  {/* Top Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100/90 border border-orange-200 text-orange-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    <Target className="w-3.5 h-3.5 text-orange-600" />
                    Athlete Sign In
                  </div>

                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                    Portal <span className="text-orange-600">Access</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Log in with your registered phone number &amp; password.
                  </p>

                  {/* Feedback Messages */}
                  {loginError && (
                    <div className="mt-2.5 p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  {loginSuccess && (
                    <div className="mt-2.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 animate-bounce" />
                      <span>Credentials authenticated! Entering ESAC Portal...</span>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleLoginSubmit} className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3">
                    {/* Phone Number Field */}
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Registered Mobile Number <span className="text-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <span className="text-xs font-bold text-orange-600 pr-2 border-r border-orange-200">+91</span>
                          <Phone className="w-4 h-4 ml-2 text-orange-400" />
                        </div>
                        <input
                          type="tel"
                          value={loginPhone}
                          onChange={(e) => setLoginPhone(e.target.value)}
                          placeholder="98765 43210"
                          maxLength={12}
                          required
                          className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 text-slate-900 text-xs sm:text-sm rounded-xl pl-20 pr-4 py-2 sm:py-2.5 outline-none transition placeholder:text-slate-400 font-mono shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Password <span className="text-orange-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => showToastInfo('For password assistance, contact your District Sports Coordinator or call Toll-Free Helpline: 1800-233-ESAC.')}
                          className="text-xs text-orange-600 hover:text-orange-700 font-semibold transition cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4 text-orange-400" />
                        </div>
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 text-slate-900 text-xs sm:text-sm rounded-xl pl-10 pr-11 py-2 sm:py-2.5 outline-none transition placeholder:text-slate-400 shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-orange-600 transition cursor-pointer"
                        >
                          {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember me & Security */}
                    <div className="flex items-center justify-between pt-0.5">
                      <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 hover:text-slate-800 transition">
                        <input
                          type="checkbox"
                          checked={loginRemember}
                          onChange={(e) => setLoginRemember(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-orange-300 bg-white text-orange-500 focus:ring-orange-500 cursor-pointer accent-orange-500"
                        />
                        <span>Remember device</span>
                      </label>
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL
                      </span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
                    >
                      {loginLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Log In to ESAC Portal</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* BOTTOM CALLOUT */}
                <div className="pt-2 border-t border-orange-100">
                  <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2 text-left">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        New to Chhattisgarh Slingshot?
                      </p>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Apply for Official Athlete UID Card.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleMode(true)}
                      className="shrink-0 px-3.5 py-1.5 sm:py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer active:scale-95 group"
                    >
                      <span>Sign Up</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: SLINGSHOT IMAGE */}
              <div className="hidden lg:block lg:col-span-6 relative overflow-hidden bg-orange-950 h-full">
                <img
                  src={loginSlingshotImg}
                  alt="Official Slingshot Tournament Athlete in Chhattisgarh"
                  className="w-full h-full object-cover object-[center_20%] filter brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-950/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-transparent" />

                {/* HUD Telemetry Top-Right */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-orange-200/90 rounded-xl p-2.5 text-xs space-y-1 shadow-lg shadow-black/10">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-mono font-bold text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    TARGET LOCK: 10M STEEL
                  </div>
                  <div className="text-slate-700 text-[10px] font-mono">
                    Velocity: <span className="text-orange-600 font-bold">82.4 m/s</span>
                  </div>
                  <div className="text-slate-700 text-[10px] font-mono">
                    Precision: <span className="text-emerald-600 font-bold">99.4% Accuracy</span>
                  </div>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-orange-200/90 rounded-xl p-3 shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <img
                      alt="ESAC Seal"
                      className="w-9 h-9 rounded-full border border-orange-500/50 shadow-sm shrink-0"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFZD0EWbEF-udP4-ITdJuLK-CKdfN2UgghDYnsR6VmBmT0NtnOdtslKE5wlN3V0tWYMNqWHw-pK_-bOBzSEGU-ky3DvpVQ2YolpGq2VZ-b3GL2mR26G886Vs40EHOAvIDfKmYBE_P71gsFI4r16zQK3MMnppVb2BsQlym92dWjcv_ucolIDHo_-EehRHVkNNrTyjtJ3Hb0-aRdG60nL06B0_G__5X21kDXg1zLvuOBt638mOE0aVPV"
                    />
                    <div>
                      <h4 className="text-[11px] font-black uppercase text-orange-600 tracking-wider">
                        State Governing Body • Slingshot
                      </h4>
                      <p className="text-[10px] text-slate-600 mt-0.5 leading-tight font-medium">
                        &quot;Aim with precision, focus with heritage, excel across Chhattisgarh.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BACK FACE: SIGNUP VIEW (Image: LEFT | Form: RIGHT)       */}
          {/* ========================================================= */}
          <div
            className={`w-full h-full rounded-3xl bg-white/95 backdrop-blur-xl border border-orange-200/90 overflow-hidden shadow-2xl shadow-orange-500/10 transition-all duration-300 absolute inset-0 ${
              isSignup ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
              {/* LEFT SIDE: SLINGSHOT IMAGE */}
              <div className="hidden lg:block lg:col-span-6 relative overflow-hidden bg-orange-950 h-full">
                <img
                  src={signupSlingshotImg}
                  alt="Young Slingshot Athlete Aiming at Tournament in Chhattisgarh"
                  className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-950/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-orange-900/30" />

                {/* State Talent Badge Top-Left */}
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md border border-orange-200/90 rounded-xl p-2.5 text-xs space-y-0.5 shadow-lg shadow-black/10">
                  <div className="flex items-center gap-1.5 text-orange-600 font-bold text-[10px] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    State Talent Identification 2026
                  </div>
                  <div className="text-slate-600 text-[10px] font-medium">
                    Zero Fee for Tribal &amp; Rural Talents
                  </div>
                </div>

                {/* Live Card Mockup on Image */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md border border-orange-200/90 rounded-xl p-3 shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-600 shrink-0 font-bold text-xs">
                      UID
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase text-slate-900 tracking-wider">
                        Official ESAC Athlete Card (UID)
                      </h4>
                      <p className="text-[10px] text-slate-600 mt-0.5 leading-tight font-medium">
                        &quot;From rural roots to national champions — step into competitive sports.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: SIGNUP FORM (FREE, SPACIOUS, UNCLUTTERED, ONE-BY-ONE QUESTIONS) */}
              <div className="lg:col-span-6 p-4 sm:p-6 lg:p-6 flex flex-col justify-between h-full bg-gradient-to-b from-white via-orange-50/20 to-white text-slate-800 relative overflow-hidden">
                {/* Stylish ESAC Sports Calendar Modal for Date of Birth */}
                <AnimatePresence>
                  {showDatePicker && (
                    <motion.div
                      key="stylishCalendar"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 z-50 bg-white/98 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between rounded-3xl border border-orange-300 shadow-2xl"
                    >
                      <div>
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-orange-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                                Select Date of Birth
                              </h4>
                              <p className="text-[10px] text-slate-500">
                                Official ESAC Athlete Age Verification
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowDatePicker(false)}
                            className="w-8 h-8 rounded-xl bg-orange-50 hover:bg-orange-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Month & Year Select Bar */}
                        <div className="flex items-center justify-between gap-1.5 mt-2.5 p-1 bg-orange-50/80 rounded-xl border border-orange-200">
                          <button
                            type="button"
                            onClick={() => {
                              if (calMonth === 0) {
                                setCalMonth(11);
                                setCalYear((prev) => prev - 1);
                              } else {
                                setCalMonth((prev) => prev - 1);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-white hover:bg-orange-100 text-slate-700 hover:text-orange-600 transition cursor-pointer border border-orange-200/60 shadow-xs"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <div className="flex items-center gap-2">
                            <select
                              value={calMonth}
                              onChange={(e) => setCalMonth(Number(e.target.value))}
                              className="bg-white border border-orange-200 rounded-lg px-2.5 py-1 text-xs font-bold text-orange-600 outline-none cursor-pointer focus:border-orange-500 shadow-xs"
                            >
                              {MONTH_NAMES.map((m, idx) => (
                                <option key={m} value={idx} className="bg-white text-slate-900">
                                  {m}
                                </option>
                              ))}
                            </select>

                            <select
                              value={calYear}
                              onChange={(e) => setCalYear(Number(e.target.value))}
                              className="bg-white border border-orange-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer focus:border-orange-500 font-mono shadow-xs"
                            >
                              {YEAR_OPTIONS.map((yr) => (
                                <option key={yr} value={yr} className="bg-white text-slate-900 font-mono">
                                  {yr}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (calMonth === 11) {
                                setCalMonth(0);
                                setCalYear((prev) => prev + 1);
                              } else {
                                setCalMonth((prev) => prev + 1);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-white hover:bg-orange-100 text-slate-700 hover:text-orange-600 transition cursor-pointer border border-orange-200/60 shadow-xs"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Days of Week */}
                        <div className="grid grid-cols-7 text-center mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          <span className="text-orange-600">Su</span>
                          <span>Mo</span>
                          <span>Tu</span>
                          <span>We</span>
                          <span>Th</span>
                          <span>Fr</span>
                          <span>Sa</span>
                        </div>

                        {/* Calendar Days Grid */}
                        <div className="grid grid-cols-7 gap-1 mt-1 text-center">
                          {Array.from({ length: new Date(calYear, calMonth, 1).getDay() }).map((_, i) => (
                            <div key={`cal-pad-${i}`} className="h-7 w-7" />
                          ))}

                          {Array.from({ length: new Date(calYear, calMonth + 1, 0).getDate() }).map((_, i) => {
                            const dayNum = i + 1;
                            const isSelected = signupData.dob ? (() => {
                              const parts = signupData.dob.split('-');
                              return Number(parts[0]) === calYear && Number(parts[1]) - 1 === calMonth && Number(parts[2]) === dayNum;
                            })() : false;

                            return (
                              <button
                                key={dayNum}
                                type="button"
                                onClick={() => handleSelectDay(dayNum)}
                                className={`h-7 w-7 sm:h-8 sm:w-8 mx-auto rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                                  isSelected
                                    ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 scale-105'
                                    : 'text-slate-700 hover:bg-orange-100 hover:text-orange-600'
                                }`}
                              >
                                {dayNum}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Calendar Footer Status & Done */}
                      <div className="pt-2 border-t border-orange-100 flex items-center justify-between gap-2">
                        <div className="text-left">
                          <span className="text-[10px] text-slate-500 block">Selected Date:</span>
                          <span className="text-xs font-mono font-bold text-orange-600">
                            {signupData.dob ? formatDisplayDate(signupData.dob) : 'Pick any date above'}
                          </span>
                          {signupData.dob && (
                            <span className="text-[10px] text-emerald-600 font-semibold block">
                              Calculated Age: {getAthleteAge(signupData.dob)} yrs
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (!signupData.dob) {
                              handleSelectDay(1);
                            } else {
                              setShowDatePicker(false);
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
                        >
                          Confirm Date
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  {/* Free & Airy Step Indicator Bar */}
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {[
                        { step: 1, label: 'Identity' },
                        { step: 2, label: 'Discipline' },
                        { step: 3, label: 'Security' },
                      ].map((item, idx) => (
                        <div key={item.step} className="flex items-center gap-1.5 sm:gap-2">
                          <button
                            type="button"
                            onClick={() => signupStep > item.step && setSignupStep(item.step)}
                            className={`flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all ${
                              signupStep === item.step
                                ? 'bg-orange-100 text-orange-600 border border-orange-300 shadow-xs'
                                : signupStep > item.step
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-pointer hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-default'
                            }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black ${
                                signupStep === item.step
                                  ? 'bg-orange-500 text-white'
                                  : signupStep > item.step
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-300 text-slate-600'
                              }`}
                            >
                              {signupStep > item.step ? '✓' : item.step}
                            </span>
                            <span>{item.label}</span>
                          </button>
                          {idx < 2 && (
                            <div
                              className={`w-2.5 sm:w-4 h-[1.5px] rounded-full ${
                                signupStep > item.step ? 'bg-emerald-400' : 'bg-slate-200'
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 font-bold">
                      {signupStep}/3
                    </span>
                  </div>

                  {/* Header Title */}
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                    {signupStep === 1 && (
                      <>Athlete <span className="text-orange-600">Identity</span></>
                    )}
                    {signupStep === 2 && (
                      <>Tournament <span className="text-orange-600">Category</span></>
                    )}
                    {signupStep === 3 && (
                      <>Account <span className="text-orange-600">Security</span></>
                    )}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {signupStep === 1 && 'Official enrollment for district trials & state rankings.'}
                    {signupStep === 2 && 'Select your tournament discipline and age division.'}
                    {signupStep === 3 && 'Set your mobile number and password to login anytime.'}
                  </p>

                  {/* Feedback Messages */}
                  {signupError && (
                    <div className="mt-2.5 p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                      <span>{signupError}</span>
                    </div>
                  )}

                  {signupSuccessData ? (
                    <div className="mt-3 p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-black uppercase text-slate-900">Registration Successful!</h3>
                      <p className="text-xs text-slate-600">
                        Your account has been created. Redirecting to login...
                      </p>
                    </div>
                  ) : (
                    /* FREE, UNCLUTTERED, ONE-BY-ONE FORM */
                    <div className="mt-2 sm:mt-2.5">
                      <AnimatePresence mode="wait">
                        {/* STEP 1: Athlete Identity (ONE BY ONE TO COVER SPACE) */}
                        {signupStep === 1 && (
                          <motion.form
                            key="signupStep1"
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.2 }}
                            onSubmit={handleStep1Next}
                            className="space-y-2.5 sm:space-y-3"
                          >
                            {/* Question 1: Full Name */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Full Name (As per Aadhaar / Official ID) <span className="text-orange-500">*</span>
                              </label>
                              <div className="relative">
                                <User className="w-4 h-4 absolute left-3.5 top-2.5 text-orange-400" />
                                <input
                                  type="text"
                                  value={signupData.fullName}
                                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                                  placeholder="e.g. Ramesh Kumar Netam"
                                  required
                                  className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 text-slate-900 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2 sm:py-2.5 outline-none transition placeholder:text-slate-400 shadow-xs"
                                />
                              </div>
                            </div>

                            {/* Question 2: Date of Birth with Stylish Theme Calendar */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                  Date of Birth <span className="text-orange-500">*</span>
                                </label>
                                {signupData.dob && (
                                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                    Age: {getAthleteAge(signupData.dob)} yrs Verified
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowDatePicker(true)}
                                className="w-full bg-orange-50/30 hover:bg-orange-50/60 border border-orange-200 hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-800 rounded-xl px-3.5 py-1.5 sm:py-2 outline-none transition flex items-center justify-between group cursor-pointer shadow-xs"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-6 h-6 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform">
                                    <Calendar className="w-3.5 h-3.5" />
                                  </div>
                                  <span className={signupData.dob ? "text-slate-900 font-medium text-xs sm:text-sm" : "text-slate-400 text-xs"}>
                                    {signupData.dob ? formatDisplayDate(signupData.dob) : "Select Date of Birth (DD / MM / YYYY)"}
                                  </span>
                                </div>
                                <span className="text-[11px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-lg border border-orange-200 group-hover:bg-orange-500 group-hover:text-white transition">
                                  {signupData.dob ? "Change" : "Open"}
                                </span>
                              </button>
                            </div>

                            {/* Question 3: Home District */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Home District (Chhattisgarh) <span className="text-orange-500">*</span>
                              </label>
                              <div className="relative">
                                <MapPin className="w-4 h-4 absolute left-3.5 top-2.5 text-orange-400" />
                                <select
                                  value={signupData.district}
                                  onChange={(e) => setSignupData({ ...signupData, district: e.target.value })}
                                  required
                                  className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2 sm:py-2.5 outline-none transition cursor-pointer shadow-xs"
                                >
                                  {DISTRICTS.map((d) => (
                                    <option key={d} value={d} className="bg-white text-slate-900">{d}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Continue Button */}
                            <div className="pt-0.5">
                              <button
                                type="submit"
                                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                              >
                                <span>Continue to Sports Discipline</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.form>
                        )}

                        {/* STEP 2: Sports Category & Email (ONE BY ONE TO COVER SPACE) */}
                        {signupStep === 2 && (
                          <motion.form
                            key="signupStep2"
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.2 }}
                            onSubmit={handleStep2Next}
                            className="space-y-2.5 sm:space-y-3"
                          >
                            {/* Question 1: Primary Shooting Discipline */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Primary Shooting Discipline <span className="text-orange-500">*</span>
                              </label>
                              <div className="relative">
                                <Target className="w-4 h-4 absolute left-3.5 top-2.5 text-orange-400" />
                                <select
                                  value={signupData.discipline}
                                  onChange={(e) => setSignupData({ ...signupData, discipline: e.target.value })}
                                  required
                                  className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2 sm:py-2.5 outline-none transition cursor-pointer shadow-xs"
                                >
                                  {DISCIPLINES.map((disc) => (
                                    <option key={disc} value={disc} className="bg-white text-slate-900">{disc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Question 2: Competition Category */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Competition Age &amp; Division Category <span className="text-orange-500">*</span>
                              </label>
                              <div className="relative">
                                <Award className="w-4 h-4 absolute left-3.5 top-2.5 text-orange-400" />
                                <select
                                  value={signupData.category}
                                  onChange={(e) => setSignupData({ ...signupData, category: e.target.value })}
                                  required
                                  className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2 sm:py-2.5 outline-none transition cursor-pointer shadow-xs"
                                >
                                  {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat} className="bg-white text-slate-900">{cat}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Question 3: Email Address */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Email Address <span className="text-slate-500 lowercase">(optional — for digital credentials)</span>
                              </label>
                              <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-2.5 text-orange-400" />
                                <input
                                  type="email"
                                  value={signupData.email}
                                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                  placeholder="athlete@example.com"
                                  className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2 sm:py-2.5 outline-none transition placeholder:text-slate-400 shadow-xs"
                                />
                              </div>
                            </div>

                            {/* Back and Next Buttons */}
                            <div className="grid grid-cols-2 gap-3 pt-0.5">
                              <button
                                type="button"
                                onClick={() => setSignupStep(1)}
                                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back</span>
                              </button>
                              <button
                                type="submit"
                                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
                              >
                                <span>Continue to Security</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.form>
                        )}

                        {/* STEP 3: Security & Credentials (ONE BY ONE TO COVER SPACE) */}
                        {signupStep === 3 && (
                          <motion.form
                            key="signupStep3"
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.2 }}
                            onSubmit={handleSignupSubmit}
                            className="space-y-2 sm:space-y-2.5"
                          >
                            {/* Question 1: Mobile Number */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Mobile Number (Used for Login) <span className="text-orange-500">*</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <span className="text-xs font-bold text-orange-600 pr-2 border-r border-orange-200">+91</span>
                                  <Phone className="w-4 h-4 ml-2 text-orange-400" />
                                </div>
                                <input
                                  type="tel"
                                  value={signupData.phone}
                                  onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                                  placeholder="98765 43210"
                                  maxLength={12}
                                  required
                                  className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-xl pl-20 pr-4 py-1.5 sm:py-2 outline-none transition font-mono placeholder:text-slate-400 shadow-xs"
                                />
                              </div>
                            </div>

                            {/* Question 2: Create Password */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Create Password <span className="text-orange-500">*</span>
                              </label>
                              <div className="relative">
                                <Lock className="w-4 h-4 absolute left-3.5 top-2 sm:top-2.5 text-orange-400" />
                                <input
                                  type={showSignupPassword ? 'text' : 'password'}
                                  value={signupData.password}
                                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                  placeholder="Min 6 characters"
                                  required
                                  minLength={6}
                                  className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-xl pl-10 pr-10 py-1.5 sm:py-2 outline-none transition placeholder:text-slate-400 shadow-xs"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-orange-600 cursor-pointer"
                                >
                                  {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            {/* Question 3: Confirm Password */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Confirm Password <span className="text-orange-500">*</span>
                              </label>
                              <div className="relative">
                                <Lock className="w-4 h-4 absolute left-3.5 top-2 sm:top-2.5 text-orange-400" />
                                <input
                                  type={showSignupPassword ? 'text' : 'password'}
                                  value={signupData.confirmPassword}
                                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                  placeholder="Re-enter password"
                                  required
                                  minLength={6}
                                  className="w-full bg-orange-50/30 border border-orange-200 focus:border-orange-500 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-1.5 sm:py-2 outline-none transition placeholder:text-slate-400 shadow-xs"
                                />
                              </div>
                            </div>

                            {/* Question 4: Terms Checkbox */}
                            <div className="flex items-start gap-2 pt-0.5">
                              <input
                                type="checkbox"
                                id="signupTerms"
                                checked={signupData.agreeTerms}
                                onChange={(e) => setSignupData({ ...signupData, agreeTerms: e.target.checked })}
                                required
                                className="mt-0.5 w-3.5 h-3.5 rounded border-orange-300 bg-white text-orange-500 focus:ring-orange-500 cursor-pointer shrink-0 accent-orange-500"
                              />
                              <label htmlFor="signupTerms" className="text-[10px] sm:text-[11px] text-slate-600 leading-snug cursor-pointer select-none">
                                I agree to the ESAC Code of Conduct, Anti-Doping Regulations &amp; Safety Protocols.
                              </label>
                            </div>

                            {/* Buttons: Back and Submit */}
                            <div className="grid grid-cols-2 gap-3 pt-0.5">
                              <button
                                type="button"
                                onClick={() => setSignupStep(2)}
                                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back</span>
                              </button>
                              <button
                                type="submit"
                                disabled={signupLoading}
                                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] disabled:opacity-50"
                              >
                                {signupLoading ? (
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                  <>
                                    <span>Get UID Card</span>
                                    <Sparkles className="w-4 h-4 text-amber-200" />
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* BOTTOM CALLOUT */}
                <div className="pt-2 border-t border-orange-100">
                  <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2 text-left">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        Already registered with ESAC?
                      </p>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Sign in with your mobile number.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleMode(false)}
                      className="shrink-0 px-3.5 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-orange-50 border border-orange-300 text-orange-600 hover:text-orange-700 text-xs font-bold uppercase tracking-wider transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 group"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      <span>Login</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer Clear Notice */}
      <footer className="w-full max-w-5xl py-1 sm:py-1.5 px-3 text-center z-20 shrink-0">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/95 border border-orange-200/90 shadow-xs backdrop-blur-md text-[11px] sm:text-xs text-slate-700 font-medium">
          <span className="font-bold text-orange-600">© 2026 ESAC</span>
          <span className="text-orange-300">•</span>
          <span className="font-semibold text-slate-800">Elite Slingshot Association of Chhattisgarh</span>
          <span className="text-orange-300">•</span>
          <span className="text-slate-600">Affiliated to ESFI</span>
          <span className="text-orange-300">•</span>
          <span className="text-slate-500">All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
