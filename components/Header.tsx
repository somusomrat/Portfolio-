
import React, { useState, useEffect } from 'react';
import type { PortfolioData } from '../types';
import Editable from './Editable';
import { MenuIcon, XIcon } from './Icons';

interface HeaderProps {
  name: string;
  isEditMode: boolean;
  onUpdate: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
}

const Header: React.FC<HeaderProps> = ({ name, isEditMode, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(prev => prev ? { ...prev, name: e.target.value } : null);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
             <Editable
                isEditing={isEditMode}
                value={name}
                onChange={handleNameChange}
                className="text-2xl font-bold"
                textClassName="text-white hover:text-cyan-400 transition-colors"
                inputClassName="w-48"
              />
          </div>
          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900" id="mobile-menu">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;