import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-4 text-red-500 bg-red-100 border border-red-300 rounded-lg">
      <p className="font-bold">Error:</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
