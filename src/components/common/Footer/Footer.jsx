"use client";
import React, { useState } from "react";
import FooterItemLink from "./FooterItemLink";
import { accountItems, blankItems, shopItems } from "@/structures/Footer";
import Image from "next/image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  return (
    <div className="w-full bg-[#F5F5F3] py-20 mt-20">
      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <h3 className="text-xl font-bodyFont font-semibold mb-6">
            Về NovaThreads Shop
          </h3>
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
              Chúng tôi tự hào là điểm đến thời trang hàng đầu, mang đến những
              sản phẩm chất lượng cao với giá cả hợp lý.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bodyFont font-semibold mb-6">Dịch vụ</h3>
          <div className="flex flex-col gap-2">
            <p>Giao hàng nhanh chóng</p>
            <p>Đổi trả trong 30 ngày</p>
            <p>Bảo hành sản phẩm</p>
            <p>Tư vấn miễn phí</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bodyFont font-semibold mb-6">Liên hệ</h3>
          <div className="flex flex-col gap-2">
            <p>Hotline: 1900 xxxx</p>
            <p>Email: support@novathreads.com</p>
            <p>Địa chỉ: Toà nhà FPT Polytechnic, Quận Trịnh Văn Bô, TP.HN</p>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <h3 className="text-xl font-bodyFont font-semibold mb-6">
            Đăng ký nhận bản tin
          </h3>
          <div className="w-full">
            <p className="text-center mb-4">
              Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
            </p>
            {subscription ? (
              <p className="w-full text-center text-base font-semibold text-green-600">
                Đăng ký thành công!
              </p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primary text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Nhập email của bạn...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold text-center animate-bounce mt-2">
                      {errMsg === "Please provide an Email !"
                        ? "Vui lòng nhập email!"
                        : "Vui lòng nhập email hợp lệ!"}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
