'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, useGLTF, Environment } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { TableauIntro } from './components/tableauIntro'
import { FullPageView } from './components/Fullpageview'
import * as THREE from 'three'

function Museum() {
  const gltf = useGLTF('/museum.gltf', true)
  return <primitive object={gltf.scene} scale={0.5} />
}

const CAMERA_POSITIONS = [
  { position: [-1.3, 1.2, 5], lookAt: [-1.3, 1.2, 0] },
  { position: [-1.3, 1.2, 3], lookAt: [-1.3, 1.2, 0] },
  { position: [4, 2, 5], lookAt: [4, 1, 0] },
  { position: [1, 1.5, 0.5], lookAt: [0, 1.5, 0.5] },
  { position: [3, 2, -3], lookAt: [0, 1, 0] },
  { position: [0, 2, -5], lookAt: [0, 1, 0] },
  { position: [-3, 2, -3], lookAt: [0, 1, 0] },
  { position: [-5, 2, 0], lookAt: [0, 1, 0] },
  { position: [-3, 2, 3], lookAt: [0, 1, 0] },
]

type CameraControllerProps = {
  scrollValue: number
  isZooming: boolean
  tableauPosition: [number, number, number]
}

function CameraController({ scrollValue, isZooming, tableauPosition }: CameraControllerProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 0))
  const zoomProgress = useRef(0)

  useEffect(() => {
    if (!cameraRef.current || isZooming) return
    const maxIndex = CAMERA_POSITIONS.length - 1
    const clampedScroll = Math.max(0, Math.min(scrollValue, maxIndex))
    const currentIndex = Math.floor(clampedScroll)
    const nextIndex = Math.min(currentIndex + 1, maxIndex)
    const t = clampedScroll - currentIndex

    const startPos = CAMERA_POSITIONS[currentIndex]
    const endPos = CAMERA_POSITIONS[nextIndex]

    targetPosition.current.set(
      THREE.MathUtils.lerp(startPos.position[0], endPos.position[0], t),
      THREE.MathUtils.lerp(startPos.position[1], endPos.position[1], t),
      THREE.MathUtils.lerp(startPos.position[2], endPos.position[2], t)
    )

    targetLookAt.current.set(
      THREE.MathUtils.lerp(startPos.lookAt[0], endPos.lookAt[0], t),
      THREE.MathUtils.lerp(startPos.lookAt[1], endPos.lookAt[1], t),
      THREE.MathUtils.lerp(startPos.lookAt[2], endPos.lookAt[2], t)
    )
  }, [scrollValue, isZooming])

  useFrame((state, delta) => {
    if (!cameraRef.current) return

    if (isZooming) {
      zoomProgress.current = Math.min(zoomProgress.current + delta * 1.5, 1)
      const eased = easeInOutCubic(zoomProgress.current)
      const zoomTarget = new THREE.Vector3(
        tableauPosition[0],
        tableauPosition[1],
        tableauPosition[2] + 0.3
      )
      cameraRef.current.position.lerp(zoomTarget, eased)
      const lookTarget = new THREE.Vector3(...tableauPosition)
      currentLookAt.current.lerp(lookTarget, eased)
      cameraRef.current.lookAt(currentLookAt.current)
    } else {
      if (zoomProgress.current > 0) zoomProgress.current = Math.max(zoomProgress.current - delta * 1.5, 0)
      cameraRef.current.position.lerp(targetPosition.current, 0.1)
      currentLookAt.current.lerp(targetLookAt.current, 0.1)
      cameraRef.current.lookAt(currentLookAt.current)
    }
  })

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 5]} />
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function Page() {
  const [scrollValue, setScrollValue] = useState(0)
  const [isFullPageOpen, setIsFullPageOpen] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  const scrollSpeed = 0.5
  const tableauPosition: [number, number, number] = [-1.286, 1.085, 0.36]

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isFullPageOpen || isZooming) return
      e.preventDefault()
      setScrollValue(prev => {
        const newValue = prev + (e.deltaY > 0 ? scrollSpeed : -scrollSpeed)
        return Math.max(0, Math.min(newValue, CAMERA_POSITIONS.length - 1))
      })
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isFullPageOpen, isZooming])

  const handleZoomToTableau = () => {
    setIsZooming(true)
    setTimeout(() => setIsFullPageOpen(true), 800)
  }

  const handleCloseFullPage = () => {
    setIsFullPageOpen(false)
    setTimeout(() => setIsZooming(false), 100)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {!isFullPageOpen && (
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
          <CameraController scrollValue={scrollValue} isZooming={isZooming} tableauPosition={tableauPosition} />

          {/* Lumière générale */}
          <ambientLight intensity={1} color={0xfff7e8} />

          {/* Spots autour de la scène (plafond) */}
          <spotLight position={[-8, 5, -8]} angle={Math.PI / 6} intensity={2} penumbra={0.5} castShadow color={0xfff1dc} />
          <spotLight position={[5, 5, -8]} angle={Math.PI / 6} intensity={2} penumbra={0.5} castShadow color={0xfff1dc} />
          <spotLight position={[-8, 5, 5]} angle={Math.PI / 6} intensity={2} penumbra={0.5} castShadow color={0xfff1dc} />
          <spotLight position={[5, 5, 5]} angle={Math.PI / 6} intensity={2} penumbra={0.5} castShadow color={0xfff1dc} />

          {/* Directional pour volumes et reflets */}
          <directionalLight intensity={0.4} position={[0, 6, 0]} castShadow color={0xffffff} />

          {/* HDRI doux pour reflets et ambiance */}
          <Environment
            files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_02_1k.hdr"
            background="only"
            blur={0.5}
            backgroundRotation={[0, Math.PI, 0]}
          />

          <Museum />
          <TableauIntro position={[-1.286, 1.085, 0.36]} onZoomRequest={handleZoomToTableau} />
        </Canvas>
      )}

      <FullPageView isOpen={isFullPageOpen} onClose={handleCloseFullPage} />

      {!isZooming && !isFullPageOpen && (
        <>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '5px',
            fontFamily: 'monospace'
          }}>
            Position: {scrollValue.toFixed(2)} / {CAMERA_POSITIONS.length - 1}
          </div>

          <div style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {CAMERA_POSITIONS.map((_, index) => {
              const isActive = Math.abs(scrollValue - index) < 0.5
              return <div key={index} style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isActive ? '#00ff88' : 'rgba(255,255,255,0.3)',
                transition: 'background 0.3s'
              }} />
            })}
          </div>
        </>
      )}

      {isZooming && !isFullPageOpen && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '1.2rem',
          fontFamily: "'Cormorant Garamond', serif",
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: '10px', fontSize: '2rem', animation: 'pulse 1.5s ease-in-out infinite' }}>✨</div>
          Chargement...
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.1); }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
