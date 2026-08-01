import React from 'react';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard, NeoBadge } from '../ui/NeoCard';
import { Sparkles, Target, Zap, ShieldCheck, FileText, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sampleFullStackResume, sampleProductManagerResume, emptyResumeData } from '../../data/sampleResumes';
import { ResumeData } from '../../types';

interface LandingPageProps {
  onStartBuilding: (initialData?: ResumeData) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartBuilding }) => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="bg-[#FFD54F] border-4 border-[#111111] shadow-[10px_10px_0px_#111111] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl flex flex-col items-start gap-6 relative z-10">
          <NeoBadge variant="black" className="px-3 py-1 text-xs tracking-wider">
            ⚡ POWERED BY GOOGLE GEMINI AI
          </NeoBadge>

          <h1 className="text-4xl sm:text-6xl font-black text-[#111111] leading-none uppercase tracking-tight">
            Build a Resume That Gets Interviews.
          </h1>

          <p className="text-base sm:text-lg font-bold text-[#111111]/90 max-w-2xl leading-relaxed">
            AI-powered ATS Resume Builder that transforms your experience into recruiter-approved resumes with real-time scoring, job description keyword matching, and 1-click PDF/DOCX export.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <NeoButton
              variant="black"
              size="lg"
              icon={<Sparkles className="w-5 h-5 fill-[#FFD54F] text-[#FFD54F]" />}
              onClick={() => onStartBuilding(sampleFullStackResume)}
              className="text-lg py-4 px-8"
            >
              Start Building Now
            </NeoButton>

            <NeoButton
              variant="white"
              size="lg"
              icon={<FileText className="w-5 h-5" />}
              onClick={() => onStartBuilding(emptyResumeData)}
            >
              Start from Blank
            </NeoButton>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-black text-[#111111] border-t-2 border-black/20 w-full">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-black" /> 100% ATS Taleo & Workday Pass Rate</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-black" /> 0-100 Radial Score Gauge</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-black" /> Instant PDF & DOCX Export</span>
          </div>
        </div>

        {/* Hero Decorative Badge */}
        <div className="hidden lg:block absolute -right-6 -bottom-6 bg-[#4ECDC4] border-4 border-black shadow-[8px_8px_0px_#111111] p-6 rounded-2xl rotate-3">
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-black text-black">98.4%</span>
            <span className="text-xs font-black uppercase text-black">ATS Match Score</span>
          </div>
        </div>
      </section>

      {/* Quick Start Presets Section */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black uppercase text-[#111111]">
              Try Pre-Loaded Samples with 1 Click
            </h2>
            <p className="text-xs font-medium text-gray-600">
              Test all AI features, ATS scoring, and templates immediately.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Preset 1 */}
          <NeoCard
            variant="white"
            hoverEffect
            className="flex flex-col justify-between gap-4 cursor-pointer"
            onClick={() => onStartBuilding(sampleFullStackResume)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <NeoBadge variant="yellow">Senior Software Engineer</NeoBadge>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 border border-emerald-700 px-2 py-0.5 rounded">
                  94 Score
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-black">Alex Morgan</h3>
              <p className="text-xs text-gray-600 mt-1">
                6+ years experience, Next.js, FastAPI, Microservices, Cloud Architecture.
              </p>
            </div>
            <NeoButton variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Load Full-Stack Sample
            </NeoButton>
          </NeoCard>

          {/* Preset 2 */}
          <NeoCard
            variant="white"
            hoverEffect
            className="flex flex-col justify-between gap-4 cursor-pointer"
            onClick={() => onStartBuilding(sampleProductManagerResume)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <NeoBadge variant="teal">Lead Product Manager</NeoBadge>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 border border-emerald-700 px-2 py-0.5 rounded">
                  91 Score
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-black">Sarah Chen</h3>
              <p className="text-xs text-gray-600 mt-1">
                7+ years experience, B2B SaaS, $10M+ ARR scaling, GTM Strategy.
              </p>
            </div>
            <NeoButton variant="accent" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Load Product Lead Sample
            </NeoButton>
          </NeoCard>

          {/* Preset 3 */}
          <NeoCard
            variant="white"
            hoverEffect
            className="flex flex-col justify-between gap-4 cursor-pointer"
            onClick={() => onStartBuilding(emptyResumeData)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <NeoBadge variant="coral">Blank Resume</NeoBadge>
                <span className="text-xs font-black text-gray-500 bg-gray-100 border border-gray-400 px-2 py-0.5 rounded">
                  Fresh
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-black">Start from Scratch</h3>
              <p className="text-xs text-gray-600 mt-1">
                Enter your details step-by-step with 10-step wizard & AI guidance.
              </p>
            </div>
            <NeoButton variant="coral" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Create Blank Draft
            </NeoButton>
          </NeoCard>
        </div>
      </section>

      {/* Features Grid */}
      <section className="flex flex-col gap-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-black uppercase text-[#111111]">
            Everything You Need to Get Hired
          </h2>
          <p className="text-xs font-medium text-gray-600 mt-1">
            Built with strict Neo-Brutalist design system and Google Gemini AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NeoCard variant="white" className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD54F] border-2 border-black flex items-center justify-center font-black">
              <Zap className="w-5 h-5 text-black fill-black" />
            </div>
            <h3 className="font-extrabold text-base text-black">0-100 ATS Score Gauge</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Framer Motion radial gauge providing section-by-section breakdown for formatting, keywords, experience, and weak verb flags.
            </p>
          </NeoCard>

          <NeoCard variant="white" className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4ECDC4] border-2 border-black flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5 text-black fill-black" />
            </div>
            <h3 className="font-extrabold text-base text-black">✨ AI "Improve with AI"</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Attach AI triggers to every text area to instantly rewrite bullet points using active action verbs and STAR metrics.
            </p>
          </NeoCard>

          <NeoCard variant="white" className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B6B] border-2 border-black flex items-center justify-center font-black">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-base text-black">Job Description Analyzer</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Paste target job descriptions to extract missing hard skills, compare keyword coverage, and auto-insert missing terms.
            </p>
          </NeoCard>

          <NeoCard variant="white" className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD54F] border-2 border-black flex items-center justify-center font-black">
              <Cpu className="w-5 h-5 text-black" />
            </div>
            <h3 className="font-extrabold text-base text-black">Auto Skill Categorizer</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Type skills in any order and AI will automatically structure them into Programming Languages, Frameworks, and Tools.
            </p>
          </NeoCard>

          <NeoCard variant="white" className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4ECDC4] border-2 border-black flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5 text-black" />
            </div>
            <h3 className="font-extrabold text-base text-black">AI Interview Question Prep</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Generates custom technical & behavioral interview questions based on your finalized resume with STAR model guides.
            </p>
          </NeoCard>

          <NeoCard variant="white" className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B6B] border-2 border-black flex items-center justify-center font-black">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-base text-black">5 Neo-Brutalist & ATS Templates</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Switch seamlessly between Modern Tech, Corporate Executive, Minimalist Clean, Creative Vibrant, and Silicon Valley ATS.
            </p>
          </NeoCard>
        </div>
      </section>
    </div>
  );
};
