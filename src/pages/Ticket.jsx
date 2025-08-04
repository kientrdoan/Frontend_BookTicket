import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { DOMAIN, TOKEN } from "@/utils/settings/config";
import { layThongTinChiTietHoaDonAction } from "@/redux/actions/QuanLyNguoiDungAction";
import { useDispatch } from "react-redux";


export default function Ticket() {
  const { invoiceId } = useParams();
  const [hoaDon, setHoaDon] = useState(null);
  const [qrMap, setQrMap] = useState({});
  const [showQRFor, setShowQRFor] = useState(null);
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchHoaDon = async () => {
      try {
        const result = await dispatch(layThongTinChiTietHoaDonAction(invoiceId));
        setHoaDon(result);
      } catch (error) {
        console.error("Lỗi lấy chi tiết hóa đơn", error);
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

  if (!hoaDon) {
    return (
      <div className='text-center mt-10 text-blue-500'>
        Đang tải thông tin hóa đơn...
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {hoaDon.tickets.map((ticket) => {
          const isShown = showQRFor === ticket.id;

          return (
            <div
              key={ticket.id}
              className='relative bg-white p-6 rounded-2xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-all duration-300 h-64'
              onClick={() =>
                setShowQRFor(showQRFor === ticket.id ? null : ticket.id)
              }
            >
              <div
                className={`transition-opacity duration-300 ${
                  isShown ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-xl font-bold text-gray-800'>
                    🎫 Vé #{ticket.id} - {hoaDon.showtime?.id}
                  </h2>
                  <span className='text-sm text-gray-500'>
                    Ghế {ticket.seatName}
                  </span>
                </div>

                <div className='space-y-2 text-sm'>
                  <div>
                    <span className='text-gray-500'>Tên phim: </span>
                    <span className='font-medium text-indigo-600'>
                      {hoaDon.showtime?.movie.title}
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
                      {dayjs(hoaDon.showtime?.startTime).format("HH:mm - DD/MM/YYYY")}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Kết thúc: </span>
                    <span className='text-gray-800'>
                      {dayjs(hoaDon.showtime?.endTime).format("HH:mm - DD/MM/YYYY")}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Giá vé: </span>
                    <span className='font-bold text-green-600'>
                      {ticket.price.toLocaleString()}₫
                    </span>
                  </div>
                </div>

                <div className='mt-4 text-gray-400 text-xs border-t pt-2'>
                  Click để xem mã QR
                </div>
              </div>

              {isShown && (
                <div className='absolute inset-0 flex flex-col justify-center items-center bg-white rounded-2xl p-4 h-full'>
                  <img
                    src={qrMap[ticket.id]}
                    alt='QR Code'
                    className='border rounded mb-2 max-h-40'
                  />
                  <p className='text-sm text-gray-500'>
                    Quét mã để kiểm tra vé
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
