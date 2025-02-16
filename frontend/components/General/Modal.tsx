// components/General/Modal.tsx
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

 const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-screen',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={`w-full h-full ${sizeClasses[size]} bg-white rounded-lg shadow-lg overflow-hidden `}>
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 max-h-[80vh] overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;