import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  return (
    <div className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="aspect-[4/3] w-full p-3 sm:p-4 flex items-center justify-center overflow-hidden">
          <img src={product.image} alt={product.title} className="max-h-32 sm:max-h-40 w-auto object-contain" />
        </div>
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex-1 flex flex-col">
          <h2 className="font-semibold text-xs sm:text-sm line-clamp-2 min-h-8 sm:min-h-10 flex-1">{product.title}</h2>
          <p className="mt-1 font-bold text-sm sm:text-base">${product.price}</p>
        </div>
      </Link>
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <Link
          to={`/product/${product.id}`}
          className="mt-2 block text-center w-full bg-blue-600 text-white px-3 py-2 sm:py-2.5 rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
