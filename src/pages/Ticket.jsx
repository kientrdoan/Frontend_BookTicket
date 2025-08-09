"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { Modal } from "antd";
import { DOMAIN, TOKEN } from "@/utils/settings/config";
import { layThongTinChiTietHoaDonAction } from "@/redux/actions/QuanLyNguoiDungAction";
import { useDispatch } from "react-redux";

export default function Ticket() {
  const { invoiceId } = useParams();
  const [hoaDon, setHoaDon] = useState(null);
  const [qrMap, setQrMap] = useState({});
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHoaDon = async () => {
      try {
        setIsLoading(true);
        const result = await dispatch(
          layThongTinChiTietHoaDonAction(invoiceId)
        );
        setHoaDon(result);
      } catch (error) {
        console.error("Lỗi lấy chi tiết hóa đơn", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoaDon();
  }, [invoiceId]);

  useEffect(() => {
    const fetchAllQRCodes = async () => {
      if (!hoaDon?.tickets) return;
      const map = {};
      await Promise.all(
        hoaDon.tickets.map(async (ticket) => {
          try {
            const res = await axios.get(
              `${DOMAIN}/tickets/${ticket.id}/qr-code`,
              {
                responseType: "blob",
                headers: {
                  Authorization: "Bearer " + localStorage.getItem(TOKEN),
                },
              }
            );
            const imageUrl = URL.createObjectURL(res.data);
            map[ticket.id] = imageUrl;
          } catch (error) {
            console.error("Lỗi lấy QR của ticket", ticket.id, error);
          }
        })
      );
      setQrMap(map);
    };

    fetchAllQRCodes();
  }, [hoaDon]);

  const handleShowQR = (ticket) => {
    setSelectedTicket(ticket);
    setIsQRModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Đang tải thông tin vé...
          </p>
        </div>
      </div>
    );
  }

  if (!hoaDon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Không tìm thấy thông tin vé
          </h2>
          <p className="text-gray-500 mb-6">
            Vui lòng kiểm tra lại mã đơn hàng
          </p>
          <Link
            to="/history"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Quay lại lịch sử
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <Link to="/history" className="hover:text-blue-600 transition-colors">
            Lịch sử đặt vé
          </Link>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-gray-900 font-medium">Chi tiết vé</span>
        </nav>

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-20 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <img
                    src={hoaDon.showtime?.movie?.poster || "/placeholder.svg"}
                    alt={hoaDon.showtime?.movie?.title}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://picsum.photos/64/80";
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-1">
                    {hoaDon.showtime?.movie?.title}
                  </h1>
                  <p className="text-blue-100 mb-1">
                    {hoaDon.showtime?.cinemaName} - {hoaDon.showtime?.roomName}
                  </p>
                  <p className="text-blue-100 text-sm">
                    {dayjs(hoaDon.showtime?.startTime).format(
                      "dddd, DD/MM/YYYY • HH:mm"
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">
                  {hoaDon.tickets?.length || 0}
                </div>
                <div className="text-blue-100">vé đã đặt</div>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="px-8 py-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {dayjs(hoaDon.showtime?.startTime).format("HH:mm")}
                </div>
                <div className="text-gray-600 text-sm">Giờ chiếu</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {dayjs(hoaDon.showtime?.endTime).format("HH:mm")}
                </div>
                <div className="text-gray-600 text-sm">Kết thúc</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {hoaDon.totalAmount?.toLocaleString()}₫
                </div>
                <div className="text-gray-600 text-sm">Tổng tiền</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  #{invoiceId}
                </div>
                <div className="text-gray-600 text-sm">Mã đơn hàng</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hoaDon.tickets?.map((ticket, index) => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Ticket Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
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
                    <span className="font-bold">VÉ #{ticket.id}</span>
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    Ghế {ticket.seatName}
                  </span>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Phim:</span>
                    <span className="font-bold text-gray-900 text-right max-w-[200px] truncate">
                      {hoaDon.showtime?.movie?.title}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Rạp:</span>
                    <span className="text-gray-900 text-right max-w-[200px] truncate">
                      {hoaDon.showtime?.cinemaName}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Phòng:</span>
                    <span className="text-gray-900">
                      {hoaDon.showtime?.roomName}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Ngày chiếu:
                    </span>
                    <span className="text-gray-900">
                      {dayjs(hoaDon.showtime?.startTime).format("DD/MM/YYYY")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Giờ chiếu:
                    </span>
                    <span className="text-gray-900">
                      {dayjs(hoaDon.showtime?.startTime).format("HH:mm")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-600 font-medium">Giá vé:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {ticket.price?.toLocaleString()}₫
                    </span>
                  </div>
                </div>

                {/* QR Button */}
                <button
                  onClick={() => handleShowQR(ticket)}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
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
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                  <span>Xem mã QR</span>
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="relative">
                <div className="absolute left-0 top-0 w-6 h-6 bg-gray-50 rounded-full transform -translate-x-3"></div>
                <div className="absolute right-0 top-0 w-6 h-6 bg-gray-50 rounded-full transform translate-x-3"></div>
                <div className="border-t-2 border-dashed border-gray-200"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            to="/history"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Quay lại lịch sử đặt vé
          </Link>
        </div>
      </div>

      {/* QR Code Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-3">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
            <span>
              Mã QR - Vé #{selectedTicket?.id} - Ghế {selectedTicket?.seatName}
            </span>
          </div>
        }
        open={isQRModalOpen}
        onCancel={() => setIsQRModalOpen(false)}
        footer={null}
        width={400}
        centered
        className="qr-modal"
      >
        <div className="text-center py-6">
          {selectedTicket && qrMap[selectedTicket.id] ? (
            <>
              <div className="bg-white p-4 rounded-xl shadow-inner mb-4 inline-block">
                <img
                  src={qrMap[selectedTicket.id] || "/placeholder.svg"}
                  alt="QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 font-medium">
                  Vui lòng xuất trình mã QR này tại rạp
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-800">
                    <div className="font-semibold mb-1">
                      {hoaDon.showtime?.movie?.title}
                    </div>
                    <div>
                      {hoaDon.showtime?.cinemaName} -{" "}
                      {hoaDon.showtime?.roomName}
                    </div>
                    <div>
                      {dayjs(hoaDon.showtime?.startTime).format(
                        "DD/MM/YYYY • HH:mm"
                      )}
                    </div>
                    <div className="font-semibold mt-1">
                      Ghế: {selectedTicket.seatName}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải mã QR...</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
