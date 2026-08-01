import React, { useState, useEffect } from 'react';
import { ResumeData, TemplateId } from './types';
import { sampleFullStackResume, emptyResumeData } from './data/sampleResumes';
import { LandingPage } from './components/landing/LandingPage';
import { StepNavigation } from './components/builder/StepNavigation';
import { PersonalInfoStep } from './components/builder/PersonalInfoStep';
import { EducationStep } from './components/builder/EducationStep';
import { ExperienceStep } from './components/builder/ExperienceStep';
import { ProjectsStep } from './components/builder/ProjectsStep';
import { SkillsStep } from './components/builder/SkillsStep';
import { CertificationsStep } from './components/builder/CertificationsStep';
import {
  AchievementsStep,
  LeadershipStep,
  CommunityStep,
  LanguagesStep,
} from './components/builder/OtherSteps';
import { ResumePreview } from './components/preview/ResumePreview';
import { ATSScorePanel } from './components/tools/ATSScorePanel';
import { JDAnalyzerModal } from './components/tools/JDAnalyzerModal';
import { InterviewPrepModal } from './components/tools/InterviewPrepModal';
import { VersionHistoryModal } from './components/tools/VersionHistoryModal';
import { SummaryGeneratorModal } from './components/tools/SummaryGeneratorModal';
import { NeoButton } from './components/ui/NeoButton';
import { NeoBadge } from './components/ui/NeoCard';
import {
  Sparkles,
  Target,
  MessageSquareCode,
  History,
  Layout,
  FileText,
  Home,
  CheckCircle,
  Eye,
  PenTool,
} from 'lucide-react';

