import React, { useEffect, useState } from 'react';
import { Briefcase, User, Mail, Phone, MapPin, Link, Globe } from 'lucide-react';

const PersonalinfoForm = ({ data, onChange, removeBackground, setremoveBackground }) => {

  const [preview, setPreview] = useState(null);

  // ✅ Handle image preview safely
  useEffect(() => {
    if (!data.image) {
      setPreview(null);
      return;
    }

    if (typeof data.image === "string") {
      setPreview(data.image);
    } else {
      const url = URL.createObjectURL(data.image);
      setPreview(url);

      return () => URL.revokeObjectURL(url); // cleanup
    }
  }, [data.image]);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: Briefcase, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Link, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div>
      {/* Heading */}
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started with your personal details
      </p>

      {/* Image Upload */}
      <div className="flex items-center gap-4 mt-4">

        <label className="cursor-pointer">
          {preview ? (
            <img
              src={preview}
              alt="User"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="flex flex-col items-center text-slate-600 hover:text-slate-700">
              <User className="size-10 p-2.5 border rounded-full" />
              <span className="text-xs mt-1">Upload Image</span>
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {/* Remove Background Toggle */}
        {data.image && typeof data.image === "object" && (
          <div>
            <p className="text-sm font-medium">Remove Background</p>

            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setremoveBackground(prev => !prev)}
                checked={removeBackground}
              />

              <div className="w-10 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors"></div>

              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
            </label>
          </div>
        )}

      </div>

      {/* Input Fields */}
      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         outline-none transition text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalinfoForm;