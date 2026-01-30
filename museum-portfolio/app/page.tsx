'use client'

import { useEffect, useRef, useState } from 'react'
import { Scene } from './components/scene/Scene'
import { FullPageView } from './components/Fullpageview'

export default function Page() {
  const scrollTarget = useRef(0)
  const [scrollValue, setScrollValue] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [enableOrbit, setEnableOrbit] = useState(false)

  // positions des deux tableaux
  const tableaux = [
    { position: [-1.286, 1.085, 0.36], imageUrl: '/arsmain.png', title: 'ARS Telecom', subtitle: 'IP & Réseau' },
    { position: [3.58, 1.085, 0.36], imageUrl: '/arsmain.png', title: 'Verbalis', subtitle: 'VMS / IA' }
  ]

  useEffect(() => {
    const onWheel = e => {
      if (enableOrbit || isZooming) return
      e.preventDefault()
      scrollTarget.current += e.deltaY * 0.001
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [enableOrbit, isZooming])

  useEffect(() => {
    let raf
    const update = () => {
      setScrollValue(v => v + (scrollTarget.current - v) * 0.08)
      raf = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <Scene
        scrollValue={scrollValue}
        isZooming={isZooming}
        enableOrbit={enableOrbit}
        tableaux={tableaux}
        onZoomRequest={() => setIsZooming(true)}
      />
      <FullPageView />
    </>
  )
}
