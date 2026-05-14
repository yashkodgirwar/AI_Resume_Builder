import React, { useEffect, useState } from 'react';
import { Briefcase, User, Mail, Phone, MapPin, Link, Globe, Sparkles, Image as ImageIcon } from 'lucide-react';
import ImageProcessingModal from './ImageProcessingModal';

const PersonalinfoForm = ({ data, onChange, removeBackground, setremoveBackground, isSaving, onSaveImmediate }) => {

  const [preview, setPreview] = useState(null);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [modalFile, setModalFile] = useState(null);

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

        <label className="cursor-pointer relative">
          {preview ? (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Profile Preview"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.full_name || 'User')}&background=random&size=128`;
                }}
                className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80 bg-gray-100"
              />
              {removeBackground ? (
                <span className="absolute -top-1 -right-10 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10 flex items-center gap-1">
                  {isSaving ? (
                    <>
                      <div className="w-2.5 h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Enhancing...
                    </>
                  ) : (
                    'AI Pending'
                  )}
                </span>
              ) : (typeof data.image === 'string' && data.image.includes('e-bgremove')) && (
                <span className="absolute -top-1 -right-10 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10 flex items-center gap-1">
                  <Sparkles className="size-3" />
                  AI Enhanced
                </span>
              )}
            </div>
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
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                setModalFile(file);
                const reader = new FileReader();
                reader.onload = () => setModalImageSrc(reader.result);
                reader.readAsDataURL(file);
                // Clear the input value so selecting the same file again triggers onChange
                e.target.value = '';
              }
            }}
          />
        </label>
      </div>

      {isSaving && removeBackground && (
        <div className="mt-3 text-xs text-blue-700 bg-blue-50 border border-blue-200 p-2.5 rounded-lg flex items-center gap-2 max-w-sm">
          <Sparkles className="size-4 shrink-0 text-blue-500 animate-pulse" />
          <span><strong>Enhancing...</strong> Please wait, AI background removal can take 2-3 minutes to process perfectly.</span>
        </div>
      )}

      {modalImageSrc && (
        <ImageProcessingModal
          imageSrc={modalImageSrc}
          onClose={() => {
            setModalImageSrc(null);
            setModalFile(null);
          }}
          onAiSelect={() => {
            if (onSaveImmediate) {
              onSaveImmediate(modalFile, true);
            } else {
              onChange({ ...data, image: modalFile });
              setremoveBackground(true);
            }
            setModalImageSrc(null);
            setModalFile(null);
          }}
          onCropComplete={(croppedBlob) => {
            if (onSaveImmediate) {
              onSaveImmediate(croppedBlob, false);
            } else {
              onChange({ ...data, image: croppedBlob });
              setremoveBackground(false);
            }
            setModalImageSrc(null);
            setModalFile(null);
          }}
        />
      )}

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