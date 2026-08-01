import React from 'react';
import { PersonalInfo } from '../../types';
import { NeoInput } from '../ui/NeoInput';
import { NeoCard } from '../ui/NeoCard';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase, Camera } from 'lucide-react';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <NeoCard variant="white" className="flex flex-col gap-5">
      <div className="border-b-3 border-[#111111] pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black uppercase text-[#111111] flex items-center gap-2">
            <User className="w-5 h-5 text-[#FF6B6B]" />
            1. Personal & Contact Details
          </h2>
          <p className="text-xs font-medium text-gray-600">
            Provide recruiter contact links and your target job title.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NeoInput
          label="Full Name *"
          placeholder="e.g. Alex Morgan"
          value={data.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          leftIcon={<User className="w-4 h-4 text-gray-500" />}
        />

        <NeoInput
          label="Target Role / Job Title *"
          placeholder="e.g. Senior Full-Stack Engineer"
          value={data.targetRole || ''}
          onChange={(e) => handleChange('targetRole', e.target.value)}
          leftIcon={<Briefcase className="w-4 h-4 text-gray-500" />}
          helperText="Used by AI to optimize keywords for this position."
        />

        <NeoInput
          label="Email Address *"
          type="email"
          placeholder="e.g. alex.morgan@devcraft.io"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          leftIcon={<Mail className="w-4 h-4 text-gray-500" />}
        />

        <NeoInput
          label="Phone Number"
          placeholder="e.g. +1 (555) 382-9102"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          leftIcon={<Phone className="w-4 h-4 text-gray-500" />}
        />

        <NeoInput
          label="Location / City, Country"
          placeholder="e.g. San Francisco, CA (Open to Remote)"
          value={data.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          leftIcon={<MapPin className="w-4 h-4 text-gray-500" />}
        />

        <NeoInput
          label="LinkedIn URL"
          placeholder="e.g. linkedin.com/in/alexmorgan"
          value={data.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          leftIcon={<Linkedin className="w-4 h-4 text-gray-500" />}
        />

        <NeoInput
          label="GitHub Profile"
          placeholder="e.g. github.com/alexmorgan"
          value={data.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
          leftIcon={<Github className="w-4 h-4 text-gray-500" />}
        />

        <NeoInput
          label="Portfolio / Personal Site"
          placeholder="e.g. alexmorgan.dev"
          value={data.portfolio || ''}
          onChange={(e) => handleChange('portfolio', e.target.value)}
          leftIcon={<Globe className="w-4 h-4 text-gray-500" />}
        />
      </div>

      {/* Photo Upload Optional */}
      <div className="border-2 border-dashed border-[#111111] p-4 rounded-xl bg-yellow-50/50 flex flex-col sm:flex-row items-center gap-4">
        {data.photoUrl ? (
          <img
            src={data.photoUrl}
            alt="Uploaded headshot"
            className="w-16 h-16 rounded-xl object-cover border-2 border-black shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0">
            <Camera className="w-6 h-6 text-gray-400" />
          </div>
        )}

        <div className="flex-1 text-center sm:text-left">
          <label className="text-xs font-bold text-black uppercase tracking-wider block mb-1">
            Headshot Photo (Optional)
          </label>
          <p className="text-[11px] text-gray-600 mb-2">
            Standard US/EU tech resumes usually omit photos, but creative or international templates support headshots.
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="text-xs text-gray-700 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-2 file:border-black file:text-xs file:font-bold file:bg-[#FFD54F] file:cursor-pointer"
          />
          {data.photoUrl && (
            <button
              type="button"
              onClick={() => handleChange('photoUrl', '')}
              className="text-xs font-bold text-[#FF6B6B] ml-2 underline cursor-pointer"
            >
              Remove photo
            </button>
          )}
        </div>
      </div>
    </NeoCard>
  );
};
