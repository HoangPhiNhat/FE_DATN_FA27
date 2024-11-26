"use client";
import { useEffect, useState } from "react";
import { BsBox2, BsBox2Heart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import MyOrders from "../orders/_components/MyOrders";
import UserInfo from "./_components/UserInfo";
import WishList from "./_components/WishList";
import useProfileQuery from "@/hooks/useProfile/useProfileQuery";
import Loading from "@/components/base/Loading/Loading";
import ChangePassword from "./_components/ChangePassword";
import Address from "./_components/Address";
import { useRouter } from "next/navigation";
import messageService from "@/components/base/Message/Message";

const UserAccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      messageService.error("Vui lòng đăng nhập để sử dụng chức năng này");
      router.push("/sign-in");
    }
  }, [router]);

  const { data: userProfile, isLoading } = useProfileQuery();
  console.log(userProfile);
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
        return <UserInfo data={userProfile?.data} />;
      case "favorites":
        return <WishList data={favoriteProducts} />;
      case "orders":
        return <MyOrders />;
      case "change-password":
        return <ChangePassword />;
      case "addresses":
        return <Address />;
      case "logout":
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("logoutSuccess"));
        window.dispatchEvent(new Event("storage"));
        router.push("/");
        return null;
      default:
        return <UserInfo data={userProfile.data} />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-4 h-fit">
          <div className="flex items-center mb-6">
            <div>
              <h2 className="font-bold">{userProfile?.data?.name}</h2>
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
              onClick={() => setActiveTab("change-password")}
              className={`w-full text-left p-2 rounded ${
                activeTab === "change-password" ? "bg-blue-100" : ""
              }`}
            >
              <RiLockPasswordLine /> <p>Đổi Mật Khẩu</p>
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
            <button
              onClick={() => setActiveTab("logout")}
              className="w-full text-left p-2 rounded bg-red-500 text-white"
            >
              Đăng Xuất
            </button>
          </nav>
        </div>
        <div className="col-span-3 ">
          {isLoading ? <Loading /> : renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
