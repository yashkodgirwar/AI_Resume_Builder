import React from 'react'

import { Briefcase, User, Mail, Phone, MapPin, Link, Globe } from 'lucide-react';

const PersonalinfoForm = ({data,onChange,removeBackground, setremoveBackground}) => {
    const handleChange=(field,value)=>{
        onChange({...data, [field]: value});
    }
    const fields=[
      {key:"full_name", label:"Full Name", icon:User, type:"text", required:true},
      {key:"email", label:"Email Address", icon:Mail, type:"email", required:true},
      {key:"phone", label:"Phone Number", icon:Phone, type:"tel"},
      {key:"location", label:"Location", icon:MapPin, type:"text"},
      {key:"profession", label:"Profession", icon:Briefcase, type:"text"},
      {key:"linkedin", label:"LinkedIn Profile", icon:Link, type:"url"},
      {key:"website", label:"Personal Website", icon:Globe, type:"url"},
    ]
  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>
        Personal Information
      </h3>
      <p className='text-sm text-gray-600'>
        Get Started with the personal 
      </p>
      <div className='flex items-center gap-2'>
        <label>
            {data.image ? (
                <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="UserImage" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80' />
            ):(
                <div className='inline-flex items-center gap2 mt-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                    <User  className="size-10 p-2.5 border rounded-full" />
                    upload user image
                </div>
            )}
            <input type="file" accept='image/jpeg,image/png' className='hidden' onChange={(e)=> handleChange('image', e.target.files[0])} />
        </label>
        {typeof data.image === 'object' && (
            <div className=''>
          <p>Remove Background</p>
         <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
  <input
    type="checkbox"
    className="sr-only peer"
    onChange={() => setRemoveBackground((prev) => !prev)}
    checked={removeBackground}
  />
  <div
    className="w-9 h-5 bg-slate-300 rounded-full 
               peer-checked:bg-green-600 
               transition-colors duration-200"
  ></div>
  <span
    className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full 
               transition-transform duration-200 ease-in-out 
               peer-checked:translate-x-4"
  ></span>
</label>
            </div>
            )}

      </div>
      {fields.map((field)=>{

      
        const Icon=field.icon;
      return(
        <div key={field.key} className='space-y-1 mt-5'>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
            <Icon className="size-5" />
            {field.label}
            {field.required && <span className='text-red-500'>*</span>}

          </label>
           <input
  type={field.type}
  value={data[field.key] || ""}
  onChange={(e) => handleChange(field.key, e.target.value)}
  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg 
             focus:ring focus:ring-blue-500 focus:border-blue-500 
             outline-none transition-colors text-sm"
  placeholder={`Enter your ${field.label.toLowerCase()}`}
  required={field.required}
/>

    </div>
      )}
      
  )

}

</div>
  )
}
export default PersonalinfoForm
