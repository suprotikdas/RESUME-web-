import React from 'react';
import { Achievement, Leadership, Volunteer, Language } from '../../types';
import { NeoInput } from '../ui/NeoInput';
import { NeoTextarea } from '../ui/NeoTextarea';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';
import { Trophy, ShieldAlert, Heart, Languages, Plus, Trash2 } from 'lucide-react';

// 7. Achievements
export const AchievementsStep: React.FC<{
  data: Achievement[];
  onChange: (updated: Achievement[]) => void;
}> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([...data, { id: 'ach-' + Date.now(), title: '', description: '', date: '' }]);
  };

  const handleRemove = (id: string) => onChange(data.filter((i) => i.id !== id));

  const handleUpdate = (id: string, field: keyof Achievement, value: string) => {
    onChange(data.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FFD54F]" />
            7. Key Achievements & Awards
          </h2>
          <p className="text-xs font-medium text-gray-600">
            Hackathon wins, company performance awards, patents, or publications.
          </p>
        </div>
        <NeoButton variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Award
        </NeoButton>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-[#111111] rounded-xl bg-gray-50">
          <p className="text-xs font-bold text-gray-700">No awards or achievements listed.</p>
          <NeoButton variant="primary" size="sm" className="mt-2" onClick={handleAdd}>
            Add Achievement
          </NeoButton>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((ach) => (
            <div key={ach.id} className="border-3 border-[#111111] p-4 rounded-xl bg-white shadow-[3px_3px_0px_#111111] flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-black pb-1">
                <span className="font-bold text-xs uppercase">Award Record</span>
                <button type="button" onClick={() => handleRemove(ach.id)} className="text-[#FF6B6B]">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NeoInput label="Title / Award *" placeholder="e.g. Global Hackathon Winner" value={ach.title} onChange={(e) => handleUpdate(ach.id, 'title', e.target.value)} />
                <NeoInput label="Date / Year" placeholder="e.g. 2023-09" value={ach.date} onChange={(e) => handleUpdate(ach.id, 'date', e.target.value)} />
              </div>
              <NeoTextarea label="Description" placeholder="Awarded 1st place out of 450+ teams..." value={ach.description} onChange={(e) => handleUpdate(ach.id, 'description', e.target.value)} />
            </div>
          ))}
        </div>
      )}
    </NeoCard>
  );
};

// 8. Leadership
export const LeadershipStep: React.FC<{
  data: Leadership[];
  onChange: (updated: Leadership[]) => void;
}> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([...data, { id: 'lead-' + Date.now(), organization: '', role: '', duration: '', description: '' }]);
  };

  const handleRemove = (id: string) => onChange(data.filter((i) => i.id !== id));

  const handleUpdate = (id: string, field: keyof Leadership, value: string) => {
    onChange(data.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#4ECDC4]" />
            8. Leadership & Organization Roles
          </h2>
          <p className="text-xs font-medium text-gray-600">
            Tech leads, club presidency, guild mentorship, or advisory positions.
          </p>
        </div>
        <NeoButton variant="accent" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Leadership
        </NeoButton>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-[#111111] rounded-xl bg-gray-50">
          <p className="text-xs font-bold text-gray-700">No leadership positions added.</p>
          <NeoButton variant="accent" size="sm" className="mt-2" onClick={handleAdd}>
            Add Leadership
          </NeoButton>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((lead) => (
            <div key={lead.id} className="border-3 border-[#111111] p-4 rounded-xl bg-white shadow-[3px_3px_0px_#111111] flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-black pb-1">
                <span className="font-bold text-xs uppercase">Leadership Role</span>
                <button type="button" onClick={() => handleRemove(lead.id)} className="text-[#FF6B6B]">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <NeoInput label="Organization *" placeholder="e.g. Bay Area Open Source Guild" value={lead.organization} onChange={(e) => handleUpdate(lead.id, 'organization', e.target.value)} />
                <NeoInput label="Role Title *" placeholder="e.g. Tech Lead & Instructor" value={lead.role} onChange={(e) => handleUpdate(lead.id, 'role', e.target.value)} />
                <NeoInput label="Duration" placeholder="e.g. 2021 - Present" value={lead.duration} onChange={(e) => handleUpdate(lead.id, 'duration', e.target.value)} />
              </div>
              <NeoTextarea label="Impact & Responsibilities" placeholder="Mentored 120+ developers in web architecture..." value={lead.description} onChange={(e) => handleUpdate(lead.id, 'description', e.target.value)} />
            </div>
          ))}
        </div>
      )}
    </NeoCard>
  );
};

