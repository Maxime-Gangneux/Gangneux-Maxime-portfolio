import React, { FC, useEffect } from 'react'

type FullPageViewProps = {
  isOpen: boolean
  onClose: () => void
}

export const FullPageView: FC<FullPageViewProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    // Empêcher le scroll de la page quand le modal est ouvert
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <style>{`
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Sorts+Mill+Goudy:ital@0;1&display=swap');
      `}</style>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'zoomIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'auto',
          padding: '20px',
        }}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          style={{
            position: 'fixed',
            top: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            color: '#d4af37',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            zIndex: 1001,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'
            e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
          }}
        >
          ✕
        </button>

        {/* Contenu principal */}
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
            borderRadius: '4px',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 0, 0, 0.2)',
            padding: '80px 60px',
            fontFamily: "'Sorts Mill Goudy', serif",
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Bordures décoratives */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #c9a961 50%, transparent 100%)',
            animation: 'slideIn 1.2s ease-out',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #c9a961 50%, transparent 100%)',
            animation: 'slideIn 1.2s ease-out 0.2s backwards',
          }} />

          {/* Ornements des coins */}
          <div style={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            width: '60px',
            height: '60px',
            border: '1px solid #d4af37',
            borderRight: 'none',
            borderBottom: 'none',
            opacity: 0.3,
            animation: 'fadeIn 0.8s ease-out 0.4s backwards',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '5%',
            right: '5%',
            width: '60px',
            height: '60px',
            border: '1px solid #d4af37',
            borderLeft: 'none',
            borderTop: 'none',
            opacity: 0.3,
            animation: 'fadeIn 0.8s ease-out 0.6s backwards',
          }} />

          {/* En-tête */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px',
            animation: 'fadeIn 1s ease-out 0.3s backwards',
          }}>
            <h1 style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#1a1a1a',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              margin: '0 0 20px 0',
              textTransform: 'uppercase',
            }}>
              Maxime<br />D'Amour
            </h1>
            
            <div style={{
              display: 'inline-block',
              width: '100px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #c9a961 50%, transparent 100%)',
              margin: '20px 0',
              animation: 'slideIn 1s ease-out 0.5s backwards',
            }} />
            
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              fontWeight: 400,
              color: '#8b7355',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: '20px 0',
            }}>
              Développeur · Créateur 3D
            </p>
          </div>

          {/* Description */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 60px',
            textAlign: 'center',
            animation: 'fadeIn 1s ease-out 0.7s backwards',
          }}>
            <div style={{
              width: '4px',
              height: '4px',
              background: '#c9a961',
              borderRadius: '50%',
              margin: '0 auto 20px',
            }} />
            
            <p style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              lineHeight: 1.8,
              color: '#4a4a4a',
              fontStyle: 'italic',
              margin: '0 0 20px 0',
            }}>
              Bienvenue dans mon musée numérique. Explorez mes créations 
              à travers un espace 3D interactif où chaque œuvre raconte une histoire.
            </p>
            
            <div style={{
              width: '4px',
              height: '4px',
              background: '#c9a961',
              borderRadius: '50%',
              margin: '20px auto 0',
            }} />
          </div>

          {/* Grille d'informations */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
            animation: 'fadeIn 1s ease-out 0.9s backwards',
          }}>
            <div style={{
              textAlign: 'center',
              padding: '30px 15px',
              borderTop: '1px solid rgba(201, 169, 97, 0.2)',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#999',
                marginBottom: '10px',
              }}>
                Localisation
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: '#2a2a2a',
                fontWeight: 400,
              }}>
                Mulhouse, France
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '30px 15px',
              borderTop: '1px solid rgba(201, 169, 97, 0.2)',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#999',
                marginBottom: '10px',
              }}>
                Spécialités
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: '#2a2a2a',
                fontWeight: 400,
              }}>
                React · Three.js · WebGL
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '30px 15px',
              borderTop: '1px solid rgba(201, 169, 97, 0.2)',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#999',
                marginBottom: '10px',
              }}>
                Disponibilité
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: '#2a2a2a',
                fontWeight: 400,
              }}>
                Ouvert aux projets
              </div>
            </div>
          </div>

          {/* Section compétences */}
          <div style={{
            animation: 'fadeIn 1s ease-out 1.1s backwards',
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              textAlign: 'center',
              color: '#1a1a1a',
              marginBottom: '40px',
              letterSpacing: '0.05em',
            }}>
              Compétences & Technologies
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}>
              {['React', 'Three.js', 'TypeScript', 'WebGL', 'Next.js', 'Blender'].map((skill, i) => (
                <div
                  key={skill}
                  style={{
                    padding: '15px 20px',
                    background: 'rgba(201, 169, 97, 0.05)',
                    border: '1px solid rgba(201, 169, 97, 0.2)',
                    textAlign: 'center',
                    color: '#4a4a4a',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    animation: `fadeIn 0.5s ease-out ${1.2 + i * 0.1}s backwards`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 169, 97, 0.1)'
                    e.currentTarget.style.borderColor = '#c9a961'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 169, 97, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(201, 169, 97, 0.2)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div style={{
            textAlign: 'center',
            marginTop: '60px',
            animation: 'fadeIn 1s ease-out 1.3s backwards',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1rem',
              color: '#999',
              marginBottom: '20px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Explorez le musée pour en découvrir plus
            </p>
            
            <button
              onClick={onClose}
              style={{
                padding: '15px 40px',
                background: 'transparent',
                border: '2px solid #c9a961',
                color: '#c9a961',
                fontSize: '1rem',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#c9a961'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#c9a961'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Retour au musée
            </button>
          </div>
        </div>
      </div>
    </>
  )
}