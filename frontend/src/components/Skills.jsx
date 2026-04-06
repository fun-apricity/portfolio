import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { skills } from "../data/content";

const TiltCard = ({ category }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-start gap-4 transition-colors hover:bg-white/[0.05] relative cursor-crosshair h-auto min-h-[300px]"
    >
      <h3 style={{ transform: "translateZ(50px)" }} className="mono-label text-theme-accent border-b border-gray-800 pb-3 w-full text-center">
        // {category.category.toUpperCase()}
      </h3>
      
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col w-full mt-4 space-y-4">
        {category.items.map((skill, i) => (
          <div key={skill.name} className="flex justify-between items-center w-full border-b border-gray-900 pb-2">
            <span className="font-medium text-gray-300 uppercase tracking-tight text-sm">
              {skill.name}
            </span>
            <span className="font-mono text-xs text-gray-600">
              {skill.level}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section-theme section-spacing container-narrow perspective-1000" data-hue="180">
      
      <div className="flex flex-col items-center mb-24">
        <span className="section-counter mb-4 block">02</span>
        <div className="bg-lavender text-black mono-label px-2 py-1 mb-12 uppercase">
          p / Capabilities
        </div>
        
        <motion.h2 
          className="text-statement text-center max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          Merging <span className="text-theme-accent italic">logic with creativity</span> — scalable architecture empowered by modern tools.
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-16 pt-12 border-t border-gray-900" style={{ perspective: "1000px" }}>
        {skills.map((category, idx) => (
          <TiltCard key={category.category} category={category} />
        ))}
      </div>

    </section>
  );
};

export default Skills;
