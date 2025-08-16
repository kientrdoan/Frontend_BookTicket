"use client";
import { useEffect, useState } from "react";
import { Tabs, Rate, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimTheoCinameAndRoomAction } from "../../redux/actions/QuanLyPhimAction";
import { useHistory } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "@/utils/settings/config";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

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

  const handleMovieClick = (phim) => {
    const login = localStorage.getItem(TOKEN);
    if (login) {
      history.push(`/detail/${phim.id}`);
    } else {
      history.push("/login");
    }
  };

  const renderCinemaTab = (heThongRap, cinemaIndex) => (
    <div className="cinema-tab-content">
      <div className="cinema-info mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {heThongRap.name}
        </h3>
        <div className="flex items-center text-gray-600 text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{heThongRap.address || "Địa chỉ đang cập nhật"}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mt-1">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span>{heThongRap.phone || "Hotline: 1900-xxxx"}</span>
        </div>
      </div>
    </div>
  );

  const renderRoomMovies = (room, roomIdx, heThongRap) => (
    <div className="room-content">
      {/* Room Header */}
      <div className="room-header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-lg mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold">{room.name}</h4>
          </div>
        </div>
      </div>

      {/* Movies List */}
      <div className="movies-grid space-y-4 max-h-96 overflow-y-auto pr-2">
        {uniqueFilms.length > 0 ? (
          uniqueFilms.map((phim, phimIdx) => (
            <div
              key={phimIdx}
              className="movie-item bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="flex">
                {/* Movie Poster */}
                <div className="relative flex-shrink-0">
                  <img
                    className="w-24 h-32 object-cover"
                    src={phim.poster || "/placeholder.svg"}
                    alt={phim.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://picsum.photos/96/128";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <PlayCircleOutlined className="text-white text-2xl" />
                  </div>

                  {/* Movie Status Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {phim.nowShowing && (
                      <Tag color="green" className="text-xs px-1 py-0">
                        Đang chiếu
                      </Tag>
                    )}
                    {phim.upcoming && (
                      <Tag color="blue" className="text-xs px-1 py-0">
                        Sắp chiếu
                      </Tag>
                    )}
                  </div>
                </div>

                {/* Movie Info */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5
                      className="font-bold text-gray-800 text-lg cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
                      onClick={() => handleMovieClick(phim)}
                    >
                      {phim.title}
                    </h5>
                    {/* <div className="flex items-center ml-2">
                      <Rate
                        disabled
                        defaultValue={4.5}
                        allowHalf
                        className="text-xs"
                      />
                      <span className="text-gray-500 text-sm ml-1">(4.5)</span>
                    </div> */}
                  </div>

                  {/* Movie Details */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-gray-600 text-sm">
                      <CalendarOutlined className="mr-2" />
                      <span>
                        Ngày phát hành:{" "}
                        {moment(phim.releaseDate).format("DD/MM/YYYY")}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                      <ClockCircleOutlined className="mr-2" />
                      <span>Thời lượng: {phim.duration || "120"} phút</span>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1">
                      {phim.genres?.slice(0, 3).map((genre, idx) => (
                        <Tag key={idx} color="blue" className="text-xs">
                          {genre.name}
                        </Tag>
                      )) || (
                        <Tag color="blue" className="text-xs">
                          Hành động
                        </Tag>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {phim.description ||
                      "Một bộ phim hấp dẫn với nhiều tình tiết thú vị..."}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMovieClick(phim)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Đặt vé ngay
                    </button>
                    {/* <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Trailer
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0V1"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Chưa có phim chiếu
            </h3>
            <p className="text-gray-500">
              Phòng chiếu này hiện tại chưa có lịch chiếu phim nào.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, cinemaIndex) => (
      <TabPane
        key={cinemaIndex}
        tab={
          <div
            className="cinema-tab-header p-2 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => {
              const firstRoom = heThongRap.rooms?.[0];
              if (firstRoom?.id) {
                dispatch(layDanhSachPhimTheoCinameAndRoomAction(firstRoom.id));
              }
              setActiveCinemaKey(String(cinemaIndex));
              setActiveRoomKey("0");
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800 text-sm">
                  {heThongRap.name}
                </h3>
              </div>
            </div>
          </div>
        }
      >
        {renderCinemaTab(heThongRap, cinemaIndex)}

        <Tabs
          tabPosition="left"
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
          className="room-tabs"
        >
          {heThongRap.rooms?.map((room, roomIdx) => (
            <TabPane
              tab={
                <div className="room-tab-header p-3 hover:bg-purple-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {roomIdx + 1}
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {room.name}
                      </h4>
                      {/* <p className="text-gray-500 text-xs">
                        {room.capacity || "120"} ghế
                      </p> */}
                    </div>
                  </div>
                </div>
              }
              key={String(roomIdx)}
            >
              {renderRoomMovies(room, roomIdx, heThongRap)}
            </TabPane>
          ))}
        </Tabs>
      </TabPane>
    ));
  };

  return (
    <div className="cinema-complex-container bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">🎬 Cụm Rạp Chiếu Phim</h2>
          <p className="text-indigo-100">
            Khám phá các rạp chiếu phim hàng đầu với chất lượng tốt nhất
          </p>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="p-6">
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
          className="cinema-tabs"
        >
          {renderHeThongRap()}
        </Tabs>
      </div>
    </div>
  );
};

export default HomeMenu;
