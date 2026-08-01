import React from 'react';
import { ResumeData } from '../../types';

export const SiliconValleyATSTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, projects, skillCategories, certifications } = data;

  return (
    <div className="bg-white text-black p-8 max-w-[800px] mx-auto font-mono text-xs leading-relaxed my-4 border border-gray-300 shadow-sm print:shadow-none print:border-none print:m-0 print:p-0">
      {/* Strict Plain Header */}
      <div className="text-center mb-4 pb-2 border-b border-black">
        <h1 className="text-xl font-bold uppercase tracking-wider">{personalInfo.fullName || 'FULL NAME'}</h1>
        <p className="font-semibold text-gray-800">{personalInfo.targetRole}</p>
        <p className="text-[11px] mt-1 text-gray-700">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github]
            .filter(Boolean)
            .join(' | ')}
        </p>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-4">
          <h2 className="font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1">PROFESSIONAL SUMMARY</h2>
          <p className="text-justify font-sans text-xs">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-2">WORK EXPERIENCE</h2>
          <div className="space-y-3 font-sans">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.position.toUpperCase()} — {exp.company.toUpperCase()}</span>
                  <span>{exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate}</span>
                </div>
                <div className="text-[11px] italic text-gray-600 mb-1">{exp.location}</div>
                <p className="text-xs text-gray-900 whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {skillCategories && skillCategories.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1.5">TECHNICAL SKILLS</h2>
          <div className="space-y-1 font-sans text-xs">
            {skillCategories.map((c) => (
              <div key={c.id}>
                <span className="font-bold">{c.categoryName}: </span>
                <span>{c.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-2">PROJECTS</h2>
          <div className="space-y-2 font-sans text-xs">
            {projects.map((p) => (
              <div key={p.id}>
                <span className="font-bold">{p.title}: </span>
                <span>{p.description} </span>
                {p.techStack && p.techStack.length > 0 && (
                  <span className="italic text-gray-600">[{p.techStack.join(', ')}]</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1">EDUCATION</h2>
          <div className="font-sans text-xs">
            {education.map((e) => (
              <div key={e.id} className="flex justify-between">
                <span><strong className="font-bold">{e.degree} in {e.fieldOfStudy}</strong>, {e.school} {e.gpa && `(GPA: ${e.gpa})`}</span>
                <span>{e.startDate} – {e.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
