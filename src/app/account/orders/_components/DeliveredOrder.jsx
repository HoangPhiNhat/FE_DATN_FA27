"use client";
import messageService from "@/components/base/Message/Message";
import useOrderMutation from "@/hooks/useOrder/useOrderMutaion";
import useOrderQuery from "@/hooks/useOrder/useOrderQuery";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Pagination from "@/components/base/Pagination";

const DeliveredOrder = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 4;
  const [action, setAction] = useState("");
  const [activeTooltip, setActiveTooltip] = useState(null);
  const tooltipRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      setActiveTooltip(null);
    },
    onError: (error) => {
      messageService.error("Có lỗi xảy ra");
      setActiveTooltip(null);
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

  const toggleTooltip = (tooltipId) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
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
                      <div className="relative" ref={tooltipRef}>
                        <button
                          className="cursor-pointer px-3 py-1 rounded-md bg-yellow-500 text-white"
                          onClick={() =>
                            toggleTooltip(`not-receive-${order.id}`)
                          }
                        >
                          Chưa nhận hàng
                        </button>
                        {activeTooltip === `not-receive-${order.id}` && (
                          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg whitespace-nowrap">
                            <p className="mb-2 text-gray-700">
                              Xác nhận chưa nhận được hàng?
                            </p>
                            <div className="flex gap-2 justify-end">
                              <button
                                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                onClick={() => setActiveTooltip(null)}
                              >
                                Hủy
                              </button>
                              <button
                                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                onClick={() => handleNotReceiveOrder(order.id)}
                              >
                                Xác nhận
                              </button>
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                          </div>
                        )}
                      </div>
                      <div className="relative" ref={tooltipRef}>
                        <button
                          className="cursor-pointer px-3 py-1 rounded-md bg-green-500 text-white"
                          onClick={() => toggleTooltip(`receive-${order.id}`)}
                        >
                          Đã nhận hàng
                        </button>
                        {activeTooltip === `receive-${order.id}` && (
                          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg whitespace-nowrap">
                            <p className="mb-2 text-gray-700">
                              Xác nhận đã nhận được hàng?
                            </p>
                            <div className="flex gap-2 justify-end">
                              <button
                                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                onClick={() => setActiveTooltip(null)}
                              >
                                Hủy
                              </button>
                              <button
                                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={() => handleReceiveOrder(order.id)}
                              >
                                Xác nhận
                              </button>
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                          </div>
                        )}
                      </div>
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
