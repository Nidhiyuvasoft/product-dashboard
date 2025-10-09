import React, { useState, useRef } from "react";
import ProductCard from "./ProductCard";

export default function CategorySlider({ products, category, currentProductId }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categoryProducts = products.filter((product) => {
    if (product.id === currentProductId) return false;
    if (!category || category === "all") return true;
    return product.category === category;
  });

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  if (categoryProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {!category || category === "all" ? "More Products" : `More from ${category}`}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border ${canScrollLeft
                ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border ${canScrollRight
                ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categoryProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-64">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
