"use client";
import { useState } from "react";
import { BsBox2, BsBox2Heart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import MyOrders from "../orders/_components/MyOrders";
import UserInfo from "./_components/UserInfo";
import WishList from "./_components/WishList";

const UserAccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const userProfile = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123 456 789",
  };

  const favoriteProducts = [
    {
      id: 1,
      name: "Áo Sơ Mi Trắng",
      price: 350000,
      image: "/api/placeholder/200/250",
    },
    {
      id: 2,
      name: "Quần Jean Nam",
      price: 450000,
      image: "/api/placeholder/200/250",
    },
  ];

  const orderHistory = [
    {
      id: "DH001",
      date: "15/10/2024",
      total: 800000,
      status: "Đã Giao",
    },
    {
      id: "DH002",
      date: "20/10/2024",
      total: 1200000,
      status: "Đang Vận Chuyển",
    },
  ];

  const addresses = [
    {
      id: 1,
      label: "Nhà Riêng",
      address: "123 Đường ABC, Phường XYZ, TP Hồ Chí Minh",
    },
    {
      id: 2,
      label: "Văn Phòng",
      address: "456 Đường DEF, Quận GHI, TP Hà Nội",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserInfo data={userProfile} />;
      case "favorites":
        return <WishList data={favoriteProducts} />;
      case "orders":
        return <MyOrders />;
      //   case "addresses":
      //     return (
      //       <div className="bg-white p-6 rounded-lg">
      //         <h2 className="text-2xl font-bold mb-4 flex items-center">
      //           <MapPin className="mr-2" /> Địa Chỉ
      //         </h2>
      //         {addresses.map((addr) => (
      //           <div
      //             key={addr.id}
      //             className="border p-4 rounded mb-4 flex justify-between items-center"
      //           >
      //             <div>
      //               <h3 className="font-bold">{addr.label}</h3>
      //               <p>{addr.address}</p>
      //             </div>
      //             <div>
      //               <button className="mr-2 text-blue-500">Sửa</button>
      //               <button className="text-red-500">Xóa</button>
      //             </div>
      //           </div>
      //         ))}
      //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
      //           Thêm Địa Chỉ Mới
      //         </button>
      //       </div>
      //     );
      default:
        return <UserInfo data={userProfile} />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-4 h-fit">
          <div className="flex items-center mb-6">
            <div>
              <h2 className="font-bold">{userProfile.name}</h2>
              <p className="text-gray-500">ID: 12345</p>
            </div>
          </div>
          <nav className="space-y-2 *:flex *:gap-2 *:items-center ">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left p-2 rounded   ${
                activeTab === "profile" ? "bg-blue-100" : ""
              }`}
            >
              <FaRegUser /> <p>Thông Tin Cá Nhân</p>
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`w-full text-left p-2 rounded ${
                activeTab === "favorites" ? "bg-blue-100" : ""
              }`}
            >
              <BsBox2Heart />
              <p> Sản Phẩm Yêu Thích </p>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left p-2 rounded ${
                activeTab === "orders" ? "bg-blue-100" : ""
              }`}
            >
              <BsBox2 /> <p>Đơn hàng</p>
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full text-left p-2 rounded ${
                activeTab === "addresses" ? "bg-blue-100" : ""
              }`}
            >
              <GrMapLocation /> Địa Chỉ
            </button>
          </nav>
        </div>
        <div className="col-span-3 ">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserAccountPage;
