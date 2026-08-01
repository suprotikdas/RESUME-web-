import React from 'react';
import { Education } from '../../types';
import { NeoInput } from '../ui/NeoInput';
import { NeoTextarea } from '../ui/NeoTextarea';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface EducationStepProps {
  data: Education[];
  onChange: (updated: Education[]) => void;
  onAIImprove: (text: string) => Promise<{ improvedText: string }>;
}

export const EducationStep: React.FC<EducationStepProps> = ({ data, onChange, onAIImprove }) => {
  const handleAdd = () => {
    const newItem: Education = {
      id: 'edu-' + Date.now(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: '',
    };
    onChange([...data, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#4ECDC4]" />
            2. Education & Academic Background
          </h2>
          <p className="text-xs font-medium text-gray-600">
            List your degree, university, GPA (if &gt; 3.5), and academic honors.
          </p>
        </div>
        <NeoButton variant="accent" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Degree
        </NeoButton>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-[#111111] rounded-xl bg-gray-50">
          <GraduationCap className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-gray-700">No education entries added yet.</p>
          <NeoButton variant="primary" size="sm" className="mt-3" onClick={handleAdd}>
            Add Education
          </NeoButton>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {data.map((edu, index) => (
            <div
              key={edu.id}
              className="border-3 border-[#111111] p-4 rounded-xl bg-yellow-50/20 shadow-[3px_3px_0px_#111111] relative flex flex-col gap-3"
            >
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-black text-xs uppercase tracking-wider text-black">
                  Degree #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(edu.id)}
                  className="text-[#FF6B6B] hover:text-red-700 p-1 rounded-lg border border-transparent hover:border-black transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NeoInput
                  label="School / University *"
                  placeholder="e.g. UC Berkeley"
                  value={edu.school}
                  onChange={(e) => handleUpdate(edu.id, 'school', e.target.value)}
                />
                <NeoInput
                  label="Degree *"
                  placeholder="e.g. Bachelor of Science"
                  value={edu.degree}
                  onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                />
                <NeoInput
                  label="Field of Study / Major *"
                  placeholder="e.g. Computer Science"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleUpdate(edu.id, 'fieldOfStudy', e.target.value)}
                />
                <NeoInput
                  label="GPA (Optional)"
                  placeholder="e.g. 3.88 / 4.0"
                  value={edu.gpa || ''}
                  onChange={(e) => handleUpdate(edu.id, 'gpa', e.target.value)}
                />
                <NeoInput
                  label="Start Year"
                  placeholder="e.g. 2016"
                  value={edu.startDate}
                  onChange={(e) => handleUpdate(edu.id, 'startDate', e.target.value)}
                />
                <NeoInput
                  label="Graduation Year"
                  placeholder="e.g. 2020"
                  value={edu.endDate}
                  onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                />
              </div>

              <NeoTextarea
                label="Honors & Key Coursework"
                placeholder="e.g. Dean's List (6 terms), ACM Programming Competition 2nd Place, Advanced Algorithms."
                value={edu.achievements || ''}
                onChange={(e) => handleUpdate(edu.id, 'achievements', e.target.value)}
                onAIImprove={onAIImprove}
              />
            </div>
          ))}
        </div>
      )}
    </NeoCard>
  );
};
