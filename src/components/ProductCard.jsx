import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  return (
    <div className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[4/3] w-full p-4 flex items-center justify-center overflow-hidden">
          <img src={product.image} alt={product.title} className="max-h-40 w-auto object-contain" />
        </div>
        <div className="px-4 pb-4">
          <h2 className="font-semibold text-sm line-clamp-2 min-h-10">{product.title}</h2>
          <p className="mt-1 font-bold">${product.price}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Link
          to={`/product/${product.id}`}
          className="mt-2 block text-center w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
