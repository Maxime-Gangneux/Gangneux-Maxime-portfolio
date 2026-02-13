'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from '@mui/icons-material';

type ContextType = {
  initialSituation: string
  timeline: {
    month: string
    event: string
  }[]
  constraints: {
    title: string
    desc: string
    icon?: string
  }[]
  keyQuestions: string[]
}

export const ContextSection: React.FC<{ data: ContextType }> = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16">
        {/* Left Column */}
        <motion.div 
          className="md:col-span-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-4">
              Contexte
            </h2>
            <div className="w-16 h-0.5 bg-slate-900 mt-6"></div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          className="md:col-span-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-12">
            {/* Situation initiale */}
            <div>
              <h3 className="text-2xl font-serif text-slate-900 mb-6">Situation initiale</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-light">
                {data.initialSituation}
              </p>
            </div>

            {/* Timeline visuelle */}
            <div className="relative py-8">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200"></div>
              {data.timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className="relative pl-8 pb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[5px] rounded-full bg-slate-900"></div>
                  <div className="text-sm text-slate-500 mb-1 font-light">{item.month}</div>
                  <div className="text-slate-900 font-medium">{item.event}</div>
                </motion.div>
              ))}
            </div>

            {/* Contraintes */}
            <div>
              <h3 className="text-2xl font-serif text-slate-900 mb-6">Contraintes & Défis</h3>
              <div className="grid gap-6">
               {data.constraints.map((item, i) => {
                const IconComponent = Icons[item.icon as keyof typeof Icons];

                return (
                  <motion.div
                    key={i}
                    className="p-6 bg-white rounded-xl border border-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    whileHover={{ y: -4, borderColor: "#0f172a" }}
                  >
                    <div className="text-3xl mb-3">
                      {IconComponent ? <IconComponent fontSize="large" color="primary" /> : null}
                    </div>
                    <h4 className="text-lg font-medium text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 font-light">{item.desc}</p>
                  </motion.div>
                );
              })}
              </div>
            </div>

            {/* Problématiques / Questions clés */}
            <div className="p-8 bg-slate-900 text-white rounded-2xl">
              <h3 className="text-2xl font-serif mb-6">Questions clés</h3>
              <ul className="space-y-4 font-light">
                {data.keyQuestions.map((question, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-slate-400 text-xl">—</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
