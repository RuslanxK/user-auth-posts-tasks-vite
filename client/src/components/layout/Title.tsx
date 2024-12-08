import React from 'react';

interface TitleProps {
  text: string; 
  className?: string; 
}

const Title: React.FC<TitleProps> = ({ text, className }) => {
  return <h1 aria-label="title" className={`text-primary font-bold mb-1 text-3xl ${className}`}>{text}</h1>;
};

export default Title;
