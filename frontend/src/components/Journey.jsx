import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { year: "2023", label: "Started coding", detail: "Began with JavaScript and modern web frameworks. Mastered the fundamentals of the MERN stack." },
  { year: "2023", label: "Specialization", detail: "Focused on frontend animations and immersive design. Explored WebGL and Three.js." },
  { year: "2024", label: "Deep Dive", detail: "Contributing to open source and building high-performance applications. AI integration focus." },
  { year: "PRESENT", label: "Scaling Up", detail: "Targeting top engineering opportunities and building Alumnet." },
];

export default function Journey() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="journey" className="section-theme section-spacing container-narrow border-t border-gray-900" data-hue="180">
      <motion.div style={{ opacity }} className="mb-24 flex flex-col items-center text-center">
        <span className="section-counter mb-4 block">■</span>
        <h2 className="text-statement max-w-2xl">
          The <span className="text-theme-accent italic">journey</span> shapes the engineer.
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent -translate-x-1/2 hidden md:block" />

        <div className="flex flex-col gap-16">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row-reverse" : ""} items-start md:items-center gap-6 md:gap-12`}
            >
              {/* Content */}
              <div className={`flex-1 glass-card p-8 rounded-2xl hover:bg-white/[0.04] transition-colors ${i % 2 === 0 ? "md:text-right" : ""}`}>
                <span className="text-theme-accent font-mono text-sm font-bold tracking-widest mb-2 block">{m.year}</span>
                <h3 className="text-2xl font-bold text-white mb-3">{m.label}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{m.detail}</p>
              </div>

              {/* Timeline dot (hidden on mobile) */}
              <div className="hidden md:flex w-5 h-5 rounded-full bg-theme-accent ring-4 ring-black shrink-0 z-10" />

              {/* Spacer */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
