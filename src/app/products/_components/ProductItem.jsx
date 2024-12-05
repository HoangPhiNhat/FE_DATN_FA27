"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";

const ProductItem = ({ product }) => {
  // const [isHovered, setIsHovered] = useState(false);
  // const [isQuickView, setIsQuickView] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const handleVariantClick = (index) => {
    setSelectedVariantIndex(index);
  };

  return (
    <div
      className="relative border flex flex-col bg-white rounded-lg"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full overflow-hidden">
        {product.reduced_price ? (
          <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 rounded-bl-lg z-10">
            Sale off{" "}
            {Math.round(
              ((product.regular_price - product.reduced_price) /
                product.regular_price) *
                100
            )}
            %
          </div>
        ) : null}
        <Link href={`products/${product.slug}`}>
          <Image
            src={product.thumbnail}
            width={334}
            height={425}
            alt="Hình ảnh sản phẩm"
            className={`transition-opacity duration-500 ease-in-out rounded-t-lg w-full $`}
          />
          {
            // isHovered ? "opacity-0" : "opacity-100"
          }
          {/* <Image
            src={product.variants[selectedVariantIndex].images[1]}
            width={334}
            height={425}
            alt="Hình ảnh sản phẩm khi di chuột qua"
            className={`transition-opacity duration-500 ease-in-out rounded-t-lg w-full ${
              isHovered ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0`}
          /> */}
        </Link>

        {/* {isHovered && (
          <div className="absolute bottom-2 flex justify-center items-center w-full animate-fade-up transition duration-300">
            <div className="flex justify-center items-center border rounded-lg w-fit bg-white shadow-md">
              <button className="hover:text-primary transition duration-300 p-2 flex justify-center items-center">
                <BsFillCartPlusFill className="text-lg" />
              </button>
              <button
                className="hover:text-primary transition duration-300 p-2 flex justify-center items-center"
                onClick={() => setIsQuickView(true)}
              >
                <FaRegEye className="text-lg" />
              </button>
            </div>
          </div>
        )} */}
      </div>
      <div className="  p-2">
        <div className="mt-2">
          <Link
            href={`products/${product.slug}`}
            className="font-semibold text-xl"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-2 mt-1">
            {product.reduced_price ? (
              <>
                <p className="text-primary text-lg">
                  {product.reduced_price.toLocaleString()}₫
                </p>
                <p className="text-gray-500 line-through">
                  {product.regular_price.toLocaleString()}₫
                </p>
              </>
            ) : (
              <p className="text-primary text-lg">
                {product.regular_price.toLocaleString()}₫
              </p>
            )}
          </div>
        </div>
        {/* <div className="flex space-x-2 mt-2">
          {product.variants.map((variant, index) => (
            <button
              key={index}
              onClick={() => handleVariantClick(index)}
              title={variant.color}
            >
              <Image
                src={variant.images[0]}
                width={35}
                height={35}
                alt={index}
                className={`aspect-square object-cover rounded-full border-2 ${
                  selectedVariantIndex === index
                    ? " border-blue-500"
                    : "border-gray-400"
                }`}
              />
            </button>
          ))}
        </div> */}
      </div>
      {/* {isQuickView && (
        <PreviewProduct
          product={product}
          onClose={() => setIsQuickView(false)}
        />
      )} */}
    </div>
  );
};

export default ProductItem;
