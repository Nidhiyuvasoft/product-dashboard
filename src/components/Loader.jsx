import React from "react";

export default function Loader({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
        
        {/* Inner pulse dot */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse`}></div>
      </div>
      
      {text && (
        <p className={`mt-4 text-gray-600 ${textSizeClasses[size]} font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
}

// Alternative compact loader for inline use
export function CompactLoader({ className = "" }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

// Full page loader for initial page loads
export function FullPageLoader({ text = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative mx-auto mb-6">
          {/* Main spinner */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          
          {/* Inner accent */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{text}</h3>
        <p className="text-gray-500">Please wait while we fetch the data...</p>
      </div>
    </div>
  );
}
