import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-1 md:right-2"
      onClick={onClick}
    >
      <span className="text-sm md:text-base lg:text-xl">
        <FaLongArrowAltRight />
      </span>
    </div>
  );
};

export default SampleNextArrow;
