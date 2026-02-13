import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface HeroSectionProps {
  data: {
    kicker: string;
    title: string;
    subtitle: string;
    role: string;
  };
  meta?: {
    year?: number;
    role?: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, meta }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p 
            className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-6 font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.kicker}
          </motion.p>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-tight text-slate-900 mb-8 leading-[0.95]">
            {data.title}
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            className="mt-8 text-sm text-slate-500 font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {data.role}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-slate-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
