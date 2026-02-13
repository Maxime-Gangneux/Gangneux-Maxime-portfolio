'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type DebugSpotLightProps = JSX.IntrinsicElements['spotLight'] & {
  targetPosition: [number, number, number]
}

export function DebugSpotLight({ targetPosition, ...props }: DebugSpotLightProps) {
  const lightRef = useRef<THREE.SpotLight>(null)
  const targetRef = useRef<THREE.Object3D>(null)
  const lineRef = useRef<THREE.Line>(null)

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current
    }
  }, [])
  
  useFrame(() => {
    if (!lightRef.current || !targetRef.current || !lineRef.current) return

    const positions = (lineRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array

    positions[0] = lightRef.current.position.x
    positions[1] = lightRef.current.position.y
    positions[2] = lightRef.current.position.z
    positions[3] = targetRef.current.position.x
    positions[4] = targetRef.current.position.y
    positions[5] = targetRef.current.position.z

    // 👇 Forcer TS à reconnaître que c'est bien un Float32Array
    for (let i = 0; i < 6; i++) {
      positions[i] = Number(positions[i])
    }

    (lineRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
  })


  return (
    <>
      <spotLight ref={lightRef} {...props} />
      <object3D ref={targetRef} position={targetPosition} />
      {/* Décommente si tu veux voir la ligne
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={2} array={new Float32Array(6)} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="hotpink" />
      </line>
      */}
    </>
  )
}
