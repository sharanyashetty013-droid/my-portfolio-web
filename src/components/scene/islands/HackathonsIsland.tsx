import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TropicalIslandBase } from '../common/TropicalIslandBase';
import { WoodenPier, CurvedPalm, WoodenBarrel, LowPolyBoulder, DriftingHoverRocks } from '../common/StyleRefDecor';
import { HackathonItem } from '../../../types/portfolio';
import { portfolioData } from '../../../data/portfolioData';
import { ISLAND_LAYOUT } from '../../../constants/islandLayout';

interface HackathonsIslandProps {
  isActive: boolean;
  isAnyModalOpen: boolean;
  onSelectHackathon: (h: HackathonItem) => void;
  reducedMotion?: boolean;
}

// Ultra-concise labels and distinct tiered heights to eliminate all visual overlap and merging
const HACKATHON_META: Record<string, { shortName: string; tagHeight: number }> = {
  'mst-buildathon': { shortName: 'MST Build', tagHeight: 1.0 },
  'infinity-hacks': { shortName: 'Infinity', tagHeight: 2.1 },
  'inceptio-hackathon': { shortName: 'Inceptio', tagHeight: 2.9 },
  'ibm-z-datathon': { shortName: 'IBM Z', tagHeight: 1.15 },
  'boss-battle': { shortName: 'Boss Battle', tagHeight: 2.35 },
  'sih-2026': { shortName: "SIH '26", tagHeight: 2.0 },
};

