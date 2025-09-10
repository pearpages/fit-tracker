import React, { useRef } from 'react';
import { useModal } from './useModal';
import type { OpenPayload } from './types';

interface ModalTriggerProps {
  children: React.ReactNode;
  modal: OpenPayload;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ModalTrigger: React.FC<ModalTriggerProps> = ({
  children,
  modal,
  disabled = false,
  className,
  type = 'button',
}) => {
  const { open } = useModal();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Store the triggering element for return focus
    const triggerElement = event.currentTarget;

    open({
      ...modal,
      returnFocus: triggerElement,
    });
  };

  return (
    <button
      ref={triggerRef}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {children}
    </button>
  );
};
