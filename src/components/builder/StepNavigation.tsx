import React from 'react';
import { NeoButton } from '../ui/NeoButton';
import { NeoProgressBar } from '../ui/NeoCard';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export const STEP_LABELS = [
  'Personal Info',
  'Education',
  'Experience',
  'Projects',
  'Skills',
  'Certifications',
  'Achievements',
  'Leadership',
  'Community',
  'Languages',
];

interface StepNavigationProps {
  currentStep: number;
  totalSteps?: number;
  onPrev: () => void;
  onNext: () => void;
  onStepSelect: (step: number) => void;
  onGenerateSummary?: () => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps = 10,
  onPrev,
  onNext,
  onStepSelect,
  onGenerateSummary,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-white border-3 border-[#111111] shadow-[5px_5px_0px_#111111] rounded-xl p-4">
      <NeoProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={STEP_LABELS}
        onStepClick={onStepSelect}
      />

      <div className="flex justify-between items-center pt-2 border-t-2 border-black">
        <NeoButton
          variant="white"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          disabled={currentStep === 1}
          onClick={onPrev}
        >
          Previous Step
        </NeoButton>

        {onGenerateSummary && (
          <NeoButton
            variant="accent"
            size="sm"
            icon={<Sparkles className="w-4 h-4 fill-black" />}
            onClick={onGenerateSummary}
          >
            Generate AI Summary
          </NeoButton>
        )}

        <NeoButton
          variant="primary"
          size="sm"
          icon={<ArrowRight className="w-4 h-4" />}
          disabled={currentStep === totalSteps}
          onClick={onNext}
        >
          {currentStep === totalSteps ? 'Final Review' : 'Next Step'}
        </NeoButton>
      </div>
    </div>
  );
};
