"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import messageService from "@/components/base/Message/Message";
import { updateStatusPayment } from "@/services/order";

const OrderConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const order_id = searchParams.get("vnp_TmnCode");

  useEffect(() => {
    (async () => {
      try {
        if (vnp_TransactionStatus == "00") {
          await updateStatusPayment(order_id, "Đã thanh toán");
          messageService.success("Thanh toán thành công");
        } else {
          await updateStatusPayment(order_id, "Thanh toán thất bại");
          messageService.error("Thanh toán thất bại");
        }
      } catch (error) {
        console.error(error);
        messageService.error("Vui lòng đăng nhập để sử dụng chức năng này");
        throw error;
      }
    })();
  }, [vnp_TransactionStatus, order_id]);

  const statusMessages = {
    "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
    "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
    10: "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
    11: "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
    12: "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
    13: "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
    24: "Giao dịch không thành công do: Khách hàng hủy giao dịch.",
    51: "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
    65: "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
    75: "Ngân hàng thanh toán đang bảo trì.",
    79: "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch.",
    99: "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
  };

  const getStatus = (vnp_ResponseCode) =>
    statusMessages[vnp_ResponseCode] || "";

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-md max-w-md mx-auto">
      <div className="text-green-500 text-4xl mb-4">
        {/* Add success or failure icon */}
      </div>
      <h2 className="text-lg font-semibold">
        {vnp_TransactionStatus == "00"
          ? "Đặt hàng thành công!"
          : "Đặt hàng thất bại!"}
      </h2>
      {vnp_TransactionStatus !== "00" && (
        <span className="text-sm text-gray-600">
          {getStatus(vnp_ResponseCode)}
        </span>
      )}
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
