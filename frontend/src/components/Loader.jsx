import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { personalInfo } from "../data/content";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return Math.min(prev + Math.random() * 15 + 5, 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Extract first name and last name
  const names = personalInfo.name.split(' ');
  const firstName = names[0] || 'A';
  const lastName = names[1] || '.';

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute top-8 right-10 mono-label">
        INITIATING SEQUENCE... {Math.round(progress)}%
      </div>

      <div className="flex flex-col items-center">
        <motion.div 
          className="flex font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[10vw] font-black leading-none uppercase tracking-tighter mix-blend-difference">
            {firstName}
          </span>
          <span className="text-[10vw] font-black leading-none uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #737373' }}>
            {lastName}
          </span>
        </motion.div>
        
        <div className="w-full max-w-[400px] h-1 bg-gray-900 mt-8 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-theme-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
