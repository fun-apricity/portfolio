import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Constants for the journey
const PLANET_COUNT = 8;
const Z_DEPTH = -180; // Total deep space travel distance

/**
 * Super smooth, highly optimized geometric Planet.
 * Uses math and native Three JS materials to look stunning without heavy textures.
 */
const Planet = ({ position, color, hasRing, scale, speed }) => {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    // Constant 360-degree rotation
    meshRef.current.rotation.y += delta * speed;
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * speed * 0.4;
      ringRef.current.rotation.x += delta * speed * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        {/* Icosahedron with detail 16 creates a perfect, highly optimized sphere */}
        <icosahedronGeometry args={[scale, 16]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.15} 
          metalness={0.8} 
        />
      </mesh>
      
      {/* Optional elegant sci-fi ring */}
      {hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[scale * 1.6, 0.015, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      )}
      
      {/* Subtle atmospheric glow effect (additive blending) */}
      <mesh scale={1.05}>
         <sphereGeometry args={[scale, 32, 32]} />
         <meshBasicMaterial 
           color={color} 
           transparent 
           opacity={0.06} 
           blending={THREE.AdditiveBlending} 
           depthWrite={false} 
         />
      </mesh>
    </group>
  );
};

/**
 * FlightController links the native window scroll to the WebGL Camera.
 * It smoothly flies the camera through space and brings a light source with it.
 */
const FlightController = () => {
  const { camera } = useThree();
  const lightRef = useRef();

  useFrame(() => {
    // Capture user's native scroll progress across the document
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    
    // Linear target Z calculation based on scroll
    const targetZ = scrollProgress * Z_DEPTH;

    // Smooth inertia camera interpolation (butter-smooth effect)
    camera.position.z += (targetZ - camera.position.z) * 0.08;

    // Adds a very subtle side-to-side drift so the flight isn't totally perfectly straight
    const driftX = Math.sin(scrollProgress * Math.PI * 4) * 2;
    const driftY = Math.cos(scrollProgress * Math.PI * 6) * 0.5;
    
    camera.position.x += ((driftX) - camera.position.x) * 0.05;
    camera.position.y += ((driftY) - camera.position.y) * 0.05;

    // Keep camera staring forward into the dark beyond
    camera.lookAt(0, 0, camera.position.z - 50);

    // Dynamic light travels exactly with the camera to illuminate planets as you approach
    if (lightRef.current) {
        lightRef.current.position.set(camera.position.x, camera.position.y + 1, camera.position.z + 2);
    }
  });

  return <pointLight ref={lightRef} intensity={3} color="#ffffff" distance={40} decay={2} />;
};

const SpaceBackground = () => {
  // Pre-generate the 3D data cleanly once so we don't recalculate on re-renders
  const planets = useMemo(() => {
    const data = [];
    // A premium set of vivid theme colors
    const colors = ['#ffffff', '#00e5ff', '#ff22aa', '#aaff00', '#aaaaaa', '#ffaa00', '#5555ff', '#ff3333'];
    
    for (let i = 0; i < PLANET_COUNT; i++) {
        // Space planets beautifully across the Z-axis
        const zPos = (i / (PLANET_COUNT - 1)) * Z_DEPTH - 10; 
        
        // Alternate planets strictly on the Left / Right so the camera safely flies *between* them
        const xSide = i % 2 === 0 ? 1 : -1;
        const xPos = xSide * (3 + Math.random() * 2);
        
        // Slight height variance
        const yPos = (Math.random() - 0.5) * 4;
        
        data.push({
            id: i,
            position: [xPos, yPos, zPos],
            color: colors[i % colors.length],
            hasRing: Math.random() > 0.4, // 60% chance to have rings
            scale: 1 + Math.random() * 1.5,
            speed: (Math.random() * 0.6 + 0.2) * (i % 2 === 0 ? 1 : -1),
        });
    }
    return data;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, background: '#020202' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        // Optimization: Reduce pixel ratio on high-DPI screens (especially phones) to guarantee extreme smoothness 
        dpr={[1, 1.5]} 
        // Optimization: Disable expensive WebGL antialiasing, favor raw performance
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.15} />
        
        {/* Soft global directional moonlight */}
        <directionalLight position={[10, 10, 10]} intensity={0.5} color="#abcdef" />
        
        {planets.map((planet) => (
          <Planet key={planet.id} {...planet} />
        ))}

        {/* Lightweight procedural stars mesh */}
        <Stars 
          radius={50} 
          depth={50} 
          count={3500} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5} 
        />
        
        <FlightController />
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
