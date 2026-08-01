import React from 'react';
import { Project } from '../../types';
import { NeoInput } from '../ui/NeoInput';
import { NeoTextarea } from '../ui/NeoTextarea';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

interface ProjectsStepProps {
  data: Project[];
  onChange: (updated: Project[]) => void;
  onAIImprove: (text: string) => Promise<{ improvedText: string }>;
}

export const ProjectsStep: React.FC<ProjectsStepProps> = ({ data, onChange, onAIImprove }) => {
  const handleAdd = () => {
    const newItem: Project = {
      id: 'proj-' + Date.now(),
      title: '',
      description: '',
      techStack: [],
      githubUrl: '',
      liveUrl: '',
    };
    onChange([...data, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Project, value: any) => {
    onChange(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#FFD54F]" />
            4. Key Projects & Portfolio
          </h2>
          <p className="text-xs font-medium text-gray-600">
            Demonstrate practical application of your skills with standout personal or team projects.
          </p>
        </div>
        <NeoButton variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Project
        </NeoButton>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-[#111111] rounded-xl bg-gray-50">
          <FolderGit2 className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-gray-700">No projects added yet.</p>
          <NeoButton variant="primary" size="sm" className="mt-3" onClick={handleAdd}>
            Add Project
          </NeoButton>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {data.map((proj, index) => (
            <div
              key={proj.id}
              className="border-3 border-[#111111] p-4 rounded-xl bg-yellow-50/20 shadow-[3px_3px_0px_#111111] relative flex flex-col gap-3"
            >
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-black text-xs uppercase tracking-wider text-black">
                  Project #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(proj.id)}
                  className="text-[#FF6B6B] hover:text-red-700 p-1 rounded-lg border border-transparent hover:border-black transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NeoInput
                  label="Project Title *"
                  placeholder="e.g. DevPulse - Developer Analytics Platform"
                  value={proj.title}
                  onChange={(e) => handleUpdate(proj.id, 'title', e.target.value)}
                />
                <NeoInput
                  label="Tech Stack (Comma Separated)"
                  placeholder="e.g. React, TypeScript, FastAPI, Docker"
                  value={Array.isArray(proj.techStack) ? proj.techStack.join(', ') : ''}
                  onChange={(e) =>
                    handleUpdate(
                      proj.id,
                      'techStack',
                      e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    )
                  }
                />
                <NeoInput
                  label="GitHub Repo URL"
                  placeholder="e.g. github.com/user/project"
                  value={proj.githubUrl || ''}
                  onChange={(e) => handleUpdate(proj.id, 'githubUrl', e.target.value)}
                />
                <NeoInput
                  label="Live Demo URL"
                  placeholder="e.g. myproject.app"
                  value={proj.liveUrl || ''}
                  onChange={(e) => handleUpdate(proj.id, 'liveUrl', e.target.value)}
                />
              </div>

              <NeoTextarea
                label="Project Description & Impact"
                placeholder="Describe what you built, technical challenges overcome, and results achieved..."
                value={proj.description}
                onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
                onAIImprove={onAIImprove}
                contextType="project STAR description"
              />
            </div>
          ))}
        </div>
      )}
    </NeoCard>
  );
};
