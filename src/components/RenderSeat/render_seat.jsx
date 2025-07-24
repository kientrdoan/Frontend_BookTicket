import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SeatCell from "./seat_cell";

export default function SelectSeat() {
  const dispatch = useDispatch();
  const { danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);

  const chuyenXe = { listMaGhe: [] };

  const handleSelectSeat = (seat) => {
    let index = danhSachGheDangDat.indexOf(seat);
    let existInListVeXe = chuyenXe.listMaGhe.indexOf(seat);

    if (existInListVeXe === -1) {
      let newData = [...danhSachGheDangDat];
      if (index !== -1) {
        newData.splice(index, 1);
      } else {
        if (newData.length < 5) {
          newData.push(seat);
        } else {
          return;
        }
      }

      dispatch({
        type: "CHANGE_SELECT_SEAT",
        danhSachGheDangDat: newData,
      });
    }
  };

  const getSeatLabel = (label, number) => {
    return `${label}${String(number).padStart(2, "0")}`;
  };

  const render_seat = (label) => {
    const rows = [];
    let numberSeat = 1;

    for (let i = 0; i < 7; i++) {
      const row = (
        <tr key={`${label}-${i}`} className='flex items-center gap-1 justify-between'>
          {[0, 1, 2].map((offset, idx) => {
            const seatNumber = numberSeat + offset;
            const seatLabel = getSeatLabel(label, seatNumber);
            const isDisabled = chuyenXe.listMaGhe.includes(seatLabel);
            const isSelected = danhSachGheDangDat.includes(seatLabel);
            const overLimit = !isSelected && danhSachGheDangDat.length >= 5;

            return (
              <React.Fragment key={seatLabel}>
                <SeatCell
                  seatLabel={seatLabel}
                  isDisabled={isDisabled || overLimit}
                  isSelected={isSelected}
                  onSelect={handleSelectSeat}
                />
                {idx !== 2 && <td className='relative w-6' />}
              </React.Fragment>
            );
          })}
        </tr>
      );

      numberSeat += 3;
      rows.push(row);
    }

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  const renderSeatMemoA = useMemo(() => render_seat("A"), [danhSachGheDangDat]);
  const renderSeatMemoB = useMemo(() => render_seat("B"), [danhSachGheDangDat]);

  return (
    <div className=''>
      <div className='max-w-md mx-auto'>
        <div className='mx-auto flex max-w-2xl flex-col px-3 py-1'>

          {/* Thong Tin Tang Ghe */}
          <div className='my-4 flex flex-row px-[8px] gap-[16px] text-center font-medium justify-center'>
            <div className='flex min-w-[50%] flex-col'>
              <div className='icon-gray flex w-full justify-center p-2 text-sm'>
                <span>Bên trái</span>
              </div>
              <div className='divide mb-4' />
              {renderSeatMemoA}
            </div>

            <div className='flex min-w-[50%] flex-col'>
              <div className='icon-gray flex w-full justify-center p-2 text-sm'>
                <span>Bên phải</span>
              </div>
              <div className='divide mb-4 2lg:hidden' />
              {renderSeatMemoB}
            </div>
          </div>

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

        </div>
      </div>
    </div>
  );
}
