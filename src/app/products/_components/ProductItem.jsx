"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductItem = ({ product, hrefEdit }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const handleProductClick = () => {
    const viewedProducts = JSON.parse(
      localStorage.getItem("viewedProducts") || "[]"
    );

    const existingIndex = viewedProducts.findIndex((p) => p.id === product.id);
    if (existingIndex !== -1) {
      viewedProducts.splice(existingIndex, 1);
    }

    viewedProducts.unshift(product);
    const limitedProducts = viewedProducts.slice(0, 8);
    localStorage.setItem("viewedProducts", JSON.stringify(limitedProducts));
  };

  return (
    <div className="relative flex flex-col bg-white rounded-lg border hover:shadow-md transition-shadow duration-300">
      <div className="relative w-full overflow-hidden ">
        {product.reduced_price && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs md:text-sm px-2 py-1 rounded-bl-lg z-10">
            Giảm{" "}
            {Math.round(
              ((product.regular_price - product.reduced_price) /
                product.regular_price) *
                100
            )}
            %
          </div>
        )}

        <Link
          href={hrefEdit ? `${product.slug}` : `products/${product.slug}`}
          onClick={handleProductClick}
          className="block w-full h-full"
        >
          <Image
            src={product.thumbnail}
            width={334}
            height={425}
            alt={product.name}
            className="rounded-t-lg object-cover w-[343px] h-[343px] hover:scale-105 transition-transform duration-300 sm:w-[180px] sm:h-[180px] md:w-[343px] md:h-[343px]"
            priority
          />
        </Link>
      </div>

      <div className="p-2 md:p-3 flex flex-col flex-grow">
        <Link
          href={hrefEdit ? `${product.slug}` : `products/${product.slug}`}
          className="font-semibold text-sm md:text-base lg:text-lg line-clamp-2 hover:text-primary transition-colors duration-300"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2 mt-1 md:mt-2">
          {product.reduced_price ? (
            <>
              <p className="text-primary font-medium text-base md:text-lg">
                {product.reduced_price.toLocaleString()}₫
              </p>
              <p className="text-gray-500 line-through text-sm md:text-base">
                {product.regular_price.toLocaleString()}₫
              </p>
            </>
          ) : (
            <p className="text-primary font-medium text-base md:text-lg">
              {product.regular_price.toLocaleString()}₫
            </p>
          )}
        </div>

        {product.variants && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => handleVariantClick(index)}
                title={variant.color}
                className="w-6 h-6 md:w-8 md:h-8"
              >
                <Image
                  src={variant.images[0]}
                  width={32}
                  height={32}
                  alt={variant.color}
                  className={`aspect-square object-cover rounded-full border-2
                    ${
                      selectedVariantIndex === index
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
