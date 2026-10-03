import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import QuickAccessDock from '../components/home/QuickAccessDock';
import SportingEcosystem from '../components/home/SportingEcosystem';
import StatisticsStrip from '../components/home/StatisticsStrip';
import AthletePathway from '../components/home/AthletePathway';
import CoachingTechCapacity from '../components/home/CoachingTechCapacity';
import CertificateVerify from '../components/home/CertificateVerify';
import NewsEventsStories from '../components/home/NewsEventsStories';
import AcademicCalendarModal from '../components/layout/AcademicCalendarModal';

export default function Home({ onOpenRegistrationModal }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection onOpenRegistrationModal={onOpenRegistrationModal} />

      {/* Quick Access Dock */}
      <QuickAccessDock
        onOpenCalendarModal={() => setIsCalendarOpen(true)}
        onOpenRegistrationModal={onOpenRegistrationModal}
      />

      {/* 2. Sporting Ecosystem */}
      <SportingEcosystem />

      {/* 3. Key Statistics */}
      <StatisticsStrip />

      {/* 4. Athlete Development Pathway */}
      <AthletePathway />

      {/* 5. Coaching & Technical Capacity */}
      <CoachingTechCapacity />

      {/* 6. News, Events & Athlete Stories */}
      <NewsEventsStories />

      {/* 7. Certificate Verification */}
      <CertificateVerify />

      {/* Calendar Modal */}
      <AcademicCalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </main>
  );
}
