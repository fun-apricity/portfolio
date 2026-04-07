import { useEffect, useRef } from 'react';
import { globalTheme } from '../utils/theme';

/**
 * Premium Liquid Aurora / Gradient Mesh Background
 * Drops the particle concept entirely for huge, smooth, cinematic glowing orbs that drift and react to the cursor.
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animId;
    let time = 0;
    
    // Track cursor for interaction
    let mouse = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2, 
      targetX: window.innerWidth / 2, 
      targetY: window.innerHeight / 2 
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    resize();

    // Define 4 giant floating light sources
    const orbs = [
      { speedR: 0.005, speedX: 0.002, speedY: 0.0015, phase: 0, size: 0.7 },
      { speedR: -0.006, speedX: 0.0015, speedY: 0.002, phase: 2, size: 0.8 },
      { speedR: 0.004, speedX: -0.001, speedY: -0.0012, phase: 4, size: 0.6 },
      { speedR: -0.003, speedX: -0.0018, speedY: 0.001, phase: 1, size: 0.9 },
    ];

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 1;
      
      // Buttery smooth cursor tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      const width = canvas.width;
      const height = canvas.height;
      const minDim = Math.min(width, height);
      
      // Clear with an elegant, almost-black atmospheric color
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // 'screen' mode creates beautiful color blending where lights overlap
      ctx.globalCompositeOperation = 'screen';

      const hue = globalTheme.hue;

      // Draw floating background orbs
      orbs.forEach((orb, i) => {
        // Organic, continuous wandering using sine waves
        const xPos = width * 0.5 + Math.sin(time * orb.speedX + orb.phase) * width * 0.35;
        const yPos = height * 0.5 + Math.cos(time * orb.speedY + orb.phase) * height * 0.35;
        
        // Mouse reactivity: orbs subtly shift when cursor moves near them
        const dx = mouse.x - xPos;
        const dy = mouse.y - yPos;
        const distSq = dx * dx + dy * dy;
        // Some orbs pull slightly, some push slightly
        const influence = (i % 2 === 0 ? 1 : -0.5) * Math.min(1, 150000 / (distSq + 5000));
        
        const adjustedX = xPos - dx * influence * 0.15;
        const adjustedY = yPos - dy * influence * 0.15;

        // Slowly breathing radius effect
        const radius = minDim * orb.size + Math.sin(time * orb.speedR) * (minDim * 0.15);

        const gradient = ctx.createRadialGradient(adjustedX, adjustedY, 0, adjustedX, adjustedY, radius);
        
        // Shift hues slightly for depth
        const orbHue = (hue + i * 20) % 360;
        
        gradient.addColorStop(0, `hsla(${orbHue}, 80%, 45%, 0.12)`);
        gradient.addColorStop(0.5, `hsla(${orbHue}, 80%, 35%, 0.04)`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(adjustedX, adjustedY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // The dynamic cursor glow spotlight
      ctx.globalCompositeOperation = 'lighter';
      const cursorRadius = minDim * 0.5; // Big soft follow
      const cursorGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, cursorRadius);
      cursorGradient.addColorStop(0, `hsla(${hue}, 90%, 60%, 0.1)`);
      cursorGradient.addColorStop(0.5, `hsla(${hue}, 90%, 50%, 0.03)`);
      cursorGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = cursorGradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, cursorRadius, 0, Math.PI * 2);
      ctx.fill();

      // Reset composition to avoid messing with other layer drawing if added later
      ctx.globalCompositeOperation = 'source-over';
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, background: '#050505' }}
    />
  );
};

export default ParticleBackground;
