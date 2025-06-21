import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      size = "md",
      closeOnBackdropClick = true,
      closeOnEscape = true,
      children,
      title,
      className,
    },
    ref,
  ) => {
    // ESC 키 처리
    useEffect(() => {
      if (!open || !closeOnEscape || !onClose) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, closeOnEscape, onClose]);

    // body scroll 제어
    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }

      return () => {
        document.body.style.overflow = "unset";
      };
    }, [open]);

    if (!open) return null;

    const handleBackdropClick = (event: React.MouseEvent) => {
      if (
        event.target === event.currentTarget &&
        closeOnBackdropClick &&
        onClose
      ) {
        onClose();
      }
    };

    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
    };

    const modalContent = (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* 배경 오버레이 */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={handleBackdropClick}
        />

        {/* Modal 내용 */}
        <div
          ref={ref}
          className={clsx(
            "relative z-10 bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto mx-4 w-full",
            sizeClasses[size],
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {children}
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  },
);

Modal.displayName = "Modal";

// Modal Header 컴포넌트
export interface ModalHeaderProps {
  showCloseButton?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ showCloseButton = true, onClose, title, children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "flex items-center justify-between p-6 border-b border-gray-200",
          className,
        )}
      >
        <div className="flex-1">
          {title && (
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              {title}
            </h2>
          )}
          {children}
        </div>

        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

ModalHeader.displayName = "ModalHeader";

// Modal Body 컴포넌트
export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={clsx("p-6", className)}>
        {children}
      </div>
    );
  },
);

ModalBody.displayName = "ModalBody";

// Modal Footer 컴포넌트
export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

ModalFooter.displayName = "ModalFooter";
