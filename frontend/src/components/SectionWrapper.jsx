import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SectionWrapper = ({
  children,
  id,
  className = "",
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-20 md:py-28 px-6 ${className}`}
    >
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
