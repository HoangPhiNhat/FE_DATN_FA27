import Image from "next/image";
import React from "react";

const ServiceHighlights = ({ item }) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <Image src={item.image} width={48} height={48} alt={item.title} />
        <div>
          <p className="font-semibold">{item.title}</p>
          <p>{item.description}</p>
        </div>
      </div>
    </>
  );
};

export default ServiceHighlights;
