//HERE WE  CONTROL THE USER RESGISTRATION AND LOGIN
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js"; 

const gerneateToken = (userId) => {
    const token=jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}
//POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
       // Validate input
       if(!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
       }
         // Check if user already exists
         const user=await User.findOne({ email });

         if(user) {
            return res.status(400).json({ message: "User already exists" });
         }
            // Hash password    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);   
            // Create new user
            const newUser=await User.create({
                name,
                email,
                password: hashedPassword
            })
            //return success response
            const token=gerneateToken(newUser._id);
            newUser.password=undefined;
            return res.status(201).json({
                message: "User registered successfully",
                token,
                user: newUser
            });
    }catch (error) {
        console.error("Error registering user:", error);
        return res.status(400).json({ message: error.message });
        }
    }

   // controller for user login
   //POST: /api/users/login
   export const loginUser = async (req, res) => {   
    try {
        const { email, password } = req.body;
        // check if user exists
        const user=await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // compare password
        if(!user.comparePassword(password)) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // generate token
        const token=gerneateToken(user._id);
        user.password=undefined;
        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        });
    }catch (error) {
        console.error("Error logging in user:", error);
        return res.status(400).json({ message: error.message });
    }

   }
    // controller for getting user profile
    //GET: /api/users/data
    export const getUserById = async (req, res) => {
    try {
        const userId=req.userId;
        //check if user exists
        const user=await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // return user profile
        user.password=undefined;
        return res.status(200).json({
            user
        });
    }catch (error) {
      
        return res.status(400).json({ message: error.message });
    }

    
}

//controller for user resume
//GET: /api/users/resume
export const getUserResume = async (req, res) => {
    try {
        const userId=req.userId;
        //check if user exists
        const resumes=await Resume.find({ userId });
        return res.status(200).json({
            resumes
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}