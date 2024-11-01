"use client"
import NavTitle from "@/components/UI/NavTitle/NavTitle";
import React, { useState } from "react";

const CollectionFilter = () => {
  const [showBrands, setShowBrands] = useState(true);
  const brands = [
    {
      _id: 9006,
      title: "Apple",
    },
    {
      _id: 9007,
      title: "Ultron",
    },
    {
      _id: 9008,
      title: "Unknown",
    },
    {
      _id: 9009,
      title: "Shoppers Home",
    },
    {
      _id: 9010,
      title: "Hoichoi",
    },
  ];

  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Collection" icons={true} />
      </div>
      {showBrands && (
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {brands.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollectionFilter;
