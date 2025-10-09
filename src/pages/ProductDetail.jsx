import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../features/favorites/favoritesSlice";
import toast from 'react-hot-toast';
import Loader from "../components/Loader";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <Loader text="Loading product details..." />;

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="w-full p-4 sm:p-6 bg-white border rounded-lg flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-60 sm:max-h-80 w-auto object-contain" />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">{product.title}</h1>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.description}</p>
          <p className="text-xl sm:text-2xl font-semibold text-blue-600">${product.price}</p>
          <button
            className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-5 py-3 sm:py-3 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
            onClick={() => {
              const exists = favorites.some(f => f.id === product.id);
              if (exists) {
                toast("Product already in favorites", { icon: "ℹ️" });
                return;
              }
              dispatch(addFavorite(product));
              toast.success("Added to favorites");
            }}
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}
