import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpire: {
    type: Date
  }
 
}, {timestamps:true});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


const User = mongoose.model("User", UserSchema);

export default User;