import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const favoritesCount = useSelector(state => state.favorites.length);

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight">Product Dashboard</h1>
        <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <Link className="hover:text-blue-300 transition-colors px-2 py-1" to="/">Home</Link>
          <Link 
            className="hover:text-blue-300 transition-colors relative px-2 py-1" 
            to="/favorites"
          >
            {favoritesCount > 0 && (
              <span className="absolute -top-2 sm:-top-3 left-[90%] sm:left-[95%] transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center min-w-4 sm:min-w-5 animate-pulse">
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
}
