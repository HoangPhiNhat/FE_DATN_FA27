import React from "react";
import ProductItem from "./ProductItem";
import SectionHeader from "@/components/UI/SectionHeader/SectionHeader";

const ProductGrid = ({ data, href, title = "", hrefEdit }) => {
  return (
    <div className="mb-8 md:mb-12">
      {title && <SectionHeader title={title} href={href} />}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {data.map((product, index) => (
          <ProductItem key={index} product={product} hrefEdit={hrefEdit} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