// 9. Community & Volunteer Work
export const CommunityStep: React.FC<{
  data: Volunteer[];
  onChange: (updated: Volunteer[]) => void;
}> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([...data, { id: 'vol-' + Date.now(), organization: '', role: '', description: '' }]);
  };

  const handleRemove = (id: string) => onChange(data.filter((i) => i.id !== id));

  const handleUpdate = (id: string, field: keyof Volunteer, value: string) => {
    onChange(data.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FF6B6B]" />
            9. Community & Volunteer Work
          </h2>
          <p className="text-xs font-medium text-gray-600">
            Open-source contributions, civic tech volunteering, non-profit initiatives.
          </p>
        </div>
        <NeoButton variant="coral" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Community
        </NeoButton>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-[#111111] rounded-xl bg-gray-50">
          <p className="text-xs font-bold text-gray-700">No community work listed.</p>
          <NeoButton variant="coral" size="sm" className="mt-2" onClick={handleAdd}>
            Add Community Work
          </NeoButton>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((vol) => (
            <div key={vol.id} className="border-3 border-[#111111] p-4 rounded-xl bg-white shadow-[3px_3px_0px_#111111] flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-black pb-1">
                <span className="font-bold text-xs uppercase">Volunteer Record</span>
                <button type="button" onClick={() => handleRemove(vol.id)} className="text-[#FF6B6B]">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NeoInput label="Organization *" placeholder="e.g. Code for America" value={vol.organization} onChange={(e) => handleUpdate(vol.id, 'organization', e.target.value)} />
                <NeoInput label="Role *" placeholder="e.g. Volunteer Engineer" value={vol.role} onChange={(e) => handleUpdate(vol.id, 'role', e.target.value)} />
              </div>
              <NeoTextarea label="Summary" placeholder="Contributed 150+ hours writing open-source tools..." value={vol.description} onChange={(e) => handleUpdate(vol.id, 'description', e.target.value)} />
            </div>
          ))}
        </div>
      )}
    </NeoCard>
  );
};

// 10. Languages
export const LanguagesStep: React.FC<{
  data: Language[];
  onChange: (updated: Language[]) => void;
}> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([...data, { id: 'lang-' + Date.now(), language: '', proficiency: 'Professional' }]);
  };

  const handleRemove = (id: string) => onChange(data.filter((i) => i.id !== id));

  const handleUpdate = (id: string, field: keyof Language, value: any) => {
    onChange(data.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <Languages className="w-5 h-5 text-[#FFD54F]" />
            10. Spoken Languages
          </h2>
          <p className="text-xs font-medium text-gray-600">
            Languages spoken and fluency levels.
          </p>
        </div>
        <NeoButton variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Language
        </NeoButton>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-[#111111] rounded-xl bg-gray-50">
          <p className="text-xs font-bold text-gray-700">No languages added yet.</p>
          <NeoButton variant="primary" size="sm" className="mt-2" onClick={handleAdd}>
            Add Language
          </NeoButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((lang) => (
            <div key={lang.id} className="border-3 border-[#111111] p-3 rounded-xl bg-white shadow-[2px_2px_0px_#111111] flex items-center justify-between gap-2">
              <NeoInput label="Language" placeholder="e.g. English" value={lang.language} onChange={(e) => handleUpdate(lang.id, 'language', e.target.value)} />
              <div className="flex flex-col gap-1.5 shrink-0">
                <label className="text-[10px] font-bold uppercase">Proficiency</label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => handleUpdate(lang.id, 'proficiency', e.target.value)}
                  className="border-2 border-black rounded-lg p-2 text-xs font-bold bg-white"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
              <button type="button" onClick={() => handleRemove(lang.id)} className="text-[#FF6B6B] shrink-0 pt-4">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </NeoCard>
  );
};
