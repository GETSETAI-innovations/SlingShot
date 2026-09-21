import React from 'react';
import TopUtilityBar from './components/layout/TopUtilityBar';
import Header from './components/layout/Header';
import NewsTicker from './components/layout/NewsTicker';
import HeroSection from './components/home/HeroSection';
import QuickAccessDock from './components/home/QuickAccessDock';
import StatisticsStrip from './components/home/StatisticsStrip';
import AboutGovernance from './components/home/AboutGovernance';
import Disciplines from './components/home/Disciplines';
import LiveDashboard from './components/home/LiveDashboard';
import RankingsMedals from './components/home/RankingsMedals';
import TalentHunt from './components/home/TalentHunt';
import DistrictsDirectory from './components/home/DistrictsDirectory';
import CertificateVerify from './components/home/CertificateVerify';
import AthleteRegister from './components/home/AthleteRegister';
import DocumentRepository from './components/home/DocumentRepository';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-esac-saffron selection:text-white">
      <TopUtilityBar />
      <Header />
      <NewsTicker />
      <main>
        <HeroSection />
        <QuickAccessDock />
        <StatisticsStrip />
        <AboutGovernance />
        <Disciplines />
        <LiveDashboard />
        <RankingsMedals />
        <TalentHunt />
        <DistrictsDirectory />
        <CertificateVerify />
        <AthleteRegister />
        <DocumentRepository />
      </main>
      <Footer />
    </div>
  );
}
