"use client";
import React, { useState } from "react";
import CategoryFilter from "./_components/Filters/CategoryFilter";
import { MdCollections } from "react-icons/md";
import CollectionFilter from "./_components/Filters/CollectionFilter";
import ColorFilter from "./_components/Filters/ColorFilter";
import ProductNav from "./_components/ProductNav";
import useProductQuery from "@/hooks/useProduct/useProductQuery";

const Product = () => {
  

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };
  return (
    <div className="container mx-auto">
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:block h-full">
          <CategoryFilter />
          <CollectionFilter />
          <ColorFilter />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductNav itemsPerPageFromBanner={itemsPerPageFromBanner} />
        </div>
      </div>
    </div>
  );
};

export default Product;
