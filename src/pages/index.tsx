// src/pages/index.tsx
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/HeroSection/HeroSection';
import FeatureSection from '@/components/FeatureSection/FeatureSection';

const HomePage = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900 text-white overflow-hidden">
      {/* Grid Pattern animado */}
      <div className="fixed inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{
            transform: `translateY(${scrollPosition * 0.2}px)`
          }}
        />
      </div>

      <Navbar />
      <HeroSection />
      <FeatureSection />
    </div>
  );
};

export default HomePage;