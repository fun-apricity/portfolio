import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

/* ─── Context & Utils ───────────────────────── */
import { CursorProvider } from "./context/CursorContext";
import CustomCursor from "./components/CustomCursor";
import SpaceBackground from "./components/SpaceBackground";

/* ─── Components ─────────────────────────────── */
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Learning from "./components/Learning";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThemeEngine from "./components/ThemeEngine";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Initialize Lenis smooth scrolling after loading screen
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
  }, [loading]);

  return (
    <CursorProvider>
      <div className="relative bg-black min-h-screen cursor-fine-none">
        <CustomCursor />
        
        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
          style={{ scaleX, backgroundColor: 'var(--theme-accent)' }}
        />

        {/* Main animated background */}
        <SpaceBackground />

        {/* Loading screen */}
        <AnimatePresence mode="wait">
          {loading && (
            <Loader key="loader" onComplete={() => setLoading(false)} />
          )}
        </AnimatePresence>

        {/* Main content after loading */}
        {!loading && (
          <div className="relative z-10">
            <Navbar />
            <main>
              <ThemeEngine>
                <Hero />
                <About />
                <Skills />
                <Journey />
                <Learning />
                <Projects />
                <Contact />
              </ThemeEngine>
            </main>
            <Footer />
          </div>
        )}
      </div>
    </CursorProvider>
  );
}

export default App;
