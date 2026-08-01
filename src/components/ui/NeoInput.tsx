import React from 'react';

export interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const NeoInput: React.FC<NeoInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="font-bold text-xs uppercase tracking-wider text-[#111111]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-[#111111] pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-[#FFFFFF] text-[#111111] border-3 border-[#111111] shadow-[3px_3px_0px_#111111] rounded-xl font-medium text-sm transition-all focus:outline-none focus:shadow-[5px_5px_0px_#111111] focus:bg-[#FFFDF9] ${
            leftIcon ? 'pl-10 pr-3 py-2.5' : 'px-3.5 py-2.5'
          } ${error ? 'border-[#FF6B6B] bg-[#FF6B6B]/10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs font-bold text-[#FF6B6B]">{error}</span>}
      {helperText && !error && <span className="text-xs text-gray-600 font-medium">{helperText}</span>}
    </div>
  );
};
