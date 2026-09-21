import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import TopUtilityBar from './components/layout/TopUtilityBar';
import Header from './components/layout/Header';
import NewsTicker from './components/layout/NewsTicker';
import Footer from './components/layout/Footer';
import AthleteRegistrationModal from './components/layout/AthleteRegistrationModal';
import VideoLoader from './components/layout/VideoLoader';
import Home from './pages/Home';
import About from './pages/About';
import SportsAndRules from './pages/SportsAndRules';
import AthletesAndRankings from './pages/AthletesAndRankings';
import Districts from './pages/Districts';
import TalentHunt from './pages/TalentHunt';
import Documents from './pages/Documents';
import LiveScores from './pages/LiveScores';
import Competitions from './pages/Competitions';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <VideoLoader onFinish={() => setIsLoading(false)} />}
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
        <RouteLanguageSync />
        <TopUtilityBar />
        <Header onOpenRegistrationModal={() => setIsModalOpen(true)} />
        <NewsTicker />
        <Routes>
          <Route path="/" element={<Home onOpenRegistrationModal={() => setIsModalOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/sports-and-rules" element={<SportsAndRules />} />
          <Route path="/athletes-and-rankings" element={<AthletesAndRankings />} />
          <Route path="/districts" element={<Districts />} />
          <Route path="/talent-hunt" element={<TalentHunt />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/live-scores" element={<LiveScores />} />
          <Route path="/competitions" element={<Competitions />} />
        </Routes>
        <Footer />
        <AthleteRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </LanguageProvider>
  );
}
