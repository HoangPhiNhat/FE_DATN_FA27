'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import messageService from '@/components/base/Message/Message';
export default function OrderConfirmation() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      router.push('/sign-in');
      messageService.error("Không thể truy cập vào trang này");
      return;
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đặt hàng thành công!
          </h2>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã mua hàng.
          </p>

          {/* Thông tin đơn hàng */}
          {/* <div className="border-t border-b border-gray-200 py-4 my-6">
            <p className="text-sm text-gray-600">
              Thời gian đặt hàng: <span className="font-semibold">{new Date().toLocaleString()}</span>
            </p>
          </div>*/}
        </div>
        {/* Các nút điều hướng */}
        <div className="flex flex-col space-y-4">
          <Link href="/account/profile?active=orders"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Xem đơn hàng của tôi
          </Link>
          <Link href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
