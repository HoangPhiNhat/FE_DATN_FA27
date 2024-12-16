import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-1 md:left-2"
      onClick={onClick}
    >
      <span className="text-sm md:text-base lg:text-xl">
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default SamplePrevArrow;
