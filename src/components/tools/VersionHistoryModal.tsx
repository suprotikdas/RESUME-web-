import React, { useState, useEffect } from 'react';
import { ResumeData, ResumeVersion } from '../../types';
import { NeoButton } from '../ui/NeoButton';
import { NeoInput } from '../ui/NeoInput';
import { History, Download, Upload, Save, Trash2, X, Check } from 'lucide-react';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentResume: ResumeData;
  onRestoreResume: (restored: ResumeData) => void;
}

const LOCAL_STORAGE_KEY = 'hirecraft_resume_versions_v1';

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
  currentResume,
  onRestoreResume,
}) => {
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [versionNameInput, setVersionNameInput] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [activeTab, setActiveTab] = useState<'versions' | 'export-import'>('versions');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setVersions(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load version history:', e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveVersionsToStorage = (updated: ResumeVersion[]) => {
    setVersions(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSaveCurrentAsVersion = () => {
    const name = versionNameInput.trim() || `Draft - ${new Date().toLocaleTimeString()}`;
    const newVersion: ResumeVersion = {
      id: 'ver-' + Date.now(),
      timestamp: new Date().toLocaleString(),
      name,
      data: JSON.parse(JSON.stringify(currentResume)),
    };

    const updated = [newVersion, ...versions];
    saveVersionsToStorage(updated);
    setVersionNameInput('');
  };

  const handleRemoveVersion = (id: string) => {
    saveVersionsToStorage(versions.filter((v) => v.id !== id));
  };

  const handleRestore = (ver: ResumeVersion) => {
    onRestoreResume(ver.data);
    onClose();
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(currentResume, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentResume.personalInfo.fullName || 'resume'}_hirecraft_backup.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed.personalInfo) {
        onRestoreResume(parsed);
        onClose();
      } else {
        alert('Invalid resume JSON format.');
      }
    } catch (e) {
      alert('Failed to parse JSON text.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFF9F0] border-4 border-black shadow-[10px_10px_0px_#111111] rounded-2xl w-full max-w-xl flex flex-col p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b-3 border-black pb-3 mb-4">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-[#111111]" />
            <h2 className="text-lg font-black uppercase text-[#111111]">
              Draft Versions & Backup
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border-2 border-black bg-white hover:bg-[#FFD54F] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('versions')}
            className={`flex-1 py-2 font-black text-xs uppercase border-2 border-black rounded-lg transition-all cursor-pointer ${
              activeTab === 'versions' ? 'bg-[#FFD54F] shadow-[2px_2px_0px_#111111]' : 'bg-white'
            }`}
          >
            Saved Drafts ({versions.length})
          </button>
          <button
            onClick={() => setActiveTab('export-import')}
            className={`flex-1 py-2 font-black text-xs uppercase border-2 border-black rounded-lg transition-all cursor-pointer ${
              activeTab === 'export-import' ? 'bg-[#4ECDC4] shadow-[2px_2px_0px_#111111]' : 'bg-white'
            }`}
          >
            Export / Import JSON
          </button>
        </div>

        {activeTab === 'versions' ? (
          <div className="flex flex-col gap-4">
            {/* Save current draft input */}
            <div className="flex gap-2 items-end bg-white p-3 border-2 border-black rounded-xl">
              <div className="flex-1">
                <NeoInput
                  label="Version Name / Tag"
                  placeholder="e.g. Version for Senior Dev Role"
                  value={versionNameInput}
                  onChange={(e) => setVersionNameInput(e.target.value)}
                />
              </div>
              <NeoButton variant="primary" size="md" icon={<Save className="w-4 h-4" />} onClick={handleSaveCurrentAsVersion}>
                Save Draft
              </NeoButton>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {versions.length === 0 ? (
                <div className="text-center py-6 text-xs font-bold text-gray-500">
                  No saved versions yet. Click 'Save Draft' above to snapshot your progress.
                </div>
              ) : (
                versions.map((ver) => (
                  <div key={ver.id} className="bg-white border-2 border-black p-3 rounded-xl flex justify-between items-center shadow-[2px_2px_0px_#111111]">
                    <div>
                      <h4 className="font-bold text-xs text-black">{ver.name}</h4>
                      <span className="text-[10px] text-gray-500 font-medium">{ver.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <NeoButton variant="accent" size="sm" onClick={() => handleRestore(ver)}>
                        Restore
                      </NeoButton>
                      <button onClick={() => handleRemoveVersion(ver.id)} className="text-[#FF6B6B] p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-white p-4 border-2 border-black rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs uppercase text-black">Download Full Backup</h4>
                <p className="text-[11px] text-gray-600">Save a raw .json file to your computer.</p>
              </div>
              <NeoButton variant="primary" size="sm" icon={<Download className="w-4 h-4" />} onClick={handleDownloadJSON}>
                Download JSON
              </NeoButton>
            </div>

            <div className="bg-white p-4 border-2 border-black rounded-xl flex flex-col gap-2">
              <h4 className="font-bold text-xs uppercase text-black">Import Resume JSON</h4>
              <textarea
                rows={4}
                placeholder="Paste JSON text here..."
                className="w-full border-2 border-black rounded-lg p-2 text-xs font-mono"
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
              />
              <NeoButton variant="black" size="sm" icon={<Upload className="w-4 h-4" />} onClick={handleImportJSON}>
                Load JSON Resume
              </NeoButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
