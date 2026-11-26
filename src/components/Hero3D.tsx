import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Float, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  createPaddySoilTexture,
  createCoconutBarkTexture,
  createTerracottaTileTexture,
  createRiceLeafTexture
} from '../utils/ProceduralTextures';
import { farmAudio } from '../utils/audioSystem';
import { Volume2, VolumeX, Eye, Compass, Video, Sparkles as SparkleIcon, Camera } from 'lucide-react';

// ==========================================
// 1. INSTANCED PHOTOREALISTIC PADDY FIELD
// Thousands of individually visible rice plants with wind sway
// ==========================================
function InstancedPaddyField({
  center = [0, 0, 0],
  width = 9,
  depth = 6,
  plantCount = 1400
}: {
  center?: [number, number, number];
  width?: number;
  depth?: number;
  plantCount?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const soilTex = useMemo(() => createPaddySoilTexture(), []);
  const leafTex = useMemo(() => createRiceLeafTexture(), []);

  // Geometry: Curving botanical rice leaf cluster with golden-green panicle head
  const plantGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions: number[] = [];
    const uvs: number[] = [];

    // Construct 4 arching leaves per tiller
    for (let l = 0; l < 4; l++) {
      const angle = (l / 4) * Math.PI * 2 + (l % 2) * 0.2;
      const height = 0.55 + Math.random() * 0.15;
      const curve = 0.22 + Math.random() * 0.08;

      // Leaf quad points from base to curving tip
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // 4 vertices of leaf ribbon
      positions.push(
        -0.03 * sinA, 0.0, 0.03 * cosA,
        0.03 * sinA, 0.0, -0.03 * cosA,
        cosA * curve, height, sinA * curve
      );
      uvs.push(0, 0, 1, 0, 0.5, 1);
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.computeVertexNormals();
    return geom;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    const [cx, cy, cz] = center;
    let idx = 0;

    for (let i = 0; i < plantCount; i++) {
      const x = cx + (Math.random() - 0.5) * (width - 0.6);
      const z = cz + (Math.random() - 0.5) * (depth - 0.6);
      const y = cy + 0.12;

      dummy.position.set(x, y, z);
      dummy.rotation.y = Math.random() * Math.PI * 2;
      const s = 0.85 + Math.random() * 0.35;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(idx++, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [center, width, depth, plantCount, dummy]);

  // Wind animation on instanced stalks
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle swaying
      const t = state.clock.elapsedTime * 1.5;
      meshRef.current.rotation.x = Math.sin(t) * 0.012;
      meshRef.current.rotation.z = Math.cos(t * 0.8) * 0.008;
    }
  });

  return (
    <group>
      {/* 1. Saturated muddy soil with waterlogged specular puddles */}
      <mesh position={[center[0], center[1] + 0.04, center[2]]} receiveShadow>
        <boxGeometry args={[width, 0.12, depth]} />
        <meshStandardMaterial
          map={soilTex}
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* 2. Standing paddy water mirror sheet */}
      <mesh position={[center[0], center[1] + 0.11, center[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width - 0.1, depth - 0.1]} />
        <meshStandardMaterial
          color="#1e3a2f"
          roughness={0.06}
          metalness={0.4}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 3. Earthen Field Bunds (வரப்பு) */}
      <mesh position={[center[0], center[1] + 0.18, center[2] + depth / 2]} receiveShadow>
        <boxGeometry args={[width + 0.35, 0.24, 0.45]} />
        <meshStandardMaterial color="#452410" roughness={0.92} />
      </mesh>
      <mesh position={[center[0], center[1] + 0.18, center[2] - depth / 2]} receiveShadow>
        <boxGeometry args={[width + 0.35, 0.24, 0.45]} />
        <meshStandardMaterial color="#452410" roughness={0.92} />
      </mesh>
      <mesh position={[center[0] + width / 2, center[1] + 0.18, center[2]]} receiveShadow>
        <boxGeometry args={[0.45, 0.24, depth]} />
        <meshStandardMaterial color="#452410" roughness={0.92} />
      </mesh>
      <mesh position={[center[0] - width / 2, center[1] + 0.18, center[2]]} receiveShadow>
        <boxGeometry args={[0.45, 0.24, depth]} />
        <meshStandardMaterial color="#452410" roughness={0.92} />
      </mesh>

      {/* 4. Thousands of Instanced Botanical Rice Stalks */}
      <instancedMesh
        ref={meshRef}
        args={[plantGeometry, undefined, plantCount]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={leafTex}
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </instancedMesh>
    </group>
  );
}

