//HERE WE  CONTROL THE USER RESGISTRATION AND LOGIN
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js"; 
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js"; 

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

            // Send Welcome Email (Non-blocking)
            try {
                const welcomeHTML = `
                <div style="font-family: Arial, sans-serif; max-w-xl mx-auto; p-4 text-gray-800 border rounded-lg shadow-sm">
                    <h2 style="color: #16a34a; text-align: center;">Welcome to AI Resume Builder, ${name}! 🎉</h2>
                    <p>We are thrilled to have you on board. Start creating your professional, ATS-friendly resume today and take the next step in your career journey.</p>
                    <p style="margin-top: 20px;">If you have any questions, feel free to reach out to our support team.</p>
                    <p>Best Regards,<br/><b>The AI Resume Builder Team</b></p>
                </div>
                `;
                
                sendEmail({
                    email: newUser.email,
                    subject: 'Welcome to AI Resume Builder!',
                    html: welcomeHTML
                }).catch(err => console.error("Welcome email failed to send:", err));
            } catch (err) {
                console.error("Welcome email block error:", err);
            }

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
};

// Forgot Password
// POST /api/users/forgot-password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "There is no user with that email" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");

        // Hash token and set to resetPasswordToken field
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Set expire (10 minutes)
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Create reset url
        // Get frontend URL from origin or referer to handle dynamic environments
        const frontendUrl = req.headers.origin || req.headers.referer?.slice(0, -1) || 'http://localhost:5173';
        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

        const message = `
        <div style="font-family: Arial, sans-serif; max-w-xl mx-auto; p-6 text-gray-800 border rounded-lg shadow-sm">
            <h2 style="color: #16a34a; text-align: center;">Password Reset Request 🔐</h2>
            <p>You requested a password reset. Please click the button below to set a new password. This link is valid for 10 minutes.</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Your Password</a>
            </div>
            <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
        </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Token",
                html: message,
            });

            return res.status(200).json({ message: "Email sent successfully" });
        } catch (error) {
            console.log(error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return res.status(500).json({ message: "Email could not be sent" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Reset Password
// POST /api/users/reset-password/:token
export const resetPassword = async (req, res) => {
    try {
        // Get hashed token from URL token
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Set new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        // Clear token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};