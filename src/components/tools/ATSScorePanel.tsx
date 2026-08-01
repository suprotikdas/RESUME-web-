import React, { useState } from 'react';
import { ATSAnalysisResult, ResumeData } from '../../types';
import { ATSGauge } from '../ui/ATSGauge';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard, NeoBadge } from '../ui/NeoCard';
import { Sparkles, AlertTriangle, CheckCircle2, RefreshCw, X, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ATSScorePanelProps {
  resumeData: ResumeData;
  onUpdateResume?: (updated: ResumeData) => void;
}

export const ATSScorePanel: React.FC<ATSScorePanelProps> = ({ resumeData, onUpdateResume }) => {
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAudit = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ats-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData }),
      });
      const data = await res.json();
      if (data && data.overallScore !== undefined) {
        setAnalysis(data);
        if (data.overallScore >= 80) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
      }
    } catch (err) {
      console.error('ATS score audit failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddKeywordToSkills = (keyword: string) => {
    if (!onUpdateResume) return;
    const updated = { ...resumeData };
    if (!updated.skillCategories || updated.skillCategories.length === 0) {
      updated.skillCategories = [{ id: 'sc-1', categoryName: 'Key Skills', skills: [keyword] }];
    } else {
      updated.skillCategories[0].skills.push(keyword);
    }
    onUpdateResume(updated);
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-4">
      <div className="flex justify-between items-center border-b-3 border-[#111111] pb-3">
        <div>
          <h3 className="text-base font-black uppercase text-[#111111] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFD54F] fill-black" />
            ATS Resume Audit & Gauge
          </h3>
          <p className="text-xs text-gray-600 font-medium">
            Simulate recruiter ATS systems (Taleo, Workday, Greenhouse) to guarantee 90+ score.
          </p>
        </div>

        <NeoButton
          variant="primary"
          size="sm"
          isLoading={isAnalyzing}
          icon={<RefreshCw className="w-4 h-4" />}
          onClick={handleRunAudit}
        >
          {analysis ? 'Re-Audit' : 'Run ATS Audit'}
        </NeoButton>
      </div>

      {!analysis ? (
        <div className="bg-yellow-50/50 p-6 border-2 border-dashed border-[#111111] rounded-xl text-center flex flex-col items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-[#111111]" />
          <h4 className="font-bold text-sm text-[#111111]">Ready to Audit Your Resume?</h4>
          <p className="text-xs text-gray-600 max-w-sm">
            Click 'Run ATS Audit' above to calculate your 0-100 radial score, detect weak verbs, and uncover missing keywords.
          </p>
          <NeoButton variant="primary" size="sm" onClick={handleRunAudit} isLoading={isAnalyzing} className="mt-2">
            Calculate ATS Score
          </NeoButton>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Left: Gauge */}
          <div className="w-full lg:w-auto shrink-0 flex justify-center">
            <ATSGauge score={analysis.overallScore} />
          </div>

          {/* Right: Sub-scores & Recommendations */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            {/* Sub-score grid */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#111111] block mb-2">
                Section Breakdown:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(analysis.breakdown).map(([key, val]) => (
                  <div key={key} className="bg-gray-50 border border-black p-2 rounded-lg text-center">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">{key}</span>
                    <span className="font-black text-sm text-black">{val}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
              <div className="bg-red-50/50 border-2 border-[#FF6B6B] p-3 rounded-xl">
                <span className="text-xs font-black uppercase text-[#FF6B6B] block mb-1">
                  ⚠️ Missing High-Value Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {analysis.missingKeywords.map((kw, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddKeywordToSkills(kw)}
                      className="text-xs font-bold bg-white text-black border border-black px-2 py-0.5 rounded-md hover:bg-[#FFD54F] cursor-pointer inline-flex items-center gap-1"
                    >
                      + {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && (
              <div className="bg-teal-50/50 border-2 border-[#4ECDC4] p-3 rounded-xl">
                <span className="text-xs font-black uppercase text-teal-900 block mb-1">
                  💡 Actionable Recommendations:
                </span>
                <ul className="list-disc pl-4 text-xs font-medium text-gray-800 space-y-1">
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </NeoCard>
  );
};
