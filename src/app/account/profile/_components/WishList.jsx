import React from "react";
import { BsHeart } from "react-icons/bs";
import Image from "next/image";
const WishList = ({ data }) => {
  return (
    <div className="animate-fade">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <BsHeart className="mr-2" /> Sản Phẩm Yêu Thích
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {data.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover mb-2"
              width={100}
              height={100}
            />
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.price.toLocaleString()}đ</p>
            <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
              Mua Ngay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
