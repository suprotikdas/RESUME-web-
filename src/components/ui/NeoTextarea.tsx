import React, { useState } from 'react';
import { Sparkles, Check, AlertCircle } from 'lucide-react';

export interface NeoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  onAIImprove?: (text: string) => Promise<{ improvedText: string; explanation?: string }>;
  contextType?: string;
  targetRole?: string;
}

export const NeoTextarea: React.FC<NeoTextareaProps> = ({
  label,
  error,
  helperText,
  onAIImprove,
  contextType = 'bullet points',
  targetRole,
  className = '',
  value,
  onChange,
  id,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const [isImproving, setIsImproving] = useState(false);
  const [aiSuccess, setAiSuccess] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleImproveClick = async () => {
    if (!value || String(value).trim().length === 0) {
      setAiError('Please enter some initial text to improve.');
      setTimeout(() => setAiError(null), 3000);
      return;
    }

    if (onAIImprove) {
      setIsImproving(true);
      setAiError(null);
      try {
        const result = await onAIImprove(String(value));
        if (result && result.improvedText) {
          // Trigger standard change event simulation
          const event = {
            target: { value: result.improvedText },
          } as React.ChangeEvent<HTMLTextAreaElement>;
          if (onChange) onChange(event);
          setAiSuccess(true);
          setTimeout(() => setAiSuccess(false), 3000);
        }
      } catch (err: any) {
        setAiError(err.message || 'AI Improvement failed');
        setTimeout(() => setAiError(null), 4000);
      } finally {
        setIsImproving(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={textareaId} className="font-bold text-xs uppercase tracking-wider text-[#111111]">
            {label}
          </label>
        )}
        {onAIImprove && (
          <button
            type="button"
            onClick={handleImproveClick}
            disabled={isImproving}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-[#FFD54F] text-[#111111] border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#111111] fill-[#111111]" />
            <span>{isImproving ? 'Improving...' : '✨ Improve with AI'}</span>
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          id={textareaId}
          value={value}
          onChange={onChange}
          className={`w-full bg-[#FFFFFF] text-[#111111] border-3 border-[#111111] shadow-[3px_3px_0px_#111111] rounded-xl font-medium text-sm p-3 transition-all focus:outline-none focus:shadow-[5px_5px_0px_#111111] focus:bg-[#FFFDF9] min-h-[100px] ${
            error ? 'border-[#FF6B6B] bg-[#FF6B6B]/10' : ''
          } ${className}`}
          {...props}
        />
      </div>

      {aiSuccess && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 p-2 border-2 border-emerald-700 rounded-lg">
          <Check className="w-4 h-4 shrink-0" />
          <span>AI enhanced your text with active verbs and STAR impact metrics!</span>
        </div>
      )}

      {aiError && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B6B] bg-[#FF6B6B]/10 p-2 border-2 border-[#FF6B6B] rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{aiError}</span>
        </div>
      )}

      {error && <span className="text-xs font-bold text-[#FF6B6B]">{error}</span>}
      {helperText && !error && !aiSuccess && !aiError && (
        <span className="text-xs text-gray-600 font-medium">{helperText}</span>
      )}
    </div>
  );
};
