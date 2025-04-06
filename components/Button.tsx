import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (value: string) => void;
  isDarkMode: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, isDarkMode }) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`py-2 px-4 rounded-lg text-lg ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}`}
    >
      {label}
    </button>
  );
};

export default Button;
