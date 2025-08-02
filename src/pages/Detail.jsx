"use client";

import React, { useEffect, useState } from "react";
import { Button, CustomCard } from "@tsamantanis/react-glassmorphism";
import { Tabs, Modal } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";

import {
  layThongTinChiTietPhim,
  layThongTinLichChieuPhim,
} from "../redux/actions/QuanLyRapAction";

const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
  const lichChieuPhim = useSelector((state) => state.QuanLyRapReducer.lichChieuPhim);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const groupedByCinema = lichChieuPhim.reduce((acc, item) => {
    const cinema = item.cinemaName;
    const room = item.roomName;

    if (!acc[cinema]) acc[cinema] = {};
    if (!acc[cinema][room]) acc[cinema][room] = [];

    acc[cinema][room].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
    dispatch(layThongTinLichChieuPhim(id));
  }, []);

  const showTrailer = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

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
        effectColor='#fff'
        color='#fff'
        blur={10}
        borderRadius={0}
      >
        <div className='grid grid-cols-12'>
          <div className='col-span-5 col-start-3'>
            <div className='grid grid-cols-3 relative'>
              {/* Poster */}
              <img
                className='col-span-1'
                src={filmDetail.poster}
                style={{ width: "100%", height: 300 }}
                alt='poster'
              />

              {/* Overlay Icon */}
              <div
                className='absolute left-0 top-0 w-[33.33%] h-full flex items-center justify-center z-10'
                onClick={showTrailer}
              >
                <PlayCircleOutlined style={{ fontSize: "50px", color: "white", cursor: "pointer" }} />
              </div>

              {/* Info */}
              <div className='col-span-2 ml-5'>
                <p className='text-sm mb-4'>
                  Ngày chiếu: {moment(filmDetail.releaseDate).format("DD.MM.YYYY")}
                </p>
                <p className='text-4xl'>{filmDetail.title}</p>
                <p>{filmDetail.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lịch chiếu */}
        <div className='mt-10 ml-72 w-2/3 container bg-white px-5 py-5'>
          <Tabs defaultActiveKey='1' centered>
            <TabPane tab='Lịch chiếu' key='1' style={{ minHeight: 300 }}>
              <Tabs tabPosition='left'>
                {Object.entries(groupedByCinema).map(([cinemaName, rooms], index) => (
                  <TabPane
                    tab={<div className='text-center'>{cinemaName}</div>}
                    key={index}
                  >
                    {Object.entries(rooms).map(([roomName, showtimes], rIndex) => (
                      <div key={rIndex} className='mt-5'>
                        <p className='text-lg font-semibold'>{roomName}</p>
                        <div className='grid grid-cols-4 gap-3 mt-2'>
                          {showtimes.map((showtime) => (
                            <Link
                              key={showtime.id}
                              to={`/checkout/${showtime.id}`}
                              className='text-green-800 font-bold hover:text-orange-600'
                            >
                              {moment(showtime.startTime).format("DD/MM/YYYY hh:mm A")}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabPane>
                ))}
              </Tabs>
            </TabPane>
          </Tabs>
        </div>

         {/* Modal trailer */}
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={800}
          bodyStyle={{ padding: 0 }}
          destroyOnClose
        >
          <iframe
            width="100%"
            height="450"
            src={filmDetail.trailer?.replace("watch?v=", "embed/")}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal>
        
      </CustomCard>
    </div>
  );
}
