'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { log } from 'console';

export interface CarouselSlide {
  id: number;
  title: string;
  type: string; // plus permissif
  src: string;
  color?: string;
}

type CarouselSlideProps = {
  data: CarouselSlide[]
  onScrollLockChange?: (locked: boolean) => void
}

export const ImmersiveCarousel = ({ data, onScrollLockChange }: CarouselSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stepInSlide, setStepInSlide] = useState(0); // 0 = titre+flou, 1 = image pure
  const [isLocked, setIsLocked] = useState(false);
  const wheelThrottleRef = useRef(false);

  const slides = data;

  // ============================================================================
  // DÉTECTION TOP = 0 POUR BLOQUER L'ÉCRAN
  // ============================================================================
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isCentered = Math.abs(rect.top) < 5;

      if (!isCentered) {
        canRelockRef.current = true;
        return;
      }

      if (isCentered && !isLocked && canRelockRef.current) {
        setIsLocked(true);
        if (onScrollLockChange) onScrollLockChange(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLocked, onScrollLockChange]);


  // ============================================================================
  // GESTION DU WHEEL QUAND LE CARROUSEL EST BLOQUÉ
  // ============================================================================

const canRelockRef = useRef(true);

useEffect(() => {
  const handleWheel = (e: WheelEvent) => {
    if (!isLocked) return;

    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    if (currentSlide === 0 && stepInSlide === 0 && scrollingUp) {
      canRelockRef.current = false;
      setIsLocked(false);
      if (onScrollLockChange) onScrollLockChange(false);
      return;
    }

    if (currentSlide === slides.length - 1 && stepInSlide === 1 && scrollingDown) {
      canRelockRef.current = false;
      setIsLocked(false);
      if (onScrollLockChange) onScrollLockChange(false);
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (wheelThrottleRef.current) return;
    wheelThrottleRef.current = true;

    requestAnimationFrame(() => {
      wheelThrottleRef.current = false;
    });

    if (scrollingDown) {
      if (stepInSlide === 0) {
        setStepInSlide(1);
      } else if (stepInSlide === 1 && currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
        setStepInSlide(0);
      }
    }

    if (scrollingUp) {
      if (stepInSlide === 1) {
        setStepInSlide(0);
      } else if (stepInSlide === 0 && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
        setStepInSlide(1);
      }
    }
  };

  window.addEventListener('wheel', handleWheel, { passive: false });

  return () => {
    window.removeEventListener('wheel', handleWheel);
  };
}, [isLocked, currentSlide, stepInSlide, slides.length, onScrollLockChange]);


  // ============================================================================
  // ANIMATION & STYLES
  // ============================================================================
  const isRevealed = stepInSlide === 1;
  const blurAmount = isRevealed ? 0 : 40;
  const titleOpacity = isRevealed ? 0 : 1;
  const vignetteOpacity = isRevealed ? 0 : 0.6;

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen"
      style={{
        maxWidth: '100vw',
        maxHeight: '100vh'
      }}
    >
      {/* Sticky Container - reste dans le flux mais se fixe */}
      <div
        className="w-full h-full overflow-hidden"
        style={{
          position: isLocked ? 'sticky' : 'relative',
          top: isLocked ? 0 : 'auto',
          zIndex: isLocked ? 100 : 1
        }}
      >
        {/* Overlay pour masquer le contenu en dessous */}
        {isLocked && (
          <div
            className="fixed inset-0 bg-black"
            style={{
              zIndex: 99
            }}
          />
        )}

        {/* Contenu du carousel */}
        <div className="relative w-full h-full" style={{ zIndex: 101 }}>
          {/* Background Image/Video */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentSlide].id}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {slides[currentSlide].type === 'image' ? (
                <img
                  src={slides[currentSlide].src}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-contain transition-all duration-300"
                  style={{ filter: `blur(${blurAmount}px)` }}
                />
              ) : (
                <video
                  src={slides[currentSlide].src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ filter: `blur(${blurAmount}px)` }}
                />
              )}

              {/* Vignette effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: vignetteOpacity,
                  background: `
                    radial-gradient(
                      ellipse at center,
                      transparent 0%,
                      transparent 30%,
                      rgba(0, 0, 0, 0.4) 70%,
                      rgba(0, 0, 0, 0.8) 100%
                    )
                  `
                }}
              />

              {/* Gradient overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} mix-blend-multiply transition-opacity duration-300`}
                style={{
                  opacity: vignetteOpacity * 0.5
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Titre du projet */}
          <AnimatePresence>
            {titleOpacity > 0 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1
                  className="text-6xl md:text-8xl lg:text-9xl font-serif font-light text-white text-center px-8 drop-shadow-2xl"
                  style={{
                    textShadow: '0 10px 40px rgba(0,0,0,0.5)'
                  }}
                >
                  {slides[currentSlide].title}
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicateurs de progression */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none z-20">
            {slides.map((_, i) => (
              <div
                key={i}
                className="relative w-16 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                {i === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-white rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: stepInSlide === 1 ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {i < currentSlide && (
                  <div className="absolute inset-0 bg-white rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* Hint de scroll */}
          <AnimatePresence>
            {stepInSlide === 0 && (
              <motion.div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/70 text-sm font-light pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-6 h-6 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span>Scrollez pour découvrir</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation par numéro de slide */}
          <div className="absolute top-8 right-8 text-white/90 text-sm font-light pointer-events-none z-20">
            <span className="text-3xl font-serif">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="text-white/50"> / {String(slides.length).padStart(2, '0')}</span>
            <div className="text-xs text-white/50 mt-1">
              Étape {stepInSlide + 1}/2
            </div>
          </div>

          {/* Instructions clavier */}
          {isLocked && (
            <div className="absolute top-8 left-8 text-white/50 text-xs font-light pointer-events-none">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">↓</kbd>
                  <span>Avancer</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">↑</kbd>
                  <span>Reculer</span>
                </div>
              </div>
            </div>
          )}

          {/* Debug info */}
          <div className="absolute bottom-32 left-8 text-white/50 text-xs font-mono pointer-events-none">
            <div>Locked: {isLocked ? 'YES' : 'NO'}</div>
            <div>Slide: {currentSlide + 1}/{slides.length}</div>
            <div>Step: {stepInSlide + 1}/2</div>
          </div>
        </div>
      </div>
    </div>
  );
};