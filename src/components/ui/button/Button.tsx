'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { buttonVariants } from '@/lib/animations';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      animate = false,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-blue-light text-white hover:bg-blue-light/90': variant === 'primary',
        'bg-beige text-gray-800 hover:bg-beige/90': variant === 'secondary',
        'border border-blue-light bg-transparent text-blue-light hover:bg-blue-light/10':
          variant === 'outline',
        'bg-transparent text-gray-700 hover:bg-gray-100': variant === 'ghost',
        'h-8 px-3 text-xs': size === 'sm',
        'h-10 px-4 text-sm': size === 'md',
        'h-12 px-6 text-base': size === 'lg',
        'w-full': fullWidth,
      },
      className
    );

    const ButtonComponent = animate ? motion.button : 'button';

    return (
      <ButtonComponent
        ref={ref}
        className={baseStyles}
        variants={animate ? buttonVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
