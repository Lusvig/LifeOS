import React, { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-surface border border-white/10 rounded-xl',
      glass: 'glass-panel',
    };

    const classes = twMerge(
      clsx(
        'p-6 shadow-lg',
        variantStyles[variant],
        className,
      ),
    );

    return <div ref={ref} className={classes} {...props} />;
  },
);

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(clsx('mb-4', className))}
      {...props}
    />
  ),
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={twMerge(
        clsx(
          'text-xl font-bold text-white',
          className,
        ),
      )}
      {...props}
    />
  ),
);

CardTitle.displayName = 'CardTitle';

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={twMerge(clsx('', className))} {...props} />
  ),
);

CardContent.displayName = 'CardContent';
