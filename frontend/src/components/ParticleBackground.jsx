import { useEffect, useRef } from 'react';
import { globalTheme } from '../utils/theme';

/**
 * Topographic Elevation Flow
 * ———————————————————————————————
 * A high-performance 3D wireframe mesh that renders abstract flowing contours.
 * - Simulates Z-elevation using combined sine waves for organic "noise".
 * - Scrolling physically pushes the terrain past the camera.
 * - Reacts to globalTheme.hue from GSAP.
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let time = 0;
    
    // Smooth scrolling velocity integration
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let cameraZOffset = 0; // The virtual journey across the terrain

    // Grid configuration
    const cols = 50; 
    const rows = 120; // Long terrain flowing towards us
    const spacing = 60; // Distance between grid points
    
    const focalLength = 350;

    // Mouse tilt
    let targetYaw = 0, currentYaw = 0;
    let targetPitch = 0, currentPitch = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const onScroll = () => { targetScrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMove = (e) => {
      targetYaw = (e.clientX / window.innerWidth - 0.5) * 0.3; // Slight subtle pan
      targetPitch = (e.clientY / window.innerHeight - 0.5) * 0.2; // Slight subtle tilt
    };
    window.addEventListener('mousemove', onMove);

    // Fast pseudo-noise generator
    const getZ = (x, y, t) => {
      let z = 0;
      z += Math.sin(x * 0.005 + t) * 80;
      z += Math.cos(y * 0.008 - t * 0.8) * 60;
      z += Math.sin((x + y) * 0.01 + t * 0.5) * 40;
      return z;
    };

    const draw = () => {
      animId = requestAnimationFrame(draw);
      time += 0.008;

      // Smooth camera interpolation
      const dy = targetScrollY - currentScrollY;
      currentScrollY += dy * 0.1;
      
      // Moving physically changes our forward position over the landscape
      cameraZOffset += dy * 1.2;
      cameraZOffset += 1.5; // Auto cruise forward

      currentYaw += (targetYaw - currentYaw) * 0.05;
      currentPitch += (targetPitch - currentPitch) * 0.05;

      // Extract GSAP's global theme hue
      const globalHue = globalTheme.hue;

      // Clear Canvas with ultra-faint trail for a smooth anti-aliased look
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 100; // Shifted down so we look over the horizon

      // Precalculate Euler Angles
      const cosY = Math.cos(currentYaw);
      const sinY = Math.sin(currentYaw);
      const cosP = Math.cos(currentPitch - 0.3); // Base pitch looking slightly down
      const sinP = Math.sin(currentPitch - 0.3);

      ctx.lineWidth = 1.5;
      ctx.globalCompositeOperation = 'lighter';

      // We draw horizontally line-by-line starting from back to front
      for (let y = rows; y >= 0; y--) {
        ctx.beginPath();
        let started = false;

        for (let x = 0; x < cols; x++) {
          // Calculate logical world coordinates
          const worldX = (x - cols / 2) * spacing;
          const worldY = y * spacing - cameraZOffset;
          
          // Get organic elevation
          const worldZ = getZ(worldX, worldY, time);

          // Apply 3D camera Rotations (Yaw then Pitch)
          // To make it look like a floor moving away, we map worldY to the Z depth axis
          let relX = worldX;
          let relZ = y * spacing; // Actual physical depth relative to camera
          let relY = worldZ + 150; // Drop it heavily below us

          // Rotate around Y axis (Yaw)
          let rx = relX * cosY - relZ * sinY;
          let rz = relZ * cosY + relX * sinY;
          // Rotate around X axis (Pitch)
          let ry = relY * cosP - rz * sinP;
          let rz2 = rz * cosP + relY * sinP;

          // Clip behind camera
          if (rz2 < 10) {
            started = false;
            continue;
          }

          // Projection
          const scale = focalLength / rz2;
          const px = cx + rx * scale;
          const py = cy + ry * scale;

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }

        // Draw the row line
        const depthAlpha = Math.min(1, Math.max(0, 1 - (y / rows)));
        if (depthAlpha > 0) {
          ctx.strokeStyle = `hsla(${globalHue}, 100%, 65%, ${depthAlpha * 0.4})`;
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
