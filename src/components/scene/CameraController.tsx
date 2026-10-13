import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { SectionId } from '../../types/portfolio';
import { ISLAND_LAYOUT } from '../../constants/islandLayout';

interface CameraControllerProps {
  activeSection: SectionId;
  boatPos: THREE.Vector3;
  boatForward: THREE.Vector3;
  isSailing: boolean;
  reducedMotion?: boolean;
  isAnyModalOpen?: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  activeSection,
  boatPos,
  boatForward,
  isSailing,
  reducedMotion = false,
  isAnyModalOpen = false,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const config = ISLAND_LAYOUT[activeSection];

  // Desired docked camera framing
  const targetCamPosRef = useRef(new THREE.Vector3(...config.cameraPos));
  const targetLookAtRef = useRef(new THREE.Vector3(...config.targetPos));

  // Current interpolated look-at point
  const currentLookAtRef = useRef(new THREE.Vector3(...config.targetPos));

  useEffect(() => {
    targetCamPosRef.current.set(...config.cameraPos);
    targetLookAtRef.current.set(...config.targetPos);
  }, [config]);

  useFrame((_, delta) => {
    if (reducedMotion) {
      if (!isSailing && controlsRef.current) {
        controlsRef.current.target.copy(targetLookAtRef.current);
      }
      return;
    }

    if (isSailing) {
      // 1. SAILING MODE: follow boat from behind and above at ~40 degrees
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }

      const backDist = 17.0;
      const heightOffset = 10.5;
      const lookAheadDist = 7.0;

      const desiredPos = boatPos
        .clone()
        .sub(boatForward.clone().multiplyScalar(backDist))
        .add(new THREE.Vector3(0, heightOffset, 0));

      const desiredLookAt = boatPos
        .clone()
        .add(boatForward.clone().multiplyScalar(lookAheadDist))
        .add(new THREE.Vector3(0, 1.2, 0));

      // Smooth lag dampening
      camera.position.lerp(desiredPos, Math.min(1, delta * 3.5));
      currentLookAtRef.current.lerp(desiredLookAt, Math.min(1, delta * 4.5));
      camera.lookAt(currentLookAtRef.current);
    } else {
      // 2. DOCKED MODE: ease to island framing and enable gentle OrbitControls
      const lerpSpeed = Math.min(1, delta * 2.8);
      if (controlsRef.current) {
        controlsRef.current.enabled = !isAnyModalOpen;
        // Smoothly transition target lookAt
        controlsRef.current.target.lerp(targetLookAtRef.current, lerpSpeed);
        // If camera is still far from target docked position, ease into it
        if (camera.position.distanceTo(targetCamPosRef.current) > 0.4) {
          camera.position.lerp(targetCamPosRef.current, lerpSpeed);
        }
        controlsRef.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableRotate={!isSailing && !isAnyModalOpen}
      minDistance={14}
      maxDistance={65}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.15} // Prevent camera going below water level
      dampingFactor={0.05}
      rotateSpeed={0.7}
      zoomSpeed={0.8}
    />
  );
};
