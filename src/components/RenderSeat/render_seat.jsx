import React from "react";
import seat_active from "../../assets/images/seat_active.svg";
import seat_selecting from "../../assets/images/seat_selecting.svg";
import seat_disabled from "../../assets/images/seat_disabled.svg";
import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from 'react-redux';

export default function SelectSeat() {
  let dispatch = useDispatch();

  var selectSeat = [];
  var chuyenXe = { listMaGhe: [] };

  // CHUYỀN DATA LÊN REDUX
  const handleSelectSeat = (seat) => {
    // console.log(seat)
    let index = selectSeat.indexOf(seat);
    let existInListVeXe = chuyenXe.listMaGhe.indexOf(seat);
    if (existInListVeXe === -1) {
      if (index !== -1) {
        let newData = [...selectSeat];
        newData.splice(index, 1);
        dispatch({
          type: "CHANGE_SELECT_SEAT",
          selectSeat: newData,
        });
      } else {
        if (selectSeat.length < 5) {
          let newData = [...selectSeat];
          newData.push(seat);
          dispatch({
            type: "CHANGE_SELECT_SEAT",
            selectSeat: newData,
          });
        }
      }
    }
    // console.log(selectSeat)
  };

  function getSeatLabel(label, numberSeat) {
    // Thêm số 0 phía trước nếu số ghế ít hơn 10
    const seatNumber = String(numberSeat).padStart(2, "0"); // Chuyển số thành chuỗi, thêm 0 nếu cần
    const seatLabel = `${label}${seatNumber}`; // Tạo định dạng ghế như "A01", "A02", v.v.
    return seatLabel;
  }

  const render_seat = (label) => {
    const rows = [];
    var numberSeat = 1

    // Lặp qua từng dòng để tạo ra hàng ghế
    for (let i = 0; i < 7; i += 1) {
      const row = (
        <tr
          key={i}
          className='flex items-center gap-1 justify-between'
        >
          <td
            onClick={() => {
              handleSelectSeat(getSeatLabel(label, numberSeat));
            }}
            className={`relative mt-1 flex justify-center text-center ${
              chuyenXe.listMaGhe.includes(getSeatLabel(label, numberSeat)) ||
              (selectSeat.includes(getSeatLabel(label, numberSeat)) === false &&
                selectSeat.length >= 5)
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {/* Hinh anh minh hoa ghe */}
            <img
              width={45}
              src={
                chuyenXe.listMaGhe.includes(getSeatLabel(label, i))
                  ? seat_disabled
                  : selectSeat.includes(getSeatLabel(label, i))
                  ? seat_selecting
                  : seat_active
              }
              alt='seat icon'
            />
            {/* Ten Ghe */}
            <span className='absolute text-sm font-semibold text-[#A2ABB3] top-[0.55rem]'>
              {getSeatLabel(label, numberSeat)}
            </span>
          </td>
          
          <td className='relative w-6' />

          <td
            onClick={() => {
              handleSelectSeat(getSeatLabel(label, numberSeat+1));
            }}
            className={`relative mt-1 flex justify-center text-center ${
              chuyenXe.listMaGhe.includes(
                getSeatLabel(label, i)
              ) ||
              (selectSeat.includes(getSeatLabel(label, numberSeat + 1)) ===
                false &&
                selectSeat.length >= 5)
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <img
              width={45}
              src={
                chuyenXe.listMaGhe.includes(getSeatLabel(label, numberSeat +1 ))
                  ? seat_disabled
                  : selectSeat.includes(getSeatLabel(label, numberSeat + 1 ))
                  ? seat_selecting
                  : seat_active
              }
              alt='seat icon'
            />
            <span className='absolute text-sm font-semibold text-[#A2ABB3] top-[0.55rem]'>
              {getSeatLabel(label, numberSeat + 1)}
            </span>
          </td>

          <td className='relative w-6' />

          <td
            onClick={() => {
              handleSelectSeat(getSeatLabel(label, numberSeat + 2 ));
            }}
            className={`relative mt-1 flex justify-center text-center ${
              chuyenXe.listMaGhe.includes(
                getSeatLabel(label, numberSeat + 2 )
              ) ||
              (selectSeat.includes(getSeatLabel(label, numberSeat + 2 )) ===
                false &&
                selectSeat.length >= 5)
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <img
              width={45}
              src={
                chuyenXe.listMaGhe.includes(getSeatLabel(label, numberSeat + 2))
                  ? seat_disabled
                  : selectSeat.includes(getSeatLabel(label, numberSeat + 2))
                  ? seat_selecting
                  : seat_active
              }
              alt='seat icon'
            />
            <span className='absolute text-sm font-semibold text-[#A2ABB3] top-[0.55rem]'>
              {getSeatLabel(label, numberSeat + 2)}
            </span>
          </td>
        </tr>
      );
      numberSeat = numberSeat + 3
      rows.push(row);
    }

    return (
      <table>
        <tbody>
          {rows} {/* Thêm tất cả các hàng vào bảng */}
        </tbody>
      </table>
    );
  };

  return (
    <div className=''>
      <div className='max-w-md mx-auto'>
        <div className='mx-auto flex max-w-2xl flex-col px-3 py-1'>
          
          {/* Trang Thai */}
          <div className='flex justify-between text-[13px] font-normal'>
            <span className='mr-8 flex items-center'>
              <div className='mr-2 h-4 w-4 rounded bg-[#D5D9DD] border-[#C0C6CC]' />
              Đã bán
            </span>
            <span className='mr-8 flex items-center'>
              <div className='mr-2 h-4 w-4 rounded bg-[#DEF3FF] border-[#96C5E7]' />
              Còn trống
            </span>
            <span className='flex items-center'>
              <div className='mr-2 h-4 w-4 rounded bg-[#FDEDE8] border-[#F8BEAB]' />
              Đang chọn
            </span>
          </div>

          {/* Thong Tin Tang Ghe */}
          <div className='my-4 flex flex-row px-[8px] gap-[16px] text-center font-medium justify-center'>
            <div className='flex min-w-[50%] flex-col'>
              <div className='icon-gray flex w-full justify-center p-2 text-sm'>
                <span>Bên trái</span>
              </div>
              <div className='divide mb-4' />
              {render_seat("A")}
            </div>

            <div className='flex min-w-[50%] flex-col'>
              <div className='icon-gray flex w-full justify-center p-2 text-sm'>
                <span>Bên phải</span>
              </div>
              <div className='divide mb-4 2lg:hidden' />
              {render_seat("B")}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
