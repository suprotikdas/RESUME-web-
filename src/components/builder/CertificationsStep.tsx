import React from 'react';
import { Certification } from '../../types';
import { NeoInput } from '../ui/NeoInput';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';
import { Award, Plus, Trash2 } from 'lucide-react';

interface CertificationsStepProps {
  data: Certification[];
  onChange: (updated: Certification[]) => void;
}

export const CertificationsStep: React.FC<CertificationsStepProps> = ({ data, onChange }) => {
  const handleAdd = () => {
    const newItem: Certification = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
    };
    onChange([...data, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Certification, value: string) => {
    onChange(data.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FFD54F]" />
            6. Certifications & Licenses
          </h2>
          <p className="text-xs font-medium text-gray-600">
            Include professional licenses (AWS, PMP, Scrum Master, Google Cloud, etc.).
          </p>
        </div>
        <NeoButton variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Add Certification
        </NeoButton>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-[#111111] rounded-xl bg-gray-50">
          <Award className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-gray-700">No certifications added yet.</p>
          <NeoButton variant="primary" size="sm" className="mt-3" onClick={handleAdd}>
            Add Certification
          </NeoButton>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((cert) => (
            <div
              key={cert.id}
              className="border-3 border-[#111111] p-4 rounded-xl bg-white shadow-[3px_3px_0px_#111111] relative flex flex-col gap-3"
            >
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-black text-xs uppercase text-black">Certification Record</span>
                <button
                  type="button"
                  onClick={() => handleRemove(cert.id)}
                  className="text-[#FF6B6B] hover:text-red-700 p-1 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NeoInput
                  label="Certification Name *"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={cert.name}
                  onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                />
                <NeoInput
                  label="Issuing Organization *"
                  placeholder="e.g. Amazon Web Services"
                  value={cert.issuer}
                  onChange={(e) => handleUpdate(cert.id, 'issuer', e.target.value)}
                />
                <NeoInput
                  label="Issue Date"
                  placeholder="e.g. 2023-05"
                  value={cert.issueDate}
                  onChange={(e) => handleUpdate(cert.id, 'issueDate', e.target.value)}
                />
                <NeoInput
                  label="Credential URL / ID"
                  placeholder="e.g. aws.amazon.com/verify/123"
                  value={cert.credentialUrl || ''}
                  onChange={(e) => handleUpdate(cert.id, 'credentialUrl', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </NeoCard>
  );
};
