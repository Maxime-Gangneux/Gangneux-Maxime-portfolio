'use client';

import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-serif mb-4">À propos</h3>
            <p className="text-lg text-slate-300 font-light">
              Je suis étudiant en développement web, passionné par la création d'applications modernes et performantes. Ce portfolio présente mes projets et mes compétences techniques.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-serif mb-4">Technologies & Outils</h3>
            <div className="flex flex-wrap gap-3">
              {[
                'React', 'Next.js', 'Node.js', 'Python', 'LLM', 'RAG', 
                'C#', 'SQL', 'Docker', 'Git', 'Jira', 'Agile'
              ].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm font-light hover:bg-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center">
          <p className="text-slate-400 font-light">
            Projet conçu et développé en 2023-2024
          </p>
        </div>
      </div>
    </footer>
  );
};
