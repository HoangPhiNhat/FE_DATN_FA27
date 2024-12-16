"use client";
import NavTitle from "@/components/UI/NavTitle/NavTitle";
import useColorQuery from "@/hooks/useColor/useColorQuery";
import React, { useState } from "react";

const ColorFilter = ({ color, setColor }) => {
  const [showColors, setShowColors] = useState(true);
  const { data: colors } = useColorQuery();

  return (
    <div className="mb-6">
      <div
        onClick={() => setShowColors(!showColors)}
        className="flex items-center justify-between cursor-pointer mb-4"
      >
        <NavTitle title="Màu sắc" icons={true} />
      </div>
      {showColors && (
        <ul className="space-y-3">
          {colors?.map((item) => (
            <li
              key={item.id}
              onClick={() => setColor(color === item.id ? "" : item.id)}
              className={`pb-2 border-b flex items-center gap-2 cursor-pointer text-sm ${
                color === item.name
                  ? "text-primary font-medium"
                  : "text-gray-600"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ColorFilter;
