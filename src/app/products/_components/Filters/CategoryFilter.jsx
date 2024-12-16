"use client";
import NavTitle from "@/components/UI/NavTitle/NavTitle";
import useCategoryQuery from "@/hooks/useCategory/useCategoryQuery";
import React, { useState } from "react";
const CategoryFilter = ({ category, setCategory }) => {
  const { data: categories } = useCategoryQuery("GET_ALL_CATEGORY");
  return (
    <div className="mb-6">
      <NavTitle title="Danh mục" icons={false} />
      <ul className="space-y-3 mt-4">
        {categories?.data.map((c) => (
          <li
            key={c.id}
            onClick={() => setCategory(category === c.id ? "" : c.id)}
            className={`pb-2 border-b flex items-center justify-between cursor-pointer text-sm ${
              category === c.id ? "text-primary font-medium" : "text-gray-600"
            }`}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
