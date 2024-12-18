import React from "react";
import { IoWarningOutline } from "react-icons/io5";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  label,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto shadow-xl animate-fade-up">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            <IoWarningOutline className="text-yellow-500 text-3xl" />
          </div>

          <h3 className="text-xl font-semibold mb-2 text-center">
            {title || "Xác nhận xóa"}
          </h3>

          <p className="text-gray-500 text-center mb-6">
            {message || "Bạn có chắc chắn muốn xóa sản phẩm này?"}
          </p>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="min-w-[100px] px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="min-w-[100px] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              {label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
