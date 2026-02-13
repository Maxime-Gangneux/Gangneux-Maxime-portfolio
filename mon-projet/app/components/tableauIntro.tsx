'use client';

import { CanvasTexture } from 'three'
import React, { FC, useState, useMemo, useEffect, useRef } from 'react'

type Tableau3DProps = React.ComponentProps<'group'> & {
  scale?: number
  projectId?: string
  onZoomRequest?: (tableau: {
    projectId?: string
    title: string
    subtitle: string
    imageUrl: string
  }) => void
  imageUrl?: string
  title?: string
  subtitle?: string
}

export const TableauIntro: FC<Tableau3DProps> = ({
  scale = 0.75,
  projectId,
  onZoomRequest,
  imageUrl = '/arsmain.png',
  title = 'ARS Telecom',
  subtitle = 'IP & Réseau',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const htmlWidth = 127
  const htmlHeight = 175

  const blurRef = useRef(8)
  const brightnessRef = useRef(0.5)
  const animationRef = useRef<number | null>(null)
  const [canvasTexture, setCanvasTexture] = useState<CanvasTexture | null>(null)

  // Création du canvas et texture (déféré jusqu'au client)
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = htmlWidth * 2
    canvas.height = htmlHeight * 2

    // Transition CSS (pour fallback, même si on anime avec requestAnimationFrame)
    canvas.style.setProperty('transition', 'filter 0.3s ease')

    setCanvasTexture(new CanvasTexture(canvas))
  }, [])

  // Fonction pour dessiner le tableau
  const drawCanvas = (blur: number, brightness: number) => {
    if (!canvasTexture) return
    const canvas = canvasTexture.image as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      const imgRatio = img.width / img.height
      const canvasRatio = canvas.width / canvas.height
      let drawWidth = canvas.width
      let drawHeight = canvas.height
      let offsetX = 0
      let offsetY = 0

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height
        drawWidth = img.width * (canvas.height / img.height)
        offsetX = -(drawWidth - canvas.width) / 2
      } else {
        drawWidth = canvas.width
        drawHeight = img.height * (canvas.width / img.width)
        offsetY = -(drawHeight - canvas.height) / 2
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Appliquer blur + brightness
      ctx.filter = `blur(${blur}px) brightness(${brightness})`
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

      // Texte par-dessus
      ctx.filter = 'none'
      ctx.fillStyle = 'white'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 10)
      ctx.fillStyle = '#d4af37'
      ctx.font = '16px Arial'
      ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 15)

      canvasTexture.needsUpdate = true
    }
  }

  // Dessin initial
  useEffect(() => {
    drawCanvas(blurRef.current, brightnessRef.current)
  }, [imageUrl, title, subtitle])

  // Animation lisse blur + brightness
  useEffect(() => {
    const targetBlur = isHovered ? 0 : 8
    const targetBrightness = isHovered ? 1 : 0.5

    if (animationRef.current) cancelAnimationFrame(animationRef.current)

    const animate = () => {
      blurRef.current += (targetBlur - blurRef.current) * 0.15
      brightnessRef.current += (targetBrightness - brightnessRef.current) * 0.15

      drawCanvas(blurRef.current, brightnessRef.current)

      if (
        Math.abs(blurRef.current - targetBlur) > 0.1 ||
        Math.abs(brightnessRef.current - targetBrightness) > 0.01
      ) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered])

  const planeSize = useMemo(() => ({
    width: htmlWidth / 100,
    height: htmlHeight / 100
  }), [])

  return (
    <group {...props}>
      {canvasTexture && (
        <mesh
          scale={[planeSize.width * scale, planeSize.height * scale, 1]}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
          onClick={() =>
            onZoomRequest?.({
              projectId,
              title,
              subtitle,
              imageUrl
            })
          }
          castShadow
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={canvasTexture} toneMapped={false} transparent />
        </mesh>
      )}
    </group>
  )
}
