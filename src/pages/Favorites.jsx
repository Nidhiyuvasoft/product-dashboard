import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, clearFavorites } from "../features/favorites/favoritesSlice";

export default function Favorites() {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return <p className="p-4 text-center">No favorites added yet.</p>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Favorites</h1>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => dispatch(clearFavorites())}
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map(product => (
          <div key={product.id} className="border p-4 rounded shadow flex flex-col items-center">
            <img src={product.image} alt={product.title} className="h-40 w-full object-contain" />
            <h2 className="font-bold mt-2 text-center">{product.title}</h2>
            <p className="mt-1 font-semibold">${product.price}</p>
            <button
              className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => dispatch(removeFavorite(product.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
