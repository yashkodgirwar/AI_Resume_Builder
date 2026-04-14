import express from "express";
import protect from "../middlewares/authMiddleware.js"
import upload from "../configs/multer.js"
import { createResume, deleteResume, getPublicResumebyId, getResumeById, updateResume } from "../controllers/resumecontroller.js";
const resumeRouter=express.Router()
resumeRouter.post('/create',protect,createResume);
resumeRouter.put('/update',upload.single('image'),protect,updateResume);
resumeRouter.delete('/delete/:resumeId',protect,deleteResume);
resumeRouter.get('/get/:resumeId',protect,getResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumebyId)

export default resumeRouter