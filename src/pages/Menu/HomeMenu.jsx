"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimTheoCinameAndRoomAction } from "../../redux/actions/QuanLyPhimAction";
import { useHistory } from "react-router-dom";
import { USER_LOGIN } from "@/utils/settings/config";

const { TabPane } = Tabs;

const HomeMenu = ({ heThongRapChieu }) => {
  const [tabPosition] = useState("left");
  const [activeCinemaKey, setActiveCinemaKey] = useState("0");
  const [activeRoomKey, setActiveRoomKey] = useState("0");

  const dispatch = useDispatch();
  const history = useHistory();
  const { arrFilmByRoom } = useSelector((state) => state.QuanLyPhimReducer);

  const uniqueFilms = Array.from(
    new Map(arrFilmByRoom.map((phim) => [phim.title, phim])).values()
  );

  // Khi load lần đầu
  useEffect(() => {
    if (heThongRapChieu?.length > 0) {
      const firstCinema = heThongRapChieu[0];
      const firstRoom = firstCinema.rooms?.[0];
      if (firstRoom?.id) {
        dispatch(layDanhSachPhimTheoCinameAndRoomAction(firstRoom.id));
      }
    }
  }, [heThongRapChieu]);

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, cinemaIndex) => (
      <TabPane
        key={cinemaIndex}
        tab={
          <h2
            onClick={() => {
              const firstRoom = heThongRap.rooms?.[0];
              if (firstRoom?.id) {
                dispatch(layDanhSachPhimTheoCinameAndRoomAction(firstRoom.id));
              }
              setActiveCinemaKey(String(cinemaIndex));
              setActiveRoomKey("0");
            }}
          >
            {heThongRap.name}
          </h2>
        }
      >
        <Tabs
          tabPosition={tabPosition}
          activeKey={
            activeCinemaKey === String(cinemaIndex) ? activeRoomKey : "0"
          }
          onChange={(roomKey) => {
            setActiveRoomKey(roomKey);
            const selectedRoom = heThongRap.rooms?.[roomKey];
            if (selectedRoom?.id) {
              dispatch(layDanhSachPhimTheoCinameAndRoomAction(selectedRoom.id));
            }
          }}
        >
          {heThongRap.rooms?.map((room, roomIdx) => (
            <TabPane
              tab={
                <div style={{ width: "300px", display: "flex" }}>
                  <div className='text-left ml-2'>{room.name}</div>
                </div>
              }
              key={String(roomIdx)}
            >
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
              >
                {uniqueFilms.map((phim, phimIdx) => (
                  <Fragment key={phimIdx}>
                    <div className='my-5'>
                      <div style={{ display: "flex" }}>
                        <img
                          style={{ height: 75, width: 75 }}
                          src={phim.poster}
                          alt={phim.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://picsum.photos/75/75";
                          }}
                        />
                        <div
                          className='ml-2 text-blue-500 cursor-pointer hover:underline'
                          onClick={() => {
                            const userLogin = localStorage.getItem(USER_LOGIN);
                            if (userLogin) {
                              history.push(`/detail/${phim.id}`);
                            } else {
                              history.push("/login");
                            }
                          }}
                        >
                          {phim.title}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                ))}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </TabPane>
    ));
  };

  return (
    <Tabs
      tabPosition={tabPosition}
      activeKey={activeCinemaKey}
      onChange={(key) => {
        setActiveCinemaKey(key);
        setActiveRoomKey("0");
        const cinema = heThongRapChieu[key];
        const firstRoom = cinema?.rooms?.[0];
        if (firstRoom?.id) {
          dispatch(layDanhSachPhimTheoCinameAndRoomAction(firstRoom.id));
        }
      }}
    >
      {renderHeThongRap()}
    </Tabs>
  );
};

export default HomeMenu;
