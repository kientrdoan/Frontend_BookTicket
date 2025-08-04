import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinHoaDonAction } from "../redux/actions/QuanLyNguoiDungAction";
import { DOMAIN, TOKEN } from "../utils/settings/config";
import { Link } from "react-router-dom";

const BookingHistory = () => {
  const { thongTinHoaDon } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  const [qrData, setQrData] = useState(null);
  // const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    dispatch(layThongTinHoaDonAction());
  }, []);

  // const handleClickTicket = async (ticketId) => {
  //   try {
  //     const res = await axios.get(`${DOMAIN}/tickets/${ticketId}/qr-code`, {
  //       responseType: "blob",
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem(TOKEN),
  //       },
  //     });
  //     const imageUrl = URL.createObjectURL(res.data);
  //     setQrData(imageUrl);
  //     setShowModal(true);
  //   } catch (error) {
  //     console.error("Lỗi lấy QR:", error);
  //     alert("Không lấy được mã QR");
  //   }
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  //   setQrData(null);
  // };

  return (
    <div className='overflow-auto mx-4'>
      <table className='min-w-[900px] w-full border border-gray-300 text-sm text-left'>
        <thead className='bg-gray-100 font-semibold'>
          <tr>
            <th className='px-3 py-2 border'>Stt</th>
            <th className='px-3 py-2 border'>Tên Rạp</th>
            <th className='px-3 py-2 border'>Tên phim</th>
            <th className='px-3 py-2 border'>Thời gian đặt</th>
            <th className='px-3 py-2 border'>Tổng tiền</th>
            <th className='px-3 py-2 border'>Danh sách Vé</th>
            {/* <th className='px-3 py-2 border'>Xem mã QR</th> */}
          </tr>
        </thead>
        <tbody>
          {thongTinHoaDon?.map((item, index) => (
            <tr key={item.id}>
              <td className='px-3 py-2 border'>{index + 1}</td>
              <td className='px-3 py-2 border'>{item.showtime.cinemaName}</td>
              <td className='px-3 py-2 border'>{item.showtime.movie.title}</td>
              <td className='px-3 py-2 border'>
                {moment(item.paidAt).format("DD/MM/YYYY HH:mm")}
              </td>
              <td className='px-3 py-2 border'>
                {item.totalAmount.toLocaleString()}₫
              </td>
              <td className='px-3 py-2 border space-x-1'>
                {/* {item.tickets.map((ticket, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleClickTicket(ticket.id)}
                    className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'
                  >
                    {ticket.seatName}
                  </button>
                ))} */}

                <Link to={`/tickets/${item.invoiceId}`}>
                  Vé của bạn
                </Link>
              </td>
              {/* <td className='px-3 py-2 border'>
                <button
                  className='text-blue-600 underline'
                  onClick={() => handleClickTicket(item.id)}
                >
                  Xem QR
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* QR Code Modal */}
      {/* {showModal && (
        <div className='fixed mt-20 inset-0 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-lg shadow-lg relative w-72 text-center'>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg'
            >
              &times;
            </button>

            <h3 className='mb-3 font-semibold text-lg'>Mã QR của bạn</h3>

            <img
              src={qrData}
              alt='QR Code'
              className='w-full h-auto border rounded'
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default BookingHistory;
