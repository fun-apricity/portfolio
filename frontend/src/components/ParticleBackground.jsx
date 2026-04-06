import { useEffect, useRef } from 'react';
import { globalTheme } from '../utils/theme';

/**
 * Interactive Still Particle System
 * ————————————————————————————————
 * A field of particles that stays perfectly static until disturbed by mouse or touch.
 * - Each particle has a "home" position it returns to.
 * - Repels from the cursor or touch point.
 * - Highly performant 2D canvas implementation.
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    let animId;

    const createParticles = () => {
      particles = [];
      const density = window.innerWidth < 768 ? 80 : 120; // Fewer particles on mobile for performance
      const spacingX = window.innerWidth / (density * (window.innerWidth / window.innerHeight));
      const spacingY = window.innerHeight / density;

      for (let y = 0; y < window.innerHeight; y += spacingY) {
        for (let x = 0; x < window.innerWidth; x += spacingX) {
          // Add some randomness to the initial grid to make it look "organic"
          const baseX = x + (Math.random() - 0.5) * 10;
          const baseY = y + (Math.random() - 0.5) * 10;
          
          particles.push({
            x: baseX,
            y: baseY,
            baseX: baseX,
            baseY: baseY,
            size: Math.random() * 1.5 + 0.5,
            density: (Math.random() * 30) + 1, // Determines weight/speed of return
            vx: 0,
            vy: 0
          });
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    resize();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const globalHue = globalTheme.hue;
      ctx.fillStyle = `hsla(${globalHue}, 80%, 70%, 0.4)`;

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // Interaction logic
        if (mouse.x !== null) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * p.density;
            let directionY = forceDirectionY * force * p.density;

            p.vx -= directionX; // Repulsion
            p.vy -= directionY;
          }
        }

        // Return force towards base position
        let dxBase = p.baseX - p.x;
        let dyBase = p.baseY - p.y;
        p.vx += dxBase * 0.05;
        p.vy += dyBase * 0.05;

        // Apply friction
        p.vx *= 0.9;
        p.vy *= 0.9;

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add extreme subtle glow for larger particles
        if (p.size > 1.2) {
            ctx.shadowColor = `hsla(${globalHue}, 80%, 70%, 0.2)`;
            ctx.shadowBlur = 4;
        } else {
            ctx.shadowBlur = 0;
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, background: 'black' }}
    />
  );
};

export default ParticleBackground;
