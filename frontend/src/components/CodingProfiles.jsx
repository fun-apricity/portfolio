import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { codingProfiles } from "../data/content";
import SectionWrapper from "./SectionWrapper";
import {
  FaLinkedin, FaGithub, FaHackerrank,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

/* ─── Icon Mapping ─────────────────────────── */
const iconMap = {
  FaLinkedin, FaGithub, FaHackerrank, SiLeetcode, SiCodeforces,
};

/**
 * CodingProfiles — Displays clickable coding platform icons
 * with hover glow effects colored by each platform.
 */
const CodingProfiles = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <SectionWrapper id="profiles">
      <div className="text-center mb-14">
        <h2 className="section-heading">
          Coding <span className="gradient-text">Profiles</span>
        </h2>
        <div
          className="w-20 h-1 rounded-full mx-auto mt-4 mb-4"
          style={{ background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))" }}
        />
        <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
          Find me on these platforms
        </p>
      </div>

      <div ref={ref} className="flex flex-wrap justify-center gap-6 md:gap-10">
        {codingProfiles.map((profile, i) => {
          const Icon = iconMap[profile.icon];
          return (
            <motion.a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass-card flex items-center justify-center
                transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 25px ${profile.color}33, 0 8px 20px rgba(0,0,0,0.3)`;
                  e.currentTarget.style.borderColor = `${profile.color}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                {Icon && (
                  <Icon
                    className="text-2xl md:text-3xl group-hover:scale-110 transition-all duration-300"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = profile.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  />
                )}
              </div>
              <span
                className="text-xs font-medium group-hover:text-[var(--text-secondary)] transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {profile.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default CodingProfiles;
