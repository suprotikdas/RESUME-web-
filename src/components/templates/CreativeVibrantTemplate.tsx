import React from 'react';
import { ResumeData } from '../../types';

export const CreativeVibrantTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, projects, skillCategories } = data;

  return (
    <div className="bg-[#FFF9F0] text-[#111111] p-8 max-w-[800px] mx-auto font-sans border-4 border-[#111111] shadow-[10px_10px_0px_#111111] my-4 rounded-2xl print:shadow-none print:border-none print:m-0 print:p-0">
      {/* Creative Neo-Brutalist Banner */}
      <div className="bg-[#FFD54F] border-3 border-[#111111] p-6 rounded-xl shadow-[4px_4px_0px_#111111] mb-6">
        <h1 className="text-3xl font-black text-[#111111] uppercase tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
        <span className="bg-[#FF6B6B] text-white border-2 border-black font-extrabold text-xs px-3 py-1 rounded-md uppercase tracking-wider inline-block mt-2 shadow-[2px_2px_0px_#111111]">
          {personalInfo.targetRole || 'Creative Professional'}
        </span>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-[#111111] mt-3">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.portfolio && <span>🌐 {personalInfo.portfolio}</span>}
        </div>
      </div>

      {summary && (
        <div className="bg-white border-3 border-[#111111] p-4 rounded-xl shadow-[4px_4px_0px_#111111] mb-6">
          <h2 className="text-xs font-black uppercase text-[#111111] mb-1">About Me</h2>
          <p className="text-xs font-medium text-gray-800 leading-relaxed">{summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-black uppercase tracking-wider bg-[#4ECDC4] border-2 border-black px-3 py-1 rounded-lg inline-block shadow-[2px_2px_0px_#111111] mb-3">
            Experience History
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-white border-3 border-[#111111] p-4 rounded-xl shadow-[4px_4px_0px_#111111]">
                <div className="flex justify-between items-center font-black text-xs text-[#111111]">
                  <span>{exp.position} @ {exp.company}</span>
                  <span className="bg-[#FFD54F] border border-black px-2 py-0.5 rounded text-[10px]">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-800 mt-2 whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skillCategories && skillCategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-black uppercase tracking-wider bg-[#FF6B6B] text-white border-2 border-black px-3 py-1 rounded-lg inline-block shadow-[2px_2px_0px_#111111] mb-3">
            Superpowers & Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillCategories.flatMap(c => c.skills).map((skill, idx) => (
              <span key={idx} className="bg-white border-2 border-black font-extrabold text-xs px-3 py-1 rounded-xl shadow-[2px_2px_0px_#111111]">
                ⚡ {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {education && education.length > 0 && (
        <div>
          <h2 className="text-sm font-black uppercase tracking-wider bg-[#FFD54F] border-2 border-black px-3 py-1 rounded-lg inline-block shadow-[2px_2px_0px_#111111] mb-2">
            Education
          </h2>
          {education.map((e) => (
            <div key={e.id} className="bg-white border-2 border-black p-3 rounded-xl shadow-[3px_3px_0px_#111111] text-xs font-bold">
              <div>{e.degree} in {e.fieldOfStudy} — {e.school}</div>
              <div className="text-gray-500 font-medium text-[11px]">{e.startDate} - {e.endDate}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
