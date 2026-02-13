'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ProjectCaseStudy from './Fullpageview'
import HomeScreen from './HomeScreen'
import project from '@/public/data/projects.json'

const Scene = dynamic(
  () => import('./scene/Scene').then(mod => ({ default: mod.Scene })),
  { ssr: false }
)

interface Tableau {
  projectId: string
  position: [number, number, number]
  imageUrl: string
  title: string
  subtitle: string
}

export default function ClientPage() {
  const scrollTarget = useRef(0)
  const [scrollValue, setScrollValue] = useState(0)
  const [showHomeScreen, setShowHomeScreen] = useState(true)
  const [selectedTableau, setSelectedTableau] = useState<Tableau | null>(null)

  const tableaux: Tableau[] = [
    { projectId: 'ARS_Telecom', position: [-1.286, 1.085, 0.36], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { projectId: 'VERBALIS_VPI', position: [3.58, 1.085, 0.36], imageUrl: '/PV_verbalis.png', title: 'Verbalis', subtitle: 'VMS / IA' },
    { projectId: 'KIDSLAB_MKT_ALCOR', position: [-6.4, 1.085, 0.36], imageUrl: '/Kidlabs/home.png', title: 'Kidslab', subtitle: 'Jeu & éducation' },
    { projectId: 'ARS_Telecom', position: [-7.11, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { projectId: 'ARS_Telecom', position: [-3.15, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { projectId: 'ARS_Telecom', position: [1.28, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { projectId: 'ARS_Telecom', position: [3.88, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' }
  ]

  const validTableaux = tableaux.filter(t =>
    project.projects.some(p => p.id === t.projectId)
  )

  useEffect(() => {
    if (selectedTableau) return
    let raf: number
    const update = () => {
      setScrollValue(v => v + (scrollTarget.current - v) * 0.08)
      raf = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(raf)
  }, [selectedTableau])

  const handleZoomRequest = (tableau: Tableau) => {
    setSelectedTableau(tableau)
  }

  return (
    <>
      {showHomeScreen && (
        <HomeScreen onStart={() => setShowHomeScreen(false)} />
      )}

      {!showHomeScreen && !selectedTableau && (
        <Scene
          tableaux={validTableaux}
          onZoomRequest={handleZoomRequest}
        />
      )}

      {selectedTableau && (
        <ProjectCaseStudy
          projectId={selectedTableau.projectId}
          onClose={() => setSelectedTableau(null)}
        />
      )}
    </>
  )
}
