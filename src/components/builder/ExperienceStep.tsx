import React from 'react';
import { Experience } from '../../types';
import { NeoInput } from '../ui/NeoInput';
import { NeoTextarea } from '../ui/NeoTextarea';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';
import { Briefcase, Plus, Trash2, Sparkles } from 'lucide-react';

interface ExperienceStepProps {
  data: Experience[];
  onChange: (updated: Experience[]) => void;
  onAIImprove: (text: string) => Promise<{ improvedText: string }>;
  targetRole?: string;
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({
  data,
  onChange,
  onAIImprove,
  targetRole,
}) => {
  const handleAdd = () => {
    const newItem: Experience = {
      id: 'exp-' + Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Experience, value: any) => {
    onChange(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#FF6B6B]" />
            3. Professional Experience
          </h2>
          <p className="text-xs font-medium text-gray-600">
            Detail your employment history. Use action verbs and quantifiable results (e.g. "Increased sales by 30%").
          </p>
        </div>
        <NeoButton variant="coral" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Job
        </NeoButton>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-[#111111] rounded-xl bg-gray-50">
          <Briefcase className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-gray-700">No work experience added yet.</p>
          <NeoButton variant="primary" size="sm" className="mt-3" onClick={handleAdd}>
            Add Work Experience
          </NeoButton>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {data.map((exp, index) => (
            <div
              key={exp.id}
              className="border-3 border-[#111111] p-4 rounded-xl bg-white shadow-[4px_4px_0px_#111111] relative flex flex-col gap-3"
            >
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-black text-xs uppercase tracking-wider bg-[#FFD54F] border border-black px-2 py-0.5 rounded">
                  Position #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(exp.id)}
                  className="text-[#FF6B6B] hover:text-red-700 p-1 rounded-lg border border-transparent hover:border-black transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NeoInput
                  label="Job Title / Position *"
                  placeholder="e.g. Senior Software Engineer"
                  value={exp.position}
                  onChange={(e) => handleUpdate(exp.id, 'position', e.target.value)}
                />
                <NeoInput
                  label="Company Name *"
                  placeholder="e.g. Apex Cloud Solutions"
                  value={exp.company}
                  onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                />
                <NeoInput
                  label="Location"
                  placeholder="e.g. San Francisco, CA"
                  value={exp.location}
                  onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                />

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => handleUpdate(exp.id, 'current', e.target.checked)}
                    className="w-4 h-4 border-2 border-black rounded accent-[#FFD54F] cursor-pointer"
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-xs font-bold text-black cursor-pointer">
                    I currently work here
                  </label>
                </div>

                <NeoInput
                  label="Start Date *"
                  placeholder="e.g. 2022-03 or Mar 2022"
                  value={exp.startDate}
                  onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                />
                {!exp.current && (
                  <NeoInput
                    label="End Date"
                    placeholder="e.g. 2024-01 or Present"
                    value={exp.endDate}
                    onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                  />
                )}
              </div>

              <NeoTextarea
                label="Responsibilities & Key Impact (STAR Method)"
                placeholder="• Spearheaded architectural migration from monolithic backend to Node.js microservices...\n• Cut response latency by 45% ($140K/yr cloud savings)."
                value={exp.description}
                onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)}
                onAIImprove={onAIImprove}
                contextType="experience bullets"
                targetRole={targetRole}
                helperText="Tip: Click '✨ Improve with AI' above to format bullets using action verbs and STAR metrics."
              />
            </div>
          ))}
        </div>
      )}
    </NeoCard>
  );
};
