import React from 'react';
import { PostCardProps } from '../../types/post';

const Card: React.FC<PostCardProps> = ({ children, backgroundColor }) => {
  return (
    <div
      className={`p-6 my-4 cursor-pointer rounded-lg ${backgroundColor || 'bg-white'}`}>
      {children}
     </div>
  );
};

export default Card;
