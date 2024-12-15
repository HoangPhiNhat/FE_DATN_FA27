"use client";

import Slider from "react-slick";
import { productSettings } from "@/configs/slider";
import ProductItem from "./ProductItem";
import SectionHeader from "@/components/UI/SectionHeader/SectionHeader";

const ProductSlider = ({ data, title, href, hrefEdit }) => {
  return (
    <>
      <SectionHeader title={title} href={href} />
      <Slider {...productSettings}>
        {data.map((product, index) => (
          <div className="px-4" key={index}>
            <ProductItem product={product} hrefEdit={hrefEdit} />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ProductSlider;
