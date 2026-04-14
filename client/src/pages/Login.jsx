import React from "react";
import { Mail, User2Icon, Lock } from "lucide-react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../app/features/authSlice.js"; 



const Login = () => {
  const dispatch=useDispatch()
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data}  = await api.post(`/api/users/${state}`,formData)
      dispatch(login(data))
      localStorage.setItem('token',data.token)
      toast.success(data.message)
    }catch(error){
          toast(error?.response?.data?.message || error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-green-200 via-white to-green-100 animate-gradient">
      
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md text-center bg-white shadow-lg border border-gray-200 rounded-2xl px-8 py-10 z-10"
      >
        <h1 className="text-gray-800 text-3xl font-semibold">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Please {state} to continue
        </p>

        {/* Name */}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full border border-gray-300 focus-within:ring-2 focus-within:ring-green-400 h-12 rounded-full px-4 gap-2">
            <User2Icon size={18} className="text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Name"
            className="w-full bg-transparent outline-none border-none text-gray-700"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center mt-4 w-full border border-gray-300 focus-within:ring-2 focus-within:ring-green-400 h-12 rounded-full px-4 gap-2">
          <Mail size={18} className="text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent outline-none text-gray-700"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 w-full border border-gray-300 focus-within:ring-2 focus-within:ring-green-400 h-12 rounded-full px-4 gap-2">
          <Lock size={18} className="text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent outline-none text-gray-700"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot */}
        <div className="mt-4 text-left">
          <button type="button" className="text-sm text-green-500 hover:underline">
            Forget password?
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white bg-green-600 hover:bg-green-500 transition"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        {/* Toggle */}
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-4 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-green-500 ml-1 hover:underline">
            click here
          </span>
        </p>
      </form>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-r from-green-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute right-10 bottom-10 w-[300px] h-[200px] bg-gradient-to-l from-green-400/20 to-transparent rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Login;