import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, clearFavorites } from "../features/favorites/favoritesSlice";

export default function Favorites() {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <div className="px-3 sm:px-4 py-8 sm:py-12">
        <p className="text-center text-gray-600 text-sm sm:text-base">No favorites added yet.</p>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">My Favorites</h1>
          <button
            className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base font-medium"
            onClick={() => dispatch(clearFavorites())}
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {favorites.map(product => (
            <div key={product.id} className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow p-3 sm:p-4 flex flex-col items-center h-full">
              <img src={product.image} alt={product.title} className="h-32 sm:h-40 w-full object-contain mb-3 sm:mb-4" />
              <h2 className="font-bold text-xs sm:text-sm text-center line-clamp-2 flex-1">{product.title}</h2>
              <p className="mt-1 sm:mt-2 font-semibold text-sm sm:text-base">${product.price}</p>
              <button
                className="mt-2 sm:mt-3 bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-red-600 transition-colors text-xs sm:text-sm font-medium"
                onClick={() => dispatch(removeFavorite(product.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
