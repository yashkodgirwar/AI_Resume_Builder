import express from "express";
import { enhanceJobDescription, enhanceProfessionalSummary, uploadresume } from "../controllers/aicontroller.js";

import  protect  from "../middlewares/authMiddleware.js"; // make sure protect is imported

const aiRouter = express.Router();

aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription);
aiRouter.post("/upload-resume", protect, uploadresume);

export default aiRouter;