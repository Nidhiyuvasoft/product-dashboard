import React from "react";

export default function SearchFilter({ search, setSearch, category, setCategory, categories }) {
  return (
    <div className="flex gap-2 flex-wrap">
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
    </div>
  );
}
