"use client";

import { motion } from 'motion/react';
import { useBubbleEffect } from '@/hooks/useBubbleEffect';
import { BubbleEffect } from './BubbleEffect';

interface BubbleButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function BubbleButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled = false,
}: BubbleButtonProps) {
  const { bubbles, createBubbles } = useBubbleEffect();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      createBubbles(e);
      onClick?.(e);
    }
  };

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      createBubbles(e);
    }
  };

  const variantClasses = {
    primary: 'bg-[var(--primary)] hover:bg-[rgb(var(--primaryrgb)/0.9)] text-white',
    secondary: 'bg-white hover:bg-white text-[var(--primary)]',
    outline: 'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[rgb(var(--primaryrgb)/0.05)]',
    ghost: 'text-[var(--primary)] hover:bg-[rgb(var(--primaryrgb)/0.05)]',
    white: 'bg-white/90 hover:bg-white text-[var(--primary)]',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = 'rounded-full font-medium transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleHover}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
    >
      {children}
      <BubbleEffect bubbles={bubbles} variant={variant} />

      {/* Effet de vague au hover */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
}
