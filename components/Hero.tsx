import React, { useRef, useState, useEffect } from 'react';
import type { PortfolioData } from '../types';
import { SocialIcon, CameraIcon } from './Icons';
import Editable from './Editable';

interface HeroProps {
  data: PortfolioData;
  isEditMode: boolean;
  onUpdate: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
}

const useTypingEffect = (text: string, isEditMode: boolean, speed = 150, delay = 1000) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (isEditMode) {
            setDisplayedText(text);
            return;
        }

        let i = 0;
        let isDeleting = false;
        // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> for browser compatibility.
        let timeoutId: ReturnType<typeof setTimeout>;

        const typing = () => {
            if (isDeleting) {
                if (i > 0) {
                    setDisplayedText(prev => prev.slice(0, -1));
                    i--;
                    timeoutId = setTimeout(typing, speed / 2);
                } else {
                    isDeleting = false;
                    timeoutId = setTimeout(typing, speed);
                }
            } else {
                if (i < text.length) {
                    setDisplayedText(prev => prev + text.charAt(i));
                    i++;
                    timeoutId = setTimeout(typing, speed);
                } else {
                    isDeleting = true;
                    timeoutId = setTimeout(typing, delay);
                }
            }
        };

        timeoutId = setTimeout(typing, speed);

        return () => clearTimeout(timeoutId);
    }, [text, isEditMode, speed, delay]);

    return displayedText;
};


const Hero: React.FC<HeroProps> = ({ data, isEditMode, onUpdate }) => {
  const { name, title, bio, contact, avatarUrl } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animatedTitle = useTypingEffect(title, isEditMode);

  const handleFieldChange = (field: keyof PortfolioData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate(prev => prev ? { ...prev, [field]: e.target.value } : null);
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onUpdate(prev => prev ? { ...prev, avatarUrl: reader.result as string } : null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="about" className="min-h-[500px] flex items-center justify-center text-center py-40">
      <div className="max-w-4xl">
        <div className="relative w-40 h-40 mx-auto mb-8">
            <img
            className="w-full h-full rounded-full border-4 border-cyan-400 shadow-lg object-cover"
            src={avatarUrl}
            alt={name}
            />
            {isEditMode && (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
                        aria-label="Change profile picture"
                    >
                       <CameraIcon className="w-8 h-8"/>
                    </button>
                </>
            )}
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
          Hi, I'm{' '}
          <Editable
            isEditing={isEditMode}
            value={name}
            onChange={handleFieldChange('name')}
            className="text-cyan-400"
            inputClassName="text-5xl md:text-7xl font-extrabold w-full text-center"
           />
        </h1>
         {isEditMode ? (
            <Editable
                isEditing={true}
                value={title}
                onChange={handleFieldChange('title')}
                className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6"
                inputClassName="w-full text-center"
            />
         ) : (
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6 h-10">
                {animatedTitle}
                <span className="animate-ping">|</span>
            </h2>
         )}
        <Editable
            isEditing={isEditMode}
            value={bio}
            onChange={handleFieldChange('bio')}
            as="textarea"
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
            inputClassName="w-full h-40"
        />
        <div className="flex justify-center items-center space-x-6">
          {contact.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-125"
              aria-label={social.name}
            >
              <SocialIcon name={social.icon} className="w-6 h-6" />
            </a>
          ))}
        </div>
        <div className="mt-12">
            <a href={`mailto:${contact.email}`} className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 text-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105">
                Get In Touch
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;