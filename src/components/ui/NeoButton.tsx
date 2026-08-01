import React from 'react';
import { Loader2 } from 'lucide-react';

export interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'coral' | 'black' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold font-sans transition-all duration-150 cursor-pointer rounded-xl select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none';

  const variantStyles = {
    primary: 'bg-[#FFD54F] text-[#111111] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[1px_1px_0px_#111111] active:translate-x-[3px] active:translate-y-[3px]',
    accent: 'bg-[#4ECDC4] text-[#111111] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[1px_1px_0px_#111111] active:translate-x-[3px] active:translate-y-[3px]',
    coral: 'bg-[#FF6B6B] text-[#FFFFFF] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[1px_1px_0px_#111111] active:translate-x-[3px] active:translate-y-[3px]',
    black: 'bg-[#111111] text-[#FFFFFF] border-3 border-[#111111] shadow-[4px_4px_0px_#FFD54F] hover:shadow-[6px_6px_0px_#FFD54F] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[1px_1px_0px_#FFD54F] active:translate-x-[3px] active:translate-y-[3px]',
    white: 'bg-[#FFFFFF] text-[#111111] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-[1px_1px_0px_#111111] active:translate-x-[3px] active:translate-y-[3px]',
    ghost: 'bg-transparent text-[#111111] hover:bg-[#FFD54F]/20 border-2 border-transparent hover:border-[#111111]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Thinking...</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};
