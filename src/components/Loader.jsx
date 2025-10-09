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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      </div>
      
      {text && (
        <p className={`mt-4 text-gray-600 ${textSizeClasses[size]} font-medium animate-pulse text-center px-4`}>
          {text}
        </p>
      )}
    </div>
  );
}
