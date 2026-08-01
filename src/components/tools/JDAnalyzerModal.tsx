import React, { useState } from 'react';
import { JDMatchResult, ResumeData } from '../../types';
import { NeoTextarea } from '../ui/NeoTextarea';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard, NeoBadge } from '../ui/NeoCard';
import { FileText, Target, CheckCircle, AlertTriangle, Plus, X } from 'lucide-react';

interface JDAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
}

export const JDAnalyzerModal: React.FC<JDAnalyzerModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onUpdateResume,
}) => {
  const [jdText, setJdText] = useState('');
  const [matchResult, setMatchResult] = useState<JDMatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleAnalyzeJD = async () => {
    if (!jdText || jdText.trim().length < 20) {
      alert('Please paste a full Job Description to compare.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/jd-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData, jobDescription: jdText }),
      });
      const data = await res.json();
      if (data && data.matchPercentage !== undefined) {
        setMatchResult(data);
      }
    } catch (err) {
      console.error('JD Match error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInsertMissingKeyword = (kw: string) => {
    const updated = { ...resumeData };
    if (!updated.skillCategories || updated.skillCategories.length === 0) {
      updated.skillCategories = [{ id: 'sc-1', categoryName: 'Technical Skills', skills: [kw] }];
    } else {
      if (!updated.skillCategories[0].skills.includes(kw)) {
        updated.skillCategories[0].skills.push(kw);
      }
    }
    onUpdateResume(updated);
    if (matchResult) {
      setMatchResult({
        ...matchResult,
        matchedKeywords: [...matchResult.matchedKeywords, kw],
        missingKeywords: matchResult.missingKeywords.filter((k) => k !== kw),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFF9F0] border-4 border-black shadow-[10px_10px_0px_#111111] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b-3 border-black pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-[#FF6B6B]" />
            <h2 className="text-xl font-black uppercase text-[#111111]">
              Job Description Matcher & Keyword Gap
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border-2 border-black bg-white hover:bg-[#FFD54F] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!matchResult ? (
          <div className="flex flex-col gap-4">
            <NeoTextarea
              label="Paste Target Job Description (JD) Below:"
              placeholder="Paste job requirements, skills, role description..."
              rows={8}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />

            <NeoButton
              variant="coral"
              size="lg"
              isLoading={isAnalyzing}
              icon={<Target className="w-5 h-5" />}
              onClick={handleAnalyzeJD}
            >
              Analyze Job Match & Missing Keywords
            </NeoButton>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Match Gauge */}
            <div className="bg-white border-3 border-black p-4 rounded-xl shadow-[4px_4px_0px_#111111] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase block">Target Role Match</span>
                <h3 className="text-lg font-black text-black">{matchResult.jobTitleExtracted}</h3>
                <span className="text-xs font-semibold text-gray-600">{matchResult.companyExtracted}</span>
              </div>

              <div className="text-center bg-[#FFD54F] border-2 border-black p-3 rounded-xl shadow-[3px_3px_0px_#111111]">
                <span className="text-3xl font-black text-black">{matchResult.matchPercentage}%</span>
                <span className="text-[10px] font-black uppercase tracking-wider block">Match Score</span>
              </div>
            </div>

            {/* Matched vs Missing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border-2 border-emerald-700 p-3 rounded-xl">
                <span className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" /> Matched Keywords ({matchResult.matchedKeywords.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {matchResult.matchedKeywords.map((kw, i) => (
                    <span key={i} className="text-xs font-bold bg-white text-emerald-900 border border-emerald-700 px-2 py-0.5 rounded-md">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 border-2 border-[#FF6B6B] p-3 rounded-xl">
                <span className="text-xs font-black uppercase text-red-900 flex items-center gap-1 mb-2">
                  <AlertTriangle className="w-4 h-4 text-[#FF6B6B]" /> Missing Keywords ({matchResult.missingKeywords.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {matchResult.missingKeywords.map((kw, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleInsertMissingKeyword(kw)}
                      className="text-xs font-bold bg-white text-black border border-black px-2 py-0.5 rounded-md hover:bg-[#FFD54F] cursor-pointer"
                    >
                      + Add {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested Section Additions */}
            {matchResult.suggestedAdditions && (
              <div className="bg-yellow-50 border-2 border-black p-4 rounded-xl">
                <h4 className="font-black text-xs uppercase text-black mb-2">💡 Recommended Additions to Resume:</h4>
                <div className="space-y-2">
                  {matchResult.suggestedAdditions.map((item, idx) => (
                    <div key={idx} className="bg-white border border-black p-2 rounded-lg text-xs font-medium">
                      <strong className="text-black uppercase">[{item.section}]</strong> {item.suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t-2 border-black">
              <NeoButton variant="white" size="sm" onClick={() => setMatchResult(null)}>
                Compare Another Job Description
              </NeoButton>
              <NeoButton variant="black" size="sm" onClick={onClose}>
                Done & Close
              </NeoButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
