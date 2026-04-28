import React, { useEffect, useState } from 'react'
import { LoaderCircleIcon, PlusIcon, UploadCloudIcon, X, XIcon } from 'lucide-react'
import { dummyResumeData } from '../assets/assets';
import { FilePenLineIcon } from 'lucide-react';
import { TrashIcon, PencilIcon } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext'
import api from "../configs/api"


const Dashboard = () => {
  
const { user, token } = useSelector(state => state.auth)
  const colors=["#9333ea", "#e0b011", "#dc2626", "#3028c7","#16a34a","#2563eb","#db2777","#ea580c","#059669","#0ea5e9"];
  const[allResumes,setAllResumes]=React.useState([]);
    const[showCreateResume,setShowCreateResume]=React.useState(false);
      const[showUploadResume,setShowUploadResume]=React.useState(false);
      const[title,setTitle]=useState('');
      const[resume,setresume]=useState(null); 
      const[editresumeId,seteditresumeId]=useState('');

      const [isLoading,setisLoading]=useState(false)
const navigate=useNavigate();
 useEffect(()=>{
    loadAllResumes();
  },[token])

  const loadAllResumes= async()=>{
    try{
       const {data} =await api.get('/api/users/resumes', {headers: {
      Authorization: `Bearer ${token}` }})
      setAllResumes(data.resumes)

    }catch(error){
           toast.error(error?.response?.data.message || error.message)

    }
  }

  const createResume= async(event)=>{
    try{
     event.preventDefault()
    //  const {data} =await api.post('/api/resumes/create', {title} ,{headers: {
    //   Authorization: `Bearer ${token}` }})
    //   setAllResumes([...allResumes,data.resume])
    //   setTitle('')
    //   setShowCreateResume(false)
    //   navigate(`/app/builder/${data.resume._id}`)
const {data} = await api.post('/api/resumes/create', {title},{
  headers: { Authorization: `Bearer ${token}` }
})
console.log(data)

// ✅ IMPORTANT
setAllResumes((prev) => [...prev, data.resume])

setTitle('')
setShowCreateResume(false)

navigate(`/app/builder/${data.resume._id}`)
     
    }catch(error){
      toast.error(error?.response?.data.message || error.message)

    }
}
  
  const uploadResume= async(event)=>{
    event.preventDefault()
    setisLoading(true)
    try{
      const resumeText = await pdfToText.default(resume)

      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setTitle('')
      setresume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    
    }catch(error){
     setisLoading(false)
     toast.error(error?.response?.data.message || error.message)


    }
  }
  const editTitle= async(event)=>{
    try{
        event.preventDefault();
       api.put('/api/resumes/update', {
  resumeId: editresumeId,
  resumeData: { title }
}, {
  headers: { Authorization: `Bearer ${token}` }
})
    setAllResumes(allResumes.map(resume => resume._id === editresumeId ?{
      ...resume,title} :resume))
      setTitle('')
      seteditresumeId('')
      toast.success(data.message)
    }catch(error){
         // toast.error(error?.response?.data.message || error.message)
                                
    }
    
   
  }
  const deleteResume= async(resumeId)=>{
    const confirmDelete= window.confirm("Are you sure you want to delete this resume?");
    
    try{
      if(confirmDelete){
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
  headers: { Authorization: `Bearer ${token}` }
});
      setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
    toast.success(data.message)
    }
  }catch(error){

     toast.error(error?.response?.data.message || error.message)

  }
  }
  return (
    <div>
     <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
        Welcome, Joe Doe
      </p>
           <div className="flex gap-4">
        <button onClick={()=> setShowCreateResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer mt-4"
        >
          <PlusIcon
            className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full"
          />
          <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
            Create Resume
          </p>
        </button>

          <button onClick={()=> setShowUploadResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer mt-4"
        >
          <UploadCloudIcon
            className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-purple-500 text-white rounded-full"
          />
          <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
            Upload Resume
          </p>
        </button>
</div>
<hr className="border-slate-300 my-6 sm:w-[305px]" />
<div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
{allResumes?.filter(r => r && r._id)?.map((resume,index)=>{
  const baseColor=colors[index%colors.length];
      return (
    <button key={index} onClick={()=> resume?._id && navigate(`/app/builder/${resume._id}`)}
      
      className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
        borderColor: `${baseColor}40`,
      }}
    >
      <FilePenLineIcon
        className="size-7 group-hover:scale-105 transition-all"
        style={{ color: baseColor }}
      />
      <p
        className="text-sm group-hover:scale-105 transition-all px-2 text-center"
        style={{ color: baseColor }}
      >
       {resume?.title || "Untitled"}
      </p>
      <p className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
        style={{ color: baseColor + '90' }}
      >
       Updated on: {
  resume?.updatedAt
    ? new Date(resume.updatedAt).toLocaleDateString()
    : "N/A"
}

      </p>
       <div onClick={(e)=> e.stopPropagation()} className="absolute top-1 right-1 hidden group-hover:flex items-center gap-1">
        <TrashIcon onClick={(e)=> deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
        <PencilIcon onClick={(e)=> {
          
          seteditresumeId(resume._id);
          setTitle(resume.title);
        }} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
      </div>
    </button>
  );

})}
</div>
 {showCreateResume && (
  <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
    <div className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6' onClick={e=>e.stopPropagation()}>
      <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
     
      <input onChange={(e)=>setTitle(e.target.value)}  value={title} type="text" placeholder=" enter Resume Title"  className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required  />
      <button type='submit' className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors' 
      >
        Create Resume
        </button>
        <XIcon  className='absolute top-4 right-4 size-5 text-slate-500 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=> {setShowCreateResume(false), setTitle('')}} />
      
    </div>

  </form>
 )}
 {
  showUploadResume && (
    <form onSubmit={uploadResume} onClick={()=> setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
    <div className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6' onClick={e=>e.stopPropagation()}>
      <h2 className='text-xl font-bold mb-4'>Upload a Resume</h2>
     
      <input  onChange={(e)=>setTitle(e.target.value)}  value={title} type="text" placeholder=" enter Resume Title"  className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required  />
      <div>
        <label htmlFor='resume-input' className='block text-sm text-slate-700'>Select a Resume File
         <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
    {resume ? (
      <p className="text-green-700">{resume.name}</p>
    ) : (
      <>
        <UploadCloud className="size-14 stroke-1" />
        <p>Upload resume</p>
      </>
    )}
  </div>

        </label>
        <input id='resume-input' type="file" accept=".pdf" className='hidden' onChange={(e)=> setresume(e.target.files[0])} />
      </div>
      <button  disabled={isLoading} type='submit' className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex item-center justify-center gap-2' 
      > {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
      {isLoading ? 'Uploading...' : 'Upload Resume'}
    
        </button>

        <XIcon  className='absolute top-4 right-4 size-5 text-slate-500 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=> {setShowUploadResume('')}} />
      
    </div>

  </form>
  )
 }
 {editresumeId && (
  <form onSubmit={editTitle} onClick={()=> seteditresumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
    <div className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6' onClick={e=>e.stopPropagation()}>
      <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
     
      <input onChange={(e)=>setTitle(e.target.value)}  value={title} type="text" placeholder=" enter Resume Title"  className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required  />
      <button type='submit' className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors' 
      >
        Update Title
        </button>
        <XIcon  className='absolute top-4 right-4 size-5 text-slate-500 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=> {seteditresumeId(false), setTitle('')}} />
      
    </div>

  </form>
 )}
     </div>
    </div>
  )
}

export default Dashboard
