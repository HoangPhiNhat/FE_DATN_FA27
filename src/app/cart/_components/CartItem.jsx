import Image from "next/image";
import React from "react";
import { CiTrash } from "react-icons/ci";

const CartItem = ({ data, onToggleSelect, isSelected }) => {
  return (
    <div className="w-full relative grid grid-cols-5 mb-4 border py-2">
      <CiTrash
        onClick={() => console.log("cart")}
        className="absolute right-[5%] top-1/2  transform -translate-y-1/2 hover:text-red-500 duration-300 cursor-pointer text-2xl"
      />
      <div className="flex col-span-2 mdl:col-span-2 items-center gap-4 ml-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <Image
          width={104}
          height={104}
          className="aspect-square object-cover"
          src={"/images/product1.jpg"}
          alt={data.name}
        />
        <h1 className="font-titleFont font-semibold">{data.name}</h1>
      </div>
      <div className="col-span-3 mdl:col-span-3 grid grid-cols-3">
        <div className="flex items-center text-lg font-semibold">
          ${data.price}
        </div>
        <div className="flex items-center gap-6 text-lg">
          <span
            onClick={() => console.log("cart")}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{data.quantity}</p>
          <span
            onClick={() => console.log("cart")}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="flex items-center font-titleFont font-bold text-lg">
          <p>${data.quantity * data.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
