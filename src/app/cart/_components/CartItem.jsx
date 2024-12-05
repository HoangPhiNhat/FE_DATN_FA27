"use client";
import ConfirmModal from "@/components/base/Confirm/Confirm";
import messageService from "@/components/base/Message/Message";
import useCartMutation from "@/hooks/useCart/useCartMutation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";

const CartItem = ({ data, onToggleSelect, isSelected }) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const [timer, setTimer] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { mutate: updateQuantity, isLoading } = useCartMutation({
    action: "UPDATE",
    onSuccess: () => {
      messageService.success("Cập nhật số lượng thành công");
    },
    onError: (error) => {
      messageService.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi vui lòng thử lại"
      );
      setQuantity(data.quantity);
    },
  });

  const { mutate: deleteCartItem } = useCartMutation({
    action: "DELETE",
    onSuccess: () => {
      messageService.success("Xóa sản phẩm thành công");
    },
    onError: (error) => {
      messageService.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm"
      );
    },
  });

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      updateQuantity(data.id, quantity);
    }, 500);
    setTimer(newTimer);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [quantity, data.id, timer, updateQuantity]);

  const increaseQuantity = () => {
    if (quantity < data.product_att.stock_quantity) {
      setQuantity(quantity + 1);
      setShouldUpdate(true);
    } else {
      messageService.warning("Số lượng trong kho không đủ");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setShouldUpdate(true);
    } else if (quantity === 1) {
      setIsConfirmOpen(true);
    }
  };

  return (
    <>
      <div className="w-full relative grid grid-cols-5 mb-4 border py-2">
        <CiTrash
          onClick={() => setIsConfirmOpen(true)}
          className="absolute right-[5%] top-1/2 transform -translate-y-1/2 hover:text-red-500 duration-300 cursor-pointer text-2xl"
        />
        <div className="flex col-span-2 mdl:col-span-2 items-center gap-4 ml-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <Image
            width={104}
            height={104}
            className="aspect-square object-cover"
            src={data.product_att.image ?? "/images/default-image.jpg"}
            alt={data.name}
          />
          <div>
            <h1 className="font-titleFont font-semibold">
              {data.product_att.product.name}
            </h1>
            <p className="text-sm text-gray-500">
              {data.product_att.size.name} - {data.product_att.color.name}
            </p>
          </div>
        </div>
        <div className="col-span-3 mdl:col-span-3 grid grid-cols-3">
          <div className="flex items-center text-lg font-semibold gap-2">
            {data.product_att.reduced_price ? (
              <>
                <span className="line-through text-gray-500 text-base">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.product_att.regular_price)}
                </span>
                <span className="text-red-500">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.product_att.reduced_price)}
                </span>
              </>
            ) : (
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data.product_att.regular_price)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-6 text-lg">
            <span
              onClick={decreaseQuantity}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
            >
              -
            </span>
            <p>{quantity}</p>
            <span
              onClick={increaseQuantity}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
            >
              +
            </span>
          </div>
          <div className="flex items-center font-titleFont font-bold text-lg">
            <p>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                quantity *
                  (data.product_att.reduced_price ??
                    data.product_att.regular_price)
              )}
            </p>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => deleteCartItem(data.id)}
        title="Xác nhận xóa sản phẩm"
        message={`Bạn có chắc chắn muốn xóa sản phẩm "${data.name}" khỏi giỏ hàng?`}
        label="Xóa"
      />
    </>
  );
};

export default CartItem;
