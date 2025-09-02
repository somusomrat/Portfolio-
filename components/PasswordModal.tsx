
import React, { useState, useEffect, useRef } from 'react';

interface PasswordModalProps {
  correctPassword?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ correctPassword, onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field when the modal appears
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError('');
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="password-modal-title"
    >
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
        <h2 id="password-modal-title" className="text-2xl font-bold text-white text-center mb-4">
          Enter Password
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Please enter the password to edit the portfolio.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password-input" className="sr-only">Password</label>
            <input
              ref={inputRef}
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border-2 border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              placeholder="Password"
              required
              aria-describedby={error ? "password-error" : undefined}
            />
          </div>
          {error && (
            <p id="password-error" className="text-red-400 text-center text-sm mb-4" role="alert">
              {error}
            </p>
          )}
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-600 transition-colors"
            >
              Unlock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;