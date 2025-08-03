import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { DOMAIN, TOKEN } from "@/utils/settings/config";

export default function Ticket() {
  const { invoiceId } = useParams();
  const { thongTinHoaDon } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const [qrMap, setQrMap] = useState({}); // 🟢 key: ticket.id -> URL QR

  const hoaDon = thongTinHoaDon.find(
    (item) => item.invoiceId === parseInt(invoiceId)
  );

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

  if (!hoaDon) {
    return (
      <div className='text-center mt-10 text-red-500'>
        Không tìm thấy hóa đơn!
      </div>
    );
  }

  const renderTickets = () => {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6'>
        {hoaDon.tickets.map((ticket, index) => (
          <div
            key={ticket.id || index}
            className='bg-white p-6 rounded-2xl shadow-lg border border-gray-200'
          >
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold text-gray-800'>
                🎫 Vé #{ticket.id}
              </h2>
              <span className='text-sm text-gray-500'>Ghế {ticket.seatId}</span>
            </div>

            <div className='space-y-2 text-sm'>
              <div>
                <span className='text-gray-500'>Tên phim: </span>
                <span className='font-medium text-indigo-600'>
                  {hoaDon.showtime?.movieTitle || "Chưa có tên phim"}
                </span>
              </div>

              <div>
                <span className='text-gray-500'>Rạp: </span>
                <span className='font-medium text-gray-800'>
                  {hoaDon.showtime?.cinemaName} - {hoaDon.showtime?.roomName}
                </span>
              </div>

              <div>
                <span className='text-gray-500'>Giờ chiếu: </span>
                <span className='text-gray-800'>
                  {dayjs(hoaDon.showtime?.startTime).format(
                    "HH:mm - DD/MM/YYYY"
                  )}
                </span>
              </div>

              <div>
                <span className='text-gray-500'>Giá vé: </span>
                <span className='font-bold text-green-600'>
                  {ticket.price.toLocaleString()}₫
                </span>
              </div>
            </div>

            {/* QR hiển thị sẵn */}
            {qrMap[ticket.id] ? (
              <img
                src={qrMap[ticket.id]}
                alt='QR Code'
                className='mt-4 w-full h-auto border rounded'
              />
            ) : (
              <p className='text-sm text-gray-400 mt-4'>Đang tải mã QR...</p>
            )}

            <div className='mt-4 border-t pt-2 text-gray-400 text-xs'>
              Vui lòng đến sớm 15 phút
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-center text-2xl font-semibold text-gray-700 mt-6'>
        Chi tiết vé - Hóa đơn #{hoaDon.invoiceId}
      </h1>
      {renderTickets()}
    </div>
  );
}
