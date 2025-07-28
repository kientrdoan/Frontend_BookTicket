import React, { useEffect } from "react";
import { Button, CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../assets/styles/circle.scss";
import { Tabs, Radio, Space, Rate } from "antd";
// import { useSelector, useDispatch } from 'react-redux';
// import { SET_CHI_TIET_PHIM } from '../../redux/actions/types/QuanLyRapType';
// import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import moment from "moment"; //npm i moment
// import { StarFilled, StarOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import {
  layThongTinChiTietPhim,
  layThongTinLichChieuPhim,
} from "../redux/actions/QuanLyRapAction";
import { useDispatch, useSelector } from "react-redux";
const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
  const lichChieuPhim = useSelector(
    (state) => state.QuanLyRapReducer.lichChieuPhim
  );

  // Group data theo cinema → room
  const groupedByCinema = lichChieuPhim.reduce((acc, item) => {
    const cinema = item.cinemaName;
    const room = item.roomName;

    if (!acc[cinema]) acc[cinema] = {};
    if (!acc[cinema][room]) acc[cinema][room] = [];

    acc[cinema][room].push(item);
    return acc;
  }, {});

  console.log("film detail", filmDetail);
  console.log("Lich chieu phim", lichChieuPhim);

  const dispatch = useDispatch();

  useEffect(() => {
    //Lấy thông tin param từ url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));

    dispatch(layThongTinLichChieuPhim(id));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.poster})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{ paddingTop: 150, minHeight: "100vh" }}
        effectColor='#fff' // required
        color='#fff' // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className='grid grid-cols-12'>
          <div className='col-span-5 col-start-3'>
            <div className='grid grid-cols-3'>
              {/* Hinh anh */}
              <img
                className='col-span-1'
                src={filmDetail.poster}
                style={{ width: "100%", height: 300 }}
                alt='123'
              />
              {/* Block Info */}
              <div className='col-span-2 ml-5'>
                <p className='text-sm mb-4'>
                  Ngày chiếu:{" "}
                  {moment(filmDetail.releaseDate).format("DD.MM.YYYY")}
                </p>

                <p className='text-4xl'>{filmDetail.title}</p>

                <p>{filmDetail.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-10 ml-72 w-2/3 container bg-white px-5 py-5'>
          <Tabs defaultActiveKey='1' centered>
            <TabPane tab='Lịch chiếu' key='1' style={{ minHeight: 300 }}>
              <Tabs tabPosition='left'>
                {Object.entries(groupedByCinema).map(
                  ([cinemaName, rooms], index) => (
                    <TabPane
                      tab={<div className='text-center'>{cinemaName}</div>}
                      key={index}
                    >
                      {Object.entries(rooms).map(
                        ([roomName, showtimes], rIndex) => (
                          <div key={rIndex} className='mt-5'>
                            <p className='text-lg font-semibold'>{roomName}</p>
                            <div className='grid grid-cols-4 gap-3 mt-2'>
                              {showtimes.map((showtime) => (
                                <NavLink
                                  key={showtime.id}
                                  to={`/checkout/${showtime.id}`}
                                  className='text-green-800 font-bold hover:text-orange-600'
                                >
                                  {moment(showtime.startTime).format("DD/MM/YYYY hh:mm A")}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </TabPane>
                  )
                )}
              </Tabs>
            </TabPane>

            {/* <TabPane tab='Thông tin' key='2' style={{ minHeight: 300 }}>
              Thông tin
            </TabPane>
            <TabPane tab='Đánh giá' key='3' style={{ minHeight: 300 }}>
              Đánh giá
            </TabPane> */}
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
