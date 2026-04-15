import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "../data/content";
import { TextReveal } from "./TextReveal";

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Split text animation on the h2
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section id="about" className="section-theme section-spacing container-narrow" data-hue="220">
      
      <div className="flex flex-col items-center mb-24">
        <span className="section-counter mb-4">01</span>
        <div className="bg-lavender text-black mono-label px-2 py-1 mb-12 uppercase">
          p / Statement 01
        </div>
        
        <div className="text-statement text-center max-w-4xl cursor-default">
          <TextReveal 
            text="I engineer for those who require precision without sacrificing performance." 
            delay={0.1}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-12 border-t border-gray-900">
        <div className="col-span-12 md:col-span-4">
          <TextReveal text="BACKGROUND" className="font-sans font-bold text-xl uppercase tracking-tight mb-4" />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-base text-gray-400 leading-relaxed font-light mb-8"
          >
            {personalInfo.about}
          </motion.p>
          <a href={personalInfo.resumeUrl} className="glass inline-flex items-center gap-3 px-8 py-4 rounded-full font-sans font-bold text-[15px] md:text-sm uppercase tracking-widest text-white hover:text-black hover:bg-white hover:border-white transition-all duration-300">
            Download Resume 
            <span className="text-xl">↗</span>
          </a>
        </div>
        
        <div className="col-span-12 md:col-span-7 md:col-start-6">
           <TextReveal text="EXPERIENCE HIGHLIGHTS" className="font-sans font-bold text-xl uppercase tracking-tight mb-6" />
           <motion.div 
             initial={{ opacity: 0 }} 
             whileInView={{ opacity: 1 }} 
             viewport={{ once: true }} 
             transition={{ duration: 1, delay: 0.6 }}
             className="space-y-6"
           >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 pb-6 border-b border-gray-900">
                <span className="mono-label w-24 shrink-0 text-gray-600">2023 - Present</span>
                <div>
                  <h4 className="text-lg font-medium text-gray-200">Full Stack Developer</h4>
                  <p className="text-gray-500 font-light mt-1">Building high-performance, scalable web applications from scratch.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 pb-6 border-b border-gray-900">
                <span className="mono-label w-24 shrink-0 text-gray-600">Continuous</span>
                <div>
                  <h4 className="text-lg font-medium text-gray-200">Algorithmic Problem Solving</h4>
                  <p className="text-gray-500 font-light mt-1">500+ problems solved on LeetCode & GeeksForGeeks.</p>
                </div>
              </div>
           </motion.div>
        </div>
      </div>

    </section>
  );
};

export default About;
