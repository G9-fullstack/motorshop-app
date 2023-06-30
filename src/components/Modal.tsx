"use client";

import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  modalTitle: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, isOpen, modalTitle, onClose, }: ModalProps): JSX.Element | null {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 h-screen">
      <section className="bg-grey-10 rounded py-10 px-6 w-[32.5rem] mt-40 mb-40 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-branding-blue scrollbar-thumb-rounded-full">
        <div className="flex justify-between">
          <h2 className="mb-4 text-1 font-medium text-black font-lexend">{modalTitle}</h2>
          <button
            className="flex items-center text-3xl font-light justify-center rounded-full w-9 h-9 hover:bg-gray-200/50 text-gray-400 hover:text-branding-blue transition transform rotate-45"
            onClick={onClose}
          >
            +
          </button>
        </div>
        {children}
      </section>
    </div>,
    document.body
  );
}
