import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/content";
import { useCursor } from "../context/CursorContext";
import { TextReveal } from "./TextReveal";

const Projects = () => {
  const { hoverEnter, hoverLeave } = useCursor();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Only do horizontal pinning on desktop
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;
      const totalWidth = container.scrollWidth - window.innerWidth;
      gsap.to(container, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="section-theme h-screen relative bg-transparent overflow-hidden flex flex-col justify-center" data-hue="320">
      
      <div className="absolute top-10 left-6 md:left-12 z-20 pointer-events-none">
        <span className="section-counter mb-2 block">03</span>
        <div className="text-massive-outline tracking-tighter text-gray-700 opacity-50 text-5xl md:text-7xl">
          <TextReveal text="FEATURED" delay={0.2} />
        </div>
        <div className="text-massive tracking-tighter mt-[-4%] ml-6 text-white text-5xl md:text-7xl">
          <TextReveal text="WORK" delay={0.4} />
        </div>
      </div>

      <div ref={containerRef} className="flex gap-12 px-6 md:px-[10vw] mt-24 items-center justify-start w-max h-[70vh]">
        {projects.map((project, i) => (
          <div 
            key={project.title} 
            className="w-[85vw] md:w-[700px] h-full glass-card rounded-3xl p-6 lg:p-10 flex flex-col relative overflow-hidden group"
          >
            {/* Project Fake Visual */}
            <div className="w-full h-1/2 md:h-3/5 bg-gray-950 rounded-2xl overflow-hidden relative border border-gray-800 flex items-center justify-center group-hover:border-gray-500 transition-colors">
              <div className="absolute inset-0 bg-theme-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <div 
                className="w-full h-full flex flex-col items-center justify-center font-mono text-2xl group-hover:scale-105 transition-transform duration-700"
                onMouseEnter={() => hoverEnter("VIEW")}
                onMouseLeave={() => hoverLeave()}
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                </div>
                <span className="text-gray-600 tracking-widest text-sm">[ {project.title} ]</span>
              </div>
            </div>

            {/* Project Details */}
            <div className="mt-8 flex flex-col justify-between flex-grow">
              <div>
                <h4 className="text-3xl font-bold mb-3 tracking-tight">{project.title}</h4>
                <p className="text-gray-400 leading-relaxed font-light line-clamp-3">{project.description}</p>
              </div>
              
              <div className="flex justify-between items-end mt-4">
                <div className="flex gap-3 flex-wrap max-w-[70%]">
                  {project.tags.slice(0,3).map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-theme-accent hover:text-black hover:border-theme-accent transition-all group-hover:rotate-45">↗</a>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;
