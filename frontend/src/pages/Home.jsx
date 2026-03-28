import React from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import DeviceGrid from '../components/DeviceGrid';
import FAQAccordion from '../components/FAQAccordion';
import PlanToggle from '../components/PlanToggle';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-body">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <CategoryGrid />
        <DeviceGrid />
        <FAQAccordion />
        <PlanToggle />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
