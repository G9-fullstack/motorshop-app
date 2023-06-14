import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode
}

export function Modal(props: ModalProps): JSX.Element | null {
  const modalRoot = document.getElementById("modal-root");
  const modalElement = document.createElement("div");

  useEffect(() => {
    modalRoot && modalRoot.appendChild(modalElement);
    return () => {
      modalRoot && modalRoot.removeChild(modalElement);
    };
  }, [modalElement, modalRoot]);

  return props.isOpen ? createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      {props.children}
    </div>,
    modalElement
  ) : null;
}

