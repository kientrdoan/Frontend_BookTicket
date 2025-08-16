"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datVeAction,
  layChiTietPhongVeAction,
  layThongTinTicketAction,
} from "../redux/actions/QuanLyDatVeActions";
import SelectSeat from "../components/RenderSeat/render_seat";
import moment from "moment";
import { layThongTinNguoiDungAction } from "../redux/actions/QuanLyNguoiDungAction";

import {
  ArrowLeftOutlined,
} from "@ant-design/icons";

export default function Checkout(props) {
  const { infoShowtime, danhSachGheDangDat, danhSachIdGheDangDat, infoTicket } =
    useSelector((state) => state.QuanLyDatVeReducer);

  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    var action = layChiTietPhongVeAction(props.match.params.id);
    dispatch(action);
    dispatch(layThongTinNguoiDungAction());
    dispatch(layThongTinTicketAction(Number(props.match.params.id)));
  }, []);

  const handleCheckout = () => {
    var thongTinDatVe = {
      showtimeId: Number(props.match.params.id),
      seatIds: danhSachIdGheDangDat,
    };
    dispatch(datVeAction(thongTinDatVe));
  };

  const totalPrice = danhSachGheDangDat.length * infoShowtime.ticketPrice;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-8'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-8'>
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeftOutlined className="mr-2" />
            Quay lại
          </button>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            Đặt Vé Xem Phim
          </h1>
          <p className='text-gray-600'>Chọn ghế và hoàn tất đặt vé của bạn</p>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-4 gap-8 max-w-7xl mx-auto'>
          {/* Main Content - Seat Selection */}
          <div className='xl:col-span-3'>
            <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
              {/* Movie Info Header */}
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6'>
                <div className='flex items-center space-x-4'>
                  <div className='w-16 h-20 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                    <img
                      src={infoShowtime?.movie?.poster || "/placeholder.svg"}
                      alt={infoShowtime?.movie?.title}
                      className='w-full h-full object-cover rounded-lg'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://picsum.photos/64/80";
                      }}
                    />
                  </div>
                  <div>
                    <h2 className='text-2xl font-bold mb-1'>
                      {infoShowtime?.movie?.title}
                    </h2>
                    <p className='text-blue-100 mb-1'>
                      {infoShowtime.cinemaName} - {infoShowtime.roomName}
                    </p>
                    <div className='flex items-center space-x-4 text-sm text-blue-100'>
                      <span>
                        📅 {moment(infoShowtime.startTime).format("DD/MM/YYYY")}
                      </span>
                      <span>
                        🕐 {moment(infoShowtime.startTime).format("HH:mm")} -{" "}
                        {moment(infoShowtime.endTime).format("HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen and Seat Selection */}
              <div className='p-8'>
                {/* Screen */}
                <div className='flex flex-col items-center mb-8'>
                  <div className='w-4/5 h-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-t-lg shadow-lg mb-4'></div>
                  <div className='relative'>
                    <div className='w-80 h-12 bg-gradient-to-b from-gray-700 to-gray-800 transform perspective-1000 rotate-x-12 rounded-lg shadow-2xl flex items-center justify-center'>
                      <span className='text-white font-bold text-lg tracking-wider'>
                        MÀN HÌNH
                      </span>
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-lg'></div>
                  </div>
                </div>

                {/* Seat Selection Component */}
                <SelectSeat />
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className='xl:col-span-1'>
            <div className='bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24'>
              {/* Price Header */}
              <div className='bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 text-center'>
                <div className='text-3xl font-bold mb-1'>
                  {totalPrice.toLocaleString()}₫
                </div>
                <div className='text-green-100'>Tổng tiền</div>
              </div>

              {/* Booking Details */}
              <div className='p-6 space-y-6'>
                {/* Movie Details */}
                <div className='space-y-4'>
                  <div className='border-b border-gray-200 pb-4'>
                    <h3 className='font-bold text-lg text-gray-800 mb-2'>
                      {infoShowtime?.movie?.title}
                    </h3>
                    <div className='space-y-2 text-sm text-gray-600'>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-2 text-blue-500'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>{infoShowtime.cinemaName}</span>
                      </div>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-2 text-purple-500'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>{infoShowtime.roomName}</span>
                      </div>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-2 text-green-500'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>
                          {moment(infoShowtime.startTime).format("DD/MM/YYYY")}
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-2 text-orange-500'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>
                          {moment(infoShowtime.startTime).format("HH:mm")} -{" "}
                          {moment(infoShowtime.endTime).format("HH:mm")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Seats */}
                  <div className='border-b border-gray-200 pb-4'>
                    <h4 className='font-semibold text-gray-800 mb-3 flex items-center'>
                      <svg
                        className='w-5 h-5 mr-2 text-red-500'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      Ghế đã chọn
                    </h4>
                    {danhSachGheDangDat.length > 0 ? (
                      <div className='flex flex-wrap gap-2'>
                        {danhSachGheDangDat.map((ghe, index) => (
                          <span
                            key={index}
                            className='bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium'
                          >
                            {ghe}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className='text-gray-500 text-sm italic'>
                        Chưa chọn ghế nào
                      </p>
                    )}

                    {danhSachGheDangDat.length > 0 && (
                      <div className='mt-3 flex justify-between items-center text-sm'>
                        <span className='text-gray-600'>Số lượng:</span>
                        <span className='font-semibold text-gray-800'>
                          {danhSachGheDangDat.length} ghế
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Customer Info */}
                  <div className='space-y-3'>
                    <h4 className='font-semibold text-gray-800 flex items-center'>
                      <svg
                        className='w-5 h-5 mr-2 text-blue-500'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Thông tin khách hàng
                    </h4>
                    <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-2 text-gray-500'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                          <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                        </svg>
                        <span className='text-sm text-gray-700'>
                          {thongTinNguoiDung.email}
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-2 text-gray-500'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                        </svg>
                        <span className='text-sm text-gray-700'>
                          {thongTinNguoiDung.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                {danhSachGheDangDat.length > 0 && (
                  <div className='border-t border-gray-200 pt-4'>
                    <div className='space-y-2'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>
                          Giá vé ({danhSachGheDangDat.length} ghế)
                        </span>
                        <span className='text-gray-800'>
                          {totalPrice.toLocaleString()}₫
                        </span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Phí dịch vụ</span>
                        <span className='text-gray-800'>0₫</span>
                      </div>
                      <div className='border-t border-gray-200 pt-2'>
                        <div className='flex justify-between font-bold text-lg'>
                          <span className='text-gray-800'>Tổng cộng</span>
                          <span className='text-green-600'>
                            {totalPrice.toLocaleString()}₫
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={danhSachGheDangDat.length === 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                    danhSachGheDangDat.length > 0
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {danhSachGheDangDat.length > 0 ? (
                    <span className='flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 mr-2'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Thanh toán
                    </span>
                  ) : (
                    "Vui lòng chọn ghế"
                  )}
                </button>

                {/* Security Notice */}
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                  <div className='flex items-start'>
                    <svg
                      className='w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <div>
                      <p className='text-blue-800 text-xs font-medium mb-1'>
                        Thanh toán an toàn
                      </p>
                      <p className='text-blue-700 text-xs'>
                        Thông tin của bạn được bảo mật với công nghệ mã hóa SSL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
