import React from "react";

const VoucherItem = ({ voucher }) => {
  return (
    <div className="p-4 border rounded-lg mx-2 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col">
        <div className="text-xl font-bold text-red-600 mb-2">
          {`Giảm ${
            voucher.discount_type === "percentage"
              ? `${Number(voucher.discount_value).toLocaleString("vi-VN")}đ`
              : `${voucher.discount_value}%`
          } cho đơn hàng từ ${Number(voucher.min_order_value).toLocaleString(
            "vi-VN"
          )}đ`}
        </div>
        <div className="text-sm font-medium mb-1">{voucher.name}</div>
        <div className="text-xs text-gray-500 ">{voucher.description}</div>
        <div className="text-xs text-gray-500 mb-2 mt-1">
          Giảm tối đa: {Number(voucher.max_discount).toLocaleString("vi-VN")}đ
        </div>
        <div className="text-xs text-gray-400">
          HSD: {new Date(voucher.end_date).toLocaleDateString("vi-VN")}
        </div>
      </div>
    </div>
  );
};

export default VoucherItem;
