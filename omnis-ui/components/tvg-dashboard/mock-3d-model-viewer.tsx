"use client";

import React from "react";

// Mock 3D Model Viewer for demo mode - avoids Three.js dependency issues
const Mock3DModelViewer = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
      <div className="text-center p-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          3D Model Viewer
        </h3>
        
        <div className="max-w-sm mx-auto text-gray-600 space-y-2">
          <p className="text-sm">
            <strong>Demo Mode:</strong> 3D model viewer temporarily disabled
          </p>
          <p className="text-xs">
            This component normally displays interactive 3D models and visualizations.
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded border border-purple-200">
          <p className="text-xs text-purple-700">
            💡 Full 3D capabilities available with complete setup
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mock3DModelViewer;
