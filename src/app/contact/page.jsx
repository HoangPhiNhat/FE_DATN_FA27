import React from 'react';

const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Liên Hệ Với Chúng Tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Thông tin liên hệ */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Thông Tin Liên Hệ</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Địa Chỉ:</h3>
              <p>123 Đường ABC, Quận 1, TP.HCM</p>
            </div>

            <div>
              <h3 className="font-medium">Email:</h3>
              <p>contact@example.com</p>
            </div>

            <div>
              <h3 className="font-medium">Điện Thoại:</h3>
              <p>(+84) 123-456-789</p>
            </div>

            <div>
              <h3 className="font-medium">Giờ Làm Việc:</h3>
              <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
              <p>Thứ 7: 8:00 - 12:00</p>
            </div>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Gửi Tin Nhắn</h2>

          <form className="space-y-4">
            <div>
              <label className="block mb-2">Họ và tên</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email của bạn"
              />
            </div>

            <div>
              <label className="block mb-2">Số điện thoại</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số điện thoại của bạn"
              />
            </div>

            <div>
              <label className="block mb-2">Nội dung</label>
              <textarea
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Nhập nội dung tin nhắn"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </div>

      {/* Bản đồ */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Vị Trí Của Chúng Tôi</h2>
        <div className="w-full h-96 bg-gray-200 rounded-lg">
          {/* Thêm Google Maps hoặc bản đồ khác vào đây */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Nhúng bản đồ Google Maps vào đây</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
