import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { SpotLight as SpotLightDrei, Points, OrbitControls } from '@react-three/drei';

export default function House() {
  const houseRef = useRef<Mesh>(null);
  const particlesRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (houseRef.current) {
      houseRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={true} />
      <group ref={houseRef}>
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Colored spotlights */}
        {[
          { pos: [-1.8, 2.5, 1.8], color: '#ff0000', target: [-1, 0, 1] },  // Front Left Red
          { pos: [1.8, 2.5, 1.8], color: '#00ff00', target: [1, 0, 1] },    // Front Right Green
          { pos: [-1.8, 2.5, -1.8], color: '#00ff00', target: [-1, 0, -1] }, // Back Left Green
          { pos: [1.8, 2.5, -1.8], color: '#ff0000', target: [1, 0, -1] }   // Back Right Red
        ].map((light, i) => (
          <SpotLightDrei
            key={`light-${i}`}
            position={light.pos}
            color={light.color}
            intensity={2}
            distance={5}
            angle={0.5}
            penumbra={0.5}
            target-position={light.target}
          />
        ))}

        {/* Decorative corner lights */}
        {[
          [-1.8, 1, 1.8, '#ff0000'], 
          [1.8, 1, 1.8, '#00ff00'],
          [-1.8, 1, -1.8, '#00ff00'],
          [1.8, 1, -1.8, '#ff0000']
        ].map(([x, y, z, color], i) => (
          <mesh key={`corner-${i}`} position={[x, y, z]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={3} 
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* Floating particles */}
        <Points ref={particlesRef} positions={Array(100).fill(0).map(() => [
          Math.random() * 4 - 2,
          Math.random() * 3,
          Math.random() * 4 - 2
        ]).flat()}>
          <pointsMaterial 
            size={0.05} 
            color="#ff00ff" 
            transparent 
            opacity={0.8} 
            sizeAttenuation 
          />
        </Points>

        {/* Fog */}
        <fog attach="fog" args={['#202030', 5, 10]} />

        {/* Floor */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 4]} />
          <meshStandardMaterial color="#a8a8a8" />
        </mesh>

        {/* Exterior Walls */}
        <mesh position={[0, 1, 2]}>
          <boxGeometry args={[4, 2, 0.1]} />
          <meshStandardMaterial color="#8fb3ef" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, 1, -2]}>
          <boxGeometry args={[4, 2, 0.1]} />
          <meshStandardMaterial color="#8fb3ef" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-2, 1, 0]}>
          <boxGeometry args={[0.1, 2, 4]} />
          <meshStandardMaterial color="#8fb3ef" transparent opacity={0.3} />
        </mesh>
        <mesh position={[2, 1, 0]}>
          <boxGeometry args={[0.1, 2, 4]} />
          <meshStandardMaterial color="#8fb3ef" transparent opacity={0.3} />
        </mesh>

        {/* Interior Walls */}
        <mesh position={[0, 1, 0.5]}>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#8fb3ef" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-1, 1, -0.5]}>
          <boxGeometry args={[0.1, 2, 2.5]} />
          <meshStandardMaterial color="#8fb3ef" transparent opacity={0.3} />
        </mesh>

        {/* Furniture */}
        <mesh position={[1, 0.15, 1]}>
          <boxGeometry args={[1.5, 0.3, 0.7]} />
          <meshStandardMaterial color="#4a90e2" wireframe />
        </mesh>
        <mesh position={[-1, 0.3, 1]}>
          <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
          <meshStandardMaterial color="#4a90e2" wireframe />
        </mesh>
        <mesh position={[-1.5, 0.2, -1.5]}>
          <boxGeometry args={[0.8, 0.4, 1.6]} />
          <meshStandardMaterial color="#4a90e2" wireframe />
        </mesh>
      </group>
    </>
  );
}