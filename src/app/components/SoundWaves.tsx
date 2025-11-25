'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SoundWaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uColor: { value: new THREE.Color('#484D2E') },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uScrollProgress: { value: 0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec3 uMouse;
    uniform vec2 uResolution;
    uniform float uScrollProgress;
    attribute float aLineIndex;
    varying float vLineIndex;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vLineIndex = aLineIndex;
      vec3 pos = position;
      
      // Spreading effect based on scroll
      // Spread lines apart in Z (vertical on screen)
      // Multiply Z by a factor that increases with scroll
      float spreadFactor = 1.0 + uScrollProgress * 4.0;
      pos.z *= spreadFactor;

      // Base wave animation
      // Slower speed: 0.05
      float noise = snoise(vec2(pos.x * 0.5, uTime * 0.05 + aLineIndex * 0.1));
      
      // Create dual peaks (Left and Right)
      // Position them relative to the viewport width for responsiveness
      float quarterWidth = uResolution.x * 0.25;
      
      // Right peak (centered at +25% of screen width)
      float maskRight = 1.0 - smoothstep(0.0, 2.5, abs(pos.x - quarterWidth));
      
      // Center peak (centered at 0.0)
      float maskCenter = 1.0 - smoothstep(0.0, 2.5, abs(pos.x));
      
      // Combine masks
      float combinedMask = max(maskRight, maskCenter);
      
      // Apply wave height
      // Flatten based on scroll: (1.0 - uScrollProgress)
      // Clamp to 0 to avoid negative height if scroll goes > 1 (though we'll cap it)
      float flattenFactor = max(0.0, 1.0 - uScrollProgress * 1.5); // Flatten faster than spread
      float waveHeight = noise * 1.5 * combinedMask * flattenFactor;
      
      // Mouse interaction - "Tug" effect
      // Project mouse to the plane of the lines (z approx 0)
      // We want to pull the line UP towards the mouse Y
      
      float distToMouseX = abs(pos.x - uMouse.x);
      float distToMouseZ = abs(pos.z - uMouse.z); // pos.z is the depth, uMouse.z is the mouse depth
      
      // Interaction radius - tighter for "sound wave" feel
      float interactionRadius = 1.5;
      float dist = length(vec2(distToMouseX, distToMouseZ));
      
      // Sharper falloff
      float interaction = 1.0 - smoothstep(0.0, interactionRadius, dist);
      interaction = pow(interaction, 3.0); // Make it spiky
      
      // Stronger pull
      // Also flatten interaction on scroll
      float pull = interaction * 1.5 * flattenFactor;
      
      // Combine
      pos.y += waveHeight + pull;

      vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying float vLineIndex;

    void main() {
      gl_FragColor = vec4(uColor, 1.0);
    }
  `,
};

const Lines = ({ scrollProgress }: { scrollProgress: number }) => {
  const mesh = useRef<THREE.LineSegments>(null);
  const { viewport, camera } = useThree();

  // Generate geometry
  const { geometry } = useMemo(() => {
    const numLines = 60; // Increased for coverage
    const pointsPerLine = 150; // Smoother lines
    const width = viewport.width * 2.5; // Much wider to ensure full coverage
    const height = viewport.height * 2.0; // Taller to cover top/bottom

    const positions = [];
    const indices = [];
    const lineIndices = [];

    for (let i = 0; i < numLines; i++) {
      // Spread lines along Z axis
      const z = (i / (numLines - 1)) * height - height / 2;
      const lineIndex = i;

      for (let j = 0; j < pointsPerLine; j++) {
        const x = (j / (pointsPerLine - 1)) * width - width / 2;

        positions.push(x, 0, z);
        lineIndices.push(lineIndex);

        if (j < pointsPerLine - 1) {
          const currentIndex = i * pointsPerLine + j;
          indices.push(currentIndex, currentIndex + 1);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.setAttribute(
      'aLineIndex',
      new THREE.Float32BufferAttribute(lineIndices, 1)
    );
    geo.setIndex(indices);

    return { geometry: geo };
  }, [viewport]);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uColor: { value: new THREE.Color('#484D2E') },
        uResolution: {
          value: new THREE.Vector2(viewport.width, viewport.height),
        },
        uScrollProgress: { value: 0 },
      },
      vertexShader: SoundWaveShaderMaterial.vertexShader,
      fragmentShader: SoundWaveShaderMaterial.fragmentShader,
      transparent: true,
      linewidth: 2, // Attempt to set line width (support varies)
    }),
    [viewport]
  );

  useFrame((state) => {
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        state.clock.getElapsedTime();
      (
        mesh.current.material as THREE.ShaderMaterial
      ).uniforms.uScrollProgress.value = scrollProgress;

      // Raycast to find mouse position on the plane y=0
      const vector = new THREE.Vector3(state.mouse.x, state.mouse.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.y / dir.y;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      const currentMouse = (mesh.current.material as THREE.ShaderMaterial)
        .uniforms.uMouse.value;
      currentMouse.lerp(pos, 0.1);
    }
  });

  return (
    <lineSegments ref={mesh} geometry={geometry}>
      <shaderMaterial args={[shaderArgs]} linewidth={2} />
    </lineSegments>
  );
};

const SoundWaves = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 8, 6], fov: 45 }}>
        <Lines scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default SoundWaves;
