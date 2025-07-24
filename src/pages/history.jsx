import React from "react";

const BookingHistory = () => {
  const data = [
    {
      id: 4,
      tenPhim: "Doctor Strange in the Multiverse of Madness",
      thoiLuong: 120,
      ngayDat: "7/21/2025, 11:25 PM",
      tenRap: "CGV - Aeon Tân Phú, Rạp 8",
      maVe: 119576,
      tenGhe: "06",
      giaVe: "85.000",
      tongTien: "85.000",
    },
    {
      id: 3,
      tenPhim: "Doctor Strange in the Multiverse of Madness",
      thoiLuong: 120,
      ngayDat: "7/21/2025, 11:25 PM",
      tenRap: "CGV - Aeon Tân Phú, Rạp 8",
      maVe: 119575,
      tenGhe: "04",
      giaVe: "85.000",
      tongTien: "85.000",
    },
    {
      id: 2,
      tenPhim: "Doctor Strange in the Multiverse of Madness",
      thoiLuong: 120,
      ngayDat: "7/14/2025, 07:25 PM",
      tenRap: "CGV - Aeon Tân Phú, Rạp 9",
      maVe: 119514,
      tenGhe: "02, 04",
      giaVe: "85.000",
      tongTien: "170.000",
    },
    {
      id: 1,
      tenPhim: "Doctor Strange in the Multiverse of Madness",
      thoiLuong: 120,
      ngayDat: "7/14/2025, 07:25 PM",
      tenRap: "CGV - Aeon Tân Phú, Rạp 9",
      maVe: 119513,
      tenGhe: "01",
      giaVe: "85.000",
      tongTien: "85.000",
    },
  ];

  return (
    <div className="overflow-auto mx-4">
      <table className="min-w-[900px] w-full border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100 font-semibold">
          <tr>
            <th className="px-3 py-2 border">Stt</th>
            <th className="px-3 py-2 border">Tên phim</th>
            <th className="px-3 py-2 border">Thời lượng phim</th>
            <th className="px-3 py-2 border">Ngày đặt</th>
            <th className="px-3 py-2 border">Tên Rạp</th>
            <th className="px-3 py-2 border">Mã vé</th>
            <th className="px-3 py-2 border">Tên ghế</th>
            <th className="px-3 py-2 border">Giá vé(vnđ)</th>
            <th className="px-3 py-2 border">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-3 py-2 border">{item.id}</td>
              <td className="px-3 py-2 border">{item.tenPhim}</td>
              <td className="px-3 py-2 border">{item.thoiLuong}</td>
              <td className="px-3 py-2 border">{item.ngayDat}</td>
              <td className="px-3 py-2 border">{item.tenRap}</td>
              <td className="px-3 py-2 border">{item.maVe}</td>
              <td className="px-3 py-2 border">{item.tenGhe}</td>
              <td className="px-3 py-2 border">{item.giaVe}</td>
              <td className="px-3 py-2 border">{item.tongTien}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;
