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
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full p-6 bg-white border rounded-lg flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-80 w-auto object-contain" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-3 text-gray-700">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold">${product.price}</p>
          <button
            className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition-colors"
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
