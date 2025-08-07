import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SeatCell from "./seat_cell";
import { message } from 'antd';

export default function SelectSeat() {
  const dispatch = useDispatch();
  const { infoShowtime, danhSachGheDangDat, danhSachIdGheDangDat, infoTicket } =
    useSelector((state) => state.QuanLyDatVeReducer);

  const [messageApi, contextHolder] = message.useMessage();

  const seats = infoShowtime?.room?.seats || [];

  const handleSelectSeat = (seatLabel, seatId) => {
    const index = danhSachGheDangDat.indexOf(seatLabel);
    const newSelection = [...danhSachGheDangDat];
    const newIdSelection = [...(danhSachIdGheDangDat || [])];

    if (index !== -1) {
      newSelection.splice(index, 1);
      newIdSelection.splice(index, 1);
    } else {
      if (newSelection.length < 5) {
        newSelection.push(seatLabel);
        newIdSelection.push(seatId);
      } else {
        messageApi.warning("Bạn chỉ được chọn tối đa 5 ghế!");
        return;
      }
    }

    dispatch({
      type: "CHANGE_SELECT_SEAT",
      danhSachGheDangDat: newSelection,
    });

    dispatch({
      type: "CHANGE_SELECT_ID_SEAT",
      danhSachIdGheDangDat: newIdSelection,
    });
  };

  const checkSeatIsBooked = (seatId) => {
    return infoTicket.some((item) => seatId === item.seat.id);
  };

  // Render tất cả ghế, mỗi hàng 12 ghế
  const renderSeats = () => {
    const rows = [];
    for (let i = 0; i < seats.length; i += 8) {
      const rowSeats = seats.slice(i, i + 8);
      const row = (
        <tr key={`row-${i}`} className='flex items-center gap-2 mb-2'>
          {rowSeats.map((seat) => {
            const isBooked = checkSeatIsBooked(seat.id);
            const isSelected = danhSachGheDangDat.includes(seat.name);
            const overLimit = !isSelected && danhSachGheDangDat.length >= 5;

            return (
              <SeatCell
                key={seat.id}
                seatLabel={seat.name}
                // isDisabled={isBooked || overLimit}
                isDisabled={isBooked}
                isSelected={isSelected}
                // className={`${overLimit ? "cursor-not-allowed" : "cursor-pointer"}`}
                onSelect={() => handleSelectSeat(seat.name, seat.id)}
              />
            );
          })}
        </tr>
      );
      rows.push(row);
    }

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <div className='max-w-4xl mx-auto'>
      {contextHolder}
      <div className='text-center text-lg font-semibold my-4'>Chọn Ghế</div>

      {/* Danh sách ghế */}
      <div className='overflow-x-auto flex justify-center'>{renderSeats()}</div>

      {/* Trạng thái ghế */}
      <div className='mt-5 flex justify-center gap-10 text-sm'>
        <div className='flex items-center'>
          <div className='w-4 h-4 rounded bg-[#D5D9DD] border border-[#C0C6CC] mr-2' />
          Đã bán
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 rounded bg-[#DEF3FF] border border-[#96C5E7] mr-2' />
          Còn trống
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 rounded bg-[#FDEDE8] border border-[#F8BEAB] mr-2' />
          Đang chọn
        </div>
      </div>
    </div>
  );
}
