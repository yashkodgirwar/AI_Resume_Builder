import React, { useState } from 'react'
import { Sparkles, Plus, X } from 'lucide-react';

const YourSkill = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() === "") return;

    onChange([...data, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <p className="text-sm text-gray-600">Add your skills here</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (React, Java, etc.)"
          className="flex-1 px-3 py-2 border rounded-lg text-sm"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button 
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-100"
        >
          <Plus className="size-4 " />
          Add
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span key={index} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {skill}
              <button onClick={() => removeSkill(index)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
          <Sparkles className="size-8 mx-auto mb-2" />
          <p>No skills added yet</p>
        </div>
      )}
    </div>
  );
};

export default YourSkill;