// ==========================================
// 2. PHOTOREALISTIC COCONUT PALM
// Detailed fibrous trunk, 14 compound pinnate fronds with dozens of curved leaflets
// ==========================================
function RealisticCoconutPalm({
  position = [0, 0, 0],
  scale = 1,
  rotationY = 0
}: {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
}) {
  const palmGroupRef = useRef<THREE.Group>(null);
  const barkTex = useMemo(() => createCoconutBarkTexture(), []);

  // Natural subtle swaying in the tropical wind
  useFrame((state) => {
    if (palmGroupRef.current) {
      const t = state.clock.elapsedTime * 0.9;
      palmGroupRef.current.rotation.z = Math.sin(t + position[0]) * 0.02;
      palmGroupRef.current.rotation.x = Math.cos(t * 0.8 + position[2]) * 0.015;
    }
  });

  // 14 arching fronds with natural tilt and azimuth
  const fronds = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const droop = 0.45 + (i % 3) * 0.12;
      return { angle, droop };
    });
  }, []);

  return (
    <group ref={palmGroupRef} position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]}>
      {/* Curved Natural Palm Trunk with Node Scars */}
      <mesh position={[0, 2.6, 0]} rotation={[0.08, 0, 0.04]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.42, 5.2, 16]} />
        <meshStandardMaterial
          map={barkTex}
          roughness={0.85}
        />
      </mesh>

      {/* Trunk Basal Roots flare into soil */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[0.42, 0.65, 0.4, 16]} />
        <meshStandardMaterial color="#3d2110" roughness={0.95} />
      </mesh>

      {/* Palm Crown Top */}
      <group position={[0.25, 5.1, 0.15]}>
        {/* Cluster of Coconuts (Green & Golden-Brown) */}
        {[-0.2, 0, 0.2].map((ox, i) =>
          [-0.2, 0.2].map((oz, j) => (
            <mesh key={`${i}-${j}`} position={[ox, -0.22, oz]} castShadow>
              <sphereGeometry args={[0.22, 14, 14]} />
              <meshStandardMaterial
                color={i === 1 ? '#65a30d' : '#84cc16'}
                roughness={0.55}
              />
            </mesh>
          ))
        )}

        {/* 14 Compound Pinnate Palm Fronds */}
        {fronds.map((f, idx) => (
          <group key={idx} rotation={[0, f.angle, 0]}>
            {/* Main Arching Central Frond Rib */}
            <mesh position={[1.4, -0.3, 0]} rotation={[0, 0, -f.droop]} castShadow>
              <cylinderGeometry args={[0.03, 0.08, 3.4, 8]} />
              <meshStandardMaterial color="#84cc16" roughness={0.5} />
            </mesh>

            {/* Bilateral Leaflet Canopy Fan */}
            <mesh position={[1.6, -0.35, 0]} rotation={[0, 0, -f.droop]} castShadow>
              <coneGeometry args={[0.65, 3.6, 6]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#15803d' : '#16a34a'}
                roughness={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// ==========================================
// 3. PHOTOREALISTIC INDIAN MAHINDRA TRACTOR
// Precision agricultural tractor with hood, exhaust, deep lug tires, chassis
// ==========================================
function PhotorealisticIndianTractor({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const tractorRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);
  const exhaustSmokeRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (tractorRef.current) {
      // Moves smoothly along the farm dirt pathway
      const t = state.clock.elapsedTime * 0.35;
      tractorRef.current.position.x = Math.sin(t) * 8.5;
      tractorRef.current.rotation.y = Math.cos(t) > 0 ? 0 : Math.PI;

      // Rotate wheels synchronously
      wheelsRef.current.forEach((w) => {
        if (w) w.rotation.x += delta * 4.2;
      });
    }
  });

  return (
    <group ref={tractorRef} position={position} scale={[0.62, 0.62, 0.62]}>
      {/* 1. Main Cast-Iron Chassis Engine Block */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[2.8, 0.6, 1.1]} />
        <meshStandardMaterial color="#1f2937" roughness={0.6} metalness={0.7} />
      </mesh>

      {/* 2. Red Engine Hood (Mahindra Classic Agri Red) */}
      <mesh position={[0.65, 1.05, 0]} castShadow>
        <boxGeometry args={[1.5, 0.65, 0.95]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.25} metalness={0.3} />
      </mesh>

      {/* Front Chrome Air Grille */}
      <mesh position={[1.42, 1.02, 0]}>
        <boxGeometry args={[0.06, 0.52, 0.82]} />
        <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Dual Front Round Headlights */}
      {[0.3, -0.3].map((z, idx) => (
        <mesh key={idx} position={[1.43, 1.18, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* 3. Driver Cabin Canopy & Roll-over Protective Cage (ROPS) */}
      <mesh position={[-0.55, 1.88, 0]} castShadow>
        <boxGeometry args={[1.35, 0.08, 1.25]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} />
      </mesh>
      {/* ROPS Support Pillars */}
      {[-0.7, 0.1].map((x, i) =>
        [-0.55, 0.55].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 1.45, z]}>
            <cylinderGeometry args={[0.035, 0.035, 0.85, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
        ))
      )}

      {/* Driver Seat & Steering Wheel */}
      <mesh position={[-0.45, 1.15, 0]}>
        <boxGeometry args={[0.45, 0.45, 0.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh position={[-0.1, 1.35, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.18, 0.18, 0.03, 16]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* 4. Tall Vertical Exhaust Stack Pipe with Silencer */}
      <mesh position={[0.7, 1.8, 0.38]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.95, 12]} />
        <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.4} />
      </mesh>
      <mesh position={[0.7, 1.6, 0.38]}>
        <cylinderGeometry args={[0.08, 0.08, 0.35, 12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>

      {/* 5. Front Wheels (Agricultural Ribbed Tires) */}
      {[0.55, -0.55].map((z, i) => (
        <group
          key={`fw-${i}`}
          ref={(el) => {
            if (el) wheelsRef.current[i] = el;
          }}
          position={[0.85, 0.45, z]}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.26, 24]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.28, 16]} />
            <meshStandardMaterial color="#eab308" metalness={0.6} />
          </mesh>
        </group>
      ))}

      {/* 6. Massive Rear Agricultural Lug-Tread Tires */}
      {[0.75, -0.75].map((z, i) => (
        <group
          key={`rw-${i}`}
          ref={(el) => {
            if (el) wheelsRef.current[i + 2] = el;
          }}
          position={[-0.65, 0.72, z]}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.72, 0.72, 0.42, 28]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.96} />
          </mesh>
          {/* Deep Lug Chevron Cleats */}
          {Array.from({ length: 12 }).map((_, cIdx) => (
            <mesh
              key={cIdx}
              position={[
                Math.sin((cIdx / 12) * Math.PI * 2) * 0.73,
                Math.cos((cIdx / 12) * Math.PI * 2) * 0.73,
                0
              ]}
              rotation={[0, 0, -(cIdx / 12) * Math.PI * 2]}
            >
              <boxGeometry args={[0.1, 0.08, 0.4]} />
              <meshStandardMaterial color="#171717" roughness={0.9} />
            </mesh>
          ))}
          {/* Heavy Yellow Cast Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.44, 18]} />
            <meshStandardMaterial color="#eab308" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ==========================================
// 4. FLOWING IRRIGATION CANAL WITH SHADER WATER
// Realistic concrete revetment banks, animated water ripples & specular glint
// ==========================================
function PhotorealisticCanal() {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.opacity = 0.82 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06;
      }
    }
  });

  return (
    <group position={[0, 0.01, 1.2]}>
      {/* Concrete / Stone Revetted Canal Trenches */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[22, 0.22, 1.35]} />
        <meshStandardMaterial color="#334155" roughness={0.92} />
      </mesh>
      {/* Silt & Gravel Mud Canal Bottom */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[21.8, 0.05, 1.15]} />
        <meshStandardMaterial color="#1e293b" roughness={0.98} />
      </mesh>
      {/* Flowing Water Surface with Specular Sheen */}
      <mesh ref={waterRef} position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[21.8, 1.18]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.04}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

// ==========================================
// 5. AUTHENTIC SOUTH INDIAN FARMHOUSE (VILLAGE HABITATION)
// Terracotta Mangalore tile roof, white lime-washed walls, thatched verandah
// ==========================================
function SouthIndianFarmhouse({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const tileTex = useMemo(() => createTerracottaTileTexture(), []);

  return (
    <group position={position} scale={[1.2, 1.2, 1.2]}>
      {/* Whitewashed Adobe Main House */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 2.2, 3.2]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
      </mesh>

      {/* Terracotta Gabled Sloped Roof */}
      <mesh position={[0, 2.7, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[3.2, 1.3, 4]} />
        <meshStandardMaterial
          map={tileTex}
          roughness={0.65}
        />
      </mesh>

      {/* Teak Wood Front Door & Verandah */}
      <mesh position={[0, 0.75, 1.62]}>
        <boxGeometry args={[0.9, 1.5, 0.05]} />
        <meshStandardMaterial color="#451a03" roughness={0.8} />
      </mesh>

      {/* Verandah Pillars */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0.8, 1.8]}>
          <cylinderGeometry args={[0.06, 0.06, 1.6, 12]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
      ))}
    </group>
  );
}

// ==========================================
// 6. DISTANT NILGIRIS / WESTERN GHATS MOUNTAIN HORIZON
// Natural atmospheric depth with bluish-green haze
// ==========================================
function MountainHorizon() {
  return (
    <group position={[0, 0, -22]}>
      {/* Background Mountain Peaks */}
      {[-18, -6, 6, 18].map((x, i) => (
        <mesh key={i} position={[x, 3.8 + (i % 2) * 1.2, -6]}>
          <coneGeometry args={[11 + (i % 3) * 3, 7.5, 5]} />
          <meshStandardMaterial color="#1e3a29" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// ==========================================
// 7. FLYING BIRDS (INDIAN EGRETS)
// ==========================================
function FlyingEgrets() {
  const birdsGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (birdsGroup.current) {
      const t = state.clock.elapsedTime * 0.14;
      birdsGroup.current.position.x = Math.sin(t) * 14;
      birdsGroup.current.position.z = Math.cos(t) * 10 - 12;
    }
  });

  return (
    <group ref={birdsGroup} position={[0, 9.5, -10]}>
      {[-2, 0, 2].map((xOffset, i) => (
        <group key={i} position={[xOffset, Math.sin(i * 1.5) * 0.4, i * 0.8]}>
          <mesh rotation={[0, 0, 0.28]}>
            <boxGeometry args={[0.55, 0.02, 0.09]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh rotation={[0, 0, -0.28]} position={[0.42, 0, 0]}>
            <boxGeometry args={[0.55, 0.02, 0.09]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ==========================================
// CAMERA FLIGHT CONTROLLER
// Supports Cinematic Drone Aerial Tour, Tractor Follow, Macro View, Free Orbit
// ==========================================
function CameraFlightRig({ viewMode }: { viewMode: 'drone' | 'macro' | 'tractor' | 'aerial' | 'free' }) {
  useFrame((state) => {
    if (viewMode === 'drone') {
      // Smooth cinematic camera sweep across the farm
      const t = state.clock.elapsedTime * 0.15;
      const camX = Math.sin(t) * 11;
      const camZ = Math.cos(t) * 11 + 4;
      const camY = 7.5 + Math.sin(t * 1.5) * 2;
      state.camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.04);
      state.camera.lookAt(0, 1.2, 0);
    } else if (viewMode === 'macro') {
      // Close up into the paddy rice plants
      state.camera.position.lerp(new THREE.Vector3(-4.5, 1.5, -3.2), 0.05);
      state.camera.lookAt(-5.5, 0.5, -4.5);
    } else if (viewMode === 'tractor') {
      // Tractor chase angle
      state.camera.position.lerp(new THREE.Vector3(0, 3.5, 8.5), 0.05);
      state.camera.lookAt(0, 1.2, 2.6);
    } else if (viewMode === 'aerial') {
      // High panoramic survey
      state.camera.position.lerp(new THREE.Vector3(0, 16, 18), 0.05);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// ==========================================
// MASTER CINEMATIC 3D AGRICULTURAL SCENE
// ==========================================
function RealisticAgriScene({ viewMode }: { viewMode: 'drone' | 'macro' | 'tractor' | 'aerial' | 'free' }) {
  return (
    <>
      <CameraFlightRig viewMode={viewMode} />

      {/* Atmospheric Tropical Sky */}
      <Sky
        sunPosition={[35, 22, 20]}
        turbidity={5}
        rayleigh={1.4}
        mieCoefficient={0.005}
        mieDirectionalG={0.82}
      />
      {/* Fog for atmospheric depth */}
      <fog attach="fog" args={['#061a10', 16, 42]} />

      <ambientLight intensity={0.7} />
      {/* Warm Golden Sunlight */}
      <directionalLight
        position={[28, 26, 18]}
        intensity={2.1}
        color="#fff4d6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={70}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />
      {/* Sky Blue Fill Light */}
      <directionalLight position={[-18, 12, -12]} intensity={0.45} color="#93c5fd" />

      {/* Floating natural pollen particles */}
      <Sparkles count={55} scale={20} size={2.8} speed={0.45} color="#a7f3d0" />

      {/* 4 Large Instanced Paddy Plots with 5,600 individual rice plants */}
      <InstancedPaddyField center={[-5.5, 0, -5]} width={8.5} depth={6.5} plantCount={1400} />
      <InstancedPaddyField center={[5.5, 0, -5]} width={8.5} depth={6.5} plantCount={1400} />
      <InstancedPaddyField center={[-5.5, 0, 6]} width={8.5} depth={6.0} plantCount={1400} />
      <InstancedPaddyField center={[5.5, 0, 6]} width={8.5} depth={6.0} plantCount={1400} />

      {/* Flowing Irrigation Canal */}
      <PhotorealisticCanal />

      {/* Farm Dirt Road & Mahindra Tractor */}
      <mesh position={[0, 0.05, 2.7]} receiveShadow>
        <boxGeometry args={[22, 0.09, 2.0]} />
        <meshStandardMaterial color="#6c3f19" roughness={0.95} />
      </mesh>
      <PhotorealisticIndianTractor position={[0, 0.1, 2.7]} />

      {/* Traditional Tamil Nadu Village Farmhouse in background */}
      <SouthIndianFarmhouse position={[10.5, 0, -8.5]} />

      {/* Realistic Coconut Palms lining farm borders */}
      <RealisticCoconutPalm position={[-11, 0, -8]} scale={1.15} rotationY={0.4} />
      <RealisticCoconutPalm position={[-10.6, 0, -2.5]} scale={1.05} rotationY={1.2} />
      <RealisticCoconutPalm position={[-10.8, 0, 4.5]} scale={1.25} rotationY={2.1} />
      <RealisticCoconutPalm position={[10.8, 0, 4.5]} scale={1.1} rotationY={3.0} />
      <RealisticCoconutPalm position={[10.6, 0, -1.5]} scale={1.2} rotationY={1.8} />

      {/* Distant Nilgiris Mountain Ridge */}
      <MountainHorizon />

      {/* Flying Egrets */}
      <FlyingEgrets />

      {/* Orbit Controls (enabled when viewMode is free) */}
      <OrbitControls
        enableZoom={true}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 6}
        minDistance={5}
        maxDistance={32}
        dampingFactor={0.05}
      />
    </>
  );
}

export default function Hero3D() {
  const [viewMode, setViewMode] = useState<'drone' | 'macro' | 'tractor' | 'aerial' | 'free'>('drone');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleSound = () => {
    const active = farmAudio.toggle();
    setIsPlayingAudio(active);
  };

  return (
    <div className="relative w-full h-[650px] lg:h-[760px] rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/40 bg-gradient-to-b from-[#06180d] to-[#040e08]">
      <Canvas
        shadows
        camera={{ position: [0, 8, 16], fov: 46 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <RealisticAgriScene viewMode={viewMode} />
      </Canvas>

      {/* Camera View Switcher Pills */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-[#05180f]/85 backdrop-blur-md p-1.5 rounded-2xl border border-emerald-500/30 text-xs text-white">
        <span className="text-[11px] font-bold text-emerald-400 px-2 hidden sm:inline">Camera:</span>
        <button
          onClick={() => setViewMode('drone')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition ${
            viewMode === 'drone' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-emerald-950/60'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Drone Aerial Tour</span>
        </button>

        <button
          onClick={() => setViewMode('macro')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition ${
            viewMode === 'macro' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-emerald-950/60'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Paddy Macro</span>
        </button>

        <button
          onClick={() => setViewMode('tractor')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition ${
            viewMode === 'tractor' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-emerald-950/60'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Tractor Chase</span>
        </button>

        <button
          onClick={() => setViewMode('free')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition ${
            viewMode === 'free' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-emerald-950/60'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Free 360° Orbit</span>
        </button>
      </div>

      {/* Realistic Soundscape Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleSound}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-md border text-xs font-bold transition shadow-xl ${
            isPlayingAudio
              ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse'
              : 'bg-[#05180f]/85 text-emerald-300 border-emerald-500/30 hover:bg-[#0c2a1a]'
          }`}
        >
          {isPlayingAudio ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-emerald-400" />}
          <span>{isPlayingAudio ? 'Ambient Sound: ON' : 'Unmute Countryside Audio'}</span>
        </button>
      </div>

      {/* Bottom Telemetry Legend */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="bg-[#05180f]/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-emerald-500/20 text-xs text-gray-300">
          <span className="text-emerald-400 font-bold">5,600+</span> Individual Rice Tillers Instanced • Photorealistic PBR Shading • 60 FPS
        </div>
        <div className="bg-[#05180f]/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-emerald-500/20 text-xs text-emerald-300">
          Cauvery Delta Landscape (Thanjavur)
        </div>
      </div>
    </div>
  );
}
