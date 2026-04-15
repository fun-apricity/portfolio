import { motion } from "framer-motion";
import { personalInfo } from "../data/content";
import SectionWrapper from "./SectionWrapper";
import { HiDocumentDownload } from "react-icons/hi";

const Resume = () => {
  return (
    <SectionWrapper id="resume">
      <div className="text-center py-10">

        <motion.a
          href={personalInfo.resumeUrl}
          download
          className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold
          relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, var(--bg-card), var(--bg-input))",
            border: "1px solid var(--glass-border)",
            color: "var(--text-primary)",
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Shimmer effect */}
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            style={{
              background: "linear-gradient(90deg, transparent, var(--bg-input), transparent)",
            }}
          />

          <HiDocumentDownload
            className="text-xl relative z-10"
            style={{ color: "var(--neon-cyan)" }}
          />
          <span className="relative z-10">Download Resume</span>
        </motion.a>
      </div>
    </SectionWrapper>
  );
};

export default Resume;
