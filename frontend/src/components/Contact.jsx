import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { personalInfo } from "../data/content";

const API_URL = import.meta.env.VITE_API_URL || "https://portfolio-ylsl.onrender.com/api";

// Magnetic button
function MagneticSubmit({ children, disabled }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, backgroundColor: 'var(--theme-accent)' }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 30px var(--theme-accent)" }}
      whileTap={{ scale: 0.95 }}
      className="self-start border border-white/20 text-black font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-shadow duration-300 disabled:opacity-40 cursor-fine-none glass"
    >
      {children}
    </motion.button>
  );
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus(""), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <section id="contact" className="section-theme section-spacing container-narrow border-t border-gray-900 mt-24" data-hue="195">
      
      <div className="grid md:grid-cols-2 gap-20 relative">
        <div className="pointer-events-none">
          <span className="section-counter mb-4 block">04</span>
          <h2 className="text-massive tracking-tighter leading-none mb-12">
            LET'S <br/>
            <span className="text-massive-outline">TALK.</span>
          </h2>
          
          <div className="space-y-6 text-gray-400 font-light pointer-events-auto">
            <p className="text-xl">Open for opportunities and collaborations.</p>
            <a href={`mailto:${personalInfo.email}`} className="link-hover text-lg">{personalInfo.email}</a>
            
            {/* Social links row */}
            <div className="flex gap-6 pt-4">
              <a href={personalInfo.socials?.github || "#"} target="_blank" rel="noopener noreferrer" className="glass px-4 py-2 rounded-full mono-label text-gray-400 hover:text-theme-accent hover:border-theme-accent/30 transition-all">GitHub ↗</a>
              <a href={personalInfo.socials?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="glass px-4 py-2 rounded-full mono-label text-gray-400 hover:text-theme-accent hover:border-theme-accent/30 transition-all">LinkedIn ↗</a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 pt-12 md:pt-0">
          <div className="flex flex-col gap-2">
            <label className="mono-label">Name</label>
            <input
              name="name" value={formData.name} onChange={handleChange} required
              className="bg-transparent border-b border-gray-800 py-3 text-white focus:outline-none focus:border-theme-accent transition-colors rounded-none placeholder-gray-700"
              placeholder="YOUR NAME"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="mono-label">Email</label>
            <input
              type="email" name="email" value={formData.email} onChange={handleChange} required
              className="bg-transparent border-b border-gray-800 py-3 text-white focus:outline-none focus:border-theme-accent transition-colors rounded-none placeholder-gray-700"
              placeholder="YOUR.EMAIL@EXAMPLE.COM"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="mono-label">Project Details</label>
            <textarea
              name="message" value={formData.message} onChange={handleChange} required rows={5}
              className="bg-transparent border-b border-gray-800 py-3 text-white focus:outline-none focus:border-theme-accent transition-colors rounded-none resize-none placeholder-gray-700"
              placeholder="TELL ME ABOUT YOUR PROJECT..."
            />
          </div>
          
          <MagneticSubmit disabled={status === "sending"}>
            {status === "sending" ? "INITIATING..." : status === "sent" ? "TRANSMITTED ✓" : status === "error" ? "ERROR, RETRY" : "SEND MESSAGE"}
          </MagneticSubmit>
        </form>
      </div>

    </section>
  );
};

export default Contact;
