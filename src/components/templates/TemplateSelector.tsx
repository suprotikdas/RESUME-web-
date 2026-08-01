import React from 'react';
import { TemplateId } from '../../types';
import { Check, Layout } from 'lucide-react';

interface TemplateOption {
  id: TemplateId;
  name: string;
  badge: string;
  color: string;
  description: string;
}

const templates: TemplateOption[] = [
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    badge: 'Popular',
    color: '#FFD54F',
    description: 'Neo-Brutalist accent headers, 2-column skills grid, crisp layout.',
  },
  {
    id: 'corporate-executive',
    name: 'Corporate Executive',
    badge: 'Classic',
    color: '#4ECDC4',
    description: 'Serif font hierarchy, centered header, formal executive styling.',
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    badge: 'Sleek',
    color: '#FFFFFF',
    description: 'Ultra-clean single column with high negative space and fine rules.',
  },
  {
    id: 'creative-vibrant',
    name: 'Creative Vibrant',
    badge: 'Bold',
    color: '#FF6B6B',
    description: 'High-impact card blocks, tag badges, and colorful hero banner.',
  },
  {
    id: 'silicon-valley-ats',
    name: 'Silicon Valley ATS',
    badge: '100% ATS Safe',
    color: '#111111',
    description: 'Strict plain-text single column format built for Taleo & Workday parsers.',
  },
];

interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <div className="bg-white border-3 border-[#111111] shadow-[5px_5px_0px_#111111] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Layout className="w-5 h-5 text-[#111111]" />
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#111111]">
          Choose Resume Template ({templates.length})
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {templates.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;

          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelectTemplate(tpl.id)}
              className={`flex flex-col justify-between p-3 rounded-xl border-3 border-[#111111] text-left transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#FFD54F] shadow-[4px_4px_0px_#111111] scale-102 ring-2 ring-[#111111]'
                  : 'bg-white hover:bg-yellow-50/50 shadow-[2px_2px_0px_#111111] hover:shadow-[4px_4px_0px_#111111]'
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-1 mb-1">
                  <span className="font-black text-xs text-[#111111] leading-tight">{tpl.name}</span>
                  {isSelected && (
                    <span className="bg-[#111111] text-white rounded-full p-0.5 shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 border border-black rounded bg-white text-black inline-block mb-2">
                  {tpl.badge}
                </span>
                <p className="text-[10px] font-medium text-gray-700 leading-tight">
                  {tpl.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
