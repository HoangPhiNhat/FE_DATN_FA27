import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Về Chúng Tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Câu Chuyện Của Chúng Tôi</h2>
          <p className="text-gray-600">
            Được thành lập vào năm 20XX, chúng tôi bắt đầu với một ước mơ đơn giản:
            mang đến những sản phẩm thời trang chất lượng cao với giá cả hợp lý cho
            người tiêu dùng Việt Nam.
          </p>
          <p className="text-gray-600">
            Trải qua nhiều năm phát triển, chúng tôi tự hào đã trở thành một trong
            những thương hiệu thời trang được yêu thích với hàng nghìn khách hàng
            trung thành trên toàn quốc.
          </p>
        </div>
        <div className="w-full h-[400px] bg-gray-100 rounded-lg relative">
          {/* Có thể thêm ảnh ở đây */}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Giá Trị Cốt Lõi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Chất Lượng</h3>
            <p className="text-gray-600">
              Cam kết mang đến những sản phẩm chất lượng cao, được tuyển chọn kỹ lưỡng.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Sáng Tạo</h3>
            <p className="text-gray-600">
              Không ngừng đổi mới và cập nhật xu hướng thời trang mới nhất.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Tận Tâm</h3>
            <p className="text-gray-600">
              Luôn đặt sự hài lòng của khách hàng lên hàng đầu.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="bg-gray-50 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Thành Tựu</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600">1000+</div>
            <p className="text-gray-600">Khách Hàng</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">50+</div>
            <p className="text-gray-600">Sản Phẩm</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">5+</div>
            <p className="text-gray-600">Năm Kinh Nghiệm</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">10+</div>
            <p className="text-gray-600">Đối Tác</p>
          </div>
        </div>
      </div> */}

      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Cam Kết Của Chúng Tôi</h2>
        <div className=" mx-auto">
          <ul className="space-y-4 flex  *:flex-1 text-gray-600">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Sản phẩm chính hãng 100%
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Giao hàng nhanh chóng, đúng hẹn
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Chính sách đổi trả linh hoạt
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Tư vấn nhiệt tình, chuyên nghiệp
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
