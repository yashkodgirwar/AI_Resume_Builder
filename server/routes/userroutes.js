import express from "express";
import { getUserById, loginUser,registerUser } from "../controllers/usercontroller.js";
import { get } from "mongoose"; 
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserById);

export default userRouter;
