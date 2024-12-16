"use client";

import Slider from "react-slick";
import { productSettings } from "@/configs/slider";
import ProductItem from "./ProductItem";
import SectionHeader from "@/components/UI/SectionHeader/SectionHeader";

const ProductSlider = ({ data, title, href, hrefEdit }) => {
  return (
    <div className="mb-8 md:mb-12">
      <SectionHeader title={title} href={href} />
      <div className="mx-[-16px] md:mx-0">
        <Slider {...productSettings}>
          {data.map((product, index) => (
            <div className="px-2 md:px-4" key={index}>
              <ProductItem product={product} hrefEdit={hrefEdit} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
