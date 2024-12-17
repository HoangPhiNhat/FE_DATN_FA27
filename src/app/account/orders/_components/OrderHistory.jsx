"use client";
import useOrderQuery from "@/hooks/useOrder/useOrderQuery";
import React from "react";
import Image from "next/image";
import Pagination from "@/components/base/Pagination";

const OrderHistory = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 4;

  const { data: orderData } = useOrderQuery(
    "HISTORY_ORDER",
    currentPage,
    pageSize
  );

  const orders = orderData?.data;
  const totalPages = Math.ceil(orderData?.total / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusColors = {
    "Chờ xác nhận": "bg-gray-100 text-gray-700",
    "Đã xác nhận": "bg-blue-100 text-blue-700",
    "Chờ lấy hàng": "bg-yellow-100 text-yellow-700",
    "Đã giao": "bg-green-100 text-green-700",
    "Đang giao": "bg-orange-100 text-orange-700",
    "Đã huỷ": "bg-red-100 text-red-700",
    "Trả hàng": "bg-purple-100 text-purple-700",
    "Đã nhận hàng": "bg-green-200 text-green-800",
    "Chưa nhận hàng": "bg-yellow-200 text-yellow-800",
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
                      <div
                        className={`px-3 py-1 rounded ${
                          statusColors[order.order_status] ||
                          "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {order.order_status}
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
                            {parseInt(item.total_amount).toLocaleString()}đ
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
                        Tổng cộng:{" "}
                        {parseInt(order.total_amount).toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {orders && orders.length > 0 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
