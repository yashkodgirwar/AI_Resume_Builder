import React from 'react';
import { Palette, Check } from 'lucide-react';

const ColorSelector = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const colors = [
    { value: '#2563eb', name: 'Blue' },
    { value: '#dc2626', name: 'Red' },
    { value: '#16a34a', name: 'Green' },
    { value: '#9333ea', name: 'Purple' },
    { value: '#f59e0b', name: 'Amber' },
    { value: '#0ea5e9', name: 'Sky' },
    { value: '#f43f5e', name: 'Rose' },
    { value: '#64748b', name: 'Slate' },
  ];

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="grid grid-cols-4 gap-3 absolute top-full left-0 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-lg p-3 w-max min-w-[220px]">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col items-center"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false); // close after selection
              }}
            >
              {/* Color Circle */}
              <div
                className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-black/25 transition-all"
                style={{ backgroundColor: color.value }}
              ></div>

              {/* Selected Tick */}
              {selectedColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Color Name */}
              <p className="text-xs text-center mt-1 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelector;