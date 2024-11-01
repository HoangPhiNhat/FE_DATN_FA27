"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CartItem from "./_components/CartItem";
import { products } from "../../../data.example";
import Alert from "@/components/base/Alert";

const Cart = () => {
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [alert, setAlert] = useState({ visible: false, message: "" });

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    console.log(123);
    setTimeout(() => {
      setAlert({ visible: false, message: "" });
    }, 2000);
  };
  const handleToggleSelect = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(products.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length > 0) {
      console.log("Remove selected items:", selectedItems);
    } else {
      showAlert("Vui lòng chọn sản phẩm");
    }
  };
  //   useEffect(() => {
  //     let price = 0;
  //     products.forEach((item) => {
  //       price += item.price * item.quantity;
  //     });
  //     setTotalAmt(price);
  //   }, [products]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else {
      setShippingCharge(20);
    }
  }, [totalAmt]);
  return (
    <div className="container mx-auto">
      {/* <Breadcrumbs title="Cart" /> */}
      {products.length > 0 ? (
        <>
          <div className="w-full h-20 bg-[#F5F7F7] text-primary lg:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold relative mt-10">
            <h2 className="col-span-2">
              <input
                type="checkbox"
                checked={products.every((product) =>
                  selectedItems.includes(product.id)
                )}
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
          {/* <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={products.every((product) =>
                  selectedItems.includes(product.id)
                )}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <label>Chọn tất cả</label>
            </div>
            {selectedItems.length > 0 && (
              <button
                onClick={handleRemoveSelected}
                className="ml-4 p-2 bg-red-500 text-white rounded animate-fade"
              >
                Xóa đã chọn
              </button>
            )}
          </div> */}
          <div className="mt-5">
            {products.map((v) => (
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
                checked={products.every((product) =>
                  selectedItems.includes(product.id)
                )}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <label>Chọn tất cả ({selectedItems.length})</label>
              <button
                onClick={handleRemoveSelected}
                className="ml-4 p-2 text-black rounded animate-fade"
                disabled={alert.visible}
              >
                Xóa
              </button>
            </div>
            <div className="flex items-center gap-4">
              <p>Tổng thanh toán ({selectedItems.length} sản phẩm): 0đ</p>
              <button className="bg-primary text-white px-5 py-2 hover:bg-white hover:text-primary border-primary border-1">
                Mua hàng
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20">
          <div>
            {/* <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="emptyCart" /> */}
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link href="/shop">
              <button className="bg-primary rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
      <Alert message={alert.message} visible={alert.visible} />
    </div>
  );
};

export default Cart;
