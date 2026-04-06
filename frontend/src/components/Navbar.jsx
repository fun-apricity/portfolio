import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { personalInfo } from "../data/content";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
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

  // Close menu on resize if screen becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Format full name
  const fullName = personalInfo.name.toUpperCase();

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX, transformOrigin: "0%" }} />
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${scrolled || isOpen ? 'bg-black/90 backdrop-blur-md py-4 border-gray-900' : 'bg-transparent py-8 border-transparent'}`}
      >
        <div className="container-narrow flex justify-between items-center relative z-[101]">
          <div className="font-sans font-bold tracking-tighter text-xl uppercase">
            {fullName}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-sm items-center">
            <a href="#work" className="link-hover">Work</a>
            <a href="#skills" className="link-hover">Skills</a>
            <a href="#about" className="link-hover">About</a>
            <a href="#contact" className="link-hover">Contact</a>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-[102]"
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7.5 : 0 }}
              className="w-6 h-0.5 bg-white origin-center"
            />
            <motion.span 
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-4 h-0.5 bg-white self-end"
            />
            <motion.span 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7.5 : 0, width: isOpen ? '1.5rem' : '0.75rem' }}
              className="h-0.5 bg-white origin-center self-end"
            />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pt-20"
            >
              {/* Background gradient hint */}
              <div className="absolute inset-0 bg-radial-gradient from-theme-accent/10 to-transparent pointer-events-none" />
              
              <nav className="flex flex-col items-center gap-10">
                {['Work', 'Skills', 'About', 'Contact'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold tracking-tighter uppercase hover:text-theme-accent transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-12 flex flex-col items-center gap-4 text-gray-500 font-mono text-[10px] tracking-[0.2em] uppercase"
              >
                <span>Available for new projects</span>
                <div className="w-12 h-px bg-gray-800" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
