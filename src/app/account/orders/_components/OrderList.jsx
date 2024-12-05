import React from "react";

const OrderList = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          Danh sách đơn Hàng
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Mã Đơn</th>
              <th className="p-3">Ngày</th>
              <th className="p-3">Tổng Tiền</th>
              <th className="p-3">Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {/* {orderHistory.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">{order.total.toLocaleString()}đ</td>
                <td className="p-3">
                  <span
                    className={`
              px-3 py-1 rounded
              ${order.status === "Đã Giao" ? "bg-green-200" : "bg-yellow-200"}
            `}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
