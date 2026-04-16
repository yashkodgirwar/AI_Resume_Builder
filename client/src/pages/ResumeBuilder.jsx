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
import { ChevronRight,DownloadIcon } from 'lucide-react';
import { Share2Icon } from 'lucide-react';
import { EyeIcon } from 'lucide-react';
import { EyeOffIcon } from 'lucide-react';
import PersonalinfoForm from '../components/PersonalinfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationInfo from '../components/EducationInfo';
import ProjectForm from '../components/ProjectForm';

import YourSkill from '../components/YourSkill';
import { useSelector } from 'react-redux';
import api from "../configs/api"


const ResumeBuilder = () => {
  const {resumeId}= useParams()
  const {token} = useSelector(state=>state.auth)
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

    try{
       const {data} =await api.get('/api/resumes/get' +resumeId, {headers: {
      Authorization: `Bearer ${token}` }})
      setResumeData(data.resumes)
      document.title=data.resume.title

    }catch(error){
      console.log(error)
          

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

const changeResumeVisibilty=async()=>{
  try{
    const formData =new FormData()
    formData.append("resumeId", resumeId)
    formData.append("resumeData" ,JSON.stringify({publicc: !resumeData.public}))
    const {data} =await api.put('/api/resumes/update' +resumeId, {headers: {
      Authorization: `Bearer ${token}` }})
      setResumeData({...resumeData,public: !resumeData.public})
      toast.success(data.message)

  }catch(error){
    console.error("Error saving resume :",error)

  }
}

const handleshare=()=>{
  const frontendUrl= window.location.href.split('/app')[0];
  const resumeUrl=frontendUrl+ '/view/'+ resumeData._id;
  if(navigator.share){
    navigator.share({
     
      url: resumeUrl,
      text: `Check out my resume: ${resumeData.title}`,
    })
  }  else{
   alert("Sharing not supported in this browser");
    }
  }
  const Downloadresume=()=>{
    window.print();
  }

  const saveResume = async ()=>{
    try{
      let updatedResumeData =structuredClone(resumeData)
      //remove imgae from updatedResumeData
      if(typeof resumeData.personal_info.image === 'object'){
        delete updatedResumeData.personal_info.image
      }

      const formData =new FormData()
      formData.append("resumeId", resumeId)
      formData.append('resumeData' ,JSON.stringfy(updatedResumeData))
      removeBackground && formData.append("removeBackground",yes);
      typeof resumeData.personal_info.image === 'object' && formData.append("image",resumeData.personal_info.image)
          const {data} =await api.put('/api/resumes/update', formData, {headers: {
      Authorization: `Bearer ${token}` }})
      setResumeData(data.resume)
      toast.success(data.message)

    }catch(error){
    console.error("Error saving in resume: ", error)
}  }
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
            <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000' style={{width: `${((activeSectionIndex+0.5)*100)/(section.length-1)}%` }} />
            {/* section Navigation */ }
            <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
               <div className='flex items-center gap-2 '>
               
               
                <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=>setResumeData((prev)=>({...prev, template}))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(accent_color)=>setResumeData((prev)=>({...prev, accent_color}))} />
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
              {activeSection.id === 'Summary' && (
                 <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data)=>setResumeData((prev)=>({...prev, professional_summary: data}))} />
                )}
                {activeSection.id === 'experience' && (
                  <ExperienceForm data={resumeData.experience} onChange={(data)=>setResumeData((prev)=>({...prev, experience: data}))} />
                )}
                  {activeSection.id === 'education' && (
                    <EducationInfo data={resumeData.education} onChange={(data)=>setResumeData((prev)=>({...prev, education: data}))} />
                  )}
                    {activeSection.id === 'projects' && ( 
                      <ProjectForm data={resumeData.projects} onChange={(data)=>setResumeData((prev)=>({...prev, projects: data}))} />
                    )}
                      {activeSection.id === 'skills' && (
                        <YourSkill data={resumeData.skills} onChange={(data)=>setResumeData((prev)=>({...prev, skills: data}))} />
                      )}
              {/* Add similar conditional rendering for other sections like experience, education, projects, skills */}
            </div>
                   <button on click={()=>{toast.promise(saveResume,{loading:'saving'})}}className='bg-gradient-to-br from-green-100 to-green-200
ring-green-300 text-green-600 ring hover:ring-green-400
transition-all rounded-md px-6 py-2 mt-6 text-sm'>
Save Changes
</button>
          </div>
        </div>
       { /* /right panal-preview */ }
  <div className="lg:col-span-7 max-lg:mt-6">
  <div className="relative w-full">
    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
      {resumeData.public && (
        <button
          className="flex items-center p-2 px-4 gap-2 text-xs
                     bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600
                     rounded-lg ring-blue-300 hover:ring transition-colors"
          onClick={handleshare}>
          <Share2Icon className="size-4" /> Share
        </button>
      )}

      <button  onClick={changeResumeVisibilty} className='flex items-center p-2 px-4 gap-2 text-xs
bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600
ring-purple-300 rounded-1g hover:ring transition-colors'>
{resumeData.public ? <EyeIcon className="size-4"/> :
<EyeOffIcon className="size-4"/>}
{resumeData.public ? 'Public' : 'Private'}
</button>
      <button  onClick={Downloadresume} className='flex items-center gap-2 px-6 py-2 text-xs
bg-gradient-to-br from-green-100 to-green-200 text-green-600
rounded-lg ring-green-300 hover:ring transition-colors'>
<DownloadIcon className='size-4'/> Download
</button>
    </div>
  </div>
</div>
  <ResumePreview 
    data={resumeData} 
    template={resumeData.templates} 
    accent_color={resumeData.accent_color} 
    classes="mx-auto" 
  />
</div>


      </div>
    </div>
   
    
  )
}

export default ResumeBuilder
