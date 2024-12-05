"use client";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import Link from "next/link";
import useCartQuery from "@/hooks/useCart/useCartQuery";

const Special = () => {
  const [userName, setUserName] = useState("Đăng nhập");
  const [profileLink, setProfileLink] = useState("/sign-in");
  const { data: cartData } = useCartQuery();
  const handleStorageChange = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.name || "Đăng nhập");
      setProfileLink("/account/profile");
    } else {
      setUserName("Đăng nhập");
      setProfileLink("/sign-in");
    }
  };

  useEffect(() => {
    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loginSuccess", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginSuccess", handleStorageChange);
    };
  }, []);

  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      <Link href={profileLink}>
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-2xl overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center">
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">{userName}</p>
        </div>
      </Link>
      <Link href="/cart">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-2xl overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Giỏ hàng</p>
          {cartData?.length > 0 && (
            <p className="absolute top-1 right-2 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {cartData?.length}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Special;
