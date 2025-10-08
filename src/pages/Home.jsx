import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsThunks";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading, categories } = useSelector(state => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(p => (category ? p.category === category : true));

  if (loading) return <p>Loading...</p>;

  return (
    <div className="px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
