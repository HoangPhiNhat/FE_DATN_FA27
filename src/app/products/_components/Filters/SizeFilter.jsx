"use client";
import NavTitle from "@/components/UI/NavTitle/NavTitle";
import useSizeQuery from "@/hooks/useSize/useSizeQuery";
import React, { useState } from "react";

const SizeFilter = ({ size, setSize }) => {
  const [showSizes, setShowSizes] = useState(true);
  const { data: sizes } = useSizeQuery();

  return (
    <div>
      <div onClick={() => setShowSizes(!showSizes)} className="cursor-pointer">
        <NavTitle title="Size" icons={true} />
      </div>
      {showSizes && (
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {sizes?.map((item) => (
            <li
              key={item.id}
              onClick={() => setSize(size === item.name ? "" : item.name)}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 cursor-pointer"
            >
              {/* <span
                // style={{ background: item.base }}
                className={`w-3 h-3 bg-gray-500 rounded-full`}
              ></span> */}
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SizeFilter;
