import React, { useState } from 'react';
import { SkillCategory } from '../../types';
import { NeoInput } from '../ui/NeoInput';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard, NeoBadge } from '../ui/NeoCard';
import { Cpu, Sparkles, Plus, X, Layers } from 'lucide-react';

interface SkillsStepProps {
  categories: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
  targetRole?: string;
}

export const SkillsStep: React.FC<SkillsStepProps> = ({ categories, onChange, targetRole }) => {
  const [newSkillInput, setNewSkillInput] = useState('');
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  // Collect all flat skills
  const allSkills = categories.flatMap((c) => c.skills);

  const handleAddSkillToCategory = (catIndex: number, skillName: string) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;

    const updated = [...categories];
    if (!updated[catIndex]) {
      updated.push({ id: 'sc-' + Date.now(), categoryName: 'Technical Skills', skills: [] });
    }
    if (!updated[catIndex].skills.includes(trimmed)) {
      updated[catIndex].skills.push(trimmed);
      onChange(updated);
    }
  };

  const handleRemoveSkill = (catIndex: number, skillName: string) => {
    const updated = [...categories];
    updated[catIndex].skills = updated[catIndex].skills.filter((s) => s !== skillName);
    onChange(updated);
  };

  const handleAddCustomCategory = () => {
    const newCat: SkillCategory = {
      id: 'sc-' + Date.now(),
      categoryName: 'New Skill Category',
      skills: [],
    };
    onChange([...categories, newCat]);
    setSelectedCategoryIdx(categories.length);
  };

  const handleUpdateCategoryName = (idx: number, name: string) => {
    const updated = [...categories];
    updated[idx].categoryName = name;
    onChange(updated);
  };

  // 1. ✨ AI Auto-Categorize Skills
  const handleAutoCategorize = async () => {
    if (allSkills.length === 0) {
      alert('Please add some skills first before auto-categorizing!');
      return;
    }

    setIsCategorizing(true);
    try {
      const res = await fetch('/api/categorize-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: allSkills }),
      });
      const data = await res.json();
      if (data.categories && Array.isArray(data.categories)) {
        const mapped: SkillCategory[] = data.categories.map((c: any, i: number) => ({
          id: 'sc-ai-' + i + '-' + Date.now(),
          categoryName: c.categoryName,
          skills: c.skills,
        }));
        onChange(mapped);
      }
    } catch (err) {
      console.error('Categorization error:', err);
    } finally {
      setIsCategorizing(false);
    }
  };

  // 2. ✨ AI Skill Suggestions
  const handleGetSkillSuggestions = async () => {
    setIsSuggesting(true);
    try {
      const res = await fetch('/api/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ existingSkills: allSkills, targetRole }),
      });
      const data = await res.json();
      if (data.suggestions) {
        setSuggestedSkills(data.suggestions);
      }
    } catch (err) {
      console.error('Skill suggestion error:', err);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#4ECDC4]" />
            5. Skills & Auto-Categorization
          </h2>
          <p className="text-xs font-medium text-gray-600">
            Organize skills by category. AI automatically formats them into ATS keywords.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <NeoButton
            variant="accent"
            size="sm"
            isLoading={isCategorizing}
            icon={<Sparkles className="w-4 h-4 fill-black" />}
            onClick={handleAutoCategorize}
          >
            AI Auto-Categorize
          </NeoButton>
          <NeoButton
            variant="primary"
            size="sm"
            isLoading={isSuggesting}
            icon={<Layers className="w-4 h-4" />}
            onClick={handleGetSkillSuggestions}
          >
            Suggest Skills
          </NeoButton>
        </div>
      </div>

      {/* Quick Add Skill Bar */}
      <div className="bg-yellow-50/50 p-4 border-3 border-[#111111] rounded-xl flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <NeoInput
            label="Type Skill & Press Enter"
            placeholder="e.g. React, Python, Docker, PostgreSQL"
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkillToCategory(selectedCategoryIdx, newSkillInput);
                setNewSkillInput('');
              }
            }}
          />
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <select
            value={selectedCategoryIdx}
            onChange={(e) => setSelectedCategoryIdx(Number(e.target.value))}
            className="bg-white border-3 border-black rounded-xl p-2.5 text-xs font-bold text-black shadow-[2px_2px_0px_#111111] focus:outline-none"
          >
            {categories.map((c, i) => (
              <option key={c.id} value={i}>
                Add to: {c.categoryName}
              </option>
            ))}
          </select>

          <NeoButton
            variant="black"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => {
              handleAddSkillToCategory(selectedCategoryIdx, newSkillInput);
              setNewSkillInput('');
            }}
          >
            Add
          </NeoButton>
        </div>
      </div>

      {/* AI Suggested Skills Chips */}
      {suggestedSkills.length > 0 && (
        <div className="p-3 border-2 border-dashed border-[#111111] rounded-xl bg-teal-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black uppercase text-teal-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" /> AI Suggested Skills for {targetRole || 'Your Role'}:
            </span>
            <button
              onClick={() => setSuggestedSkills([])}
              className="text-[10px] font-bold text-gray-500 hover:text-black cursor-pointer"
            >
              Dismiss
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  handleAddSkillToCategory(selectedCategoryIdx, s);
                  setSuggestedSkills(suggestedSkills.filter((item) => item !== s));
                }}
                className="text-xs font-bold bg-white text-teal-900 border border-teal-700 hover:bg-teal-200 px-2.5 py-1 rounded-lg cursor-pointer transition-all"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Render Categorized Skill Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, catIdx) => (
          <div
            key={cat.id}
            className="border-3 border-[#111111] p-4 rounded-xl bg-white shadow-[3px_3px_0px_#111111] flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={cat.categoryName}
                onChange={(e) => handleUpdateCategoryName(catIdx, e.target.value)}
                className="font-black text-xs uppercase tracking-wider text-[#111111] bg-yellow-100 border-2 border-black px-2 py-1 rounded-lg focus:outline-none"
              />
              <span className="text-[10px] font-bold text-gray-500">{cat.skills.length} skills</span>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50">
              {cat.skills.length === 0 ? (
                <span className="text-xs text-gray-400 italic">No skills in this category yet.</span>
              ) : (
                cat.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="inline-flex items-center gap-1 text-xs font-bold bg-[#FFD54F] text-black border-2 border-black px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_#111111]"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(catIdx, skill)}
                      className="hover:text-red-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <NeoButton variant="white" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAddCustomCategory}>
          Add Custom Skill Category
        </NeoButton>
      </div>
    </NeoCard>
  );
};