const HackathonPodium: React.FC<{
  hackathon: HackathonItem;
  isActive: boolean;
  isAnyModalOpen: boolean;
  onSelect: (h: HackathonItem) => void;
  reducedMotion?: boolean;
}> = ({ hackathon, isActive, isAnyModalOpen, onSelect, reducedMotion = false }) => {
  const [hovered, setHovered] = useState(false);
  const trophyRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (trophyRef.current && !reducedMotion) {
      trophyRef.current.rotation.y += delta * (hovered ? 2.0 : 0.6);
      const targetScale = hovered ? 1.15 : 1.0;
      trophyRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    }
  });

  const stepHeight = hackathon.podiumHeight;
  const isInternalFinals = hackathon.badge === 'Internal finals';
  const meta = HACKATHON_META[hackathon.id] || { shortName: hackathon.name, tagHeight: 1.8 };
  const tagPosY = stepHeight + meta.tagHeight;

  return (
    <group
      position={hackathon.slotPosition}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(hackathon);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (!isAnyModalOpen) {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Stone Pedestal Cylinder */}
      <mesh position={[0, stepHeight / 2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.9, 1.05, stepHeight, 8]} />
        <meshStandardMaterial
          color={isInternalFinals ? '#CBD5E1' : '#E2E8F0'}
          roughness={0.7}
          flatShading
        />
      </mesh>

      {/* Rim Ring */}
      <mesh position={[0, stepHeight, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.05, 8]} />
        <meshStandardMaterial
          color={isInternalFinals ? '#3B82F6' : '#94A3B8'}
          metalness={0.5}
          roughness={0.4}
          flatShading
        />
      </mesh>

      {/* Stylized Low-Poly Trophy on top */}
      <group ref={trophyRef} position={[0, stepHeight + 0.15, 0]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.32, 0.28, 6]} />
          <meshStandardMaterial color="#64748B" roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.11, 0.32, 6]} />
          <meshStandardMaterial
            color={isInternalFinals ? '#60A5FA' : '#94A3B8'}
            metalness={0.6}
            roughness={0.3}
            flatShading
          />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow>
          <octahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial
            color={isInternalFinals ? '#3B82F6' : '#94A3B8'}
            metalness={0.65}
            roughness={0.3}
            flatShading
          />
        </mesh>
        {hovered && (
          <pointLight
            position={[0, 1.0, 0]}
            color={isInternalFinals ? '#60A5FA' : '#94A3B8'}
            intensity={1.8}
            distance={4}
          />
        )}
      </group>

      {/* Non-overlapping Staggered Interactive Pill Tag */}
      <Html
        position={[0, tagPosY, 0]}
        center
        distanceFactor={30}
        zIndexRange={[hovered ? 60 : 20, 0]}
      >
        <div
          style={{ display: isActive && !isAnyModalOpen ? 'block' : 'none' }}
          onClick={() => onSelect(hackathon)}
          className="cursor-pointer select-none transition-transform duration-200"
        >
          <div className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all ${
            hovered
              ? 'bg-white text-slate-900 border border-teal-300 ring-2 ring-teal-400 shadow-xl scale-105 z-50'
              : 'bg-white/95 text-slate-700 backdrop-blur-xs border border-slate-200/90 shadow-sm hover:border-slate-300'
          }`}>
            <span
              className={`w-2 h-2 rounded-full shrink-0 shadow-xs ${
                isInternalFinals ? 'bg-blue-500' : 'bg-teal-500'
              }`}
            />
            <span className="text-xs font-bold tracking-tight">
              {hovered ? hackathon.name : meta.shortName}
            </span>
            {hovered && (
              <span className="text-[10px] text-teal-600 font-medium pl-1.5 border-l border-slate-200">
                {hackathon.badge}
              </span>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
};

export const HackathonsIsland: React.FC<HackathonsIslandProps> = ({
  isActive,
  isAnyModalOpen,
  onSelectHackathon,
  reducedMotion = false,
}) => {
  const config = ISLAND_LAYOUT.hackathons;
  const { hackathons } = portfolioData;

  return (
    <group>
      {/* 1. Procedural Sand Disc Top & Tall Faceted Cliff into Water */}
      <TropicalIslandBase config={config} />

      {/* 2. Wooden Pier Stilt Dock meeting the boat waypoint */}
      <WoodenPier
        position={[
          config.pierPosition[0] - config.position[0],
          0,
          config.pierPosition[2] - config.position[2],
        ]}
        rotation={[0, 0.45, 0]}
      />

      {/* 3. Island Surface Props */}
      <group position={[config.position[0], config.height, config.position[2]]}>
        {/* Snowy Low-Poly Mountain Peak positioned at center-back */}
        <group position={[0, 0, -2.5]}>
          <mesh position={[0, 3.0, 0]} castShadow receiveShadow>
            <coneGeometry args={[4.2, 6.2, 7]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.85} flatShading />
          </mesh>
          <mesh position={[0, 4.85, 0]} castShadow>
            <coneGeometry args={[2.1, 2.5, 7]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} flatShading />
          </mesh>
          {/* Summit Flag */}
          <mesh position={[0, 6.4, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.2, 4]} />
            <meshStandardMaterial color="#8D6B4F" />
          </mesh>
          <mesh position={[0.3, 6.7, 0]}>
            <boxGeometry args={[0.5, 0.3, 0.02]} />
            <meshStandardMaterial color="#EF4444" flatShading />
          </mesh>
        </group>

        {/* 6 Real Hackathon Podiums with Non-Overlapping Pill Tags */}
        {hackathons.map((h) => (
          <HackathonPodium
            key={h.id}
            hackathon={h}
            isActive={isActive}
            isAnyModalOpen={isAnyModalOpen}
            onSelect={onSelectHackathon}
            reducedMotion={reducedMotion}
          />
        ))}

        {/* Palms */}
        <CurvedPalm position={[-5.0, 0, -4.5]} rotation={[0, 0.6, 0]} scale={1.15} />
        <CurvedPalm position={[5.0, 0, -4.5]} rotation={[0, -0.6, 0]} scale={1.15} />
        <CurvedPalm position={[-6.8, 0, 0.5]} rotation={[0, 0.3, 0]} scale={1.05} />
        <CurvedPalm position={[6.8, 0, 0.5]} rotation={[0, -0.3, 0]} scale={1.05} />

        {/* Barrels & Rocky Boulders */}
        <WoodenBarrel position={[-1.8, 0, 2.2]} />
        <LowPolyBoulder position={[0, 0, 3.0]} scale={0.9} />
        <LowPolyBoulder position={[-2.0, 0, 1.5]} scale={0.7} />
        <LowPolyBoulder position={[2.2, 0, 1.8]} scale={0.75} />
      </group>

      {/* 4. Drifting Hover Rocks along cliff perimeter */}
      <DriftingHoverRocks
        center={config.position}
        radius={config.radius}
        count={8}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};
