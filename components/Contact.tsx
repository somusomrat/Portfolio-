
import React from 'react';
import type { PortfolioData } from '../types';
import { SocialIcon } from './Icons';
import Editable from './Editable';

interface ContactProps {
  contact: PortfolioData['contact'];
  isEditMode: boolean;
  onUpdate: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
}

const Contact: React.FC<ContactProps> = ({ contact, isEditMode, onUpdate }) => {

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(prev => prev ? { ...prev, contact: { ...prev.contact, email: e.target.value } } : null);
  };

  return (
    <section id="contact" className="py-20 text-center">
      <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
      <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
        I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a project in mind, want to connect, or just say hello!
      </p>
      <div className="inline-block bg-cyan-500 text-white font-bold py-4 px-10 rounded-full hover:bg-cyan-600 transition-all duration-300 text-xl shadow-lg hover:shadow-cyan-500/50 mb-12">
        <Editable
          isEditing={isEditMode}
          value={contact.email}
          onChange={handleEmailChange}
          textClassName="cursor-pointer"
          inputClassName="w-64 text-center bg-cyan-600"
        />
      </div>
      <div className="flex justify-center items-center space-x-8">
        {contact.socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-125"
            aria-label={social.name}
          >
            <SocialIcon name={social.icon} className="w-8 h-8" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;