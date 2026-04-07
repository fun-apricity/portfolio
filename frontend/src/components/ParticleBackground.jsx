import { useEffect, useRef } from 'react';
import { globalTheme } from '../utils/theme';

/**
 * Antigravity Physics Orb Background
 * A singular premium glowing sphere that floats freely and violently repels from your cursor.
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animId;
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let lastMouse = { x: -1000, y: -1000 };

    // Define the physics entity: our floating circle ball
    let ball = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: 0,
        vy: 0,
        radius: window.innerWidth < 768 ? 100 : 160, // Elegant large radius
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ball.radius = window.innerWidth < 768 ? 100 : 160;
    };

    const handleMouseMove = (e) => {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - lastMouse.x;
      mouse.vy = mouse.y - lastMouse.y;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.vx = mouse.x - lastMouse.x;
        mouse.vy = mouse.y - lastMouse.y;
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    resize();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      
      // Extremely dark architectural background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- PHYSICS UPDATE ---
      
      // 1. Friction / Drag (simulates air resistance)
      ball.vx *= 0.94;
      ball.vy *= 0.94;

      // 2. Autonomous drifting in zero gravity
      ball.vx += (Math.random() - 0.5) * 0.3;
      ball.vy += (Math.random() - 0.5) * 0.3;

      // 3. Mouse Antigravity Repulsion Effect
      const dx = ball.x - mouse.x;
      const dy = ball.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      
      // The safe zone before the cursor pushes it away
      const repelRadius = window.innerWidth < 768 ? 200 : 350; 
      
      if (distSq < repelRadius * repelRadius) {
          const dist = Math.sqrt(distSq);
          
          // Proportional force: stronger as the cursor gets closer
          const force = (repelRadius - dist) / repelRadius;
          
          // Apply outward antigravity force
          ball.vx += (dx / dist) * force * 1.5;
          ball.vy += (dy / dist) * force * 1.5;
          
          // Add swiping force from fast mouse movement to allow users to "slap" the ball
          ball.vx += mouse.vx * force * 0.04;
          ball.vy += mouse.vy * force * 0.04;
      }

      // 4. Soft Edge Constraint Force (Elastic wall bounce)
      const pad = ball.radius;
      if (ball.x < pad) { ball.vx += 1.5; }
      if (ball.x > canvas.width - pad) { ball.vx -= 1.5; }
      if (ball.y < pad) { ball.vy += 1.5; }
      if (ball.y > canvas.height - pad) { ball.vy -= 1.5; }

      // Update true position
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Decay mouse velocity so it doesn't perpetually apply force
      mouse.vx *= 0.8;
      mouse.vy *= 0.8;

      // --- RENDERING ---
      const hue = globalTheme.hue;

      ctx.save();
      
      // Translate to ball position to apply dynamic transformations
      ctx.translate(ball.x, ball.y);
      
      // Calculate squash and stretch relative to physics speed
      const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
      const angle = Math.atan2(ball.vy, ball.vx);
      
      // Max stretch limit to keep it structurally rigid but fluid
      const stretch = Math.min(1.4, 1 + speed * 0.015);
      const squash = Math.max(0.7, 1 - speed * 0.015);
      
      ctx.rotate(angle);
      ctx.scale(stretch, squash);
      
      // 1. Draw glowing radiant aura
      ctx.globalCompositeOperation = 'screen';
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, ball.radius);
      gradient.addColorStop(0, `hsla(${hue}, 80%, 65%, 0.4)`);
      gradient.addColorStop(0.3, `hsla(${hue}, 80%, 40%, 0.15)`);
      gradient.addColorStop(1, `transparent`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.globalCompositeOperation = 'source-over';

      // 2. Draw defined geometric inner ring for structural framing
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `hsla(${hue}, 60%, 50%, 0.6)`;
      ctx.beginPath();
      ctx.arc(0, 0, ball.radius * 0.6, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw a tiny solid core for weight
      ctx.fillStyle = `hsla(${hue}, 80%, 70%, 0.8)`;
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
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
