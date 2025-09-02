
import React from 'react';

interface EditControlsProps {
  isEditMode: boolean;
  onToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditControls: React.FC<EditControlsProps> = ({ isEditMode, onToggle, onSave, onCancel }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {isEditMode ? (
        <>
          <button
            onClick={onSave}
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-all duration-300 shadow-lg"
            aria-label="Save Changes"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white font-bold py-3 px-6 rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
            aria-label="Cancel Edits"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={onToggle}
          className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg"
          aria-label="Edit Portfolio"
        >
          Edit Portfolio
        </button>
      )}
    </div>
  );
};

export default EditControls;