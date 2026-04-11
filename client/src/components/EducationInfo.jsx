
 import { GraduationCap ,PlusIcon,Trash} from 'lucide-react';
 
import React from 'react'

const EducationInfo = ({ data, onChange }) => {
 
      const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: "",
      institution: "",
      field: "",
      graduation_date: "",
        gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updatedEducation = data.filter((_, i) => i !== index);
    onChange(updatedEducation);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div>
        <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-600">Add your Education details</p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 
                     text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <PlusIcon className="size-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="size-12 mx-auto mb-4 text-gray-400" />
          <p>No education details added yet</p>
          <p>Click "Add Education" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800">Education #{index + 1}</h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                 <input
                  value={education.institution || ""}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="Institution"
                />
                <input
                  value={education.degree || ""}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="Degree"
                />
                <input
                  value={education.field || ""}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="Field of Study"
                />
                <input
                  value={education.graduation_date || ""}
                  onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                  type="text"
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="Graduation Date"
                />
                <input
                  value={education.gpa || ""}
                  onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="GPA (Optional)"
                />      
                  
                
              </div>

           

            </div>
          ))}
        </div>
      )}
    </div>
      
    </div>
  )
}



export default EducationInfo
