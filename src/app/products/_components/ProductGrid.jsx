import React from "react";
import ProductItem from "./ProductItem";
import SectionHeader from "@/components/UI/SectionHeader/SectionHeader";

const ProductGrid = ({ data, href, title = "", hrefEdit }) => {
  return (
    <>
      {title && <SectionHeader title={title} href={href} />}
      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
        {data.map((product, index) => (
          <ProductItem key={index} product={product} hrefEdit={hrefEdit} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
