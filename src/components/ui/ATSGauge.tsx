import React from 'react';
import { motion } from 'motion/react';
import { Award, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface ATSGaugeProps {
  score: number;
  size?: number;
  showDetails?: boolean;
}

export const ATSGauge: React.FC<ATSGaugeProps> = ({ score, size = 180, showDetails = true }) => {
  const clampedScore = Math.min(100, Math.max(0, score));
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  let scoreColor = '#FF6B6B'; // Red
  let scoreBadge = 'Needs Work';
  let badgeBg = 'bg-[#FF6B6B] text-white';

  if (clampedScore >= 80) {
    scoreColor = '#10B981'; // Green
    scoreBadge = 'ATS Ready (Top 10%)';
    badgeBg = 'bg-[#4ECDC4] text-[#111111]';
  } else if (clampedScore >= 60) {
    scoreColor = '#FFD54F'; // Yellow
    scoreBadge = 'Good Candidate';
    badgeBg = 'bg-[#FFD54F] text-[#111111]';
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FFFFFF] border-3 border-[#111111] shadow-[5px_5px_0px_#111111] rounded-xl text-[#111111]">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="16"
            fill="transparent"
          />
          {/* Outer thick border frame ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + 10}
            stroke="#111111"
            strokeWidth="3"
            fill="transparent"
          />
          {/* Animated score arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={scoreColor}
            strokeWidth="16"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center text display */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <motion.span
            className="text-4xl font-black tracking-tight text-[#111111]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {clampedScore}
          </motion.span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
            Out of 100
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 flex flex-col items-center gap-1.5 text-center">
          <span className={`text-xs font-black px-3 py-1 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] rounded-full uppercase tracking-wider ${badgeBg}`}>
            {scoreBadge}
          </span>
          <p className="text-xs font-medium text-gray-600 max-w-[200px]">
            {clampedScore >= 80
              ? 'Excellent keyword optimization and active action verbs.'
              : clampedScore >= 60
              ? 'Solid base. Improve action verbs and add missing keywords to hit 90+.'
              : 'Add more quantified metrics and structured skills to pass ATS screen.'}
          </p>
        </div>
      )}
    </div>
  );
};
