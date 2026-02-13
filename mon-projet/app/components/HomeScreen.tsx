'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface HomeScreenProps {
  onStart: () => void
}

export default function HomeScreen({ onStart }: HomeScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isVisible) {
        setIsVisible(false)
        setTimeout(() => onStart(), 500)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isVisible, onStart])

  const handleClick = () => {
    setIsVisible(false)
    setTimeout(() => onStart(), 500)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background avec effet de profondeur */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
            {/* Grille animée */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                transform: 'perspective(500px) rotateX(60deg)',
                transformOrigin: 'center center'
              }}></div>
            </div>

            {/* Particules flottantes */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0
                  }}
                  animate={{
                    y: [null, Math.random() * window.innerHeight],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>

            {/* Lueur centrale */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          </div>

          {/* Contenu principal */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            {/* Logo/Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-400 text-sm font-light tracking-wider">PORTFOLIO 3D IMMERSIF</span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              className="text-7xl md:text-9xl font-light tracking-tight text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-geist-sans)',
                textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
              }}
            >
              Mon Musée
            </motion.h1>

            {/* Sous-titre */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
              <p className="text-2xl md:text-3xl text-blue-200 font-light tracking-wide">
                Gangneux Maxime – Développeur
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
            </motion.div>

            {/* Call to action principal */}
            <motion.button
              className="group relative px-8 py-4 mb-16 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-400/50 hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleClick}
            >
              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              <div className="relative flex items-center gap-3">
                <span className="text-white text-lg font-light tracking-wider">
                  Appuyez sur une touche pour commencer
                </span>
                <motion.svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </div>
            </motion.button>

            {/* Instructions de contrôle */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {/* Déplacement clavier */}
              <div className="group p-6 bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium mb-2">Déplacement</h3>
                    <p className="text-slate-400 text-sm font-light mb-3">
                      Utilisez les touches pour vous déplacer
                    </p>
                   <div className="flex flex-wrap gap-2">
                    {['Z', 'Q', 'S', 'D'].map((key) => (
                      <kbd key={key} className="px-3 py-2 bg-slate-800/80 border border-slate-600/50 rounded text-slate-300 text-sm font-mono shadow-lg">
                        {key}
                      </kbd>
                    ))}
                    <span className="text-slate-500 px-2 py-2">ou</span>
                    <kbd className="px-3 py-2 bg-slate-800/80 border border-slate-600/50 rounded text-slate-300 text-sm font-mono break-keep">
                      ↑↓←→
                    </kbd>
                  </div>
                  </div>
                </div>
              </div>

              {/* Contrôle de la caméra */}
              <div className="group p-6 bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium mb-2">Caméra</h3>
                    <p className="text-slate-400 text-sm font-light mb-3">
                      Contrôlez votre vue en 3D
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-2 bg-slate-800/80 border border-slate-600/50 rounded text-slate-300 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        Clic gauche
                      </div>
                      <span className="text-slate-500 text-sm">+ glisser</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}