import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import TopUtilityBar from './components/layout/TopUtilityBar';
import Header from './components/layout/Header';
import NewsTicker from './components/layout/NewsTicker';
import Footer from './components/layout/Footer';
import VideoLoader from './components/layout/VideoLoader';
import Home from './pages/Home';
import About from './pages/About';
import SportsAndRules from './pages/SportsAndRules';
import AthletesAndRankings from './pages/AthletesAndRankings';
import Districts from './pages/Districts';
import TalentHuntDocuments from './pages/TalentHuntDocuments';
import Competitions from './pages/Competitions';
import AthleteAnalytics from './pages/AthleteAnalytics';
import Safety from './pages/Safety';
import Partnerships from './pages/Partnerships';
import Auth from './pages/Auth';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function RouteLanguageSync() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (language === 'HI') {
      const timer = setTimeout(() => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = 'hi';
          select.dispatchEvent(new Event('change'));
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, language]);

  return null;
}

function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = ['/auth', '/login', '/signup'].includes(location.pathname);

  const [isLoading, setIsLoading] = useState(() => {
    try {
      const hasLoaded = sessionStorage.getItem('esac_intro_loaded');
      return !hasLoaded;
    } catch {
      return false;
    }
  });

  const handleFinishLoading = () => {
    try {
      sessionStorage.setItem('esac_intro_loaded', 'true');
    } catch {
      // ignore
    }
    setIsLoading(false);
  };

  const handleOpenAuth = (mode = 'signup') => {
    navigate(`/auth?mode=${mode}`);
  };

  if (isAuthPage) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-orange-50/60 via-white to-amber-50/40 text-slate-800 font-sans antialiased overflow-hidden selection:bg-orange-500 selection:text-white">
        <RouteLanguageSync />
        <ScrollToTop />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Navigate to="/auth?mode=login" replace />} />
          <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />
        </Routes>
        <Toaster
          position="top-right"
          duration={3500}
          closeButton
          richColors
          toastOptions={{
            className: 'rounded-xl border border-orange-500',
            style: {
              background: '#ffffff',
              color: '#1e293b',
              fontSize: '0.875rem',
              fontWeight: '500'
            }
          }}
        />
      </div>
    );
  }

  return (
    <>
      {isLoading && <VideoLoader onFinish={handleFinishLoading} />}
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
        <RouteLanguageSync />
        <ScrollToTop />
        <TopUtilityBar />
        <Header onOpenRegistrationModal={() => handleOpenAuth('signup')} />
        <NewsTicker />
        <Routes>
          <Route path="/" element={<Home onOpenRegistrationModal={() => handleOpenAuth('signup')} />} />
          <Route path="/about" element={<About />} />
          <Route path="/sports-and-rules" element={<SportsAndRules />} />
          <Route path="/athletes-and-rankings" element={<AthletesAndRankings />} />
          <Route path="/districts" element={<Districts />} />
          <Route path="/talent-hunt-documents" element={<TalentHuntDocuments />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/athlete-analytics" element={<AthleteAnalytics />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/partnerships" element={<Partnerships />} />
          {/* Redirect old routes to new combined page */}
          <Route path="/talent-hunt" element={<Navigate to="/talent-hunt-documents" replace />} />
          <Route path="/documents" element={<Navigate to="/talent-hunt-documents" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Navigate to="/auth?mode=login" replace />} />
          <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />
        </Routes>
        <Footer />
      </div>
      <Toaster
        position="top-right"
        duration={3500}
        closeButton
        richColors
        toastOptions={{
          className: 'rounded-xl border border-orange-500',
          style: {
            background: '#ffffff',
            color: '#1e293b',
            fontSize: '0.875rem',
            fontWeight: '500'
          }
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
