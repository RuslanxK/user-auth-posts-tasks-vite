import React from 'react';

interface FixedButtonProps {
  onClick: () => void;
}

const FixedButton: React.FC<FixedButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Add Post"
      className="fixed bottom-5 right-5 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-blue-600"
    >
      +
    </button>
  );
};

export default FixedButton;
