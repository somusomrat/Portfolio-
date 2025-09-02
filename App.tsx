
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
import type { PortfolioData } from './types';

const App: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [draftData, setDraftData] = useState<PortfolioData | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/portfolio.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: PortfolioData) => {
        setPortfolioData(data);
        setDraftData(JSON.parse(JSON.stringify(data))); // Deep copy for editing
      })
      .catch((err) => {
        console.error("Failed to fetch portfolio data:", err);
        setError("Failed to load portfolio data. Please try refreshing the page.");
      })
      .finally(() => {
        setLoading(false);
      });
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
    setPortfolioData(JSON.parse(JSON.stringify(draftData))); // Update live data
    setIsEditMode(false);
    setIsAuthenticated(false);
  };
  
  const handleCancel = () => {
    setDraftData(JSON.parse(JSON.stringify(portfolioData))); // Revert changes
    setIsEditMode(false);
    setIsAuthenticated(false);
  };
  
  const handleToggleEditMode = () => {
    if (portfolioData?.editPassword) {
      setShowPasswordModal(true);
    } else {
      // Fallback for portfolios without a password set, though UI should prevent this.
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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white" role="status" aria-live="polite">
        <div className="text-xl font-semibold">Loading Portfolio...</div>
      </div>
    );
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
    <div className="bg-gray-900 min-h-screen font-sans">
      <Header 
        name={displayData.name} 
        isEditMode={isEditMode}
        onUpdate={setDraftData}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hero 
          data={displayData}
          isEditMode={isEditMode}
          onUpdate={setDraftData}
        />
        <Projects 
            projects={displayData.projects}
            isEditMode={isEditMode}
            onUpdate={setDraftData}
        />
        <Skills 
            skills={displayData.skills}
            isEditMode={isEditMode}
            onUpdate={setDraftData}
        />
        <Experience 
            experience={displayData.experience}
            isEditMode={isEditMode}
            onUpdate={setDraftData}
        />
        <Contact 
            contact={displayData.contact}
            isEditMode={isEditMode}
            onUpdate={setDraftData}
        />
      </main>
      <Footer 
        name={displayData.name}
        isEditMode={isEditMode}
        onUpdate={setDraftData}
      />
      {/* Show edit controls only if a password is set in the portfolio data */}
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
    </div>
  );
};

export default App;