import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';   
import { User } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Briefcase } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { Folder } from 'lucide-react';
import { Sparkle } from 'lucide-react'; 
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import PersonalinfoForm from '../components/PersonalinfoForm';
import ResumePreview from '../components/ResumePreview';

const ResumeBuilder = () => {
  const {resumeId}= useParams();
  const [resumeData,setResumeData]= useState({
    _id: '',
    title: '',
    personal_info:{},
    experience:[],
    education:[],
    projects:[],
    skills:[],
    templates:"classic",
    accent_color:"#3B82F6",
    public:false,
});

const loadExitingResume= async()=>{
  const resume=dummyResumeData.find(resume=> resume.id === resumeId);
  if(resume){
    setResumeData(resume);
    document.title=resume.title;

  }

}



const [activeSectionIndex,setActiveSectionIndex]= useState(0); 
const [removeBackground,setRemoveBackground]= useState(false);

const section=[
  { id:"personal", name:"Personal Info", icon:User },
  { id:"Summary", name:"Summary", icon:FileText },
  { id:"experience", name:"Experience", icon:Briefcase },
  { id:"education", name:"Education", icon:GraduationCap },
  { id:"projects", name:"Projects", icon:Folder },
  { id:"skills", name:"Skills", icon:Sparkle },


]

const activeSection= section[activeSectionIndex];

useEffect(()=>{
  loadExitingResume();
},[resumeId])


  return (
    <div>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
      <ArrowLeftIcon className="size-4" />
        Back to Dashboard
      </Link>
    </div>
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-8">
        { /* left panal-section selector */ }
        <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
          {/* progress bar using activeSectionIndex */ }
              <hr className='absolute top-0 right-0 border-2 border-gray-200'/>
            <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000' style={{width: `${((activeSectionIndex+1)*100)/(section.length-1)}%` }} />
            {/* section Navigation */ }
            <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
               <div>
               </div>
               <div>

               <div className="flex items-center">
  {activeSectionIndex !== 0 && (
    <button onClick={()=>setActiveSectionIndex((prevIndex)=>Math.max(prevIndex-1,0))}
      className="flex items-center gap-1 p-3 rounded-lg 
                 text-sm font-medium text-gray-600 
                 hover:bg-gray-50 transition-all"
      disabled={activeSectionIndex===0} 
      
    >
      <ChevronLeft className="size-4" />
      Previous
    </button>
    
  )}
  <button onClick={()=>setActiveSectionIndex((prevIndex)=>Math.min(prevIndex+1,section.length-1))}
      className="flex items-center gap-1 p-3 rounded-lg 
                 text-sm font-medium text-gray-600 
                 hover:bg-gray-50 transition-all"
      disabled={activeSectionIndex===section.length-1} >
      Next
      <ChevronRight className="size-4" />
    </button>
</div>
      
              
</div>
            </div>
            {/* form  content*/ }
            <div className='space-y-6'>
              {activeSection.id === 'personal' && (
                 <PersonalinfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData((prev)=>({...prev, personal_info: data}))} removeBackground={removeBackground} setremoveBackground={setRemoveBackground} />
                )}

            </div>

          </div>
        </div>
       { /* /right panal-preview */ }
       <div>
       <ResumePreview data={resumeData} template={resumeData.template} accent_color={resumeData.accent_color} classes="mx-auto" />
       </div>


      </div>
    </div>
    </div>

    
  )
}

export default ResumeBuilder
