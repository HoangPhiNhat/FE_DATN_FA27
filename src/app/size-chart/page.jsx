import React from 'react';
import Image from 'next/image';
const SizeChartPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Bảng Size</h1>

      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-gray-600">
            Hướng dẫn chọn size phù hợp cho bạn. Vui lòng tham khảo bảng size dưới đây để chọn được sản phẩm vừa vặn nhất.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Bảng Size Chi Tiết</h2>

          <div className="w-full min-h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
            <Image
              src={"/images/size.webp"}
              alt="size chart"
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Hướng Dẫn Đo Size</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">1. Cách đo vòng ngực:</h3>
              <p className="text-gray-600">Đo vòng quanh phần đầy đặn nhất của ngực, giữ thước dây ngang và thoải mái.</p>
            </div>

            <div>
              <h3 className="font-medium text-lg">2. Cách đo vòng eo:</h3>
              <p className="text-gray-600">Đo vòng quanh phần nhỏ nhất của eo, thường là khoảng 2.5cm trên rốn.</p>
            </div>

            <div>
              <h3 className="font-medium text-lg">3. Cách đo vòng hông:</h3>
              <p className="text-gray-600">Đo vòng quanh phần đầy đặn nhất của hông và mông.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Lưu Ý Khi Chọn Size</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Các số đo trong bảng size là số đo chuẩn của sản phẩm</li>
            <li>Nếu bạn ở giữa hai size, nên ch��n size lớn hơn để thoải mái</li>
            <li>Các số đo có thể chênh lệch 1-2cm do phương pháp đo</li>
            <li>Nếu cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SizeChartPage;
