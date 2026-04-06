import { motion } from "framer-motion";

export const TextReveal = ({ text = "", className = "", delay = 0 }) => {
  // Coerce to string safely and split into words
  const words = String(text).split(" ");

  // Stagger variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  // Upward motion for individual words
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
