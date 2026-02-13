'use client';

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Lights } from './Lights'
import { Museum } from './Museum'
import { TableauIntro } from '../tableauIntro'
import { CameraControls } from './CameraController'

interface Tableau {
  position: [number, number, number]
  imageUrl: string
  title: string
  subtitle: string
  projectId: string
}

interface SceneProps {
  tableaux: Tableau[]
  onZoomRequest?: (tableau: Tableau) => void
}

export function Scene({ tableaux, onZoomRequest }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 50 }}>
      <CameraControls />
      <Lights />
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_02_1k.hdr"
        background="only"
      />
      <Museum />
      {tableaux.map((t, i) => (
        <TableauIntro
          key={i}
          position={t.position}
          imageUrl={t.imageUrl}
          title={t.title}
          subtitle={t.subtitle}
          projectId={t.projectId}
          onZoomRequest={onZoomRequest ? () => onZoomRequest(t) : undefined}
        />
      ))}
    </Canvas>
  )
}
