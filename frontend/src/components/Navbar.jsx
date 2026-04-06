import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { personalInfo } from "../data/content";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Format full name
  const fullName = personalInfo.name.toUpperCase();

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX, transformOrigin: "0%" }} />
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-gray-900' : 'bg-transparent py-8 border-transparent'}`}
      >
        <div className="container-narrow flex justify-between items-center">
          <div className="font-sans font-bold tracking-tight text-xl uppercase">
            {fullName}
          </div>
          <div className="flex gap-6 md:gap-8 text-sm md:text-base">
            <a href="#work" className="link-hover">Work</a>
            <a href="#skills" className="link-hover hidden md:inline-block">Skills</a>
            <a href="#about" className="link-hover">About</a>
            <a href="#contact" className="link-hover">Contact</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
