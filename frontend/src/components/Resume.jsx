import { motion } from "framer-motion";
import { personalInfo } from "../data/content";
import SectionWrapper from "./SectionWrapper";
import { HiDocumentDownload } from "react-icons/hi";

const Resume = () => {
  return (
    <SectionWrapper id="resume">
      <div className="text-center">
        <h2 className="section-heading">
          My <span className="gradient-text">Resume</span>
        </h2>
        <div
          className="w-20 h-1 rounded-full mx-auto mt-4 mb-6"
          style={{ background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))" }}
        />
        <p
          className="text-sm max-w-lg mx-auto mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          Get a detailed overview of my experience and qualifications
        </p>

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
