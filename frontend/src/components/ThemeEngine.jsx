import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { globalTheme } from '../utils/theme';

gsap.registerPlugin(ScrollTrigger);

const ThemeEngine = ({ children }) => {
  useEffect(() => {
    // Select all sections that define a hue overlay
    const sections = document.querySelectorAll('.section-theme');

    // CRITICAL: Set initial hue before animations run so CSS isn't broken on load
    document.documentElement.style.setProperty('--global-hue', Math.round(globalTheme.hue));

    const animateHue = (targetHue) => {
      gsap.to(globalTheme, {
        hue: parseInt(targetHue, 10),
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          document.documentElement.style.setProperty('--global-hue', Math.round(globalTheme.hue));
        }
      });
    };

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const hue = section.getAttribute('data-hue');
        if (!hue) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => animateHue(hue),
          onEnterBack: () => animateHue(hue),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return <>{children}</>;
};

export default ThemeEngine;
