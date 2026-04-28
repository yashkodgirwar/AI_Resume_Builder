import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true      

    },
    title: {
        type: String,
        default: "Untitled Resume"
    },
    public: {
        type: Boolean,
        default: false
    },
    template: {
        type: String,
        default: "classic"
    },
    accent_color: {
        type: String,
        default: "#4CAF50"
    },
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
        location: { type: String, default: "" },
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
     projects: [
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
            field: { type: String },
            graduation_date: { type: String},
            description: { type: String},
            score_type: { type: String, default: "gpa" },
            gpa: { type: String }
        

        }
    ],

}, {timestamps:true,minimize:false});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;