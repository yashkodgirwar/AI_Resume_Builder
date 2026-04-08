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
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-2 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col"
              onClick={() => onChange(color.value)}
            >
              <div
                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                style={{ backgroundColor: color.value }}
              ></div>

              {selectedColor === color.value && (
                <div className="absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center">
                  <Check className="size-5 text-white" />
                </div>
              )}

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