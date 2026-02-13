'use client';

import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function CameraControls() {
  const { camera, gl } = useThree()

  const keys = useRef({ z: false, q: false, s: false, d: false })
  const dragging = useRef(false)

  const yaw = useRef(0)
  const pitch = useRef(0)

  const speed = 0.05
  const sensitivity = 0.003

  const bounds = {
    minX: -8,
    maxX: 4.8,
    minZ: -4.9,
    maxZ: 4.9
  }

  useEffect(() => {
    camera.position.set(0, 2, 3)
    camera.rotation.order = 'YXZ'

    const down = (e: KeyboardEvent) => {
    if (e.key === 'z' || e.key === 'ArrowUp') keys.current.z = true
    if (e.key === 's' || e.key === 'ArrowDown') keys.current.s = true
    if (e.key === 'd' || e.key === 'ArrowRight') keys.current.q = true
    if (e.key === 'q' || e.key === 'ArrowLeft') keys.current.d = true
    }

    const up = (e: KeyboardEvent) => {
    if (e.key === 'z' || e.key === 'ArrowUp') keys.current.z = false
    if (e.key === 's' || e.key === 'ArrowDown') keys.current.s = false
    if (e.key === 'd' || e.key === 'ArrowRight') keys.current.q = false
    if (e.key === 'q' || e.key === 'ArrowLeft') keys.current.d = false
    }

    const mouseDown = () => dragging.current = true
    const mouseUp = () => dragging.current = false

    const mouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      yaw.current -= e.movementX * sensitivity
      pitch.current -= e.movementY * sensitivity
      pitch.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, pitch.current))
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    gl.domElement.addEventListener('mousedown', mouseDown)
    window.addEventListener('mouseup', mouseUp)
    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      gl.domElement.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mouseup', mouseUp)
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  useFrame(() => {
    camera.rotation.y = yaw.current
    camera.rotation.x = pitch.current

    const forward = new THREE.Vector3(0, 0, -1).applyEuler(camera.rotation)
    forward.y = 0
    forward.normalize()

    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize()

    if (keys.current.z) camera.position.addScaledVector(forward, speed)
    if (keys.current.s) camera.position.addScaledVector(forward, -speed)
    if (keys.current.q) camera.position.addScaledVector(right, speed)
    if (keys.current.d) camera.position.addScaledVector(right, -speed)

    camera.position.x = Math.max(bounds.minX, Math.min(bounds.maxX, camera.position.x))
    camera.position.z = Math.max(bounds.minZ, Math.min(bounds.maxZ, camera.position.z))

    camera.position.y = 1.15
  })

  return null
}
