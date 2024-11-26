"use client";
import NavTitle from "@/components/UI/NavTitle/NavTitle";
import useCategoryQuery from "@/hooks/useCategory/useCategoryQuery";
import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
const CategoryFilter = ({ category, setCategory }) => {
  const { data: categories } = useCategoryQuery("GET_ALL_CATEGORY");
  console.log(categories);
  return (
    <div className="w-full">
      <NavTitle title="Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories?.data.map((c) => (
            <li
              key={c.id}
              onClick={() => setCategory(category === c.id ? "" : c.id)}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer "
            >
              {c.name}
              {/* {icons && (
                <span
                  onClick={() => setCategory(title)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primary duration-300"
                >
                  <ImPlus />
                </span>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
