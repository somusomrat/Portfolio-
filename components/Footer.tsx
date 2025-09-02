
import React from 'react';
import type { PortfolioData } from '../types';
import Editable from './Editable';

interface FooterProps {
  name: string;
  isEditMode: boolean;
  onUpdate: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
}

const Footer: React.FC<FooterProps> = ({ name, isEditMode, onUpdate }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(prev => prev ? { ...prev, name: e.target.value } : null);
  };
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} <Editable isEditing={isEditMode} value={name} onChange={handleNameChange} />. All rights reserved.</p>
        <p className="text-sm mt-1">Built with React & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;