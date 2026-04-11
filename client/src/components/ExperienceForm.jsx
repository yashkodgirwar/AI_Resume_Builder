import { Briefcase, PlusIcon, Trash, Sparkles } from 'lucide-react';
import React from 'react';

const ExperienceForm = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      position: "",
      company: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updatedExperience = data.filter((_, i) => i !== index);
    onChange(updatedExperience);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-600">Add your professional experience here</p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 
                     text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <PlusIcon className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="size-12 mx-auto mb-4 text-gray-400" />
          <p>No work experience added yet</p>
          <p>Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800">Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company || ""}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="Company Name"
                />
                <input
                  value={experience.position || ""}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="Job Title"
                />
                <input
                  value={experience.start_date || ""}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  type="month"
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="Start Date"
                  
                />
                
                <input
                  value={experience.end_date || ""}
                  onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  type="month"
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm border rounded-lg disabled:bg-gray-100"
                  placeholder="End Date"
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Currently Working Here</span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Job Description</label>
                  <button
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3" />
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  rows={4}
                  className="w-full text-sm px-3 py-2 border rounded-lg resize-none"
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;