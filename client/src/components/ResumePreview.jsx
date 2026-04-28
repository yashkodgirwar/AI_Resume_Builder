import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';  
import MinimalTemplate from './templates/MinimalTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';

const ResumePreview = ({data,template,accent_color, classes=""}) => {
  const renderTemplate=()=>{
    switch(template){
      case "modern":
        return <ModernTemplate data={data} accentColor={accent_color} />;
      case "minimal":   
        return <MinimalTemplate data={data} accentColor={accent_color} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accent_color} />;
      case "classic":
      default:
        return <ClassicTemplate data={data} accentColor={accent_color} />;
    }
}
    return (
    
  
  <div className={`w-full bg-white shadow-lg border border-gray-200 ${classes}`}>
    <div className="w-full bg-white">
      
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
