
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EditControls from './components/EditControls';
import PasswordModal from './components/PasswordModal';
import ScrollToTopButton from './components/ScrollToTopButton';
import CustomCursor from './components/CustomCursor';
import AnimatedSection from './components/AnimatedSection';
import type { PortfolioData } from './types';

// tsParticles is loaded from a script tag in index.html
declare global {
  interface Window {
    tsParticles: any;
  }
}

const particlesConfig = {
  background: {
    color: {
      value: '#030712'
    }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 80,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#4b5563'
    },
    links: {
      color: '#4b5563',
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 1,
      straight: false
    },
    number: {
      density: {
        enable: true,
      },
      value: 80
    },
    opacity: {
      value: 0.2
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 3 }
    }
  },
  detectRetina: true
};


const App: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [draftData, setDraftData] = useState<PortfolioData | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('portfolio.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: PortfolioData) => {
        setPortfolioData(data);
        setDraftData(JSON.parse(JSON.stringify(data)));
      })
      .catch((err) => {
        console.error("Failed to fetch portfolio data:", err);
        setError("Failed to load portfolio data. Please try refreshing the page.");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          const preloader = document.getElementById('preloader');
          if (preloader) {
            preloader.classList.add('loaded');
          }
        }, 500); // Small delay for smoother transition
      });
  }, []);

  useEffect(() => {
    if (window.tsParticles) {
      window.tsParticles.load({ id: 'tsparticles', options: particlesConfig });
    }
  }, []);
  
  const handleSave = () => {
    if (!draftData) return;
    const jsonString = JSON.stringify(draftData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.json';
    a.click();
    URL.revokeObjectURL(url);
    setPortfolioData(JSON.parse(JSON.stringify(draftData)));
    setIsEditMode(false);
    setIsAuthenticated(false);
  };
  
  const handleCancel = () => {
    setDraftData(JSON.parse(JSON.stringify(portfolioData)));
    setIsEditMode(false);
    setIsAuthenticated(false);
  };
  
  const handleToggleEditMode = () => {
    if (portfolioData?.editPassword) {
      setShowPasswordModal(true);
    } else {
      console.warn("Edit mode toggled without a password. Set 'editPassword' in portfolio.json to secure editing.");
    }
  };

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    setIsEditMode(true);
    setShowPasswordModal(false);
  };

  const displayData = isEditMode ? draftData : portfolioData;

  if (loading) {
    return null; // The preloader in index.html is handling the loading view
  }

  if (error || !displayData) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400" role="alert">
        <div className="text-xl text-center p-4">
            <p className="font-bold">{error || "An unknown error occurred."}</p>
            <p className="text-sm text-gray-400 mt-2">Please ensure the `portfolio.json` file exists in the project root and is correctly formatted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen font-sans relative">
      <CustomCursor />
      <Header 
        name={displayData.name} 
        isEditMode={isEditMode}
        onUpdate={setDraftData}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
            <Hero 
              data={displayData}
              isEditMode={isEditMode}
              onUpdate={setDraftData}
            />
        </AnimatedSection>
        <AnimatedSection>
            <Projects 
                projects={displayData.projects}
                isEditMode={isEditMode}
                onUpdate={setDraftData}
            />
        </AnimatedSection>
        <AnimatedSection>
            <Skills 
                skills={displayData.skills}
                isEditMode={isEditMode}
                onUpdate={setDraftData}
            />
        </AnimatedSection>
        <AnimatedSection>
            <Experience 
                experience={displayData.experience}
                isEditMode={isEditMode}
                onUpdate={setDraftData}
            />
        </AnimatedSection>
        <AnimatedSection>
            <Contact 
                contact={displayData.contact}
                isEditMode={isEditMode}
                onUpdate={setDraftData}
            />
        </AnimatedSection>
      </main>
      <Footer 
        name={displayData.name}
        isEditMode={isEditMode}
        onUpdate={setDraftData}
      />
      {!!portfolioData?.editPassword && (
        <EditControls
          isEditMode={isEditMode}
          onToggle={handleToggleEditMode}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      {showPasswordModal && (
        <PasswordModal
          correctPassword={portfolioData?.editPassword || ''}
          onSuccess={handlePasswordSuccess}
          onCancel={() => setShowPasswordModal(false)}
        />
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default App;