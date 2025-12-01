'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BurstLinesInner = ({
  scrollProgress,
  opacity,
  lineColor,
}: {
  scrollProgress: number;
  opacity: number;
  lineColor: string;
}) => {
  const mesh = useRef<THREE.LineSegments>(null);

  // Generate geometry (Radial Lines)
  const { geometry } = useMemo(() => {
    const numLines = 80;
    const pointsPerLine = 50;
    const radius = 40; // Large radius to cover screen

    const positions = [];
    const indices = [];

    let indexCounter = 0;

    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2;
      const dirX = Math.cos(angle);
      const dirZ = Math.sin(angle); // Radial in XZ plane

      for (let j = 0; j < pointsPerLine; j++) {
        const r = (j / (pointsPerLine - 1)) * radius;
        const x = dirX * r;
        const z = dirZ * r;

        positions.push(x, 0, z);

        if (j < pointsPerLine - 1) {
          indices.push(indexCounter + j, indexCounter + j + 1);
        }
      }
      indexCounter += pointsPerLine;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.setIndex(indices);

    return { geometry: geo };
  }, []);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(lineColor) },
        uOpacity: { value: 0.0 },
        uScrollProgress: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScrollProgress;
        
        void main() {
          vec3 pos = position;
          
          // Warp Speed Effect
          // Move points along their radial direction (outwards)
          float speed = 2.0;
          float flow = mod(uTime * speed, 10.0);
          
          // Tunnel effect
          // We want to pull the center into the screen.
          // Since the camera is looking down at an angle (0, 8, 6) -> (0, 0, 0),
          // we need to displace points along this view axis to keep them centered.
          // View dir is roughly (0, -0.8, -0.6).
          
          float dist = length(pos.xz);
          
          // Depth factor (negative = away from camera)
          float depth = -20.0 / (dist + 0.5);
          
          // Apply displacement along view axis
          // pos.y += depth * 0.8; // Move down
          // pos.z += depth * 0.6; // Move back
          
          // Actually, let's tune it visually.
          // Moving just Z moved it UP (horizon).
          // Moving Y down should move it DOWN.
          
          pos.z += depth * 0.5;
          pos.y += depth * 0.8; 
          
          vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;

        void main() {
          gl_FragColor = vec4(uColor, uOpacity);
        }
      `,
      transparent: true,
      linewidth: 2,
    }),
    [lineColor]
  );

  useFrame((state) => {
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        state.clock.getElapsedTime();
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uOpacity.value =
        opacity;
      (
        mesh.current.material as THREE.ShaderMaterial
      ).uniforms.uScrollProgress.value = scrollProgress;
    }
  });

  return (
    <lineSegments ref={mesh} geometry={geometry}>
      <shaderMaterial args={[shaderArgs]} linewidth={2} />
    </lineSegments>
  );
};

const BurstLines = (props: {
  scrollProgress: number;
  opacity: number;
  lineColor: string;
}) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 8, 5], fov: 45 }}>
        <BurstLinesInner {...props} />
      </Canvas>
    </div>
  );
};

export default BurstLines;
