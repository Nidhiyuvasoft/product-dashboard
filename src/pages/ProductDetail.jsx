import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../features/favorites/favoritesSlice";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { fetchProducts } from "../features/products/productsThunks";
import Breadcrumb from "../components/Breadcrumb";
import CategorySlider from "../components/CategorySlider";
import ProductNotFound from "../components/ProductNotFound";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items || []);
  const loading = useSelector((state) => state.products.loading);
  const favorites = useSelector((state) => state.favorites);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(fetchProducts());
    } else {
      setProduct(products.find((p) => p.id === Number(id)) || null);
    }
  }, [products, id, dispatch, loading]);

  if (loading) return <Loader text="Loading product details..." />;

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-5xl mx-auto">
      <Breadcrumb
        paths={[
          { label: "Home", href: "/" },
          { label: "Product Details", href: `/products/${product?.id}` },
        ]}
      />
      {product ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="w-full p-4 sm:p-6 bg-white border rounded-lg flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-60 sm:max-h-80 w-auto object-contain"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                {product.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-blue-600">
                ${product.price}
              </p>
              <button
                className={`w-full sm:w-auto text-white px-4 sm:px-5 py-3 sm:py-3 rounded-md transition-colors text-sm sm:text-base font-medium ${favorites.some((f) => f.id === product.id)
                  ? "bg-blue-400 hover:bg-blue-400 opacity-50 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
                disabled={favorites.some((f) => f.id === product.id)}
                onClick={() => {
                  if (favorites.some((f) => f.id === product.id)) {
                    toast("Product already in favorites", { icon: "ℹ️" });
                    return;
                  }
                  dispatch(addFavorite(product));
                  toast.success("Added to favorites");
                }}
              >
                {favorites.some((f) => f.id === product.id)
                  ? "In Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <ProductNotFound page="/" />
        </>
      )}
      <CategorySlider
        products={products}
        category={product?.category}
        currentProductId={product?.id}
      />
    </div>
  );
}