const CURRENT_RESUME_STORAGE_KEY = 'hirecraft_current_resume_v1';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'builder'>('landing');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  // Resume State
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_RESUME_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load current resume state:', e);
    }
    return sampleFullStackResume;
  });

  // Modal Visibility States
  const [showJDModal, setShowJDModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showATSScorePanel, setShowATSScorePanel] = useState(false);

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CURRENT_RESUME_STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.error('Failed to persist resume state:', e);
    }
  }, [resumeData]);

  // Handle Starting from Landing Page
  const handleStartBuilding = (initialData?: ResumeData) => {
    if (initialData) {
      setResumeData(initialData);
    }
    setViewMode('builder');
    setCurrentStep(1);
  };

  // Common AI Text Improvement Handler
  const handleAIImprove = async (text: string): Promise<{ improvedText: string }> => {
    const res = await fetch('/api/improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        contextType: 'resume bullet points',
        targetRole: resumeData.personalInfo.targetRole,
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'AI Improvement request failed.');
    }
    return await res.json();
  };

  // Render Step Content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={resumeData.personalInfo}
            onChange={(updated) => setResumeData({ ...resumeData, personalInfo: updated })}
          />
        );
      case 2:
        return (
          <EducationStep
            data={resumeData.education}
            onChange={(updated) => setResumeData({ ...resumeData, education: updated })}
            onAIImprove={handleAIImprove}
          />
        );
      case 3:
        return (
          <ExperienceStep
            data={resumeData.experience}
            onChange={(updated) => setResumeData({ ...resumeData, experience: updated })}
            onAIImprove={handleAIImprove}
            targetRole={resumeData.personalInfo.targetRole}
          />
        );
      case 4:
        return (
          <ProjectsStep
            data={resumeData.projects}
            onChange={(updated) => setResumeData({ ...resumeData, projects: updated })}
            onAIImprove={handleAIImprove}
          />
        );
      case 5:
        return (
          <SkillsStep
            categories={resumeData.skillCategories}
            onChange={(updated) => setResumeData({ ...resumeData, skillCategories: updated })}
            targetRole={resumeData.personalInfo.targetRole}
          />
        );
      case 6:
        return (
          <CertificationsStep
            data={resumeData.certifications}
            onChange={(updated) => setResumeData({ ...resumeData, certifications: updated })}
          />
        );
      case 7:
        return (
          <AchievementsStep
            data={resumeData.achievements}
            onChange={(updated) => setResumeData({ ...resumeData, achievements: updated })}
          />
        );
      case 8:
        return (
          <LeadershipStep
            data={resumeData.leadership}
            onChange={(updated) => setResumeData({ ...resumeData, leadership: updated })}
          />
        );
      case 9:
        return (
          <CommunityStep
            data={resumeData.volunteer}
            onChange={(updated) => setResumeData({ ...resumeData, volunteer: updated })}
          />
        );
      case 10:
        return (
          <LanguagesStep
            data={resumeData.languages}
            onChange={(updated) => setResumeData({ ...resumeData, languages: updated })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#111111] font-sans antialiased flex flex-col">
      {/* Top Neo-Brutalist Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FFF9F0] border-b-4 border-[#111111] px-4 py-3 shadow-[0_4px_0_#111111]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          {/* Logo */}
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 bg-[#FFD54F] border-3 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] group-hover:shadow-[4px_4px_0px_#111111] group-hover:-translate-y-0.5 transition-all flex items-center justify-center font-black text-xl">
              ⚡
            </div>
            <div>
              <span className="text-xl font-black uppercase tracking-tight text-[#111111] block leading-none">
                HireCraft <span className="bg-[#4ECDC4] border-2 border-black px-1.5 py-0.5 text-xs rounded-md">AI</span>
              </span>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                ATS Resume Builder
              </span>
            </div>
          </button>

          {/* Navigation Controls */}
          {viewMode === 'builder' ? (
            <div className="flex items-center gap-2 flex-wrap">
              <NeoButton
                variant={showATSScorePanel ? 'primary' : 'white'}
                size="sm"
                icon={<Sparkles className="w-4 h-4 fill-black text-black" />}
                onClick={() => setShowATSScorePanel(!showATSScorePanel)}
              >
                ATS Audit
              </NeoButton>

              <NeoButton
                variant="white"
                size="sm"
                icon={<Target className="w-4 h-4 text-[#FF6B6B]" />}
                onClick={() => setShowJDModal(true)}
              >
                JD Matcher
              </NeoButton>

              <NeoButton
                variant="white"
                size="sm"
                icon={<MessageSquareCode className="w-4 h-4 text-[#4ECDC4]" />}
                onClick={() => setShowInterviewModal(true)}
              >
                Interview Prep
              </NeoButton>

              <NeoButton
                variant="white"
                size="sm"
                icon={<History className="w-4 h-4 text-black" />}
                onClick={() => setShowHistoryModal(true)}
              >
                Drafts
              </NeoButton>

              <NeoButton
                variant="ghost"
                size="sm"
                icon={<Home className="w-4 h-4" />}
                onClick={() => setViewMode('landing')}
              >
                Home
              </NeoButton>
            </div>
          ) : (
            <NeoButton
              variant="primary"
              size="sm"
              icon={<Sparkles className="w-4 h-4 fill-black" />}
              onClick={() => handleStartBuilding(sampleFullStackResume)}
            >
              Open Builder
            </NeoButton>
          )}
        </div>
      </header>

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {viewMode === 'landing' ? (
          <LandingPage onStartBuilding={handleStartBuilding} />
        ) : (
          <div className="flex flex-col gap-6">
            {/* Mobile View Toggle (Form vs Live Preview) */}
            <div className="flex lg:hidden bg-white border-3 border-black p-1 rounded-xl shadow-[3px_3px_0px_#111111] mb-2">
              <button
                onClick={() => setMobileTab('form')}
                className={`flex-1 py-2 text-xs font-black uppercase rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mobileTab === 'form' ? 'bg-[#FFD54F] border-2 border-black shadow-[2px_2px_0px_#111111]' : ''
                }`}
              >
                <PenTool className="w-4 h-4" /> Form Builder (Step {currentStep})
              </button>
              <button
                onClick={() => setMobileTab('preview')}
                className={`flex-1 py-2 text-xs font-black uppercase rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mobileTab === 'preview' ? 'bg-[#4ECDC4] border-2 border-black shadow-[2px_2px_0px_#111111]' : ''
                }`}
              >
                <Eye className="w-4 h-4" /> Live Resume Preview
              </button>
            </div>

            {/* ATS Score Drawer/Panel if open */}
            {showATSScorePanel && (
              <div className="transition-all animate-fadeIn">
                <ATSScorePanel
                  resumeData={resumeData}
                  onUpdateResume={(updated) => setResumeData(updated)}
                />
              </div>
            )}

            {/* Split Screen Layout for Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: 10-Step Wizard Form */}
              <div
                className={`lg:col-span-6 flex flex-col gap-5 ${
                  mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <StepNavigation
                  currentStep={currentStep}
                  onPrev={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  onNext={() => setCurrentStep(Math.min(10, currentStep + 1))}
                  onStepSelect={(s) => setCurrentStep(s)}
                  onGenerateSummary={() => setShowSummaryModal(true)}
                />

                {renderStepContent()}
              </div>

              {/* Right Column: Live Resume Preview */}
              <div
                className={`lg:col-span-6 sticky top-20 ${
                  mobileTab === 'form' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <ResumePreview
                  resumeData={resumeData}
                  onUpdateTemplate={(id: TemplateId) =>
                    setResumeData({ ...resumeData, templateId: id })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <JDAnalyzerModal
        isOpen={showJDModal}
        onClose={() => setShowJDModal(false)}
        resumeData={resumeData}
        onUpdateResume={(updated) => setResumeData(updated)}
      />

      <InterviewPrepModal
        isOpen={showInterviewModal}
        onClose={() => setShowInterviewModal(false)}
        resumeData={resumeData}
      />

      <VersionHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        currentResume={resumeData}
        onRestoreResume={(restored) => setResumeData(restored)}
      />

      <SummaryGeneratorModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        resumeData={resumeData}
        onApplySummary={(summaryText) =>
          setResumeData({ ...resumeData, summary: summaryText })
        }
      />

      {/* Footer */}
      <footer className="mt-auto border-t-4 border-[#111111] bg-white py-6 px-4 text-center font-bold text-xs text-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>⚡ HireCraft AI • Production-Ready ATS Resume Builder</span>
          <span className="text-gray-500 font-medium">Day Mode Neo-Brutalism Design System</span>
        </div>
      </footer>
    </div>
  );
}
