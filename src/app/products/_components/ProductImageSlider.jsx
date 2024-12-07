"use client";
import { mainSliderSettings, thumbnailSliderSettings } from "@/configs/slider";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

const ProductImageSlider = ({ images, handleChangeImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const sliderRefMain = useRef(null);
  const sliderRefThumbs = useRef(null);

  useEffect(() => {
    setShowArrows(images.length > 5);
    const activeIndex = images.findIndex(img => img.active);
    if (activeIndex !== -1) {
      setCurrentIndex(activeIndex);
      if (sliderRefMain.current) {
        sliderRefMain.current.slickGoTo(activeIndex);
      }
      if (sliderRefThumbs.current && images.length > 5) {
        sliderRefThumbs.current.slickGoTo(Math.max(activeIndex - 2, 0));
      }
    }
  }, [images]);

  // Điều khiển thumbnail khi chuyển ảnh chính
  const handleMainSlideChange = (index) => {
    setCurrentIndex(index);
    if (images.length > 5) {
      if (sliderRefThumbs.current) {
        sliderRefThumbs.current.slickGoTo(Math.max(index - 2, 0));
      }
    }
  };

  const mainSettings = mainSliderSettings(handleMainSlideChange);
  const thumbnailSettings = thumbnailSliderSettings(images, showArrows);

  return (
    <div className="slider-container">
      {/* Slider Chính */}
      <Slider {...mainSettings} ref={sliderRefMain}>
        {images.map((image, index) => (
          <Image
            key={index}
            alt={index}
            src={image.url}
            width={740}
            height={740}
            className="object-cover"
          />
        ))}
      </Slider>

      {/* Slider Thumbnail */}
      <div className={`mt-4 ${!showArrows ? "slick-no-arrow" : ""}`}>
        <Slider {...thumbnailSettings} ref={sliderRefThumbs}>
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={index}
                className={`px-1 cursor-pointer ${
                  isActive ? "border-2 border-black" : ""
                }`}
                onClick={() => {
                  handleChangeImage(image.colorId);
                  setCurrentIndex(index);
                  sliderRefMain.current.slickGoTo(index);
                }}
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    alt={index}
                    src={image.url}
                    width={100}
                    height={100}
                    className={`object-cover w-full h-full transition-all duration-300 ${
                      isActive ? "scale-110" : "hover:scale-110"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImageSlider;
