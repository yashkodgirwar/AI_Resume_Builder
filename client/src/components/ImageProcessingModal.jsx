import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { X, Crop, Sparkles, Check } from 'lucide-react';

const ImageProcessingModal = ({ imageSrc, onClose, onCropComplete, onAiSelect }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [mode, setMode] = useState('selection'); // 'selection' | 'manual'

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleManualCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === 'selection' ? 'Process Your Photo' : 'Manual Crop'}
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        {mode === 'selection' ? (
          <div className="p-6 space-y-4 bg-gray-50/50">
            {/* AI Option */}
            <div 
              onClick={() => onAiSelect()}
              className="group cursor-pointer bg-white border-2 border-transparent hover:border-blue-500 rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-bl-full -z-0"></div>
              <div className="flex gap-4 items-start relative z-10">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">AI Auto-Enhance</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our AI will automatically find your face, center it perfectly, and completely remove the background for a clean, professional resume look.
                  </p>
                </div>
              </div>
            </div>

            {/* Manual Option */}
            <div 
              onClick={() => setMode('manual')}
              className="group cursor-pointer bg-white border-2 border-transparent hover:border-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 text-gray-700 p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <Crop className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Manual Crop</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Manually zoom and position your photo. The background will remain as is.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-0">
            <div className="relative w-full h-[350px] bg-gray-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropCompleteHandler}
                onZoomChange={setZoom}
              />
            </div>
            <div className="p-5 bg-white space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Zoom</label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  onClick={() => setMode('selection')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleManualCropSave}
                  className="px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-black rounded-lg transition-colors flex items-center gap-2"
                >
                  <Check className="size-4" />
                  Apply Crop
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageProcessingModal;
