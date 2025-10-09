import React from "react";

export default function SearchFilter({ search, setSearch, category, setCategory, sort, setSort, categories }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border border-gray-300 p-3 sm:p-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1 min-w-0"
      />
      <div className="flex gap-2 sm:gap-3">
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
          className="border border-gray-300 p-3 sm:p-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-0 flex-1 sm:flex-none"
        >
          <option value="" className="text-xs md:text-sm">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat} className="text-xs md:text-sm">{cat}</option>)}
        </select>
        <select 
          value={sort} 
          onChange={e => setSort(e.target.value)} 
          className="border border-gray-300 p-3 sm:p-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-0 flex-1 sm:flex-none"
        >
          <option value="" className="text-xs md:text-sm">Sort by Price</option>
          <option value="asc" className="text-xs md:text-sm">Price: Low to High</option>
          <option value="desc" className="text-xs md:text-sm">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
