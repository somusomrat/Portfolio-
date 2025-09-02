import React, { useRef, useState, useMemo } from 'react';
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
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col group">
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
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = useMemo(() => ['All', ...new Set(projects.flatMap(p => p.tags))], [projects]);
  
  const filteredProjects = useMemo(() => 
    selectedTag === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(selectedTag))
  , [selectedTag, projects]);

  const handleProjectUpdate = (updatedProject: Project, index: number) => {
    onUpdate(prev => {
      if (!prev) return null;
      // Find the original index to update the correct project
      const originalIndex = prev.projects.findIndex(p => p.title === projects[index].title);
      if (originalIndex === -1) return prev;
      
      const newProjects = [...prev.projects];
      newProjects[originalIndex] = updatedProject;
      return { ...prev, projects: newProjects };
    });
  };

  return (
    <section id="projects" className="py-20">
      <h2 className="text-4xl font-bold text-center text-white mb-8">My Projects</h2>
      
      {!isEditMode && (
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-300 ${
                selectedTag === tag
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => {
          // Find original index to pass to update handler
          const originalIndex = projects.findIndex(p => p.title === project.title);
          return (
            <div key={project.title} className="animate-fade-in">
              <ProjectCard 
                project={project}
                isEditMode={isEditMode}
                onUpdate={(updatedProject) => handleProjectUpdate(updatedProject, originalIndex)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;