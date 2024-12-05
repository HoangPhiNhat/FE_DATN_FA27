import React, { useState } from "react";
import { CiEdit, CiUser } from "react-icons/ci";
import EditForm from "./EditForm";

const UserInfo = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <div className="animate-fade">
        {isEditing ? (
          <EditForm data={data} onCancel={() => setIsEditing(false)} />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 flex items-center border-b pb-3">
              <CiUser className="mr-2" /> Thông Tin Cá Nhân
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Họ Tên:</strong> {data?.name}
              </p>
              <p>
                <strong>Email:</strong> {data?.email}
              </p>
              <p>
                <strong>Số Điện Thoại:</strong> {data?.phone || "Không có"}
              </p>
              <p>
                <strong>Ngày sinh:</strong> {data?.date_of_birth || "Không có"}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary text-white px-4 py-2 rounded mt-4 flex items-center"
              >
                <CiEdit className="mr-2" /> Chỉnh Sửa Thông Tin
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserInfo;
