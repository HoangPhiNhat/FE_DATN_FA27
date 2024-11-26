"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CartItem from "./_components/CartItem";
import { products } from "../../../data.example";
import Alert from "@/components/base/Alert";
import useCartQuery from "@/hooks/useCart/useCartQuery";
import Loading from "@/components/base/Loading/Loading";
import messageService from "@/components/base/Message/Message";
import ConfirmModal from "@/components/base/Confirm/Confirm";
import { useRouter } from "next/navigation";
import useCartMutation from "@/hooks/useCart/useCartMutation";

const Cart = () => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  const { data: cartData, isLoading } = useCartQuery({
    enabled: isAuthenticated,
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

  const handleToggleSelect = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (cartData?.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartData?.map((item) => item.id) || []);
    }
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) {
      messageService.warning("Vui lòng chọn sản phẩm");
      return;
    }
    selectedItems.map((id) => deleteCartItem(id));
    setShowConfirmModal(true);
  };

  const onConfirmRemove = () => {
    console.log("Remove selected items:", selectedItems);
    messageService.success("Đã xóa sản phẩm thành công");
    setShowConfirmModal(false);
  };

  const totalAmount = useMemo(() => {
    if (!cartData?.length || !selectedItems.length) return 0;

    return cartData
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => {
        const price = item.regular_price ?? item.reduced_price;
        return total + price * item.quantity;
      }, 0);
  }, [cartData, selectedItems]);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      messageService.warning("Vui lòng chọn sản phẩm để mua hàng");
      return;
    }

    const selectedProducts = cartData.filter((item) =>
      selectedItems.includes(item.id)
    );

    localStorage.setItem("checkoutItems", JSON.stringify(selectedProducts));

    router.push("/checkout");
  };

  if (isLoading) return <Loading />;

  if (!isAuthenticated || !cartData?.length) {
    return (
      <div className="container mx-auto">
        <div className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20">
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              {!isAuthenticated ? "Vui lòng đăng nhập" : "Giỏ hàng trống"}
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              {!isAuthenticated
                ? "Đăng nhập để xem giỏ hàng của bạn"
                : "Hãy thêm sản phẩm vào giỏ hàng của bạn"}
            </p>
            <Link href={!isAuthenticated ? "/sign-in" : "/"}>
              <button className="bg-primary rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                {!isAuthenticated ? "Đăng nhập" : "Tiếp tục mua sắm"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={onConfirmRemove}
        title="Xác nhận xóa"
        message={`${
          selectedItems.length > 1
            ? "Bạn có chắc chắn muốn xóa những sản phẩm đã chọn?"
            : "Bạn có chắc chắn muốn xóa sản phẩm đã chọn?"
        }`}
        label="Xóa"
      />
      <>
        <div className="w-full h-20 bg-[#F5F7F7] text-primary lg:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold relative mt-10">
          <h2 className="col-span-2">
            <input
              type="checkbox"
              checked={
                cartData?.length > 0 &&
                cartData?.length === selectedItems.length
              }
              onChange={handleSelectAll}
              className="mr-2"
            />
            Sản phẩm
          </h2>
          <div className="col-span-3 grid grid-cols-3 *:pl-3">
            <h2>Đơn giá</h2>
            <h2>Số lượng</h2>
            <h2>Số tiền</h2>
          </div>
        </div>
        <div className="mt-5">
          {cartData.map((v) => (
            <div key={v.id}>
              <CartItem
                key={v.id}
                data={v}
                isSelected={selectedItems.includes(v.id)}
                onToggleSelect={() => handleToggleSelect(v.id)}
              />
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 left-0 right-0 flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0 bg-white z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={
                cartData?.length > 0 &&
                cartData?.length === selectedItems.length
              }
              onChange={handleSelectAll}
              className="mr-2"
            />
            <label>Chọn tất cả ({selectedItems.length})</label>
            <button
              onClick={handleRemoveSelected}
              className="ml-4 p-2 text-black rounded animate-fade"
            >
              Xóa
            </button>
          </div>
          <div className="flex items-center gap-4">
            <p>
              Tổng thanh toán ({selectedItems.length} sản phẩm):{" "}
              {totalAmount.toLocaleString()}đ
            </p>
            <button
              onClick={handleCheckout}
              className={`px-5 py-2 border-primary border-1 ${
                selectedItems.length > 0
                  ? "bg-primary text-white hover:bg-white hover:text-primary cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Mua hàng
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default Cart;
