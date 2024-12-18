"use client";
import ConfirmModal from "@/components/base/Confirm/Confirm";
import messageService from "@/components/base/Message/Message";
import useCartMutation from "@/hooks/useCart/useCartMutation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";

const CartItem = ({
  data,
  onToggleSelect,
  isSelected,
  priceChanged,
  quantityChanged,
}) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { mutate: updateQuantity, isLoading } = useCartMutation({
    action: "UPDATE",
    onSuccess: (data) => {
      if (data?.status === 200) {
        messageService.success("Cập nhật số lượng thành công");
      }
    },
    onError: (error) => {
      if (error.status === 400) {
        messageService.error(
          error?.response?.data?.message || "Có lỗi xảy ra khi vui lòng thử lại"
        );
      }
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
    const debounceUpdate = setTimeout(() => {
      if (quantity !== data.quantity) {
        updateQuantity({
          id: data.id,
          quantity: quantity,
        });
      }
    }, 500);

    return () => clearTimeout(debounceUpdate);
  }, [quantity, data.id, data.quantity, updateQuantity]);

  const increaseQuantity = () => {
    if (quantity < data.product_att.stock_quantity) {
      setQuantity((prev) => prev + 1);
    } else {
      messageService.warning("Số lượng trong kho không đủ");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (quantity === 1) {
      setIsConfirmOpen(true);
    }
  };

  return (
    <>
      <div className="w-full relative flex flex-col sm:grid sm:grid-cols-5 mb-4 border py-2">
        <CiTrash
          onClick={() => setIsConfirmOpen(true)}
          className="absolute right-2 top-2 sm:right-[5%] sm:top-1/2 sm:transform sm:-translate-y-1/2 hover:text-red-500 duration-300 cursor-pointer text-2xl"
        />

        {/* Product Info Section */}
        <div className="flex col-span-2 items-center gap-4 ml-4 mb-4 sm:mb-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="w-4 h-4"
          />
          <Image
            width={80}
            height={80}
            className="aspect-square object-cover sm:w-[104px] sm:h-[104px]"
            src={data.product_att.image ?? "/images/default-image.jpg"}
            alt={data.name}
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-titleFont font-semibold text-sm sm:text-base">
              {data.product_att.product.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {data.product_att.size.name} - {data.product_att.color.name}
            </p>
          </div>
        </div>

        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 px-4 sm:px-0">
          <div className="flex items-center">
            {data.product_att.reduced_price ? (
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-sm sm:text-base">
                  {data.product_att.reduced_price.toLocaleString()}đ
                </span>
                <span className="line-through text-gray-400 text-xs">
                  {data.product_att.regular_price.toLocaleString()}đ
                </span>
              </div>
            ) : (
              <span className="text-sm sm:text-base">
                {data.product_att.regular_price.toLocaleString()}đ
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={decreaseQuantity}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <div className="flex items-center justify-end sm:justify-start">
            <span className="text-sm sm:text-base font-medium">
              {(
                (data.product_att.reduced_price ||
                  data.product_att.regular_price) * quantity
              ).toLocaleString()}
              đ
            </span>
          </div>
        </div>
      </div>

      {priceChanged && (
        <div className="text-red-500 text-xs sm:text-sm mb-2 ml-4">
          Giá sản phẩm đã thay đổi:
          {priceChanged.newReducedPrice > 0
            ? ` ${Number(priceChanged.newReducedPrice).toLocaleString()}đ`
            : ` ${Number(priceChanged.newRegularPrice).toLocaleString()}đ`}
        </div>
      )}
      {quantityChanged && (
        <div className="text-red-500 text-xs sm:text-sm mb-2 ml-4">
          Sản phẩm đã bán hết, vui lòng chọn sản phẩm khác
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => deleteCartItem(data.id)}
        title="Xác nhận xóa sản phẩm"
        message={`Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?`}
        label="Xóa"
      />
    </>
  );
};

export default CartItem;
