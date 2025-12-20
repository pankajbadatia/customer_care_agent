'use client';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  width?: 'sm' | 'md' | 'lg';
}

/**
 * Modal component
 * - Portal based (avoids z-index bugs)
 * - ESC to close
 * - Overlay click to close
 * - Accessible roles
 */
export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  width = 'md',
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidth = {
    sm: '24rem',
    md: '36rem',
    lg: '48rem',
  }[width];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
      }}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'relative',
          maxWidth,
          margin: '10vh auto',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          padding: '1.25rem',
          boxShadow:
            '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        }}
      >
        {title && (
          <div
            style={{
              marginBottom: '0.75rem',
              fontSize: '1.125rem',
              fontWeight: 600,
            }}
          >
            <span id="modal-title">{title}</span>
          </div>
        )}

        <div>{children}</div>

        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}
