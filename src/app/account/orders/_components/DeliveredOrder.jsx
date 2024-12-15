"use client";
import messageService from "@/components/base/Message/Message";
import useOrderMutation from "@/hooks/useOrder/useOrderMutaion";
import useOrderQuery from "@/hooks/useOrder/useOrderQuery";
import React, { useState } from "react";
import Image from "next/image";
import Pagination from "@/components/base/Pagination";

const DeliveredOrder = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 4;
  const [cancelReason, setCancelReason] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [action, setAction] = useState("");
  const { data: orderData, refetch } = useOrderQuery(
    "DELIVERED_ORDER",
    currentPage,
    pageSize
  );
  const orders = orderData?.data;
  const totalPages = Math.ceil(orderData?.total / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { mutate } = useOrderMutation({
    action: action,
    onSuccess: () => {
      messageService.success("Cập nhật trạng thái giao hàng thành công");
      refetch();
    },
    onError: (error) => {
      messageService.error("Có lỗi xảy ra");
    },
  });

  const handleReceiveOrder = (orderId) => {
    setAction("RECEIVED_ORDER");
    mutate({ id: orderId, order_status: "Đã nhận hàng" });
  };

  const handleNotReceiveOrder = (orderId) => {
    setAction("NOT_RECEIVE_ORDER");
    mutate({ id: orderId, order_status: "Chưa nhận hàng" });
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
                      <button
                        className="cursor-pointer px-3 py-1 rounded-md bg-yellow-500 text-white"
                        onClick={() => handleNotReceiveOrder(order.id)}
                      >
                        Chưa nhận hàng
                      </button>
                      <button
                        className="cursor-pointer px-3 py-1 rounded-md bg-green-500 text-white"
                        onClick={() => handleReceiveOrder(order.id)}
                      >
                        Đã nhận hàng
                      </button>
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

export default DeliveredOrder;
