import React from 'react';
import type { Skill, PortfolioData } from '../types';
import Editable from './Editable';

interface SkillCategoryProps {
  title: string; 
  skills: Skill[];
  isEditMode: boolean;
  onUpdate: (updatedSkill: Skill, index: number) => void;
  categoryIndexStart: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, isEditMode, onUpdate, categoryIndexStart }) => {
  if (skills.length === 0) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-cyan-500/20">
      <h3 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h3>
      <ul className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <li
            key={skill.name}
            className="bg-gray-700 text-gray-300 text-md font-medium px-4 py-2 rounded-md"
          >
            <Editable
              isEditing={isEditMode}
              value={skill.name}
              onChange={(e) => onUpdate({ ...skill, name: e.target.value }, categoryIndexStart + index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface SkillsProps {
  skills: Skill[];
  isEditMode: boolean;
  onUpdate: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
}

const Skills: React.FC<SkillsProps> = ({ skills, isEditMode, onUpdate }) => {
  const categories = ['Frontend', 'Backend', 'Tools & DevOps', 'Languages'] as const;
  
  const handleSkillUpdate = (updatedSkill: Skill, index: number) => {
      onUpdate(prev => {
        if (!prev) return null;
        const newSkills = [...prev.skills];
        newSkills[index] = updatedSkill;
        return { ...prev, skills: newSkills };
      });
  };

  let skillCounter = 0;

  return (
    <section id="skills" className="py-20">
      <h2 className="text-4xl font-bold text-center text-white mb-12">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => {
          const categorySkills = skills.filter((skill) => skill.category === category);
          const categoryIndexStart = skillCounter;
          skillCounter += categorySkills.length;
          return (
            <SkillCategory
              key={category}
              title={category}
              skills={categorySkills}
              isEditMode={isEditMode}
              onUpdate={handleSkillUpdate}
              categoryIndexStart={skills.findIndex(s => s.name === categorySkills[0]?.name)}
            />
          )
        })}
      </div>
    </section>
  );
};

export default Skills;