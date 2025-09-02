
import React from 'react';

interface EditableProps {
  isEditing: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: 'input' | 'textarea';
  className?: string;
  textClassName?: string;
  inputClassName?: string;
}

const Editable: React.FC<EditableProps> = ({
  isEditing,
  value,
  onChange,
  as = 'input',
  className = '',
  textClassName = '',
  inputClassName = '',
}) => {
  if (!isEditing) {
    // For textareas, render a paragraph with line breaks
    if (as === 'textarea') {
      return (
        <p className={`${className} ${textClassName} whitespace-pre-wrap`}>
            {value}
        </p>
      );
    }
    return <span className={`${className} ${textClassName}`}>{value}</span>;
  }

  const commonInputStyles = 'bg-gray-700 border-2 border-cyan-500 rounded p-1 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400';

  if (as === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange}
        className={`${commonInputStyles} ${className} ${inputClassName}`}
        rows={4}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`${commonInputStyles} ${className} ${inputClassName}`}
    />
  );
};

export default Editable;