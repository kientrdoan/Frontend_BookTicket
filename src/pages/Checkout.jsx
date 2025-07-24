import React, { useEffect } from "react";

import style from "../assets/styles/Checkout.module.css";
import zalo from "../assets/images/zalo.jpg";

import { useDispatch, useSelector } from "react-redux";
import { layChiTietPhongVeAction } from "../redux/actions/QuanLyDatVeActions";
import SelectSeat from "../components/RenderSeat/render_seat";

export default function Checkout(props) {
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );

  console.log(chiTietPhongVe);
  const dispatch = useDispatch();
  useEffect(() => {
    var action = layChiTietPhongVeAction(props.match.params.id);
    dispatch(action);
  }, []);

  return (
    <div className='container min-h-screen' style={{ minHeight: "100vh" }}>
      <div className='grid grid-cols-12'>
        {/* Cột bên trái */}
        <div className='col-span-9'>
          <div className='flex flex-col items-center mt-5'>
            {/* Thanh màu đen mô phỏng màn hình */}
            <div
              className='bg-black'
              style={{ width: "80%", height: 15 }}
            ></div>

            {/* Hình thang + chữ "Màn hình" */}
            <div className={`${style["trapezoid"]} text-center`}>
              <h3 className='mt-3 text-black'>Màn hình</h3>
            </div>

            {/* Render Ghe Ngoi */}
            <SelectSeat></SelectSeat>
          </div>
        </div>

        {/* Cột bên phải */}
        <div className='col-span-3 flex flex-col' style={{height: "100vh"}}>
          <div>
            {/* Giá tiền */}
            <h3 className='text-green-400 text-center text-2xl'>
              {danhSachGheDangDat.length * 1}đ
            </h3>

            {/* Thông tin phim */}
            <h3 className='text-xl mt-5'>Lật mặt 48h</h3>
            <p>Địa điểm: BHD Star – Vincom 3/2</p>
            <p>Ngày chiếu: 25/04/2021 – 12:05 RAP 5</p>
            <hr />

            {/* Ghế ngồi */}
            <div className='flex flex-row my-5'>
              <div className='w-4/5'>
                <span className='text-red-400 text-lg'>
                  Ghế: {danhSachGheDangDat.join(" ")}
                </span>
              </div>
              <div className='text-right col-span-1'>
                <span className='text-green-800 text-lg'>
                  {danhSachGheDangDat.length * 1}đ
                </span>
              </div>
            </div>

            {/* Email */}
            <div className='my-5'>
              <span>Email:</span>
              <br />
              {/* {userLogin.email} */}
            </div>

            {/* Số điện thoại */}
            <div className='my-5'>
              <span>Phone:</span>
              <br />
              {/* {userLogin.soDienThoai} */}
            </div>

            <hr />
            {/* Hình thức thanh toán */}
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <input
                  className=''
                  type='radio'
                  name='paymentMethod'
                  value='ZaloPay'
                />
                <img
                  className='m-2'
                  style={{ maxWidth: "40px" }}
                  src={zalo}
                  alt='zalopay'
                />
                <label>Thanh toán qua ZaloPay</label>
              </div>

              <div className='flex pt-2 items-center'>
                <input
                  className=''
                  type='radio'
                  name='paymentMethod'
                  value='ZaloPay'
                />
                <img
                  className='m-2'
                  style={{ maxWidth: "40px" }}
                  src={zalo}
                  alt='zalopay'
                />
                <label>Thanh toán qua ZaloPay</label>
              </div>
            </div>
          </div>

          <hr />
          <div className='mb-0 flex-1 flex flex-col justify-end items-center'>
            <div className='bg-green-500 text-white w-full text-center py-3 font-bold text-xl'>
              Dat Ve
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
