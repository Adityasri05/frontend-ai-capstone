'use client';

import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { WORKSPACE_ITEMS } from '../data';
import { WorkspaceNodeId } from '../types';

interface DeskSceneProps {
  selectedId: WorkspaceNodeId | null;
  onSelect: (id: WorkspaceNodeId | null) => void;
  reducedMotion: boolean;
}

// -------------------------------------------------------------
// Pure Canvas Holographic Label Texture Helper
// -------------------------------------------------------------
function useHoloTexture(text: string, color: string, badge?: string) {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 140;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (badge) {
        // Draw badge box
        ctx.fillStyle = `${color}33`;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(156, 10, 200, 32, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.font = 'bold 18px "Space Grotesk", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badge, 256, 26);
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, badge ? 88 : 70);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [text, color, badge]);
}

export default function DeskScene({ selectedId, onSelect, reducedMotion }: DeskSceneProps) {
  const { camera, pointer } = useThree();
  const controlsRef = useRef<any>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.8, 4.8));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.6, 0));

  // Handle camera transition when selected item changes
  React.useEffect(() => {
    if (selectedId && WORKSPACE_ITEMS[selectedId]) {
      const item = WORKSPACE_ITEMS[selectedId];
      targetCamPos.current.set(...item.targetCamera);
      targetLookAt.current.set(...item.position);
    } else {
      targetCamPos.current.set(0, 2.8, 4.8);
      targetLookAt.current.set(0, 0.6, 0);
    }
  }, [selectedId]);

  useFrame((state, delta) => {
    // Smooth camera transition using lerp
    if (!reducedMotion) {
      const lerpFactor = Math.min(delta * 3.5, 0.1);

      // Camera parallax if not focused on a specific item
      if (!selectedId) {
        const parallaxX = pointer.x * 0.4;
        const parallaxY = pointer.y * 0.2;
        const desiredX = targetCamPos.current.x + parallaxX;
        const desiredY = targetCamPos.current.y + parallaxY;
        camera.position.x += (desiredX - camera.position.x) * lerpFactor;
        camera.position.y += (desiredY - camera.position.y) * lerpFactor;
        camera.position.z += (targetCamPos.current.z - camera.position.z) * lerpFactor;
      } else {
        camera.position.lerp(targetCamPos.current, lerpFactor);
      }

      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, lerpFactor);
        controlsRef.current.update();
      }
    }
  });

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={2.5}
        maxDistance={8.5}
        maxPolarAngle={Math.PI / 2 + 0.05}
        minPolarAngle={Math.PI / 6}
        dampingFactor={0.08}
        enableDamping={true}
      />

      {/* Lighting System */}
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 2.5, 0]} intensity={0.8} color="#3b82f6" distance={6} />
      <pointLight position={[2, 1.5, -1]} intensity={0.6} color="#8b5cf6" distance={5} />
      <pointLight position={[-2, 1.5, -1]} intensity={0.6} color="#10b981" distance={5} />

      {/* Grid Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
        onPointerDown={(e) => {
          e.stopPropagation();
          onSelect(null);
        }}
      >
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.85} metalness={0.2} />
      </mesh>
      <gridHelper args={[24, 24, '#1e293b', '#0f172a']} position={[0, 0, 0]} />

      {/* 3D Workstation Desk */}
      <DeskMesh />

      {/* Interactive 3D Nodes */}
      {/* 1. Frontend Monitor Node */}
      <FrontendMonitorNode
        selected={selectedId === 'frontend'}
        onSelect={() => onSelect(selectedId === 'frontend' ? null : 'frontend')}
        reducedMotion={reducedMotion}
      />

      {/* 2. AI / LLM Neural Core Node */}
      <AiNeuralCoreNode
        selected={selectedId === 'ai-core'}
        onSelect={() => onSelect(selectedId === 'ai-core' ? null : 'ai-core')}
        reducedMotion={reducedMotion}
      />

      {/* 3. Backend / API Gateway Node */}
      <BackendGatewayNode
        selected={selectedId === 'backend'}
        onSelect={() => onSelect(selectedId === 'backend' ? null : 'backend')}
        reducedMotion={reducedMotion}
      />

      {/* 4. Vector Database Node */}
      <DatabaseNode
        selected={selectedId === 'database'}
        onSelect={() => onSelect(selectedId === 'database' ? null : 'database')}
        reducedMotion={reducedMotion}
      />

      {/* 5. Project Pod: HIREVIUM */}
      <ProjectPodNode
        id="hirevium"
        name="HIREVIUM"
        badge="AI Hiring"
        color="#06b6d4"
        emissive="#0e7490"
        position={[-1.4, 0.85, 1.1]}
        selected={selectedId === 'hirevium'}
        onSelect={() => onSelect(selectedId === 'hirevium' ? null : 'hirevium')}
        reducedMotion={reducedMotion}
      />

      {/* 6. Project Pod: INDRA AI */}
      <ProjectPodNode
        id="indra"
        name="INDRA AI"
        badge="Agent Engine"
        color="#ec4899"
        emissive="#be185d"
        position={[1.4, 0.85, 1.1]}
        selected={selectedId === 'indra'}
        onSelect={() => onSelect(selectedId === 'indra' ? null : 'indra')}
        reducedMotion={reducedMotion}
      />

      {/* 7. Project Pod: StackScout */}
      <ProjectPodNode
        id="stackscout"
        name="StackScout"
        badge="Code Evaluator"
        color="#eab308"
        emissive="#a16207"
        position={[-2.2, 0.5, 0.2]}
        selected={selectedId === 'stackscout'}
        onSelect={() => onSelect(selectedId === 'stackscout' ? null : 'stackscout')}
        reducedMotion={reducedMotion}
      />

      {/* 8. Project Pod: CineTrack */}
      <ProjectPodNode
        id="cinetrack"
        name="CineTrack"
        badge="Media Catalog"
        color="#0284c7"
        emissive="#0369a1"
        position={[2.2, 0.5, 0.2]}
        selected={selectedId === 'cinetrack'}
        onSelect={() => onSelect(selectedId === 'cinetrack' ? null : 'cinetrack')}
        reducedMotion={reducedMotion}
      />
    </>
  );
}

