'use client'

import React from 'react';
import { HeroSection } from './full-page.tsx/HeroSection';
import ProjectOverview from './full-page.tsx/ProjectOverview';
import { ContextSection } from './full-page.tsx/ContextSection';
import { ImmersiveCarousel } from './full-page.tsx/ScreenshotsCarousel';
import { Footer } from './full-page.tsx/Footer';

import projectsJson from '@/public/data/projects.json';

interface ProjectCaseStudyProps {
  projectId: string;
  onClose?: () => void;
}

export default function ProjectCaseStudy({ projectId, onClose }: ProjectCaseStudyProps) {
  const project = projectsJson.projects.find(p => p.id === projectId);

  if (!project) return <div>Projet introuvable</div>;

  return (
    <div className="bg-white min-h-screen relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-600 hover:text-slate-900 font-medium z-50"
        >
          Fermer
        </button>
      )}

      <HeroSection data={project.hero} />
      <ProjectOverview data={project.overview} />
      <ContextSection data={project.context} />
      <ImmersiveCarousel data={project.carousel.slides} />
      <Footer />
    </div>
  );
}
