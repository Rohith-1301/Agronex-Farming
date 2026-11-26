import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  Layers,
  MapPin,
  Sprout,
  Droplets,
  Thermometer,
  ShieldCheck,
  Compass,
  Maximize2,
  Calendar,
  AlertTriangle,
  Sparkles,
  Info,
  CheckCircle2,
  RefreshCw,
  Sun,
  Activity,
  Sliders
} from 'lucide-react';
import { TNAU_CROPS_DATABASE, AGRO_CLIMATIC_ZONES_INDIA } from '../data/tnauMasterDataset';

export interface FarmerFarmConfig {
  farmerName: string;
  state: string;
  district: string;
  village: string;
  soilType: string;
  cropId: string;
  acreage: number;
  waterSource: string;
  growthStageDays: number;
}

export const DEFAULT_FARM_CONFIG: FarmerFarmConfig = {
  farmerName: 'செல்வராஜ் முனியப்பன் (Selvaraj)',
  state: 'Tamil Nadu',
  district: 'Thanjavur',
  village: 'Papanasam (பாபநாசம்)',
  soilType: 'Deltaic Alluvium (வண்டல் மண்)',
  cropId: 'crop-rice-paddy',
  acreage: 3.5,
  waterSource: 'Canal & Sluice Gate + Filter-point Tube-well',
  growthStageDays: 55 // Panicle initiation
};

