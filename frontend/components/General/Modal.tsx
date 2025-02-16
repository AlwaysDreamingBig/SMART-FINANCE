"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-screen",
  };

  return (
    <div className="bg-opacity/50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div
        className={`size-full ${sizeClasses[size]} overflow-hidden rounded-lg bg-white shadow-lg`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <FiX className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
