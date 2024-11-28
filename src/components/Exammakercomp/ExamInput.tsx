import React from 'react';
import './ExamInput.css';

interface InputProps {
  id?: string;
  type?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  min?: number;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  min,
  required,
  className = '',
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      required={required}
      className={`input ${className}`}
    />
  );
};

export default Input;