// 3D Plant Model generator based on crop type
function Procedural3DPlantRow({
  cropId,
  stageDays,
  rowZ,
  count = 14
}: {
  cropId: string;
  stageDays: number;
  rowZ: number;
  count?: number;
}) {
  const isRice = cropId === 'crop-rice-paddy';
  const isMaize = cropId === 'crop-maize';
  const isCotton = cropId === 'crop-cotton';
  const isSugarcane = cropId === 'crop-sugarcane';
  const isGroundnut = cropId === 'crop-groundnut';

  // Height and maturity factor
  const maturity = Math.min(1, Math.max(0.15, stageDays / 110));
  const height = isSugarcane ? 2.2 * maturity : isMaize ? 1.7 * maturity : isCotton ? 1.1 * maturity : isRice ? 0.85 * maturity : 0.5 * maturity;

  // Plant color based on stage
  const plantColor = stageDays > 90 && isRice ? '#eab308' : '#22c55e'; // golden at maturity for rice

  return (
    <group position={[0, 0, rowZ]}>
      {Array.from({ length: count }).map((_, i) => {
        const xPos = -7.5 + i * 1.15;
        return (
          <group key={i} position={[xPos, 0, 0]}>
            {/* Stem */}
            <mesh position={[0, height / 2, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.04, height, 5]} />
              <meshStandardMaterial color={plantColor} roughness={0.6} />
            </mesh>

            {/* Leaves / Canopy */}
            {isRice && (
              <>
                <mesh position={[0.08, height * 0.7, 0.05]} rotation={[0.4, 0.2, 0.5]} castShadow>
                  <boxGeometry args={[0.03, height * 0.6, 0.01]} />
                  <meshStandardMaterial color={plantColor} />
                </mesh>
                <mesh position={[-0.08, height * 0.7, -0.05]} rotation={[-0.4, -0.2, -0.5]} castShadow>
                  <boxGeometry args={[0.03, height * 0.6, 0.01]} />
                  <meshStandardMaterial color={plantColor} />
                </mesh>
                {/* Grains / Panicle if flowering or later */}
                {stageDays >= 60 && (
                  <mesh position={[0, height, 0.05]} rotation={[0.6, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.02, 0.015, 0.22, 5]} />
                    <meshStandardMaterial color={stageDays > 85 ? '#eab308' : '#84cc16'} />
                  </mesh>
                )}
              </>
            )}

            {isMaize && (
              <>
                <mesh position={[0, height * 0.6, 0]} rotation={[0.3, 0, 0.6]}>
                  <boxGeometry args={[0.05, height * 0.5, 0.01]} />
                  <meshStandardMaterial color="#16a34a" />
                </mesh>
                <mesh position={[0, height * 0.6, 0]} rotation={[-0.3, 0, -0.6]}>
                  <boxGeometry args={[0.05, height * 0.5, 0.01]} />
                  <meshStandardMaterial color="#16a34a" />
                </mesh>
                {stageDays >= 45 && (
                  /* Cob */
                  <mesh position={[0.08, height * 0.55, 0]} rotation={[0, 0, 0.4]} castShadow>
                    <capsuleGeometry args={[0.05, 0.16, 4, 8]} />
                    <meshStandardMaterial color="#ca8a04" />
                  </mesh>
                )}
              </>
            )}

            {isCotton && (
              <>
                <mesh position={[0, height * 0.6, 0]} castShadow>
                  <sphereGeometry args={[0.18 * maturity, 6, 6]} />
                  <meshStandardMaterial color="#15803d" />
                </mesh>
                {stageDays >= 75 && (
                  /* Fluffy white cotton bolls */
                  <mesh position={[0.1, height * 0.7, 0.08]} castShadow>
                    <sphereGeometry args={[0.06, 6, 6]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.9} />
                  </mesh>
                )}
              </>
            )}

            {isSugarcane && (
              <>
                <mesh position={[0, height * 0.8, 0]} rotation={[0.5, 0, 0.4]} castShadow>
                  <boxGeometry args={[0.04, 0.8, 0.01]} />
                  <meshStandardMaterial color="#22c55e" />
                </mesh>
                <mesh position={[0, height * 0.8, 0]} rotation={[-0.5, 0, -0.4]} castShadow>
                  <boxGeometry args={[0.04, 0.8, 0.01]} />
                  <meshStandardMaterial color="#22c55e" />
                </mesh>
              </>
            )}

            {isGroundnut && (
              <mesh position={[0, height * 0.5, 0]} castShadow>
                <sphereGeometry args={[0.22 * maturity, 6, 6]} />
                <meshStandardMaterial color="#16a34a" />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

// 3D Irrigation Canal & Sluice Gate
function CanalAndSluice({ isFlooded }: { isFlooded: boolean }) {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group position={[-9, 0, 0]}>
      {/* Canal Concrete Banks */}
      <mesh position={[-0.6, 0.1, 0]} receiveShadow>
        <boxGeometry args={[0.4, 0.5, 18]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      <mesh position={[0.6, 0.1, 0]} receiveShadow>
        <boxGeometry args={[0.4, 0.5, 18]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      {/* Flowing Water */}
      <mesh ref={waterRef} position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[0.8, 0.1, 17.8]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* IoT Automated Sluice Gate Structure */}
      <group position={[0, 0.6, 0]}>
        {/* Metal pillars */}
        <mesh position={[-0.5, 0.2, 0]} castShadow>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[0.5, 0.2, 0]} castShadow>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Sluice Gate Shutter Plate */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.9, 0.6, 0.05]} />
          <meshStandardMaterial color="#0284c7" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Solar Panel on Sluice */}
        <mesh position={[0, 0.85, 0]} rotation={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.04, 0.45]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Sensor Node blinking LED */}
        <mesh position={[0, 0.6, 0.1]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

// 3D Tractor roaming in field
function FieldTractor() {
  const tractorRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (tractorRef.current) {
      // Gentle forward movement along edge pathway
      const t = (state.clock.elapsedTime * 0.6) % 16;
      tractorRef.current.position.z = -8 + t;
    }
  });

  return (
    <group ref={tractorRef} position={[8.2, 0.2, -6]}>
      {/* Tractor Chassis (Mahindra Red) */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 2.0]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Engine Bonnet */}
      <mesh position={[0, 0.55, 0.6]} castShadow>
        <boxGeometry args={[0.9, 0.5, 0.9]} />
        <meshStandardMaterial color="#b91c1c" />
      </mesh>
      {/* Cabin Roll Cage */}
      <mesh position={[0, 1.0, -0.3]}>
        <boxGeometry args={[1.0, 0.7, 0.8]} />
        <meshStandardMaterial color="#18181b" wireframe />
      </mesh>
      {/* Big Rear Wheels */}
      <mesh position={[-0.7, 0.35, -0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.25, 12]} />
        <meshStandardMaterial color="#27272a" roughness={0.9} />
      </mesh>
      <mesh position={[0.7, 0.35, -0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.25, 12]} />
        <meshStandardMaterial color="#27272a" roughness={0.9} />
      </mesh>
      {/* Front Small Wheels */}
      <mesh position={[-0.6, 0.2, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.2, 12]} />
        <meshStandardMaterial color="#27272a" roughness={0.9} />
      </mesh>
      <mesh position={[0.6, 0.2, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.2, 12]} />
        <meshStandardMaterial color="#27272a" roughness={0.9} />
      </mesh>
      {/* Headlights */}
      <mesh position={[0.3, 0.65, 1.05]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-0.3, 0.65, 1.05]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

// 3D Coconut Trees along field bunds
function CoconutPalmTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Curved Trunk */}
      <mesh position={[0, 1.8, 0]} rotation={[0.08, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.12, 0.22, 3.6, 7]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      {/* Fronds Crown */}
      <group position={[0.2, 3.5, 0.1]}>
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx * Math.PI) / 4;
          return (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 0.7, 0.1, Math.sin(angle) * 0.7]}
              rotation={[0.5, angle, 0]}
              castShadow
            >
              <boxGeometry args={[0.15, 0.02, 1.4]} />
              <meshStandardMaterial color="#15803d" roughness={0.5} />
            </mesh>
          );
        })}
        {/* Coconuts Cluster */}
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.16, 6, 6]} />
          <meshStandardMaterial color="#a16207" />
        </mesh>
      </group>
    </group>
  );
}

