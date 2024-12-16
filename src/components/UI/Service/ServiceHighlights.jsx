import Image from "next/image";
import React from "react";

const ServiceHighlights = ({ item }) => {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="w-8 h-8 md:w-10 md:h-10">
        <Image
          src={item.image}
          width={40}
          height={40}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      <h3 className="text-sm md:text-base font-medium text-gray-900">
        {item.title}
      </h3>

      <p className="text-xs md:text-sm text-gray-600 whitespace-pre-line">
        {item.description}
      </p>
    </div>
  );
};

export default ServiceHighlights;
