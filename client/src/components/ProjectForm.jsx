import React from 'react'
import { PlusIcon, Trash } from 'lucide-react';
const ProjectForm = ({data,onChange}) => {
    
      const addProject = () => {
    const newProject = {
      name: Date.now(),
      type: "",
      decription: "",
    
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
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
            Projects
          </h3>
          <p className="text-sm text-gray-600">Add your Project details</p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 
                     text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <PlusIcon className="size-4" />
          Add Project
        </button>
      </div>

    
     
        <div className="space-y-4 mt-6">
          {data.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800">Project #{index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash className="size-4" />
                </button>
              </div>

              <div className="grid  gap-3">
                 <input
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="Project Name"
                />
                <input
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg"
                  placeholder="Project Type"
                />
                <textarea rows={4}
                  value={project.description || ""}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
                  placeholder="Project Description  "
                />
                
               
                   
                  
                
              </div>

           

            </div>
          ))}
        </div>
     
    </div>

      
    </div>

    )

}

export default ProjectForm
