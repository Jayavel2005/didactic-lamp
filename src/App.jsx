import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingNavbar from './components/ui/FloatingNavbar'; // Revert to old Navbar

import AntiGravityHero from './components/hero/AntiGravityHero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import SelectedWorks from './components/hero/SelectedWorks';
import Contact from './components/sections/Contact';
import CustomCursor from './components/ui/CustomCursor';
import Loader from './components/ui/Loader';
import Footer from './components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);

    // Optimizing for 60fps
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return (
    // Updated background and selection colors to match Monotree theme
    <div className="bg-[#0D0F11] min-h-screen text-neutral-900 selection:bg-[#86EFAC] selection:text-black relative">
      <Loader onComplete={() => setIsLoading(false)} />
      <CustomCursor />



      {/* Old Floating Navbar */}
      <FloatingNavbar />

      {/* Main Content with Reveal Effect logic */}
      {/* margin-bottom-[100vh] acts as a window to see the fixed footer behind */}
      <main className="relative z-10 bg-white shadow-2xl rounded-b-[3rem] mb-[100vh]">
        <section id="home">
          {/* New Hero Section */}
          <AntiGravityHero />
        </section>

        <section id="about">
          <About />
        </section>

        {/* Services Section */}
        <section id="services">
          <Services />
        </section>

        <section id="projects" className="w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-32">
          <SelectedWorks />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;

