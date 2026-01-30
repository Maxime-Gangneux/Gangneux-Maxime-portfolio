'use client'
import { useGLTF } from '@react-three/drei'

export default function Museum() {
  const gltf = useGLTF('/museum.gltf', true)
  return <primitive object={gltf.scene} scale={0.5} />
}
