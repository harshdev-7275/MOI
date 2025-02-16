import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import House from './House';

function CameraAnimation() {
  const { camera } = useThree();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta * 0.2;

    const radius = 3;
    const height = 1.5 + Math.sin(time.current * 0.5) * 0.5;

    const x = Math.sin(time.current) * radius;
    const z = Math.cos(time.current) * radius;

    camera.position.set(x, height, z);
    camera.lookAt(0, height * 0.5, 0);
  });

  return null; // No need to render anything, just updating the camera
}

export default function Scene() {
  return (
    <Canvas style={{ width: "100vw", height:"44vh",paddingTop:"10px"}}>
      <CameraAnimation />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <House />
      
      <Environment preset="dawn" />
      <gridHelper args={[20, 20, '#666666', '#222222']} />
    </Canvas>
  );
}
