"use client";

import { HiOutlineChevronRight } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Bản đồ giữa các đường dẫn và tên tiếng Việt
const pathToVietnamese = {
  home: "Trang chủ",
  product: "Sản phẩm",
  electronics: "Điện tử",
  cart: "Giỏ hàng",
  authentication: "Tài khoản",
  account: "Tài khoản",
  profile: "Người dùng",
  "sign-in": "Đăng nhập",
  "sign-up": "Đăng ký",
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter((segment) => segment); // Bỏ các phần tử rỗng

    // Tạo breadcrumb
    const vietnameseSegments = pathSegments.map((segment) => {
      return pathToVietnamese[segment] || segment; // Chuyển đổi sang tiếng Việt
    });

    // Thêm "Trang chủ" vào đầu danh sách
    setBreadcrumbPath(["Trang chủ", ...vietnameseSegments]);
  }, [pathname]);

  return (
    <>
      {pathname !== "/" && (
        <div className="container">
          <div className="container w-full py-10 xl:py-10 flex flex-col gap-3">
            <p className="text-sm font-normal text-lightText capitalize flex items-center">
              {/* {breadcrumbPath.map((segment, index) => (
              <span key={index} className="flex items-center">
                <span className="capitalize font-semibold text-primary">
                  {segment}
                </span>
                {index < breadcrumbPath.length - 1 && (
                  <span className="px-1">
                    <HiOutlineChevronRight />
                  </span>
                )}
              </span>
            ))} */}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Breadcrumbs;
