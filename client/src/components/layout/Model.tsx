import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return modalRoot
    ? ReactDOM.createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackgroundClick}
        >
          <div className="bg-white p-6 shadow-lg relative w-11/12 max-w-2xl" role="dialog">
            <button
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-3xl" 
              onClick={onClose}
            >
              &times;
            </button>
            {children}
          </div>
        </div>,
        modalRoot
      )
    : null;
};

export default Modal;
