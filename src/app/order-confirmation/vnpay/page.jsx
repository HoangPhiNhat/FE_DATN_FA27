"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import messageService from "@/components/base/Message/Message";
import { updateStatusPayment } from "@/services/order";
import { Suspense } from "react";

const OrderConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const order_id = searchParams.get("vnp_TxnRef");

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
        // messageService.error("Vui lòng đăng nhập để sử dụng chức năng này");
        throw error;
      }
    })();
  }, [vnp_TransactionStatus, order_id]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/sign-in");
      // messageService.error("Không thể truy cập vào trang này");
      return;
    }
  }, [router]);

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
    <div className=" flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="flex justify-center">
          <div
            className={`w-16 h-16 ${
              vnp_TransactionStatus == "00" ? "bg-green-100" : "bg-red-100"
            } rounded-full flex items-center justify-center`}
          >
            {vnp_TransactionStatus == "00" ? (
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="text-center">
          <h2
            className={`text-2xl font-bold ${
              vnp_TransactionStatus == "00" ? "text-green-600" : "text-red-600"
            } mb-2`}
          >
            {vnp_TransactionStatus == "00"
              ? "Đặt hàng thành công!"
              : "Đặt hàng thất bại!"}
          </h2>

          {vnp_TransactionStatus == "00" ? (
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong
              thời gian sớm nhất.
            </p>
          ) : (
            <p className="text-gray-600 mb-6">{getStatus(vnp_ResponseCode)}</p>
          )}

          {/* <div className="border-t border-b border-gray-200 py-4 my-6">
            <p className="text-sm text-gray-600 mb-2">
              Mã đơn hàng: <span className="font-semibold">#{order_id}</span>
            </p>
            <p className="text-sm text-gray-600">
              Thời gian: <span className="font-semibold">{new Date().toLocaleString()}</span>
            </p>
          </div> */}
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => router.push("/account/profile?active=orders")}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Xem đơn hàng của tôi
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
};

export default function VNPayConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmation />
    </Suspense>
  );
}
