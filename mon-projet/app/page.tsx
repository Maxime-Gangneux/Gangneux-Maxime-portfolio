'use client'

import { useEffect, useRef, useState } from 'react'
import { Scene } from './components/scene/Scene'
import ProjectCaseStudy from './components/Fullpageview'
import HomeScreen from './components/HomeScreen'
import project from '@/public/data/projects.json'

export default function Page() {
  const scrollTarget = useRef(0)
  const [scrollValue, setScrollValue] = useState(0)
  const [enableOrbit, setEnableOrbit] = useState(false)
  const [showHomeScreen, setShowHomeScreen] = useState(true)
  const [selectedTableau, setSelectedTableau] = useState<null | {
    projectId: string
    position: number[]
    imageUrl: string
    title: string
    subtitle: string
  }>(null)

  const tableaux = [
    { projectId: 'ARS_Telecom', position: [-1.286, 1.085, 0.36], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { projectId: 'VERBALIS_VPI', position: [3.58, 1.085, 0.36], imageUrl: '/PV_verbalis.png', title: 'Verbalis', subtitle: 'VMS / IA' },
    { projectId: 'KIDSLAB_MKT_ALCOR', position: [-6.4, 1.085, 0.36], imageUrl: '/Kidlabs/home.png', title: 'Kidslab', subtitle: 'Jeu & éducation' },
    { projectId: 'ARS_Telecom', position: [-7.11, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { projectId: 'ARS_Telecom', position: [-3.15, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { projectId: 'ARS_Telecom', position: [1.28, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { projectId: 'ARS_Telecom', position: [3.88, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
  ]

  const validTableaux = tableaux.filter(t => project.projects.some(p => p.id === t.projectId))

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

  const handleZoomRequest = (tableau) => {
    console.log(tableau)
    setSelectedTableau(tableau)
  }

  const handleStartExperience = () => {
    setShowHomeScreen(false)
  }

  return (
    <>
      {/* Page d'accueil immersive */}
      {showHomeScreen && (
        <HomeScreen onStart={handleStartExperience} />
      )}

      {/* Scène 3D - Portfolio galerie */}
      {!showHomeScreen && !selectedTableau && (
        <Scene
          scrollValue={scrollValue}
          enableOrbit={enableOrbit}
          tableaux={validTableaux}
          onZoomRequest={handleZoomRequest}
        />
      )}

      {/* Vue détaillée du projet sélectionné */}
      {selectedTableau && (
        <ProjectCaseStudy 
          projectId={selectedTableau.projectId} 
          onClose={() => setSelectedTableau(null)} 
        />
      )}
    </>
  )
}