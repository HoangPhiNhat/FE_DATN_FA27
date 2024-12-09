import { useState } from "react";
import OrderList from "./OrderList";
import OrderHistory from "./OrderHistory";
import useOrderQuery from "@/hooks/useOrder/useOrderQuery";

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  return (
    <>
      <div className="flex space-x-4 border-b border-gray-300">
        <button
          className={`py-2 px-4 font-semibold ${
            selectedTab === "list"
              ? "border-b-2 border-blue-500 text-blue-500 animate-fade"
              : "text-gray-600"
          }`}
          onClick={() => setSelectedTab("list")}
        >
          Danh sách Đơn Hàng
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
      </div>
    </>
  );
};

export default MyOrders;
