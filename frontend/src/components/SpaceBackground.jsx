import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const PLANET_COUNT = 7;
const Y_DEPTH = -40; // Camera travels down along Y axis through the sections

/**
 * Photorealistic Planet component.
 * Uses high-res maps from three.js CDN to generate realistic procedural-looking worlds via color tinting.
 */
const RealisticPlanet = ({ id, color, isMoon, scale, speed }) => {
  const meshRef = useRef();

  // Load realistic textures (suspended automatically by R3F Suspense)
  const textures = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg'
  ]);
  const map = isMoon ? textures[1] : textures[0];

  const baseY = (id / (PLANET_COUNT - 1)) * Y_DEPTH;
  const isEven = id % 2 === 0;

  useFrame(() => {
    // 1. Continuous Rotation
    meshRef.current.rotation.y += 0.002 * speed;
    
    // 2. Parallax sliding effect based strictly on scroll
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = scrollTop / maxScroll;
    
    const cameraY = scrollProgress * Y_DEPTH;
    
    // Difference between camera and this planet
    // Positive when approaching, 0 when aligned, Negative when leaving
    const diff = cameraY - baseY;
    
    // Fly across the X-axis mapping the scroll distance
    const xMovement = diff * 1.8; 
    
    // Alternate direction: left-to-right, then right-to-left
    const currentX = isEven ? xMovement : -xMovement;

    // Apply smooth positions and keep the original Y base
    meshRef.current.position.set(currentX, baseY, 0);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[scale, 64, 64]} />
      {/* We color-tint the maps to make unique looking "real" alternative exoplanets */}
      <meshStandardMaterial 
        map={map}
        color={color} 
        roughness={isMoon ? 0.8 : 0.4}
        metalness={0.1}
      />
    </mesh>
  );
};

const FlightController = () => {
  const { camera } = useThree();
  const lightRef = useRef();
  const { theme } = useTheme();

  useFrame(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = scrollTop / maxScroll;
    
    // Camera exclusively traverses vertically down
    const targetY = scrollProgress * Y_DEPTH;
    
    camera.position.y += (targetY - camera.position.y) * 0.1;
    camera.position.x = 0;
    camera.position.z = 8; // Fixed distant viewing to see planets cross the screen
    
    camera.lookAt(0, camera.position.y, 0);

    // Spotlight follows the camera pointing down to illuminate the currently viewed planet brilliantly
    if (lightRef.current) {
        lightRef.current.position.set(0, camera.position.y + 2, 6);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={theme === 'light' ? 5 : 4} color="#ffffff" distance={20} decay={2} />
      {/* Subtle ambient light so the dark side of planets aren't pitch black */}
      <ambientLight intensity={theme === 'light' ? 0.5 : 0.05} />
    </>
  );
};

const SpaceBackground = () => {
  const { theme } = useTheme();

  // Pre-generate the planetary variations
  const planets = useMemo(() => {
    const data = [];
    // Tint realistic textures to create diverse looking planets
    const colors = [
      '#ffffff', // Earth normal
      '#e0e0e0', // Slightly darker earth
      '#f5f5f5', // Bright earth
      '#cccccc', // Desaturated
      '#ffffff', // Standard
      '#ffffff', // Moon
      '#eaeaea'  // Dusty
    ];
    
    for (let i = 0; i < PLANET_COUNT; i++) {
        data.push({
            id: i,
            color: colors[i % colors.length],
            isMoon: i === 5, // Make one of them definitively a moon
            scale: 2 + Math.random() * 1.5, // Large planets for realism
            speed: (Math.random() * 1.5 + 0.5) * (i % 2 === 0 ? 1 : -1),
        });
    }
    return data;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none transition-colors duration-1000" style={{ zIndex: 0, background: theme === 'light' ? '#e2e8f0' : '#020202' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <FlightController />
        
        {/* React Suspense handles texture map loading transparently */}
        <Suspense fallback={null}>
          {planets.map((planet) => (
            <RealisticPlanet key={planet.id} {...planet} />
          ))}
        </Suspense>

        <Stars 
          radius={50} 
          depth={50} 
          count={theme === 'light' ? 800 : 3500} 
          factor={theme === 'light' ? 2 : 4} 
          saturation={0} 
          fade 
          speed={0.5} 
        />
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
