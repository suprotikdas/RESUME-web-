import React, { useState } from 'react';
import { InterviewPrepItem, ResumeData } from '../../types';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';
import { MessageSquareCode, Sparkles, X, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';

interface InterviewPrepModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

export const InterviewPrepModal: React.FC<InterviewPrepModalProps> = ({
  isOpen,
  onClose,
  resumeData,
}) => {
  const [questions, setQuestions] = useState<InterviewPrepItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  if (!isOpen) return null;

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData }),
      });
      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
      }
    } catch (err) {
      console.error('Interview prep generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFF9F0] border-4 border-black shadow-[10px_10px_0px_#111111] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b-3 border-black pb-3 mb-4">
          <div className="flex items-center gap-2">
            <MessageSquareCode className="w-6 h-6 text-[#4ECDC4]" />
            <h2 className="text-xl font-black uppercase text-[#111111]">
              AI Interview Prep & STAR Model Guides
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border-2 border-black bg-white hover:bg-[#FFD54F] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {questions.length === 0 ? (
          <div className="bg-white border-3 border-black p-8 rounded-xl text-center flex flex-col items-center gap-4">
            <HelpCircle className="w-12 h-12 text-[#4ECDC4]" />
            <div>
              <h3 className="font-black text-base text-black uppercase">Tailored Interview Question Generator</h3>
              <p className="text-xs text-gray-600 max-w-md mt-1">
                AI analyzes your experiences, projects, and target role to craft top 5 technical and behavioral interview questions + STAR answer guides.
              </p>
            </div>
            <NeoButton
              variant="accent"
              size="lg"
              isLoading={isLoading}
              icon={<Sparkles className="w-5 h-5 fill-black" />}
              onClick={handleGenerateQuestions}
            >
              Generate Tailored Interview Questions
            </NeoButton>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-black">
                Tailored Questions for {resumeData.personalInfo.targetRole || 'Candidate'}:
              </span>
              <NeoButton variant="white" size="sm" onClick={handleGenerateQuestions} isLoading={isLoading}>
                Refresh Questions
              </NeoButton>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const isExpanded = expandedIdx === idx;

                return (
                  <div key={idx} className="bg-white border-3 border-black rounded-xl shadow-[3px_3px_0px_#111111] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                      className="w-full p-4 text-left font-bold text-sm text-black flex justify-between items-center bg-yellow-50/50 hover:bg-yellow-100/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="bg-[#111111] text-white text-xs px-2 py-0.5 rounded border border-black font-mono">
                          Q{idx + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="p-4 border-t-2 border-black flex flex-col gap-3 text-xs bg-white">
                        <div className="bg-gray-100 p-2 rounded-lg font-medium text-gray-700">
                          <strong className="text-black uppercase">Recruiter Context: </strong> {q.context}
                        </div>

                        {/* STAR Framework */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          <div className="bg-blue-50 border border-blue-300 p-2 rounded-lg">
                            <strong className="text-blue-900 block font-black uppercase text-[10px]">Situation:</strong>
                            <p className="text-gray-800">{q.starGuide.situation}</p>
                          </div>
                          <div className="bg-amber-50 border border-amber-300 p-2 rounded-lg">
                            <strong className="text-amber-900 block font-black uppercase text-[10px]">Task:</strong>
                            <p className="text-gray-800">{q.starGuide.task}</p>
                          </div>
                          <div className="bg-teal-50 border border-teal-300 p-2 rounded-lg">
                            <strong className="text-teal-900 block font-black uppercase text-[10px]">Action:</strong>
                            <p className="text-gray-800">{q.starGuide.action}</p>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-300 p-2 rounded-lg">
                            <strong className="text-emerald-900 block font-black uppercase text-[10px]">Result:</strong>
                            <p className="text-gray-800">{q.starGuide.result}</p>
                          </div>
                        </div>

                        {/* Key Tips */}
                        <div className="mt-1">
                          <span className="font-bold text-black uppercase text-[10px] block mb-1">Key Talking Points:</span>
                          <div className="flex flex-wrap gap-1">
                            {q.keyTips.map((tip, tIdx) => (
                              <span key={tIdx} className="bg-yellow-100 border border-black px-2 py-0.5 rounded text-[11px] font-semibold text-black">
                                💡 {tip}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
