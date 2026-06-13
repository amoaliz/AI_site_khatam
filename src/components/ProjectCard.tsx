import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight, Globe, BrainCircuit, Smartphone, Cloud, Shield } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  onSelect: (project: Project) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'web': return <Globe className="w-4 h-4 text-sky-500" />;
    case 'ai': return <BrainCircuit className="w-4 h-4 text-emerald-500" />;
    case 'mobile': return <Smartphone className="w-4 h-4 text-purple-500" />;
    case 'cloud': return <Cloud className="w-4 h-4 text-blue-500" />;
    case 'cybersecurity': return <Shield className="w-4 h-4 text-rose-500" />;
    default: return null;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'web': return 'bg-sky-950/40 text-sky-300 border-sky-500/20';
    case 'ai': return 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20';
    case 'mobile': return 'bg-purple-950/40 text-purple-300 border-purple-500/20';
    case 'cloud': return 'bg-blue-950/40 text-blue-300 border-blue-500/20';
    case 'cybersecurity': return 'bg-rose-950/40 text-rose-300 border-rose-500/20';
    default: return 'bg-slate-900 text-slate-300 border-white/5';
  }
};

const getDifficultyLabel = (difficulty?: string) => {
  switch (difficulty) {
    case 'hard': return 'سطح پیشرفته';
    case 'medium': return 'سطح متوسط';
    case 'easy': return 'سطح عمومی';
    default: return 'نامشخص';
  }
};

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group glass-accent-card glass-accent-card-hover laser-glow-card flex flex-col justify-between rounded-2xl p-5 relative overflow-hidden h-full cursor-pointer transition-all duration-300 bg-slate-950/20 backdrop-blur-md"
      onClick={() => onSelect(project)}
      style={{ direction: 'rtl' }}
    >
      {/* Soft Hover Overlay glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all duration-500" />

      <div className="relative z-10 flex flex-col h-full">
         {/* Project Image Banner */}
        {project.imageUrl ? (
          <div className="relative h-44 overflow-hidden rounded-xl -mx-5 -mt-5 mb-4 group/img border-b border-white/5">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-black/20" />
            
            {/* Overlay Category Pill */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border bg-slate-950/90 text-white backdrop-blur-md border-white/10 shadow-lg">
              {getCategoryIcon(project.category)}
              <span className="mr-0.5">
                {project.category === 'web' ? 'سامانه تحت وب' : 
                 project.category === 'ai' ? 'هوش مصنوعی' : 
                 project.category === 'mobile' ? 'فناوری موبایل' : 
                 project.category === 'cloud' ? 'رایانش ابری' : 'امنیت شبکه'}
              </span>
            </div>

            {project.difficulty && (
              <span className="absolute top-3 left-3 text-[9px] font-semibold text-white bg-slate-950/70 backdrop-blur-xs border border-white/10 px-2 py-0.5 rounded">
                {getDifficultyLabel(project.difficulty)}
              </span>
            )}
          </div>
        ) : (
          /* Fallback newer category header if no image */
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(project.category)}`}>
              {getCategoryIcon(project.category)}
              <span>
                {project.category === 'web' ? 'تحت وب' : 
                 project.category === 'ai' ? 'هوش مصنوعی' : 
                 project.category === 'mobile' ? 'اپلیکیشن موبایل' : 
                 project.category === 'cloud' ? 'رایانش ابری' : 'امنیت'}
              </span>
            </div>
            {project.difficulty && (
              <span className="text-[10px] text-slate-400 bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
                {getDifficultyLabel(project.difficulty)}
              </span>
            )}
          </div>
        )}

        {/* Project Title */}
        <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors duration-300 mb-1.5 leading-relaxed">
          {project.title}
        </h3>

        {/* Project Slogan */}
        <p className="text-xs text-slate-350 mb-4 line-clamp-2 leading-relaxed font-light text-justify">
          {project.slogan}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto select-none">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/60 text-slate-300 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-white/5">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="border-t border-white/5 pt-3.5 flex items-center justify-between mt-auto relative z-10" onClick={(e) => e.stopPropagation()}>
        {/* Open Details Action */}
        <button
          onClick={() => onSelect(project)}
          className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-bold transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          <span>مشاهده جزئیات پروژه‌</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {/* Links */}
        <div className="flex items-center gap-1.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title="کد منبع در گیت‌هاب"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-purple-400 hover:text-purple-300 transition-colors"
              title="مشاهده نسخه زنده یا دمو"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
