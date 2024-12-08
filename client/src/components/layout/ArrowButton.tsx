import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 

interface ArrowButtonProps {
  className?: string; 
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} 
      className={`p-2 text-primary bg-transparent hover:text-secondary ${className}`}
    >
      <FaArrowLeft size={25} /> 
    </button>
  );
};

export default ArrowButton;
