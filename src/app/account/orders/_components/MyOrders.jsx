import { useState } from "react";
import OrderList from "./OrderList";
import OrderHistory from "./OrderHistory";
import ConfirmOrder from "./ConfirmOrder";
import DeliveryOrder from "./DeliveryOrder";
import DeliveredOrder from "./DeliveredOrder";

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState("confirm");
  return (
    <>
      <div className="flex space-x-4 border-b border-gray-300">
        {/* <button
          className={`py-2 px-4 font-semibold ${
            selectedTab === "list"
              ? "border-b-2 border-blue-500 text-blue-500 animate-fade"
              : "text-gray-600"
          }`}
          onClick={() => setSelectedTab("list")}
        >
          Danh sách Đơn Hàng
        </button> */}
        <button
          className={`py-2 px-4 font-semibold ${
            selectedTab === "confirm"
              ? "border-b-2 border-blue-500 text-blue-500 animate-fade"
              : "text-gray-600"
          }`}
          onClick={() => setSelectedTab("confirm")}
        >
          Xác nhận
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            selectedTab === "delivery"
              ? "border-b-2 border-blue-500 text-blue-500 animate-fade"
              : "text-gray-600"
          }`}
          onClick={() => setSelectedTab("delivery")}
        >
         Giao hàng
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            selectedTab === "delivered"
              ? "border-b-2 border-blue-500 text-blue-500 animate-fade"
              : "text-gray-600"
          }`}
          onClick={() => setSelectedTab("delivered")}
        >
          Đã giao hàng
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            selectedTab === "history"
              ? "border-b-2 border-blue-500 text-blue-500 animate-fade"
              : "text-gray-600"
          }`}
          onClick={() => setSelectedTab("history")}
        >
          Lịch Sử Đơn Hàng
        </button>
      </div>

      <div className="mt-4">
        {selectedTab === "list" && (
          <div className="animate-fade-right">
            <OrderList />
          </div>
        )}
        {selectedTab === "history" && (
          <div className="animate-fade-left">
            <OrderHistory />
          </div>
        )}
        {selectedTab === "confirm" && (
          <div className="animate-fade-left">
            <ConfirmOrder />
          </div>
        )}
        {selectedTab === "delivery" && (
          <div className="animate-fade-left">
            <DeliveryOrder />
          </div>
        )}
        {selectedTab === "delivered" && (
          <div className="animate-fade-left">
            <DeliveredOrder />
          </div>
          )}
      </div>
    </>
  );
};

export default MyOrders;
