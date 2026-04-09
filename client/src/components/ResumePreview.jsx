import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';  
import MinimalTemplate from './templates/MinimalTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';

const ResumePreview = ({data,template,accent_color, classes=""}) => {
  const renderTemplate=()=>{
    switch(template){
      case "modern":
        return <ModernTemplate data={data} accent_color={accent_color} />;
      case "minimal":   
        return <MinimalTemplate data={data} accent_color={accent_color} />;
      case "minimal_image":
        return <MinimalImageTemplate data={data} accent_color={accent_color} />;
      case "classic":
      default:
        return <ClassicTemplate data={data} accent_color={accent_color} />;
    }
}
    return (
    
  <div className="w-full min-h-screen bg-gray-100 flex justify-center items-start py-10">
    
    <div className="w-[800px] bg-white shadow-lg border border-gray-200">
      
      <div id="resume-preview" className="w-full">
        {renderTemplate()}
      </div>

    </div>

    <style jsx="true">{`
      @page {
        size: A4;
        margin: 0;
      }

      @media print {
        body * {
          visibility: hidden;
        }

        #resume-preview, #resume-preview * {
          visibility: visible;
        }

        #resume-preview {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
      }
    `}</style>

  </div>
);
    
}

export default ResumePreview
