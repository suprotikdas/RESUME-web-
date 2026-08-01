import React from 'react';

export interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'primary' | 'accent' | 'coral' | 'cream';
  hoverEffect?: boolean;
}

export const NeoCard: React.FC<NeoCardProps> = ({
  children,
  variant = 'white',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const variantBg = {
    white: 'bg-[#FFFFFF]',
    primary: 'bg-[#FFD54F]',
    accent: 'bg-[#4ECDC4]',
    coral: 'bg-[#FF6B6B] text-white',
    cream: 'bg-[#FFF9F0]',
  };

  const hoverStyles = hoverEffect
    ? 'hover:shadow-[8px_8px_0px_#111111] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200'
    : '';

  return (
    <div
      className={`border-3 border-[#111111] shadow-[5px_5px_0px_#111111] rounded-xl p-5 ${variantBg[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export interface NeoBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'yellow' | 'teal' | 'coral' | 'black' | 'white';
}

export const NeoBadge: React.FC<NeoBadgeProps> = ({
  children,
  variant = 'yellow',
  className = '',
  ...props
}) => {
  const variantStyles = {
    yellow: 'bg-[#FFD54F] text-[#111111]',
    teal: 'bg-[#4ECDC4] text-[#111111]',
    coral: 'bg-[#FF6B6B] text-white',
    black: 'bg-[#111111] text-white',
    white: 'bg-[#FFFFFF] text-[#111111]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold text-xs px-2.5 py-0.5 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] rounded-full whitespace-nowrap select-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export interface NeoProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  onStepClick?: (step: number) => void;
}

export const NeoProgressBar: React.FC<NeoProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabels = [],
  onStepClick,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#111111]">
        <span>Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1] || ''}</span>
        <span className="bg-[#FFD54F] border-2 border-[#111111] px-2 py-0.5 rounded-lg shadow-[2px_2px_0px_#111111]">
          {percentage}% Complete
        </span>
      </div>

      <div className="w-full h-4 bg-[#FFFFFF] border-3 border-[#111111] shadow-[3px_3px_0px_#111111] rounded-xl p-0.5 overflow-hidden relative">
        <div
          className="h-full bg-[#FFD54F] border-r-2 border-[#111111] transition-all duration-300 rounded-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {stepLabels.length > 0 && (
        <div className="hidden md:flex justify-between items-center pt-1 overflow-x-auto gap-1">
          {stepLabels.map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onStepClick && onStepClick(stepNum)}
                className={`text-[10px] font-bold px-2 py-1 rounded-md border border-[#111111] transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#FFD54F] font-black scale-105 shadow-[2px_2px_0px_#111111]'
                    : isCompleted
                    ? 'bg-[#4ECDC4] text-[#111111]'
                    : 'bg-white text-gray-500 opacity-70'
                }`}
              >
                {stepNum}. {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
