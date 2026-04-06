import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "../context/CursorContext";

const CustomCursor = () => {
  const { cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  // Slow trailing ring
  const ringX = useSpring(-100, { damping: 20, stiffness: 120, mass: 0.8 });
  const ringY = useSpring(-100, { damping: 20, stiffness: 120, mass: 0.8 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [isVisible, cursorX, cursorY, ringX, ringY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const hasText = !!cursorText;

  return (
    <>
      {/* Dot / text cursor */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 pointer-events-none z-[999999] flex items-center justify-center"
      >
        <motion.div
          layout
          className={`flex items-center justify-center overflow-hidden whitespace-nowrap font-mono uppercase font-bold tracking-widest ${
            hasText
              ? "px-3 py-1.5 rounded-sm bg-white text-black text-[10px]"
              : "rounded-full bg-theme-accent"
          }`}
          animate={{
            width: hasText ? "auto" : isClicking ? 6 : 10,
            height: hasText ? "auto" : isClicking ? 6 : 10,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <AnimateTextPresence text={cursorText} />
        </motion.div>
      </motion.div>

      {/* Trailing outer ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 pointer-events-none z-[999998]"
      >
        <motion.div
          className="rounded-full border border-white/20"
          animate={{
            width: hasText ? 0 : isClicking ? 20 : 36,
            height: hasText ? 0 : isClicking ? 20 : 36,
            opacity: isVisible ? (isClicking ? 0.6 : 0.35) : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </motion.div>

      {/* Click burst rings */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            key="burst"
            style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
            className="fixed top-0 left-0 pointer-events-none z-[999997]"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-8 h-8 rounded-full border border-theme-accent/40" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AnimateTextPresence = ({ text }) => {
  if (!text) return null;
  return (
    <motion.span
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      key={text}
    >
      {text}
    </motion.span>
  );
};

export default CustomCursor;
