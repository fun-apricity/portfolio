import { motion, useMotionValue, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useState, Suspense, lazy, useRef, useEffect } from "react";
import { useScroll } from "framer-motion";
import { personalInfo } from "../data/content";
import { useCursor } from "../context/CursorContext";
import { TextReveal } from "./TextReveal";

const HeroScene = lazy(() => import('./HeroScene'));

// Magnetic button component
function MagneticButton({ children, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.4);
    y.set((e.clientY - cy) * 0.4);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, backgroundColor: 'var(--theme-accent)' }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 30px var(--theme-accent)" }}
      whileTap={{ scale: 0.95 }}
      className="border border-white/20 text-black font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full inline-flex items-center gap-3 cursor-fine-none transition-shadow duration-300 glass"
    >
      <span className="text-lg">✦</span> {children}
    </motion.a>
  );
}

const Hero = () => {
  const { hoverEnter, hoverLeave } = useCursor();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const heroParallaxX = useMotionValue(0);
  const heroParallaxY = useMotionValue(0);
  const heroParallaxSpringX = useSpring(heroParallaxX, { stiffness: 80, damping: 25, mass: 0.8 });
  const heroParallaxSpringY = useSpring(heroParallaxY, { stiffness: 80, damping: 25, mass: 0.8 });
  const [isDragging, setIsDragging] = useState(false);
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dragBound = windowWidth < 768 ? windowWidth * 0.2 : 200;

  // Scroll Parallax math
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 600]); // Moves down slowly as user scrolls down

  // Use motion values here so pointer movement does not re-render the full hero.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const handler = (e) => {
      heroParallaxX.set((e.clientX / window.innerWidth - 0.5) * 12);
      heroParallaxY.set((e.clientY / window.innerHeight - 0.5) * 8);
    };

    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, [heroParallaxX, heroParallaxY]);

  useMotionValueEvent(x, "change", (latest) => setCoordX(Math.round(latest)));
  useMotionValueEvent(y, "change", (latest) => setCoordY(Math.round(latest)));

  const lineX2 = useTransform(x, v => `calc(50% + ${v}px)`);
  const lineY2 = useTransform(y, v => `calc(50% + ${v}px)`);
  const textX = useTransform(x, v => `calc(50% + ${v/2}px)`);
  const textY = useTransform(y, v => `calc(50% + ${v/2 - 10}px)`);

  const names = personalInfo.name.split(' ');
  const firstName = names[0] || 'A';
  const lastName = names.slice(1).join(' ') || '.';

  const warnings = ["PUT ME BACK", "DON'T MOVE ME", "LAST WARNING", "CAREFUL NOW...", "HEY! DROP IT!"];

  const handleDragStart = () => { setIsDragging(true); hoverEnter(warnings[Math.floor(Math.random() * warnings.length)]); };
  const handleDragEnd = () => { setIsDragging(false); hoverEnter("DRAG TO MOVE"); };

  return (
    <section id="hero" className="section-theme relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent" data-hue="270">
      
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Top meta */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-full text-center flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500 font-mono pointer-events-none" style={{ zIndex: 10 }}>
        <span>Navigating the unknown, pixel by pixel.</span>
      </div>

      {/* Subtle parallax hint layer — not touching stacking context */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, x: heroParallaxSpringX, y: heroParallaxSpringY }}
      />

      {/* Parallax Container */}
      <motion.div className="container-narrow flex flex-col items-center relative w-full mt-10" style={{ zIndex: 10, y: parallaxY }}>
        <div className="relative">
          {isDragging && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-[-2]">
              <motion.line x1="50%" y1="50%" x2={lineX2} y2={lineY2} stroke="var(--theme-accent)" strokeWidth="2" strokeDasharray="4 4" />
              <motion.text x={textX} y={textY} fill="#a3a3a3" fontSize="10" fontFamily="monospace" textAnchor="middle">
                X: {coordX} Y: {coordY}
              </motion.text>
            </svg>
          )}

          {/* Draggable name */}
          <motion.div
            className="text-center w-full flex flex-col items-center leading-none cursor-grab active:cursor-grabbing relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ x, y }}
            drag
            dragConstraints={{ left: -dragBound, right: dragBound, top: -dragBound, bottom: dragBound }}
            dragElastic={0.4}
            dragSnapToOrigin={true}
            whileDrag={{ scale: 1.05, zIndex: 50 }}
            onMouseEnter={() => !isDragging && hoverEnter("DRAG TO MOVE")}
            onMouseLeave={() => !isDragging && hoverLeave()}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-center w-full relative pointer-events-none">
              <h1
                className="tracking-tighter selection:bg-transparent"
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(3rem, 12vw, 14rem)',
                  lineHeight: 1,
                  fontWeight: 900,
                  fontFamily: 'inherit',
                }}
              >
                <TextReveal text={firstName} delay={0.2} />
              </h1>
            </div>
            <div className="flex justify-center w-full mt-[-2%] pointer-events-none relative" style={{ zIndex: -1 }}>
              <h1
                className="text-massive-outline tracking-tighter selection:bg-transparent"
                style={{ fontSize: 'clamp(3rem, 12vw, 14rem)', lineHeight: 1 }}
              >
                <TextReveal text={lastName} delay={0.4} />
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Sub tagline */}
        <motion.div
          className="mt-8 md:mt-16 text-center max-w-2xl pointer-events-none px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            {personalInfo.role}.<br/>Solving complex problems with code.
          </p>
        </motion.div>
      </motion.div>

      {/* CTA buttons — bottom-left on desktop, centered at bottom on mobile */}
      <motion.div
        className="absolute bottom-12 left-4 md:left-16 flex flex-col gap-3 items-start"
        style={{ zIndex: 20 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        onMouseEnter={() => hoverEnter("CLICK")}
        onMouseLeave={() => hoverLeave()}
      >
        <MagneticButton href="#work">View Work</MagneticButton>
        <a
          href="#contact"
          className="mono-label text-gray-500 hover:text-theme-accent transition-colors cursor-fine-none"
          onMouseEnter={() => hoverEnter("CONTACT")}
          onMouseLeave={() => hoverLeave()}
        >
          Get In Touch ↗
        </a>
      </motion.div>

      {/* Animated scroll indicator - hidden on mobile, placed to prevent overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none"
      >
        <span className="mono-label text-gray-600">scroll</span>
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-12 bg-theme-accent origin-top"
        />
      </motion.div>

      {/* Floating About CTA — desktop only */}
      <motion.div
        className="absolute bottom-12 right-12 z-20 hidden md:block"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
      >
        <a
          href="#about"
          className="glass flex items-center gap-3 px-5 py-3 rounded-full text-xs mono-label text-gray-400 hover:text-white transition-colors"
          onMouseEnter={() => hoverEnter("ABOUT ME")}
          onMouseLeave={() => hoverLeave()}
        >
          About ↓
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
