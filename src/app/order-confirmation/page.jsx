"use client";
import React from "react";
import { useRouter } from "next/navigation";

const OrderConfirmation = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-md max-w-md mx-auto">
      <div className="text-green-500 text-4xl mb-4">{/* Photo success */}</div>
      <h2 className="text-lg font-semibold">Đặt hàng thành công!</h2>
      {/* <p className="text-gray-600 mt-2 text-center">
        Mã đơn hàng: <span className="font-semibold">2017182818828182881</span>
      </p> */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => router.push("/account/profile?active=orders")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Xem lịch sử đơn hàng
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none"
        >
          Tiếp tục mua hàng
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
