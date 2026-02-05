import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Lights } from './Lights'
import { Museum } from './Museum'
import { TableauIntro } from '../tableauIntro'
import { CameraControls } from './CameraController'

export function Scene({ tableaux, ...props }) {
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
          onZoomRequest={props.onZoomRequest}
        />
      ))}
    </Canvas>
  )
}
