"use client";
import NavTitle from "@/components/UI/NavTitle/NavTitle";
import useColorQuery from "@/hooks/useColor/useColorQuery";
import React, { useState } from "react";

const ColorFilter = ({ color, setColor }) => {
  const [showColors, setShowColors] = useState(true);
  const { data: colors } = useColorQuery();

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title="Color" icons={true} />
      </div>
      {showColors && (
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {colors?.map((item) => (
            <li
              key={item.id}
              onClick={() => setColor(color === item.id ? "" : item.id)}
              className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 cursor-pointer ${
                color === item.name ? "text-black font-medium" : ""
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
