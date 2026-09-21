import React from 'react';
import HeroSection from '../components/home/HeroSection';
import QuickAccessDock from '../components/home/QuickAccessDock';
import StatisticsStrip from '../components/home/StatisticsStrip';
import CertificateVerify from '../components/home/CertificateVerify';

export default function Home({ onOpenRegistrationModal }) {
  return (
    <main>
      <HeroSection onOpenRegistrationModal={onOpenRegistrationModal} />
      <QuickAccessDock />
      <StatisticsStrip />
      <CertificateVerify />
    </main>
  );
}
