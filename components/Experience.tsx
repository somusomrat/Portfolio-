
import React from 'react';
import type { Experience as ExperienceType, PortfolioData } from '../types';
import Editable from './Editable';


interface ExperienceItemProps {
  job: ExperienceType;
  isEditMode: boolean;
  onUpdate: (updatedJob: ExperienceType) => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ job, isEditMode, onUpdate }) => {
  
  const handleFieldChange = (field: keyof ExperienceType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...job, [field]: e.target.value });
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...job, description: e.target.value.split('\n') });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
      <Editable
        isEditing={isEditMode}
        value={job.title}
        onChange={handleFieldChange('title')}
        className="text-cyan-400 font-semibold text-lg"
      />
      <Editable
        isEditing={isEditMode}
        value={job.company}
        onChange={handleFieldChange('company')}
        className="text-white font-bold text-xl mb-1"
      />
      <Editable
        isEditing={isEditMode}
        value={job.duration}
        onChange={handleFieldChange('duration')}
        className="text-gray-400 text-sm mb-3"
      />
       {isEditMode ? (
         <div>
            <label className="text-sm text-gray-400 block mb-1">Description (one item per line)</label>
            <textarea
                value={job.description.join('\n')}
                onChange={handleDescriptionChange}
                className="bg-gray-700 border border-cyan-500 rounded p-1 w-full h-28 text-white"
            />
         </div>
       ) : (
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            {job.description.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
       )}
    </div>
  );
};

interface ExperienceProps {
  experience: ExperienceType[];
  isEditMode: boolean;
  onUpdate: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
}

const Experience: React.FC<ExperienceProps> = ({ experience, isEditMode, onUpdate }) => {

  const handleExperienceUpdate = (updatedJob: ExperienceType, index: number) => {
    onUpdate(prev => {
      if (!prev) return null;
      const newExperience = [...prev.experience];
      newExperience[index] = updatedJob;
      return { ...prev, experience: newExperience };
    });
  };

  return (
    <section id="experience" className="py-20">
      <h2 className="text-4xl font-bold text-center text-white mb-16">Work Experience</h2>
      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700" aria-hidden="true"></div>
        
        {experience.map((job, index) => (
          <div key={index} className="mb-12 flex justify-between items-center w-full">
            {/* Left side content for odd index */}
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              {index % 2 !== 0 && (
                <ExperienceItem
                  job={job}
                  isEditMode={isEditMode}
                  onUpdate={(updatedJob) => handleExperienceUpdate(updatedJob, index)}
                />
              )}
            </div>

            {/* Timeline circle */}
            <div className="z-10 flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full ring-8 ring-gray-900">
            </div>

            {/* Right side content for even index */}
            <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
              {index % 2 === 0 && (
                <ExperienceItem
                  job={job}
                  isEditMode={isEditMode}
                  onUpdate={(updatedJob) => handleExperienceUpdate(updatedJob, index)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;