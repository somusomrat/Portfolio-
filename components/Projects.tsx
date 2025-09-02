import React, { useRef } from 'react';
import type { Project, PortfolioData } from '../types';
import { ExternalLinkIcon, CodeIcon, CameraIcon } from './Icons';
import Editable from './Editable';

interface ProjectCardProps {
  project: Project;
  isEditMode: boolean;
  onUpdate: (updatedProject: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isEditMode, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (field: keyof Project) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({ ...project, [field]: e.target.value });
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...project, tags: e.target.value.split(',').map(tag => tag.trim()) });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onUpdate({ ...project, imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
      <div className="relative">
        <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover"/>
        {isEditMode && (
          <>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
              aria-label={`Change image for ${project.title}`}
            >
              <CameraIcon className="w-10 h-10" />
            </button>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <Editable
          isEditing={isEditMode}
          value={project.title}
          onChange={handleFieldChange('title')}
          className="text-2xl font-bold text-white mb-2"
        />
        <Editable
          isEditing={isEditMode}
          value={project.description}
          onChange={handleFieldChange('description')}
          as="textarea"
          className="text-gray-400 mb-4 flex-grow"
          inputClassName="h-24 w-full"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        {isEditMode && (
          <div className="mb-4">
            <label className="text-sm text-gray-400 block mb-1">Tags (comma-separated)</label>
            <input 
              type="text"
              value={project.tags.join(', ')}
              onChange={handleTagsChange}
              className="bg-gray-700 border border-cyan-500 rounded p-1 w-full text-white"
            />
          </div>
        )}
        <div className="mt-auto flex items-center space-x-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold">
              <ExternalLinkIcon className="w-5 h-5 mr-2" />
              Live Demo
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold">
              <CodeIcon className="w-5 h-5 mr-2" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

interface ProjectsProps {
  projects: Project[];
  isEditMode: boolean;
  onUpdate: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
}

const Projects: React.FC<ProjectsProps> = ({ projects, isEditMode, onUpdate }) => {
  
  const handleProjectUpdate = (updatedProject: Project, index: number) => {
    onUpdate(prev => {
      if (!prev) return null;
      const newProjects = [...prev.projects];
      newProjects[index] = updatedProject;
      return { ...prev, projects: newProjects };
    });
  };

  return (
    <section id="projects" className="py-20">
      <h2 className="text-4xl font-bold text-center text-white mb-12">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project}
            isEditMode={isEditMode}
            onUpdate={(updatedProject) => handleProjectUpdate(updatedProject, index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;