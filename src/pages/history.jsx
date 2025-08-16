"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinHoaDonAction } from "../redux/actions/QuanLyNguoiDungAction";
import { Link } from "react-router-dom";

const BookingHistory = () => {
  const { thongTinHoaDon } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(layThongTinHoaDonAction());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lịch sử đặt vé
          </h1>
          {/* <p className="text-gray-600">
            Quản lý và theo dõi các vé đã đặt của bạn
          </p> */}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Tên Rạp
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Tên phim
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Thời gian đặt
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Danh sách Vé
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {thongTinHoaDon?.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.showtime.cinemaName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-16 mr-4">
                          <img
                            src={
                              item.showtime?.movie?.poster || "/placeholder.svg"
                            }
                            alt={item.showtime.movie.title}
                            className="w-full h-full object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://picsum.photos/48/64";
                            }}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.showtime.movie.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.showtime?.movie?.genres
                              ?.slice(0, 2)
                              .map((genre) => genre.name)
                              .join(", ")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {moment(item.paidAt).format("DD/MM/YYYY")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {moment(item.paidAt).format("HH:mm")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-green-600">
                        {item.totalAmount.toLocaleString()}₫
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.tickets?.length || 0} vé
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/tickets/${item.invoiceId}`}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
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
                        Vé của bạn
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {(!thongTinHoaDon || thongTinHoaDon.length === 0) && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chưa có lịch sử đặt vé
              </h3>
              <p className="text-gray-500 mb-6">
                Bạn chưa đặt vé nào. Hãy đặt vé xem phim ngay!
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Đặt vé ngay
              </Link>
            </div>
          )}
        </div>

        {/* Statistics Footer */}
        {thongTinHoaDon && thongTinHoaDon.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {thongTinHoaDon.length}
              </div>
              <div className="text-gray-600">Tổng số đơn hàng</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {thongTinHoaDon.reduce(
                  (sum, item) => sum + (item.tickets?.length || 0),
                  0
                )}
              </div>
              <div className="text-gray-600">Tổng số vé đã mua</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {thongTinHoaDon
                  .reduce((sum, item) => sum + item.totalAmount, 0)
                  .toLocaleString()}
                ₫
              </div>
              <div className="text-gray-600">Tổng chi tiêu</div>
            </div>
          </div>
        )}
        
      </div>

    </div>
  );
};

export default BookingHistory;
