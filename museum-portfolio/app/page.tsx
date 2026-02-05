'use client'

import { useEffect, useRef, useState } from 'react'
import { Scene } from './components/scene/Scene'
import { FullPageView } from './components/Fullpageview'

export default function Page() {
  const scrollTarget = useRef(0)
  const [scrollValue, setScrollValue] = useState(0)
  const [enableOrbit, setEnableOrbit] = useState(false)

  // positions des tableaux
  const tableaux = [
    { position: [-1.286, 1.085, 0.36], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { position: [3.58, 1.085, 0.36], imageUrl: '/arsmain.png', title: 'Verbalis', subtitle: 'VMS / IA' },
    { position: [-6.4, 1.085, 0.36], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { position: [-7.11, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { position: [-3.15, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { position: [1.28, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { position: [3.88, 1.085, -5], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
  ]

  useEffect(() => {
    const onWheel = e => {
      if (enableOrbit) return
      e.preventDefault()
      scrollTarget.current += e.deltaY * 0.001
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [enableOrbit])

  useEffect(() => {
    let raf
    const update = () => {
      setScrollValue(v => v + (scrollTarget.current - v) * 0.08)
      raf = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(raf)
  }, [])

  // fonction pour gérer le click sur un tableau
  const handleZoomRequest = (tableau: typeof tableaux[0]) => {
    console.log('Tableau cliqué :', tableau.title)
  }

  return (
    <>
      <Scene
        scrollValue={scrollValue}
        enableOrbit={enableOrbit}
        tableaux={tableaux}
        onZoomRequest={handleZoomRequest}
      />
      <FullPageView />
    </>
  )
}
