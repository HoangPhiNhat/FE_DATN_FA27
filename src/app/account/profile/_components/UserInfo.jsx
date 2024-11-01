import React from "react";
import { CiEdit, CiUser } from "react-icons/ci";

const UserInfo = ({ data }) => {
  return (
    <>
      <div className="animate-fade">
        <h2 className="text-2xl font-bold mb-4 flex items-center border-b pb-3">
          <CiUser className="mr-2" /> Thông Tin Cá Nhân
        </h2>
        <div className="space-y-3">
          <p>
            <strong>Họ Tên:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Số Điện Thoại:</strong> {data.phone}
          </p>
          <p>
            <strong>Ngày sinh:</strong> 27/12/2004
          </p>
          <p>
            <strong>Giới tính:</strong> Nam
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 flex items-center">
            <CiEdit className="mr-2" /> Chỉnh Sửa Thông Tin
          </button>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
