import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { CAMERA_POSITIONS } from '../../utils/cameraPositions'

const DURATION = 3

export function CameraController({ scrollValue, isZooming, tableauPosition, enableOrbit }) {
  const cameraRef = useRef(null)
  const currentLookAt = useRef(new THREE.Vector3())
  const time = useRef(0)
  const targetT = useRef(0)
  const currentT = useRef(0)

  const positionCurve = useRef(
    new THREE.CatmullRomCurve3(
      CAMERA_POSITIONS.map(p => new THREE.Vector3(...p.position)),
      false,
      'catmullrom',
      0.5
    )
  )

  const lookAtCurve = useRef(
    new THREE.CatmullRomCurve3(
      CAMERA_POSITIONS.map(p => new THREE.Vector3(...p.lookAt)),
      false,
      'catmullrom',
      0.5
    )
  )

  useEffect(() => {
    const max = CAMERA_POSITIONS.length - 1
    targetT.current = THREE.MathUtils.clamp(scrollValue / max, 0, 1)
  }, [scrollValue])

  useFrame((_, delta) => {
    if (!cameraRef.current || enableOrbit) return

    if (isZooming) {
      cameraRef.current.position.lerp(
        new THREE.Vector3(tableauPosition[0], tableauPosition[1], tableauPosition[2] + 0.3),
        delta * 3
      )
      currentLookAt.current.lerp(new THREE.Vector3(...tableauPosition), delta * 3)
    } else {
      const diff = targetT.current - currentT.current

      if (Math.abs(diff) > 0.0005) {
        const speed = delta / DURATION
        currentT.current += Math.sign(diff) * speed
        currentT.current = THREE.MathUtils.clamp(currentT.current, 0, 1)
      } else {
        currentT.current = targetT.current
      }


      const pos = positionCurve.current.getPointAt(currentT.current)
      const lookAt = lookAtCurve.current.getPointAt(currentT.current)

      cameraRef.current.position.copy(pos)
      currentLookAt.current.copy(lookAt)
    }

    cameraRef.current.lookAt(currentLookAt.current)
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 5]} />
      {enableOrbit && <OrbitControls enableDamping />}
    </>
  )
}
