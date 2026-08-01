import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const ModernTechTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, projects, skillCategories, certifications, achievements, languages } = data;

  return (
    <div className="bg-white text-[#111111] p-8 max-w-[800px] mx-auto font-sans leading-relaxed border-4 border-[#111111] shadow-[8px_8px_0px_#111111] my-4 rounded-xl print:shadow-none print:border-none print:m-0 print:p-0">
      {/* Header */}
      <div className="border-b-4 border-[#111111] pb-6 mb-6 flex justify-between items-start gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111111]">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-lg font-bold text-[#FF6B6B] mt-1">{personalInfo.targetRole || 'Target Job Title'}</p>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold mt-3 text-gray-700">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" />{personalInfo.linkedin}</span>}
            {personalInfo.github && <span className="flex items-center gap-1"><Github className="w-3.5 h-3.5" />{personalInfo.github}</span>}
            {personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{personalInfo.portfolio}</span>}
          </div>
        </div>

        {personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className="w-20 h-20 rounded-xl object-cover border-3 border-[#111111] shadow-[3px_3px_0px_#111111] shrink-0"
          />
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest bg-[#FFD54F] border-2 border-[#111111] px-3 py-1 rounded-lg inline-block mb-2 shadow-[2px_2px_0px_#111111]">
            Professional Summary
          </h2>
          <p className="text-sm font-medium text-gray-800 leading-normal">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest bg-[#4ECDC4] border-2 border-[#111111] px-3 py-1 rounded-lg inline-block mb-3 shadow-[2px_2px_0px_#111111]">
            Professional Experience
          </h2>
          <div className="flex flex-col gap-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-3 border-[#111111] pl-4 py-0.5">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <h3 className="font-extrabold text-base text-[#111111]">{exp.position}</h3>
                  <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 border border-black rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-700 mb-1.5">{exp.company} • {exp.location}</div>
                <div className="text-xs font-normal text-gray-800 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest bg-[#FFD54F] border-2 border-[#111111] px-3 py-1 rounded-lg inline-block mb-3 shadow-[2px_2px_0px_#111111]">
            Key Projects
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {projects.map((proj) => (
              <div key={proj.id} className="border-2 border-[#111111] p-3 rounded-lg bg-yellow-50/40">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-sm text-[#111111]">{proj.title}</h3>
                  <div className="text-[10px] font-bold text-gray-600 flex gap-2">
                    {proj.githubUrl && <span>{proj.githubUrl}</span>}
                    {proj.liveUrl && <span>{proj.liveUrl}</span>}
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-800 my-1">{proj.description}</p>
                {proj.techStack && proj.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.techStack.map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-bold bg-white border border-black px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillCategories && skillCategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest bg-[#4ECDC4] border-2 border-[#111111] px-3 py-1 rounded-lg inline-block mb-3 shadow-[2px_2px_0px_#111111]">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="text-xs">
                <span className="font-extrabold text-black block mb-1">{cat.categoryName}:</span>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((s, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-800 font-semibold px-2 py-0.5 border border-black rounded text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest bg-[#FFD54F] border-2 border-[#111111] px-3 py-1 rounded-lg inline-block mb-2 shadow-[2px_2px_0px_#111111]">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="text-xs mb-2">
              <div className="flex justify-between font-bold text-sm text-black">
                <span>{edu.degree} in {edu.fieldOfStudy}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="text-gray-700 font-medium">{edu.school} {edu.gpa && `• GPA: ${edu.gpa}`}</div>
              {edu.achievements && <p className="text-gray-600 mt-0.5">{edu.achievements}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="font-black uppercase tracking-wider text-black border-b-2 border-black pb-1 mb-2">Certifications</h2>
            {certifications.map((c) => (
              <div key={c.id} className="mb-1 font-medium">
                <span className="font-bold">{c.name}</span> – {c.issuer} ({c.issueDate})
              </div>
            ))}
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h2 className="font-black uppercase tracking-wider text-black border-b-2 border-black pb-1 mb-2">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <span key={l.id} className="font-medium bg-gray-100 px-2 py-1 rounded border border-black">
                  {l.language} ({l.proficiency})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
