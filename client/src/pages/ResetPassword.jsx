import React from "react";
import { Lock } from "lucide-react";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/reset-password/${token}`, { password });
      toast.success(data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-green-200 via-white to-green-100 animate-gradient">
      
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md text-center bg-white shadow-lg border border-gray-200 rounded-2xl px-8 py-10 z-10"
      >
        <h1 className="text-gray-800 text-3xl font-semibold">
          New Password
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Enter your new password below
        </p>

        {/* Password */}
        <div className="flex items-center mt-6 w-full border border-gray-300 focus-within:ring-2 focus-within:ring-green-400 h-12 rounded-full px-4 gap-2">
          <Lock size={18} className="text-gray-400" />
          <input
            type="password"
            placeholder="New Password"
            className="w-full bg-transparent outline-none text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-green-600 hover:bg-green-500 transition"
        >
          Update Password
        </button>
      </form>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-r from-green-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute right-10 bottom-10 w-[300px] h-[200px] bg-gradient-to-l from-green-400/20 to-transparent rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default ResetPassword;
