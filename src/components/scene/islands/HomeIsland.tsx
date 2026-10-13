import React, { useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { TropicalIslandBase } from '../common/TropicalIslandBase';
import { 
  BluePlankCabin, 
  WoodenPier, 
  RowingBoat, 
  CurvedPalm, 
  WoodenBarrel, 
  WoodenCrate, 
  LowPolyBoulder, 
  TropicalFern, 
  DriftingHoverRocks, 
  CirclingHotAirBalloon 
} from '../common/StyleRefDecor';
import { PondWaterfall } from '../common/PondWaterfall';
import { ISLAND_LAYOUT } from '../../../constants/islandLayout';
import { SectionId } from '../../../types/portfolio';

interface HomeIslandProps {
  isActive?: boolean;
  isAnyModalOpen?: boolean;
  onNavigate?: (section: SectionId) => void;
  onOpenResume?: () => void;
  reducedMotion?: boolean;
}

export const HomeIsland: React.FC<HomeIslandProps> = ({ 
  isActive = true,
  isAnyModalOpen = false,
  onNavigate,
  onOpenResume,
  reducedMotion = false 
}) => {
  const config = ISLAND_LAYOUT.home;
  const [cabinHovered, setCabinHovered] = useState(false);
  const [pierHovered, setPierHovered] = useState(false);
  const [waterfallHovered, setWaterfallHovered] = useState(false);

  return (
    <group>
      {/* 1. Procedural Sand Disc Top & Tall Faceted Columnar Cliff into Water */}
      <TropicalIslandBase config={config} />

      {/* 2. Cobblestone Pathway / Plateau Plaza around Cabin */}
      <group position={[config.position[0], config.height, config.position[2]]}>
        <mesh position={[0.2, 0.02, -1.2]} receiveShadow>
          <cylinderGeometry args={[2.8, 3.1, 0.05, 12]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.8} flatShading />
        </mesh>

        {/* Stone Stepping Stones leading toward Pier */}
        {[-1.8, -3.0, -4.2].map((x, i) => (
          <mesh key={i} position={[x, 0.03, 1.2 + i * 0.8]} receiveShadow>
            <cylinderGeometry args={[0.55, 0.6, 0.06, 7]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.85} flatShading />
          </mesh>
        ))}

        {/* Cozy Lantern Post on Plateau */}
        <mesh position={[2.2, 0.9, -0.2]} castShadow>
          <cylinderGeometry args={[0.07, 0.09, 1.8, 6]} />
          <meshStandardMaterial color="#8D6B4F" />
        </mesh>
        <mesh position={[2.2, 1.85, -0.2]}>
          <boxGeometry args={[0.26, 0.32, 0.26]} />
          <meshStandardMaterial color="#FEF3C7" emissive="#FDE047" emissiveIntensity={0.8} />
        </mesh>
        <pointLight position={[2.2, 1.85, -0.2]} color="#FEF3C7" intensity={1.6} distance={6} />
      </group>

      {/* 3. Blue Vertical-Plank Cabin on Sand Plateau */}
      <group position={[config.position[0], 0, config.position[2]]}>
        <BluePlankCabin
          position={[0.2, config.height, -1.2]}
          rotation={[0, 0.35, 0]}
          signText="Sharanya L Shetty"
        />

        {/* Interactive 3D Pin on Cabin */}
        {isActive && !isAnyModalOpen && (
          <Html
            position={[0.2, config.height + 3.8, -1.2]}
            center
            distanceFactor={22}
            zIndexRange={[100, 0]}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onOpenResume?.();
              }}
              onMouseEnter={() => setCabinHovered(true)}
              onMouseLeave={() => setCabinHovered(false)}
              className="group cursor-pointer select-none transition-all duration-300 transform -translate-y-1/2"
            >
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  cabinHovered
                    ? 'bg-white text-slate-900 border border-teal-300 ring-2 ring-teal-400 shadow-xl scale-105'
                    : 'bg-white/95 text-slate-700 backdrop-blur-xs border border-slate-200/90 shadow-sm'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#1AA6A6] shadow-xs animate-pulse" />
                <span className="text-xs font-bold tracking-tight">Sharanya's Haven</span>
                <span className="text-[10px] text-teal-600 font-medium pl-1.5 border-l border-slate-200">
                  {cabinHovered ? 'Click to View CV' : 'NMAMIT • 9.36'}
                </span>
              </div>
            </div>
          </Html>
        )}
      </group>

      {/* 4. Wooden Pier on Stilts with Stairs down to Water Level */}
      <WoodenPier
        position={[-6.8, 0, 4.2]}
        rotation={[0, 0.52, 0]}
      />

      {/* Interactive 3D Pin at the Pier */}
      {isActive && !isAnyModalOpen && (
        <group position={[-6.8, 0, 4.2]}>
          <Html
            position={[0, 2.4, 0]}
            center
            distanceFactor={22}
            zIndexRange={[100, 0]}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onNavigate?.('skills');
              }}
              onMouseEnter={() => setPierHovered(true)}
              onMouseLeave={() => setPierHovered(false)}
              className="group cursor-pointer select-none transition-all duration-300 transform -translate-y-1/2"
            >
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  pierHovered
                    ? 'bg-white text-slate-900 border border-teal-300 ring-2 ring-teal-400 shadow-xl scale-105'
                    : 'bg-white/95 text-slate-700 backdrop-blur-xs border border-slate-200/90 shadow-sm'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#F2765D] shadow-xs" />
                <span className="text-xs font-bold tracking-tight">Departure Pier</span>
                <span className="text-[10px] text-teal-600 font-medium pl-1.5 border-l border-slate-200">
                  {pierHovered ? 'Sail to Chapter 2' : 'Set Sail'}
                </span>
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* 5. Moored Low-Poly Rowing Boats at the Pier */}
      {/* Boat A: Butter Yellow */}
      <RowingBoat
        position={[-11.2, 0.05, 5.8]}
        rotation={[0.04, 0.85, -0.05]}
        scale={0.95}
        hullColor="#FDE047"
        stripeColor="#FFF3D6"
        innerColor="#FFF3D6"
        hasOars={true}
      />
      {/* Boat B: Mint */}
      <RowingBoat
        position={[-8.4, 0.05, 11.2]}
        rotation={[-0.05, 1.25, 0.04]}
        scale={0.9}
        hullColor="#6EE7B7"
        stripeColor="#FFF3D6"
        innerColor="#FFF3D6"
        hasOars={true}
      />
      {/* Boat C: Sky Blue */}
      <RowingBoat
        position={[-12.8, 0.05, 2.2]}
        rotation={[0.02, 0.5, 0.03]}
        scale={0.9}
        hullColor="#7DD3FC"
        stripeColor="#FFF3D6"
        innerColor="#FFF3D6"
        hasOars={true}
      />

      {/* 6. Scenic Pond with Waterfall Pouring Over Cliff Edge into the Sea */}
      <PondWaterfall
        islandHeight={config.height}
        islandRadius={config.radius}
        reducedMotion={reducedMotion}
      />

      {/* Interactive 3D Pin at the Waterfall */}
      {isActive && !isAnyModalOpen && (
        <group position={[config.position[0], config.height, config.position[2]]}>
          <Html
            position={[config.radius * 0.72, 2.2, 0]}
            center
            distanceFactor={24}
            zIndexRange={[90, 0]}
          >
            <div
              onMouseEnter={() => setWaterfallHovered(true)}
              onMouseLeave={() => setWaterfallHovered(false)}
              className="select-none transition-all duration-300"
            >
              <div
                className={`flex items-center gap-2 px-2.5 py-1 rounded-full transition-all duration-200 ${
                  waterfallHovered
                    ? 'bg-white text-slate-900 border border-teal-300 shadow-lg scale-105'
                    : 'bg-white/90 text-slate-700 backdrop-blur-xs border border-slate-200/90 shadow-xs'
                }`}
              >
                <span className="w-2 h-2 rounded-full shrink-0 bg-[#4CC9C0]" />
                <span className="text-xs font-bold tracking-tight">Audacity Falls</span>
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* 7. Curved Tropical Palm Trees with Bright Fronds */}
      <CurvedPalm
        position={[4.2, config.height, 1.8]}
        rotation={[0, 0.4, 0]}
        scale={1.05}
      />
      <CurvedPalm
        position={[1.2, config.height, -6.2]}
        rotation={[0, -1.8, 0]}
        scale={1.25}
      />
      <CurvedPalm
        position={[6.4, config.height, -2.0]}
        rotation={[0, 1.2, 0]}
        scale={0.75}
      />

      {/* 8. Props on Sand Plateau (Barrels, Crates, Boulders, Ferns) */}
      <WoodenBarrel position={[1.8, config.height, 0.5]} rotation={[0, 0.2, 0]} />
      <WoodenBarrel position={[2.3, config.height, 0.2]} rotation={[0, -0.4, 0]} scale={0.85} />
      <WoodenCrate position={[-3.2, config.height, 1.6]} rotation={[0, 0.3, 0]} />
      <WoodenCrate position={[-3.2, config.height + 0.75, 1.6]} rotation={[0, 0.5, 0]} scale={0.8} />
      <WoodenCrate position={[-3.9, config.height, 1.1]} rotation={[0, -0.2, 0]} scale={0.9} />
      <LowPolyBoulder position={[-1.2, config.height, 1.8]} scale={0.7} />
      <LowPolyBoulder position={[3.2, config.height, -1.8]} scale={1.1} />
      <LowPolyBoulder position={[4.6, config.height, -0.8]} scale={0.8} />
      <LowPolyBoulder position={[-4.5, config.height, -2.5]} scale={1.2} />
      <LowPolyBoulder position={[0.5, config.height, 4.2]} scale={0.65} />
      <TropicalFern position={[1.2, config.height, 2.4]} scale={1.2} />
      <TropicalFern position={[5.2, config.height, 0.4]} scale={0.9} />
      <TropicalFern position={[-2.2, config.height, -3.2]} scale={1.0} />

      {/* 9. Hovering Drifting Rocks along cliff perimeter */}
      <DriftingHoverRocks
        center={config.position}
        radius={config.radius}
        count={8}
        reducedMotion={reducedMotion}
      />

      {/* 10. Circling Hot Air Balloon overhead */}
      <CirclingHotAirBalloon
        center={config.position}
        orbitRadius={16}
        flightHeight={13}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};
