"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PaymentResult() {
  const [invoiceId, setInvoiceId] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const invoiceIdFromUrl = searchParams.get("invoiceId");
    const statusFromUrl = searchParams.get("status");

    setInvoiceId(invoiceIdFromUrl);
    setStatus(statusFromUrl);

    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Đang xử lý kết quả thanh toán...
          </p>
        </div>
      </div>
    );
  }

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div
            className={`px-8 py-12 text-center ${
              isSuccess
                ? "bg-gradient-to-br from-green-400 to-green-600"
                : "bg-gradient-to-br from-red-400 to-red-600"
            }`}
          >
            {/* Animated Icon */}
            <div className="relative mb-6">
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                  isSuccess ? "bg-white/20" : "bg-white/20"
                } backdrop-blur-sm animate-pulse`}
              >
                {isSuccess ? (
                  <svg
                    className="w-10 h-10 text-white animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-10 h-10 text-white animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>

              {/* Decorative circles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/40 rounded-full animate-ping delay-300"></div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-lg">
              {isSuccess
                ? "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi"
                : "Đã có lỗi xảy ra trong quá trình thanh toán"}
            </p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            {/* Invoice Info */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium">Mã đơn hàng:</span>
                <span className="font-mono text-lg font-bold text-gray-900">
                  #{invoiceId}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Trạng thái:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isSuccess
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isSuccess ? "Thành công" : "Thất bại"}
                </span>
              </div>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-green-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">
                      Đặt vé thành công!
                    </h3>
                    <p className="text-green-700 text-sm">
                      Vé của bạn đã được gửi qua email. Vui lòng kiểm tra hộp
                      thư và mang theo mã QR khi đến rạp.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {!isSuccess && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-red-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">
                      Thanh toán không thành công
                    </h3>
                    <p className="text-red-700 text-sm">
                      Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ
                      trợ.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {isSuccess ? (
                <>
                  <Link
                    to="/history"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z"
                        />
                      </svg>
                      <span>Xem lịch sử đặt vé</span>
                    </div>
                  </Link>

                  <Link
                    to="/"
                    className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span>Về trang chủ</span>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  {/* <button
                    onClick={() => window.history.back()}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                      <span>Thử lại</span>
                    </div>
                  </button> */}

                  <Link
                    to="/"
                    className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span>Về trang chủ</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
