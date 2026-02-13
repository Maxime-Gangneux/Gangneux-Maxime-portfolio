import { useGLTF } from '@react-three/drei'

export function Museum() {
  const gltf = useGLTF('/museum_light1.glb', true)
  return <primitive object={gltf.scene} scale={0.5} />
}
