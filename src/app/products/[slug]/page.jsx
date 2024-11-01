"use client";

import Image from "next/image";
import { useState } from "react";
import ProductImageSlider from "../_components/ProductImageSlider";

const ProductDetail = () => {
  const imagesPr = [
    { url: "/images/product1_1.webp" },
    { url: "/images/product1.jpg" },
    { url: "/images/product1_1.webp" },
    // { url: "/images/product1.jpg" },
    // { url: "/images/product1_1.webp" },
    // { url: "/images/product1.jpg" },
  ];
  const [image, setImage] = useState(imagesPr[0]);

  return (
    <div className="container grid grid-cols-2 gap-4">
      <div className=" w-full">
        <div>
          <ProductImageSlider images={imagesPr} />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-4xl font-semibold">Tên sản phẩm là </h2>
        <p className="text-xl font-semibold">70000</p>
        <p className="text-base text-gray-600">chi tiết sản phẩm nè</p>
        <p className="text-sm">Be the first to leave a review.</p>
        <p className="font-medium text-lg">
          <span className="font-normal">Colors:</span> red
        </p>
        <button
          onClick={() => console.log("thêm sản phẩm thành cong")}
          className="w-full py-4 bg-primary hover:bg-black duration-300 text-white text-lg font-titleFont"
        >
          Add to Cart
        </button>
        <p className="font-normal text-sm">
          <span className="text-base font-medium"> Categories:</span> Spring
          collection, Streetwear, Women Tags: featured SKU: N/A
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
