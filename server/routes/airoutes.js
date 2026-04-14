import express from "express"
import { enhanceJobDescription, enhanceProfessionalSummary } from "../controllers/aicontroller";
import { updateResume } from "../controllers/resumecontroller";
import ai from "../configs/ai";

const aiRouter= express.Router;

aiRouter.post('/enhance-pro-sum',protect,enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc',protect,enhanceJobDescription);
aiRouter.post('/upload-resume',protect,updateResume);

export default aiRouter