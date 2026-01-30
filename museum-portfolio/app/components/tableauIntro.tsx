import { Html } from '@react-three/drei'
import React, { FC, useState } from 'react'

type TableauHTMLProps = React.ComponentProps<'group'> & {
  htmlScale?: number
  onZoomRequest?: () => void
  imageUrl?: string
  title?: string
  subtitle?: string
}

export const TableauIntro: FC<TableauHTMLProps> = ({
  htmlScale = 0.3,
  onZoomRequest,
  imageUrl = '/arsmain.png',
  title = 'ARS Telecom',
  subtitle = 'IP & Réseau',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <group {...props}>
      <Html transform center position={[0, 0, 0]} scale={htmlScale} occlude={false}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onZoomRequest}
          style={{
            width: '127px',
            height: '175px',
            position: 'relative',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: 'pointer',
            overflow: 'hidden',
            backgroundColor:"rgba(155, 155, 155, 1)",
            transition: 'all 0.5s ease',
          }}
        >
          {/* Image de fond */}
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isHovered ? 'blur(0px) brightness(1)' : 'blur(8px) brightness(0.5)',
              transition: 'all 0.5s ease',
            }}
          />

          {/* Texte par défaut */}
          {!isHovered && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                textAlign: 'center',
                fontFamily: '"Arial", sans-serif',
                pointerEvents: 'none',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>{title}</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#d4af37' }}>{subtitle}</p>
            </div>
          )}

          {/* Message hover */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                width: '100%',
                textAlign: 'center',
                color: '#d4af37',
                fontSize: '0.8rem',
                fontWeight: 500,
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            >
              ✨ Cliquer pour voir plus
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.6; }
                }
              `}</style>
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}
