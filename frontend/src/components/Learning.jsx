import { motion } from "framer-motion";

const goals = [
  { emoji: "🧠", title: "AI/ML Integration", detail: "Applying LLMs to real-world apps. Learning RAG pipelines and vector databases." },
  { emoji: "🌐", title: "System Design", detail: "Studying distributed systems, scalability patterns, and Kafka-style event streaming." },
  { emoji: "🎮", title: "WebGL & Shaders", detail: "Going deeper into GLSL shaders, WebGPU, and generative art with Three.js." },
  { emoji: "🏗️", title: "Open Source", detail: "Contributing to React Three Fiber and planning my own dev utility library." },
];

export default function Learning() {
  return (
    <section id="learning" className="section-theme section-spacing container-narrow border-t border-gray-900" data-hue="220">
      <div className="mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <span className="section-counter mb-4 block">■</span>
          <h2 className="text-statement max-w-xl">
            Always <span className="text-theme-accent italic">learning.</span>
          </h2>
        </div>
        <p className="text-gray-500 font-light max-w-xs leading-relaxed">
          Growth areas I'm actively exploring right now — building expertise, not just reading about it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card p-8 rounded-2xl cursor-default group transition-all"
          >
            <span className="text-4xl mb-6 block">{g.emoji}</span>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-theme-accent transition-colors">{g.title}</h3>
            <p className="text-gray-400 leading-relaxed font-light">{g.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
