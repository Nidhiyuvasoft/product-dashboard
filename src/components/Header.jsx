import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="font-bold text-2xl tracking-tight">Product Dashboard</h1>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:text-blue-300 transition-colors" to="/">Home</Link>
          <Link className="hover:text-blue-300 transition-colors" to="/favorites">Favorites</Link>
        </nav>
      </div>
    </header>
  );
}
