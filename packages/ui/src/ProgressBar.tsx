import React, { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  percentage: number;
  animated?: boolean;
  color?: 'primary' | 'accent' | 'emerald';
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      percentage = 0,
      animated = true,
      color = 'primary',
      className,
      ...props
    },
    ref,
  ) => {
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    const colorStyles = {
      primary: 'bg-gradient-to-r from-primary to-primary/60',
      accent: 'bg-gradient-to-r from-accent to-accent/60',
      emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'w-full h-2 bg-zinc-800 rounded-full overflow-hidden shadow-inner',
            className,
          ),
        )}
        {...props}
      >
        <div
          className={clsx(
            'h-full transition-all duration-500 ease-out',
            colorStyles[color],
            animated && 'animate-pulse',
            animated && 'shadow-lg shadow-primary/50',
          )}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