// Main Interactive 3D Farm Scene
function InteractiveFarmScene({
  config,
  selectedPlot,
  onSelectPlot,
  cameraMode
}: {
  config: FarmerFarmConfig;
  selectedPlot: number | null;
  onSelectPlot: (plotIndex: number) => void;
  cameraMode: 'perspective' | 'top' | 'side';
}) {
  const isRice = config.cropId === 'crop-rice-paddy';

  // Soil substrate color based on config
  const soilColor = useMemo(() => {
    if (config.soilType.includes('Deltaic') || config.soilType.includes('வண்டல்')) return '#3d2514'; // rich alluvial
    if (config.soilType.includes('Black') || config.soilType.includes('கரிசல்')) return '#231f20'; // deep black vertisol
    if (config.soilType.includes('Red') || config.soilType.includes('செம்மண்')) return '#78350f'; // red loam
    return '#451a03';
  }, [config.soilType]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[12, 18, 10]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <hemisphereLight args={['#e0f2fe', '#022c22', 0.6]} />

      {/* Main Farmland Plot Substrate */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[18, 0.2, 18]} />
        <meshStandardMaterial color={soilColor} roughness={0.85} />
      </mesh>

      {/* Standing Water Film if Rice / Paddy */}
      {isRice && (
        <mesh position={[0, 0.03, 0]} receiveShadow>
          <boxGeometry args={[16.8, 0.02, 16.8]} />
          <meshStandardMaterial
            color="#0ea5e9"
            roughness={0.1}
            metalness={0.7}
            transparent
            opacity={0.4}
          />
        </mesh>
      )}

      {/* Field Bunds (வரப்பு) dividing plots */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[17.2, 0.2, 0.4]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[0.4, 0.2, 17.2]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>

      {/* 4 Quadrant Interactive Plots */}
      {[
        { id: 1, pos: [-4.2, 0, -4.2], name: 'Plot A (North-West)' },
        { id: 2, pos: [4.2, 0, -4.2], name: 'Plot B (North-East)' },
        { id: 3, pos: [-4.2, 0, 4.2], name: 'Plot C (South-West)' },
        { id: 4, pos: [4.2, 0, 4.2], name: 'Plot D (South-East)' }
      ].map((plot) => {
        const isSelected = selectedPlot === plot.id;
        return (
          <group key={plot.id} position={plot.pos as [number, number, number]}>
            {/* Clickable transparent target mesh */}
            <mesh
              position={[0, 0.15, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPlot(plot.id);
              }}
            >
              <boxGeometry args={[7.8, 0.3, 7.8]} />
              <meshStandardMaterial
                color={isSelected ? '#10b981' : '#ffffff'}
                transparent
                opacity={isSelected ? 0.25 : 0.001}
                wireframe={isSelected}
              />
            </mesh>

            {/* Simulated Crop Rows */}
            {[-2.5, -1.2, 0, 1.2, 2.5].map((zOffset, rIdx) => (
              <Procedural3DPlantRow
                key={rIdx}
                cropId={config.cropId}
                stageDays={config.growthStageDays}
                rowZ={zOffset}
                count={7}
              />
            ))}

            {/* Floating Plot Marker Tag */}
            <Html position={[0, 1.4, 0]} center distanceFactor={14}>
              <button
                onClick={() => onSelectPlot(plot.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition shadow-lg backdrop-blur-md cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-white border-emerald-300 scale-110 shadow-emerald-500/50'
                    : 'bg-black/70 text-gray-200 border-white/20 hover:border-emerald-400'
                }`}
              >
                {plot.name}
              </button>
            </Html>
          </group>
        );
      })}

      {/* Irrigation Canal with Flowing Water and Sluice Gate */}
      <CanalAndSluice isFlooded={isRice} />

      {/* Mahindra Tractor Moving on Side Pathway */}
      <FieldTractor />

      {/* Border Coconut Trees */}
      <CoconutPalmTree position={[-8.5, 0, -8]} />
      <CoconutPalmTree position={[-8.5, 0, -3]} />
      <CoconutPalmTree position={[-8.5, 0, 3]} />
      <CoconutPalmTree position={[-8.5, 0, 8]} />
      <CoconutPalmTree position={[8.5, 0, -8]} />
      <CoconutPalmTree position={[8.5, 0, 8]} />
    </>
  );
}

export default function PersonalizedDigitalFarm() {
  const [config, setConfig] = useState<FarmerFarmConfig>(DEFAULT_FARM_CONFIG);
  const [selectedPlot, setSelectedPlot] = useState<number | null>(1);
  const [cameraMode, setCameraMode] = useState<'perspective' | 'top' | 'side'>('perspective');
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);

  // Active crop metadata from verified TNAU database
  const activeCrop = useMemo(() => {
    return TNAU_CROPS_DATABASE.find((c) => c.id === config.cropId) || TNAU_CROPS_DATABASE[0];
  }, [config.cropId]);

  // Camera settings per mode
  const cameraProps = useMemo(() => {
    switch (cameraMode) {
      case 'top':
        return { position: [0, 22, 0.01] as [number, number, number], fov: 45 };
      case 'side':
        return { position: [0, 4, 18] as [number, number, number], fov: 40 };
      case 'perspective':
      default:
        return { position: [14, 12, 14] as [number, number, number], fov: 45 };
    }
  }, [cameraMode]);

  return (
    <div className="space-y-6">
      {/* Section Header with Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950/60 via-[#06180e] to-black border border-emerald-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Procedural 3D Farm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Digital Twin of Your Farm
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {config.village}, {config.district}, {config.state} • {config.acreage} Acres •{' '}
              {activeCrop.cropName} ({activeCrop.cropNameTa})
            </span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Camera View Mode Toggles */}
          <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl p-1">
            <button
              onClick={() => setCameraMode('perspective')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                cameraMode === 'perspective'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              360° Orbit
            </button>
            <button
              onClick={() => setCameraMode('top')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                cameraMode === 'top'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Top Plan
            </button>
            <button
              onClick={() => setCameraMode('side')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                cameraMode === 'side'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Side Elevation
            </button>
          </div>

          {/* Customize Farm Settings Button */}
          <button
            onClick={() => setShowConfigDrawer(!showConfigDrawer)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-emerald-200 text-xs font-bold transition shadow-lg"
          >
            <Sliders className="w-4 h-4" />
            <span>Farm Parameters</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Grid: 3D Canvas + Telemetry Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 3D Viewport (8 Cols) */}
        <div className="lg:col-span-8 bg-[#040e07] border border-emerald-900/40 rounded-3xl overflow-hidden shadow-2xl relative h-[560px] flex flex-col justify-between">
          {/* Viewport Floating HUD Tag */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time WebGL Simulation</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-gray-300 text-[11px]">
              {cameraMode.toUpperCase()} VIEW
            </div>
          </div>

          {/* 3D Canvas */}
          <Canvas shadows camera={cameraProps} className="w-full h-full">
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              maxPolarAngle={cameraMode === 'top' ? 0.05 : Math.PI / 2.05}
              minDistance={5}
              maxDistance={35}
            />
            <InteractiveFarmScene
              config={config}
              selectedPlot={selectedPlot}
              onSelectPlot={setSelectedPlot}
              cameraMode={cameraMode}
            />
          </Canvas>

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10 text-xs text-gray-300">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>Click on any plot marker to inspect soil, NPK, and water telemetry.</span>
            </div>

            <div className="pointer-events-auto flex items-center gap-3 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-white/10 text-xs">
              <span className="text-gray-400">Crop Stage:</span>
              <span className="text-emerald-400 font-bold">
                Day {config.growthStageDays} (Active Tillering / Panicle Initiation)
              </span>
            </div>
          </div>
        </div>

        {/* Right Telemetry & Agronomic Prescription Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Plot Telemetry Card */}
          <div className="bg-gradient-to-b from-[#071f11] via-[#05170d] to-black border border-emerald-500/30 rounded-3xl p-5 space-y-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Telemetry & Data Lineage
                </span>
                <h3 className="text-lg font-black text-white">
                  Plot {selectedPlot ? (['A', 'B', 'C', 'D'][selectedPlot - 1]) : 'A'} Telemetry
                </h3>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                ACTIVE SENSORS
              </div>
            </div>

            {/* Data Lineage Badges Explained */}
            <div className="grid grid-cols-3 gap-1.5 text-[9px] font-semibold text-center">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/30">
                [User-Entered]
              </div>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30">
                [Estimated / Model]
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                [TNAU Verified]
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/40 border border-white/5 rounded-2xl p-3 space-y-1">
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span>Soil Moisture</span>
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-xl font-black text-white">78%</div>
                <div className="text-[10px] text-emerald-400 font-medium">
                  Optimal • Pani Pipe Safe
                </div>
                <div className="text-[9px] text-amber-400/80">[Estimated / Model]</div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-2xl p-3 space-y-1">
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span>Soil Temperature</span>
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-xl font-black text-white">28.4°C</div>
                <div className="text-[10px] text-gray-300 font-medium">Deltaic Ambient</div>
                <div className="text-[9px] text-amber-400/80">[Estimated / Model]</div>
              </div>
            </div>

            {/* STCR-IPNS Prescription Equation */}
            <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>STCR-IPNS Fertilizer Prescription</span>
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  [TNAU Verified]
                </span>
              </div>
              <div className="text-[11px] font-mono bg-black/60 p-2.5 rounded-xl text-emerald-300 border border-emerald-900/40 overflow-x-auto">
                {activeCrop.stcrEquation.formula}
              </div>
              <p className="text-[10px] text-gray-300 leading-relaxed">
                Target Yield: <strong className="text-white">{activeCrop.stcrEquation.targetYieldTonsHa} t/ha</strong>.
                Formula accounts for initial soil NPK test values and green manure biomass.
              </p>
            </div>

            {/* Weed Management Window */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-lime-400" />
                  <span>TNAU Weed Protocol</span>
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  [TNAU CPG 2020]
                </span>
              </div>
              <p className="text-[11px] text-gray-300 leading-snug">
                <strong className="text-white">{activeCrop.weedManagement.preEmergence.chemical}</strong> @{' '}
                {activeCrop.weedManagement.preEmergence.dosePerHa} at{' '}
                {activeCrop.weedManagement.preEmergence.sprayTimingDays}.
              </p>
            </div>

            {/* Pest Early Warning */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Major Pest Watch (ETL)</span>
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  [TNAU ETL Rule]
                </span>
              </div>
              <div className="text-[11px] text-gray-200">
                <div className="font-bold text-amber-300">{activeCrop.majorPests[0]?.name}</div>
                <div className="text-[10px] text-gray-400 pt-0.5">
                  ETL: {activeCrop.majorPests[0]?.etl}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Farm Configuration Modal / Drawer */}
      {showConfigDrawer && (
        <div className="bg-[#06180d] border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Customize Farm Coordinates & Inputs</h3>
            </div>
            <button
              onClick={() => setShowConfigDrawer(false)}
              className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-300"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* State */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">State [User-Entered]</label>
              <select
                value={config.state}
                onChange={(e) => setConfig({ ...config, state: e.target.value })}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="Tamil Nadu">Tamil Nadu (தமிழ்நாடு)</option>
                <option value="Punjab">Punjab</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>

            {/* District */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">District [User-Entered]</label>
              <input
                type="text"
                value={config.district}
                onChange={(e) => setConfig({ ...config, district: e.target.value })}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
                placeholder="e.g. Thanjavur, Coimbatore"
              />
            </div>

            {/* Village */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">Village / Locality</label>
              <input
                type="text"
                value={config.village}
                onChange={(e) => setConfig({ ...config, village: e.target.value })}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
                placeholder="e.g. Papanasam"
              />
            </div>

            {/* Acreage */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">Land Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="100"
                value={config.acreage}
                onChange={(e) => setConfig({ ...config, acreage: parseFloat(e.target.value) || 1 })}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            {/* Main Crop */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">Primary Crop Selection</label>
              <select
                value={config.cropId}
                onChange={(e) => setConfig({ ...config, cropId: e.target.value })}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
              >
                {TNAU_CROPS_DATABASE.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {crop.cropName} ({crop.cropNameTa})
                  </option>
                ))}
              </select>
            </div>

            {/* Soil Type */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">Soil Type</label>
              <select
                value={config.soilType}
                onChange={(e) => setConfig({ ...config, soilType: e.target.value })}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="Deltaic Alluvium (வண்டல் மண்)">Deltaic Alluvium (வண்டல் மண்)</option>
                <option value="Red Gravelly Loam (செம்மண்)">Red Gravelly Loam (செம்மண்)</option>
                <option value="Deep Black Vertisol (கரிசல் மண்)">Deep Black Vertisol (கரிசல் மண்)</option>
                <option value="Sandy Loam (மணல் சார்ந்த மண்)">Sandy Loam (மணல் சார்ந்த மண்)</option>
              </select>
            </div>

            {/* Irrigation Source */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">Water Source / Irrigation</label>
              <select
                value={config.waterSource}
                onChange={(e) => setConfig({ ...config, waterSource: e.target.value })}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="Canal & Sluice Gate + Filter-point Tube-well">
                  Canal & Sluice Gate + Filter-point Tube-well
                </option>
                <option value="Deep Borewell with Submersible Pump">
                  Deep Borewell with Submersible Pump
                </option>
                <option value="Drip Fertigation System (சொட்டு நீர் பாசனம்)">
                  Drip Fertigation System (சொட்டு நீர் பாசனம்)
                </option>
                <option value="Open Dug Well with Solar Pump">Open Dug Well with Solar Pump</option>
              </select>
            </div>

            {/* Crop Growth Stage Slider */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-gray-400 font-semibold">Growth Stage (Days)</label>
                <span className="text-emerald-400 font-bold">{config.growthStageDays} Days</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                value={config.growthStageDays}
                onChange={(e) => setConfig({ ...config, growthStageDays: parseInt(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
