import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsThunks";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import Loader from "../components/Loader";
import ProductNotFound from "../components/ProductNotFound";

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading, categories } = useSelector(state => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState(""); 

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  
  useEffect(() => {
    const handler = debounce((value) => setDebouncedSearch(value), 300);
    handler(search);
    return () => handler.cancel();
  }, [search]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const bySearch = items
      .filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter(p => (category ? p.category === category : true));

    if (sort === "asc") {
      return [...bySearch].sort((a, b) => a.price - b.price);
    }
    if (sort === "desc") {
      return [...bySearch].sort((a, b) => b.price - a.price);
    }
    return bySearch;
  }, [items, debouncedSearch, category, sort]);

  if (loading) return <Loader text="Loading products..." />;

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          categories={categories}
        />
        {filteredProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {
          filteredProducts?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
        </div>
          ) : (
            <ProductNotFound page="home" />
          )}
      </div>
    </div>
  );
}
