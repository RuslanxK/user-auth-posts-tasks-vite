import React from 'react';

interface ParagraphProps {
  text: string; 
  className?: string; 
}

const Paragraph: React.FC<ParagraphProps> = ({ text, className }) => {
  return <p className={`text-text ${className}`}>{text}</p>;
};

export default Paragraph;
