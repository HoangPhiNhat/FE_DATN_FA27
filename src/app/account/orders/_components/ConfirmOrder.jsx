"use client";
import messageService from "@/components/base/Message/Message";
import useOrderMutation from "@/hooks/useOrder/useOrderMutaion";
import useOrderQuery from "@/hooks/useOrder/useOrderQuery";
import React, { useState } from "react";
import Image from "next/image";
import Pagination from "@/components/base/Pagination";
import { createOnlinePaymentVNPay } from "@/services/order";

const ConfirmOrder = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 4;
  const [cancelReason, setCancelReason] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const { data: orderData, refetch } = useOrderQuery(
    "CONFIRM_ORDER",
    currentPage,
    pageSize
  );
  const orders = orderData?.data;
  const totalPages = Math.ceil(orderData?.total / pageSize);

  const { mutate: cancelOrder } = useOrderMutation({
    action: "CANCEL_ORDER",
    onSuccess: () => {
      messageService.success("Đơn hàng đã hủy thành công");
      refetch();
    },
    onError: (error) => {
      messageService.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi hủy đơn hàng"
      );
    },
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCancelOrder = (orderId) => {
    setIsCanceling(true);
    setCurrentOrderId(orderId);
  };

  const confirmCancelOrder = () => {
    const payload = {
      id: currentOrderId,
      order_status: "Đã hủy",
      note: cancelReason,
    };
    cancelOrder(payload);
  };
  const handlePaymentTry = async (order_id, total) => {
    const data = {
      order_id: order_id,
      total_amount: total,
    };

    const resOnlineVnPay = await createOnlinePaymentVNPay(data);
    if ((resOnlineVnPay.message = "success" && resOnlineVnPay.data)) {
      window.location.href = resOnlineVnPay.data;
    }
  };
  return (
    <div>
      <div className="bg-white p-6 rounded-lg">
        {!orders || orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Bạn chưa có đơn hàng nào
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              Đơn Hàng
            </h2>
            {orders?.map((order) => (
              <div key={order.id} className="mb-8 border rounded-lg">
                <div className="p-4 bg-gray-50 rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        Mã đơn: {order.order_code}
                      </p>
                      <p>Ngày đặt: {order.created_at}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.order_status !== "Đang giao" && (
                        <span
                          className="cursor-pointer px-3 py-1 rounded-md bg-red-500 text-white"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Hủy
                        </span>
                      )}
                      {order.payment_status === "Thanh toán thất bại" ? (
                        <>
                          <button
                            onClick={() =>
                              handlePaymentTry(order.id, order.total_amount)
                            }
                            className="px-3 py-1 bg-red-100 text-red-800  font-medium rounded dark:bg-red-900 dark:text-red-300"
                          >
                            Thanh toán lại
                          </button>
                        </>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded ${
                            order.order_status === "Đã Giao"
                              ? "bg-green-200"
                              : "bg-yellow-200"
                          }`}
                        >
                          {order.order_status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {order?.order_details?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center py-3 border-b last:border-b-0"
                    >
                      <div className="w-20 h-20">
                        <Image
                          width={100}
                          height={100}
                          src={item.thumbnail}
                          alt={item.product_name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.product_name}</h3>
                        <p className="text-gray-600">
                          Size: {item.size} | Màu: {item.color}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <p>Số lượng: {item.quantity}</p>
                          <p className="font-medium">
                            {Number(item.total_amount).toLocaleString()}đ
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>Phương thức thanh toán: {order.payment_method}</p>
                      <p>Trạng thái thanh toán: {order.payment_status}</p>
                    </div>
                    <div className="text-right">
                      <p>
                        Phí vận chuyển:{" "}
                        {parseInt(order.delivery_fee).toLocaleString()}đ
                      </p>
                      <p className="font-bold text-lg">
                        Tổng cộng: {Number(order.total_amount).toLocaleString()}
                        đ
                      </p>
                    </div>
                  </div>
                </div>

                {isCanceling && currentOrderId === order.id && (
                  <div className="mt-2  w-full p-4 ">
                    <textarea
                      rows="3"
                      placeholder="Nhập lý do hủy..."
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="border p-2 w-full"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsCanceling(false)}
                        className="mt-2 text-right text-black border border-gray-300 px-4 py-2 rounded"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={confirmCancelOrder}
                        className="mt-2 text-right bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrder;
