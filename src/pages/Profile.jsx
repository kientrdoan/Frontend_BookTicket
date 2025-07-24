import React from "react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-10">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Avatar + Info */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <img
            src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/small/avatar_hoat_hinh_db4e0e9cf4.jpg"
            alt="Avatar"
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold">KienDzaii</h2>

          <div className="mt-6 w-full bg-gray-50 rounded border">
            <div className="p-3 border-b text-sm font-medium text-gray-600">Hoạt động</div>
            <div className="divide-y text-sm text-gray-700">
              <div className="flex justify-between px-3 py-2">
                <span>Số lần thanh toán</span>
                <span>4</span>
              </div>
              <div className="flex justify-between px-3 py-2">
                <span>Tổng tiền $</span>
                <span>425000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-2/3">
          

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tài khoản</label>
              <input
                type="text"
                value="KienDzaii"
                disabled
                className="w-full mt-1 px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <div className="relative">
                <input
                  type="password"
                  value="password"
                  className="w-full mt-1 px-3 py-2 border rounded pr-10"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer">
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                type="text"
                value="KienDzaii"
                className="w-full mt-1 px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value="KienDzaii@gmail.com"
                className="w-full mt-1 px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
              <input
                type="text"
                value="1234567890"
                className="w-full mt-1 px-3 py-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
