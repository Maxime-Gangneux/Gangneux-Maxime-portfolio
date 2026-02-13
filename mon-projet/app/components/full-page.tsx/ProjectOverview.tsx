import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

export interface OverviewDetail {
  title: string;
  desc: string;
}

export interface ProjectOverviewType {
  presentation: string;
  public?: string;
  objectifs?: string;
  details: OverviewDetail[];
}

export const ProjectOverview: React.FC<ProjectOverviewType> = ({data}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <motion.div 
        className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Left Column - Title */}
        <motion.div className="md:col-span-4" variants={itemVariants}>
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-4">
              Le Projet
            </h2>
            <div className="w-16 h-0.5 bg-slate-900 mt-6"></div>
          </div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div className="md:col-span-8 space-y-12" variants={itemVariants}>
          <div>
            <h3 className="text-2xl font-serif text-slate-900 mb-6">Présentation</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-6 font-light">
              {data.presentation}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div classNamdetailse="p-8 bg-slate-50 rounded-2xl">
              <h4 className="text-lg font-medium text-slate-900 mb-3">Public cible</h4>
              <p className="text-slate-600 leading-relaxed font-light">
                {data.public}
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl">
              <h4 className="text-lg font-medium text-slate-900 mb-3">Objectifs clés</h4>
              <ul className="text-slate-600 space-y-2 font-light">
                {data.objectifs}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-slate-900 mb-6">Besoins identifiés</h3>
            <div className="space-y-4">
              {data.details.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-6 border-l-2 border-slate-200 hover:border-slate-900 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-900 mb-1">{item.title}</h5>
                    <p className="text-slate-600 font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
