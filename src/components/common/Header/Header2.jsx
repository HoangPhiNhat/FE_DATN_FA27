import Image from "next/image";
import React from "react";
import Menu from "./Menu";

const Header = () => {
  const menuItems = [
    { label: "Trang chủ", href: "/" },
    {
      label: "Sản phẩm",
      href: "/products",
      children: [
        { label: "Mới nhất", href: "/products/new" },
        { label: "Bán chạy", href: "/products/bestsellers" },
        { label: "Khuyến mãi", href: "/products/sale" },
      ],
    },
    {
      label: "Dịch vụ",
      href: "/services",
      children: [
        { label: "Tư vấn", href: "/services/consulting" },
        { label: "Bảo hành", href: "/services/warranty" },
      ],
    },
    { label: "Liên hệ", href: "/contact" },
  ];

  return (
    <>
      <div className="overflow-hidden whitespace-nowrap bg-primary ">
        <div className="flex animate-marquee *:text-white *:text-xl py-4">
          <div className="mr-8">Giảm giá 10%</div>
          <div className="mr-8">Giảm giá 20%</div>
          <div className="mr-8">Giảm giá 30%</div>
          <div className="mr-8">Giảm giá 40%</div>
        </div>
      </div>
      <Menu items={menuItems} />
    </>
  );
};

export default Header;