// -------------------------------------------------------------
// Component: Workstation Desk
// -------------------------------------------------------------
function DeskMesh() {
  return (
    <group position={[0, 0, 0]}>
      {/* Desktop Surface */}
      <mesh position={[0, 0.68, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.06, 1.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Desk Mat */}
      <mesh position={[0, 0.715, 0.1]} receiveShadow>
        <boxGeometry args={[2.4, 0.01, 1.1]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Left Legs */}
      <mesh position={[-1.6, 0.34, 0]} castShadow>
        <boxGeometry args={[0.08, 0.68, 1.6]} />
        <meshStandardMaterial color="#090d16" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Right Legs */}
      <mesh position={[1.6, 0.34, 0]} castShadow>
        <boxGeometry args={[0.08, 0.68, 1.6]} />
        <meshStandardMaterial color="#090d16" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Minimal Ergonomic Keyboard & Trackpad */}
      <mesh position={[0, 0.73, 0.35]} castShadow>
        <boxGeometry args={[0.8, 0.015, 0.28]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0.55, 0.725, 0.35]} castShadow>
        <boxGeometry args={[0.16, 0.015, 0.24]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// Component: 1. Frontend Curved Monitor Node
// -------------------------------------------------------------
function FrontendMonitorNode({
  selected,
  onSelect,
  reducedMotion,
}: {
  selected: boolean;
  onSelect: () => void;
  reducedMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Group>(null);
  const holoTexture = useHoloTexture('REACT 19 / NEXT 15', '#3b82f6', 'FRONTEND');

  useFrame((_, delta) => {
    if (!reducedMotion && meshRef.current) {
      if (selected || hovered) {
        meshRef.current.position.y = 0.95 + Math.sin(Date.now() * 0.003) * 0.03;
      } else {
        meshRef.current.position.y = 0.9;
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={[0, 0.9, -0.2]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Monitor Stand */}
      <mesh position={[0, -0.15, -0.1]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.03, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.05, -0.1]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.25, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Main Curved Screen Bezel */}
      <mesh castShadow position={[0, 0.22, 0]}>
        <boxGeometry args={[1.5, 0.65, 0.04]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Screen Display Face */}
      <mesh position={[0, 0.22, 0.025]}>
        <planeGeometry args={[1.44, 0.59]} />
        <meshStandardMaterial
          color={selected ? '#1e3a8a' : hovered ? '#1e293b' : '#090d16'}
          emissive={selected ? '#3b82f6' : hovered ? '#2563eb' : '#1d4ed8'}
          emissiveIntensity={selected ? 0.65 : hovered ? 0.45 : 0.2}
          roughness={0.2}
        />
      </mesh>

      {/* Holographic Header Tag Plane */}
      {holoTexture && (
        <mesh position={[0, 0.62, 0]}>
          <planeGeometry args={[1.2, 0.33]} />
          <meshBasicMaterial map={holoTexture} transparent side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Selection Ring Indicator */}
      {(selected || hovered) && (
        <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.85, 0.95, 32]} />
          <meshBasicMaterial color="#3b82f6" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// Component: 2. AI Neural Core Node (Pulsing Sphere)
// -------------------------------------------------------------
function AiNeuralCoreNode({
  selected,
  onSelect,
  reducedMotion,
}: {
  selected: boolean;
  onSelect: () => void;
  reducedMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const holoTexture = useHoloTexture('AI / LLM CORE', '#8b5cf6', 'NEURAL ENGINE');

  useFrame((_, delta) => {
    if (!reducedMotion) {
      if (ringRef1.current) ringRef1.current.rotation.x += delta * 1.2;
      if (ringRef2.current) ringRef2.current.rotation.y += delta * 1.5;
      if (coreRef.current) {
        const pulse = 1 + Math.sin(Date.now() * 0.005) * (selected ? 0.12 : 0.06);
        coreRef.current.scale.set(pulse, pulse, pulse);
      }
    }
  });

  return (
    <group
      position={[1.8, 1.2, -0.4]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Floating Neural Sphere Core */}
      <mesh ref={coreRef} castShadow>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive={selected ? '#a855f7' : hovered ? '#9333ea' : '#7c3aed'}
          emissiveIntensity={selected ? 0.9 : hovered ? 0.7 : 0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Synapse Ring 1 */}
      <mesh ref={ringRef1} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[0.34, 0.015, 16, 48]} />
        <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={0.6} />
      </mesh>

      {/* Orbiting Synapse Ring 2 */}
      <mesh ref={ringRef2} rotation={[-0.4, -0.3, 0]}>
        <torusGeometry args={[0.42, 0.012, 16, 48]} />
        <meshStandardMaterial color="#e9d5ff" emissive="#c084fc" emissiveIntensity={0.5} />
      </mesh>

      {/* Stand Base */}
      <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1e1b4b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Holographic Label */}
      {holoTexture && (
        <mesh position={[0, 0.55, 0]}>
          <planeGeometry args={[1.0, 0.28]} />
          <meshBasicMaterial map={holoTexture} transparent side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Selection Glow Indicator */}
      {(selected || hovered) && (
        <mesh position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.45, 32]} />
          <meshBasicMaterial color="#8b5cf6" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// Component: 3. Backend Gateway Node (Microservice Tower)
// -------------------------------------------------------------
function BackendGatewayNode({
  selected,
  onSelect,
  reducedMotion,
}: {
  selected: boolean;
  onSelect: () => void;
  reducedMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const towerRef = useRef<THREE.Group>(null);
  const holoTexture = useHoloTexture('API GATEWAY', '#10b981', 'EDGE RUNTIME');

  useFrame((_, delta) => {
    if (!reducedMotion && towerRef.current && (selected || hovered)) {
      towerRef.current.position.y = 1.2 + Math.sin(Date.now() * 0.003) * 0.02;
    }
  });

  return (
    <group
      ref={towerRef}
      position={[-1.8, 1.2, -0.4]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Tower Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.35, 0.75, 0.35]} />
        <meshStandardMaterial
          color="#064e3b"
          emissive={selected ? '#059669' : hovered ? '#10b981' : '#047857'}
          emissiveIntensity={selected ? 0.6 : hovered ? 0.4 : 0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* LED Status Indicators */}
      {[0.25, 0.1, -0.05, -0.2].map((yOffset, idx) => (
        <mesh key={idx} position={[0.18, yOffset, 0]}>
          <boxGeometry args={[0.02, 0.04, 0.22]} />
          <meshBasicMaterial color={idx % 2 === 0 ? '#34d399' : '#10b981'} />
        </mesh>
      ))}

      {/* Stand Base */}
      <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.1, 16]} />
        <meshStandardMaterial color="#022c22" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Holographic Label */}
      {holoTexture && (
        <mesh position={[0, 0.55, 0]}>
          <planeGeometry args={[1.0, 0.28]} />
          <meshBasicMaterial map={holoTexture} transparent side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Selection Glow Indicator */}
      {(selected || hovered) && (
        <mesh position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.5, 32]} />
          <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// Component: 4. Database Vector Store Node
// -------------------------------------------------------------
function DatabaseNode({
  selected,
  onSelect,
  reducedMotion,
}: {
  selected: boolean;
  onSelect: () => void;
  reducedMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);
  const holoTexture = useHoloTexture('VECTOR MEMORY', '#f59e0b', 'REALTIME DB');

  useFrame((_, delta) => {
    if (!reducedMotion && ringRef.current) {
      ringRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group
      position={[0, 0.45, -1.6]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Tiered Cylinders */}
      {[0.24, 0.08, -0.08].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.12, 24]} />
          <meshStandardMaterial
            color="#451a03"
            emissive={selected ? '#d97706' : hovered ? '#f59e0b' : '#b45309'}
            emissiveIntensity={selected ? 0.7 : hovered ? 0.5 : 0.25}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Rotating Data Belt */}
      <mesh ref={ringRef} position={[0, 0.08, 0]}>
        <torusGeometry args={[0.42, 0.015, 16, 32]} />
        <meshBasicMaterial color="#fbbf24" wireframe />
      </mesh>

      {/* Holographic Label */}
      {holoTexture && (
        <mesh position={[0, 0.5, 0]}>
          <planeGeometry args={[1.0, 0.28]} />
          <meshBasicMaterial map={holoTexture} transparent side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Selection Glow Indicator */}
      {(selected || hovered) && (
        <mesh position={[0, -0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.6, 32]} />
          <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// Component: Project Pod Node (Interactive Station Pod)
// -------------------------------------------------------------
function ProjectPodNode({
  id,
  name,
  badge,
  color,
  emissive,
  position,
  selected,
  onSelect,
  reducedMotion,
}: {
  id: string;
  name: string;
  badge: string;
  color: string;
  emissive: string;
  position: [number, number, number];
  selected: boolean;
  onSelect: () => void;
  reducedMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const podRef = useRef<THREE.Group>(null);
  const holoTexture = useHoloTexture(name, color, badge);

  useFrame((_, delta) => {
    if (!reducedMotion && podRef.current) {
      if (selected || hovered) {
        podRef.current.position.y = position[1] + Math.sin(Date.now() * 0.004) * 0.03;
        podRef.current.rotation.y += delta * 0.8;
      } else {
        podRef.current.position.y = position[1];
      }
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Base Pedestal */}
      <mesh position={[0, -0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.28, 0.08, 20]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Floating Holographic Crystal / Prism */}
      <group ref={podRef}>
        <mesh castShadow>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={selected ? emissive : hovered ? color : emissive}
            emissiveIntensity={selected ? 0.85 : hovered ? 0.6 : 0.3}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>
      </group>

      {/* Project Title & Badge Holographic Tag */}
      {holoTexture && (
        <mesh position={[0, 0.3, 0]}>
          <planeGeometry args={[0.9, 0.25]} />
          <meshBasicMaterial map={holoTexture} transparent side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Selection Ring */}
      {(selected || hovered) && (
        <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.32, 0.45, 24]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.85} />
        </mesh>
      )}
    </group>
  );
}
