import React, { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      className,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      ghost: 'text-white hover:bg-white/5 hover:text-primary',
      solid: 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20',
      outline: 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    };

    const classes = twMerge(
      clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      ),
    );

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block animate-spin">⚙️</span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
