


import Resume from "../models/Resume.js"
import ai from "../configs/ai.js"

//controller for enhancing resume summary
//POST:/api/ai/enhance-pro-sum
export const enhanceProfessionalSummary=async(req,res)=>{
    try{
        const {userContent} =req.body;
        if(!userContent){
            return res.status(400).json({message:"Missing required fields"})
        }
       const response= await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
    messages: [
        {   role: "system",
            content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else." 
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })
        const enhancedcontent=response.choices[0].message.content;
        return res.status(200).json({enhancedcontent})
    }catch(error){
       return res.status(400).json({message:error.message})
    }
}

//controller for enhancing the resume jon description
//POST:/api/ai/enhance-job-desc
export const enhanceJobDescription =async(req,res)=>{
    try{
        const {userContent} =req.body;
        if(!userContent){
            return res.status(400).json({message:"Missing required fields"})
        }
       const response= await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
    messages: [
        {   role: "system",
            content:"You are an expert in resume writing. Your task is to enhance the job description of a resume. The job descriptiononly in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else." 
        },
        {
            role: "user",
            content: useContent,
        },
    ],
        })
        const enhancedcontent=response.choices[0].message.content;
        return res.status(200).json({enhancedcontent})
    }catch(error){
       return res.status(400).json({message:error.message})
    }
}

//controller for uploading a resume to the database

//POST:/api/ai/upload-resume
export const uploadresume  =async(req,res)=>{
    try{
        const {resumeText,title}=req.body;
        const userId=req.userId;

        if(!resumeText){
          return res.status(400).json({message:"Missing required fields"})

        }
        
        const systemPrompt ="You are an expert AI agent to extract data from resume"
       const userPrompt=`extract data from this resume: ${resumeText} Provide data in the following JSON format with no additional text before or after:
       {
       professional_summary: {
        type: String,
        default: ""
    },
    skills: [
        {
            type: String
        }
    ],
    personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        loaction: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" }
    },
    experience: [
        {
            comapny: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean }
        }
    ],
     project: [
        {
            name: { type: String  },
            type: { type: String},
            description: { type: String },
        }
    ],

    education: [
        {
            institution: { type: String }, 
            degree: { type: String  },
            field_of_study: { type: String },
            graduation_date: { type: String},
            description: { type: String},
            gpa: { type: String }
        

        }
    ],
       }`
        const response= await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
    messages: [
        {   role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: userPrompt,
        },
    ],
    response_fromat:{type: 'json_object'}


        })
       const extractedata=response.choices[0].message.content;
       const parsedata=JSON.parse(extractedata)
       const newResum=await Resume.create({userId,title,...parsedata})
        return json({resumeId:newResum._id})
    }catch(error){
       return res.status(400).json({message:error.message})
    }
}
