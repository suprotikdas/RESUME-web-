import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export const CorporateExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, projects, skillCategories, certifications, languages } = data;

  return (
    <div className="bg-white text-gray-900 p-8 max-w-[800px] mx-auto font-serif leading-relaxed border-2 border-gray-800 my-4 shadow-lg rounded-none print:shadow-none print:border-none print:m-0 print:p-0">
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-4 mb-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase font-sans text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-sm font-bold tracking-widest text-gray-600 uppercase mt-1 font-sans">{personalInfo.targetRole || 'Executive Role'}</p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs font-sans mt-3 text-gray-700">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>}
          {personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xs font-extrabold uppercase tracking-widest font-sans border-b border-gray-300 pb-1 mb-2 text-gray-900">
            Executive Summary
          </h2>
          <p className="text-sm font-normal text-gray-800 leading-relaxed text-justify">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-extrabold uppercase tracking-widest font-sans border-b border-gray-300 pb-1 mb-3 text-gray-900">
            Professional Experience
          </h2>
          <div className="flex flex-col gap-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-sans">
                  <h3 className="font-extrabold text-sm text-gray-900">{exp.position}</h3>
                  <span className="text-xs font-bold text-gray-600">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-700 italic font-sans mb-1">{exp.company} | {exp.location}</div>
                <p className="text-xs font-normal text-gray-800 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-extrabold uppercase tracking-widest font-sans border-b border-gray-300 pb-1 mb-2 text-gray-900">
            Education & Credentials
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="text-xs mb-2">
              <div className="flex justify-between font-sans font-bold text-sm text-gray-900">
                <span>{edu.degree} in {edu.fieldOfStudy}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="text-gray-700 italic">{edu.school} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skillCategories && skillCategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-extrabold uppercase tracking-widest font-sans border-b border-gray-300 pb-1 mb-2 text-gray-900">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs font-sans">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold text-gray-900">{cat.categoryName}: </span>
                <span className="text-gray-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
