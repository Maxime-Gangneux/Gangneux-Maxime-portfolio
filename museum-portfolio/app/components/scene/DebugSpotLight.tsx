import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function DebugSpotLight({ targetPosition, ...props }) {
  const lightRef = useRef(null)
  const targetRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current
    }
  }, [])

  useFrame(() => {
    if (!lightRef.current || !targetRef.current || !lineRef.current) return
    const positions = lineRef.current.geometry.attributes.position.array
    positions[0] = lightRef.current.position.x
    positions[1] = lightRef.current.position.y
    positions[2] = lightRef.current.position.z
    positions[3] = targetRef.current.position.x
    positions[4] = targetRef.current.position.y
    positions[5] = targetRef.current.position.z
    lineRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <>
      <spotLight ref={lightRef} {...props} />
      <object3D ref={targetRef} position={targetPosition} />
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={2} array={new Float32Array(6)} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="hotpink" />
      </line>
    </>
  )
}
