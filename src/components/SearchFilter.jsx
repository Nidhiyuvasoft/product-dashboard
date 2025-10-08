import React from "react";

export default function SearchFilter({ search, setSearch, category, setCategory, sort, setSort, categories }) {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 rounded"
      />
      <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
        <option value="">All Categories</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <select value={sort} onChange={e => setSort(e.target.value)} className="border p-2 rounded">
        <option value="">Sort by Price</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}
