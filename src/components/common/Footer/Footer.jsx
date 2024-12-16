"use client";
import React, { useState } from "react";
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
    <div className="w-full bg-[#F5F5F3] py-10 md:py-20 mt-10 md:mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div className="lg:col-span-1">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
              Về NovaThreads Shop
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Chúng tôi tự hào là điểm đến thời trang hàng đầu, mang đến những
              sản phẩm chất lượng cao với giá cả hợp lý.
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
              Dịch vụ
            </h3>
            <ul className="space-y-2">
              <li className="text-sm md:text-base text-gray-600">
                Giao hàng nhanh chóng
              </li>
              <li className="text-sm md:text-base text-gray-600">
                Đổi trả trong 30 ngày
              </li>
              <li className="text-sm md:text-base text-gray-600">
                Bảo hành sản phẩm
              </li>
              <li className="text-sm md:text-base text-gray-600">
                Tư vấn miễn phí
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
              Liên hệ
            </h3>
            <ul className="space-y-2">
              <li className="text-sm md:text-base text-gray-600">
                Hotline: 1900 1999
              </li>
              <li className="text-sm md:text-base text-gray-600">
                Email: support@novathreads.com
              </li>
              <li className="text-sm md:text-base text-gray-600">
                Địa chỉ: Toà nhà FPT Polytechnic, Quận Trịnh Văn Bô, TP.HN
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
              Đăng ký nhận bản tin
            </h3>
            <div className="space-y-4">
              <p className="text-sm md:text-base text-gray-600">
                Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
              </p>

              {subscription ? (
                <p className="text-sm md:text-base font-semibold text-green-600">
                  Đăng ký thành công!
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      onChange={(e) => setEmailInfo(e.target.value)}
                      value={emailInfo}
                      className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primary text-base
                               placeholder:text-gray-500 outline-none focus:border-primary transition-colors"
                      type="text"
                      placeholder="Nhập email của bạn...*"
                    />
                    {errMsg && (
                      <p className="absolute -bottom-6 left-0 text-red-600 text-xs md:text-sm font-medium animate-bounce">
                        {errMsg === "Please provide an Email !"
                          ? "Vui lòng nhập email!"
                          : "Vui lòng nhập email hợp lệ!"}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleSubscription}
                    className="w-full md:w-auto px-6 py-3 bg-white text-gray-800 text-sm md:text-base
                             hover:bg-black hover:text-white transition-colors duration-300 mt-4"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © 2024 NovaThreads Shop. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
