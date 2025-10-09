import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ paths }) {
  return (
    <nav className="text-sm sm:text-base mb-4 sm:mb-6" aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center text-gray-600 space-x-1 sm:space-x-2">
        {paths?.map((path, index) => (
          <li key={index} className="flex items-center">
            {index !== paths?.length - 1 ? (
              <>
                <Link
                  to={path?.href}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {path?.label}
                </Link>
                <span className="mx-1 sm:mx-2">›</span>
              </>
            ) : (
              <span className="text-gray-500">{path?.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
