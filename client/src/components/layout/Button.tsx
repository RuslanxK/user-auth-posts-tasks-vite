import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'danger'; // Add color options
  type?: 'button' | 'submit' | 'reset'; // Define type options for the button
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  color = 'primary',
  type = 'button', // Default to 'button'
}) => {
  const colorClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-gray-500 text-white hover:bg-gray-700',
    success: 'bg-primary text-white hover:bg-green-700',
    danger: 'bg-red-500 text-white hover:bg-red-700',
  };

  return (
    <button
      type={type} // Apply the type prop
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-sm rounded-lg w-auto ${
        colorClasses[color]
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      data-testid="load-more-button"
      
    >
      {children}
    </button>
  );
};

export default Button;
