import React from 'react';
import { ResumeData } from '../../types';

export const MinimalistCleanTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, projects, skillCategories } = data;

  return (
    <div className="bg-white text-gray-900 p-8 max-w-[800px] mx-auto font-sans leading-normal my-4 border border-gray-200 shadow-sm print:shadow-none print:border-none print:m-0 print:p-0">
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-light tracking-tight text-gray-900">{personalInfo.fullName || 'Name'}</h1>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-0.5">{personalInfo.targetRole}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Profile</h2>
          <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Experience</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline font-medium text-gray-900">
                  <span><strong className="font-semibold">{exp.position}</strong> — {exp.company}</span>
                  <span className="text-[11px] text-gray-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Projects</h2>
          <div className="space-y-2">
            {projects.map((p) => (
              <div key={p.id} className="text-xs">
                <span className="font-semibold text-gray-900">{p.title}: </span>
                <span className="text-gray-600">{p.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skillCategories && skillCategories.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Skills</h2>
          <div className="flex flex-wrap gap-1.5 text-xs text-gray-700">
            {skillCategories.flatMap(c => c.skills).map((s, i) => (
              <span key={i} className="bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-[11px]">{s}</span>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Education</h2>
          {education.map((e) => (
            <div key={e.id} className="text-xs text-gray-700 flex justify-between">
              <span><strong>{e.degree} in {e.fieldOfStudy}</strong>, {e.school}</span>
              <span className="text-gray-400">{e.startDate} – {e.endDate}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
