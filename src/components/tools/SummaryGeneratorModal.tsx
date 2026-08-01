import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { NeoButton } from '../ui/NeoButton';
import { Sparkles, X, Check, FileText } from 'lucide-react';

interface SummaryOption {
  title: string;
  text: string;
  tag: string;
}

interface SummaryGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onApplySummary: (summaryText: string) => void;
}

export const SummaryGeneratorModal: React.FC<SummaryGeneratorModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onApplySummary,
}) => {
  const [options, setOptions] = useState<SummaryOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData }),
      });
      const data = await res.json();
      if (data.options && Array.isArray(data.options)) {
        setOptions(data.options);
      }
    } catch (err) {
      console.error('Summary generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFF9F0] border-4 border-black shadow-[10px_10px_0px_#111111] rounded-2xl w-full max-w-2xl flex flex-col p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b-3 border-black pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#FFD54F] fill-black" />
            <h2 className="text-lg font-black uppercase text-[#111111]">
              AI Professional Summary Generator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border-2 border-black bg-white hover:bg-[#FFD54F] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {options.length === 0 ? (
          <div className="bg-white border-3 border-black p-8 rounded-xl text-center flex flex-col items-center gap-4">
            <FileText className="w-12 h-12 text-[#FF6B6B]" />
            <div>
              <h3 className="font-black text-base text-black uppercase">Craft 3 Recruiter-Friendly Summaries</h3>
              <p className="text-xs text-gray-600 max-w-md mt-1">
                Gemini AI parses your completed work experience, education, and technical skills to generate 3 tailored summary options.
              </p>
            </div>
            <NeoButton
              variant="primary"
              size="lg"
              isLoading={isLoading}
              icon={<Sparkles className="w-5 h-5 fill-black" />}
              onClick={handleGenerate}
            >
              Generate Summary Options
            </NeoButton>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-black">Choose a Summary Style:</span>
              <NeoButton variant="white" size="sm" onClick={handleGenerate} isLoading={isLoading}>
                Regenerate Options
              </NeoButton>
            </div>

            <div className="space-y-3">
              {options.map((opt, idx) => (
                <div key={idx} className="bg-white border-3 border-black p-4 rounded-xl shadow-[4px_4px_0px_#111111] flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-sm uppercase text-black">{opt.title}</span>
                    <span className="bg-[#4ECDC4] border border-black font-extrabold text-[10px] px-2 py-0.5 rounded text-black uppercase">
                      {opt.tag}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-800 leading-relaxed">{opt.text}</p>
                  <div className="flex justify-end pt-1">
                    <NeoButton
                      variant="primary"
                      size="sm"
                      icon={<Check className="w-4 h-4" />}
                      onClick={() => {
                        onApplySummary(opt.text);
                        onClose();
                      }}
                    >
                      Apply to Resume
                    </NeoButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
