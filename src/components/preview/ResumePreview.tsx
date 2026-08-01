import React, { useState } from 'react';
import { ResumeData, TemplateId } from '../../types';
import { ModernTechTemplate } from '../templates/ModernTechTemplate';
import { CorporateExecutiveTemplate } from '../templates/CorporateExecutiveTemplate';
import { MinimalistCleanTemplate } from '../templates/MinimalistCleanTemplate';
import { CreativeVibrantTemplate } from '../templates/CreativeVibrantTemplate';
import { SiliconValleyATSTemplate } from '../templates/SiliconValleyATSTemplate';
import { TemplateSelector } from '../templates/TemplateSelector';
import { NeoButton } from '../ui/NeoButton';
import { Printer, FileDown, ZoomIn, ZoomOut, Eye } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
  onUpdateTemplate: (templateId: TemplateId) => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  onUpdateTemplate,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showTemplatePicker, setShowTemplatePicker] = useState<boolean>(false);

  const handlePrintPDF = () => {
    window.print();
  };

  const handleDownloadDOCX = () => {
    // Generate a formatted HTML / text string downloadable as .doc file
    const element = document.getElementById('resume-export-container');
    if (!element) return;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>${resumeData.personalInfo.fullName || 'Resume'}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #111; line-height: 1.5; }
        h1 { font-size: 24pt; font-weight: bold; }
        h2 { font-size: 14pt; font-weight: bold; border-bottom: 1px solid #333; }
        p { font-size: 10pt; }
      </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo.fullName || 'resume'}_hirecraft.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderTemplate = () => {
    switch (resumeData.templateId) {
      case 'corporate-executive':
        return <CorporateExecutiveTemplate data={resumeData} />;
      case 'minimalist-clean':
        return <MinimalistCleanTemplate data={resumeData} />;
      case 'creative-vibrant':
        return <CreativeVibrantTemplate data={resumeData} />;
      case 'silicon-valley-ats':
        return <SiliconValleyATSTemplate data={resumeData} />;
      case 'modern-tech':
      default:
        return <ModernTechTemplate data={resumeData} />;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Controls Header */}
      <div className="bg-white border-3 border-[#111111] shadow-[5px_5px_0px_#111111] rounded-xl p-3 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#FF6B6B]" />
          <span className="font-extrabold text-sm uppercase text-[#111111]">
            Live Resume Preview
          </span>
          <button
            type="button"
            onClick={() => setShowTemplatePicker(!showTemplatePicker)}
            className="text-xs font-bold bg-[#FFD54F] border-2 border-black px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] cursor-pointer"
          >
            Template: <span className="uppercase">{resumeData.templateId}</span> ⚙️
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-gray-100 border-2 border-black p-1 rounded-lg">
            <button
              onClick={() => setZoomLevel(Math.max(70, zoomLevel - 10))}
              className="p-1 hover:bg-white rounded cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-black px-1.5">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(120, zoomLevel + 10))}
              className="p-1 hover:bg-white rounded cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <NeoButton variant="accent" size="sm" icon={<FileDown className="w-4 h-4" />} onClick={handleDownloadDOCX}>
            DOCX
          </NeoButton>

          <NeoButton variant="primary" size="sm" icon={<Printer className="w-4 h-4" />} onClick={handlePrintPDF}>
            Print / PDF
          </NeoButton>
        </div>
      </div>

      {/* Template selector accordion if toggled */}
      {showTemplatePicker && (
        <TemplateSelector
          selectedTemplate={resumeData.templateId}
          onSelectTemplate={(id) => {
            onUpdateTemplate(id);
            setShowTemplatePicker(false);
          }}
        />
      )}

      {/* Render Canvas Container */}
      <div className="w-full overflow-x-auto bg-[#E5E7EB] border-3 border-[#111111] shadow-[5px_5px_0px_#111111] rounded-2xl p-2 sm:p-6 flex justify-center min-h-[700px]">
        <div
          id="resume-export-container"
          className="transition-all transform origin-top w-full max-w-[800px]"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
