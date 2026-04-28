


import Resume from "../models/Resume.js";
import imagekit from "../configs/imagekit.js";
import  fs from 'fs';

// controoler for creating new resume
//POST:/api/resume/create
export const createResume = async(req,res)=>{
    try{
        const userId=req.userId;
        const{title}=req.body;
        //create new resume
        const newResume= await Resume.create({userId,title})
        //retrun success message
      return res.status(201).json({
  message: "Resume created successfully",
  resume: newResume
});
    }catch(error){
      return res.status(400).json({message:error.message})
    }
}
//controller for deleting a resume
//DELETE:/api/resume/delete

export const deleteResume = async(req,res)=>{
    try{
        const userId=req.userId;
        const{resumeId}=req.params;

       const deleted = await Resume.findOneAndDelete({
  userId,
  _id: resumeId
});

if (!deleted) {
  return res.status(404).json({ message: "Resume not found" });
}
        
      
        //retrun success message
        return res.status(201).json({message:"Resume deleted sucessfully"})
    }catch(error){
      return res.status(400).json({message:error.message})
    }
}

//controller for get user resume by id
//GET: /api/resume/get

export const getResumeById =async(req,res)=>{
    try{
      const userId = req.userId;
      const { resumeId } = req.params;

const resume = await Resume.findOne({
  userId,
  _id: resumeId
});       

        
       if(!resume){
        return res.status(404).json({message:"Resume not Found"})
       }

       resume.__v=undefined;
       resume.createdAt=undefined;
       resume.updatedAt=undefined;

       return res.status(200).json({resume})
      
        
    }catch(error){
      return res.status(400).json({message:error.message})
    }
}

//get resume by id public
//GET :/api/resume/public
export const getPublicResumebyId =async (req,res)=>{
    try{
        const{resumeId}=req.params;
        const resume=await Resume.findOne({public:true,_id:resumeId})
        if(!resume){
        return res.status(404).json({message:"Resume not Found"})
       }
       return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

//controller fro updating a resume
//PUT:/api/resume/update
export const updateResume = async (req, res) =>{
try{
   

const userId = req.userId;
const {resumeId, resumeData, removeBackground} = req.body
const image = req.file;

let resumeDataCopy;
if(typeof resumeData ==='string'){
   resumeDataCopy=await JSON.parse(resumeData)
}else{
  resumeDataCopy=structuredClone(resumeData) // for deep copy
}


if(image){
    const imageBufferdata=fs.createReadStream(image.path);
    const response = await imagekit.upload({
      file: imageBufferdata,
      fileName: 'resume.jpg',
      folder:'user-resume'
    });
    
    let trString = 'w-300,h-300,fo-face,z-0.75';
    if(removeBackground === 'true'){
        trString += ',e-bgremove';
    }
    resumeDataCopy.personal_info.image = response.url + '?tr=' + trString;
}

const resume = await Resume.findOneAndUpdate({userId, _id: resumeId},
resumeDataCopy, {new: true})

return res.status(200). json({message: 'Saved successfully', resume})
} catch (error) {
return res.status(400).json({message: error.message})

}
}

