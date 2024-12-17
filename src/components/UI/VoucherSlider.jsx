import React from "react";
import Slider from "react-slick";
import VoucherItem from "./VoucherItem";
import SampleNextArrow from "./Control/SampleNextArrow";
import SamplePrevArrow from "./Control/SamplePrevArrow";

const VoucherSlider = ({ vouchers }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Voucher khuyến mãi</h2>
      {vouchers.length > 4 ? (
        <Slider {...settings}>
          {vouchers?.map((voucher) => (
            <VoucherItem key={voucher.id} voucher={voucher} />
          ))}
        </Slider>
      ) : (
        <>
          <div className="flex gap-4 justify-between">
            {vouchers?.map((voucher) => (
              <VoucherItem key={voucher.id} voucher={voucher} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VoucherSlider;
