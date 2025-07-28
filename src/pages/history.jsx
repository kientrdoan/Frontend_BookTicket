import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinHoaDonAction } from "../redux/actions/QuanLyNguoiDungAction";

const BookingHistory = () => {
  const { thongTinHoaDon } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();

  console.log("hoa don", thongTinHoaDon);

  useEffect(() => {
    var action = layThongTinHoaDonAction();
    dispatch(action);
  }, []);

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
            <th className='px-3 py-2 border'>Danh sách vé</th>
          </tr>
        </thead>
        <tbody>
          {thongTinHoaDon?.map((item, index) => (
            <tr key={item.id}>
              <td className='px-3 py-2 border'>{index}</td>
              <td className='px-3 py-2 border'>{item.showtime.cinemaName}</td>
              <td className='px-3 py-2 border'>{item.showtime.movie.title}</td>
              <td className='px-3 py-2 border'>{item.paidAt}</td>
              <td className='px-3 py-2 border'>{item.totalAmount}</td>
              <td className='px-3 py-2 border'>
                {item.tickets.map((ticket) => ticket.seatName).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
};

export default BookingHistory;
