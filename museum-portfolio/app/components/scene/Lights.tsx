import { DebugSpotLight } from './DebugSpotLight'

export function Lights() {
  return (
    <>
        <ambientLight intensity={1} color={0xfff7e8} />

        <DebugSpotLight position={[0.02, 2.5, 4.71]} targetPosition={[0.02, 0, 4.7]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[-3.8, 2.5, 4.71]} targetPosition={[-3.8, 0, 4.71]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[-7.6, 2.5, 4.71]} targetPosition={[-7.6, 0, 4.71]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[3.85, 2.5, 4.71]} targetPosition={[3.85, 0, 4.71]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[-8.18, 2.5, 1.68]} targetPosition={[-8.18, 0, 1.68]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[-8.18, 2.5, -1.68]} targetPosition={[-8.18, 0, -1.68]} angle={Math.PI / 4} intensity={5} penumbra={1} />

        <DebugSpotLight position={[0.02, 2.5, -4.71]} targetPosition={[0.02, 0, -4.7]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[-3.8, 2.5, -4.71]} targetPosition={[-3.8, 0, -4.71]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[-7.6, 2.5, -4.71]} targetPosition={[-7.6, 0, -4.71]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[3.85, 2.5, -4.71]} targetPosition={[3.85, 0, -4.71]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[4.65, 2.5, 1.68]} targetPosition={[4.65, 0, 1.68]} angle={Math.PI / 4} intensity={5} penumbra={1} />
        <DebugSpotLight position={[4.65, 2.5, -1.68]} targetPosition={[4.65, 0, -1.68]} angle={Math.PI / 4} intensity={5} penumbra={1} />

        <directionalLight intensity={0.4} position={[0, 6, 0]} />
    </>
  )
}
