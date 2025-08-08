"use client";
import React, { useEffect, useState } from "react";
import HomeMenu from "./Menu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import MultipleRowSlick from "../components/RSlick/MultipleRowSlick";
import {
  layDanhSachPhimAction,
  layDanhSachPhimTheoTitleAction,
  layDanhSachTheLoaiAction,
} from "../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../redux/actions/QuanLyRapAction";
import HomeCarousel from "@/my_templates/HomeLayout/Carousel/HomeCarousel";
import { Select, DatePicker } from "antd"; // Thêm DatePicker
import dayjs from "dayjs";

export default function Home() {
  const dispatch = useDispatch();
  const { arrFilm, totalPages, showTime, theLoai, selectedDate } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [cinemaId, setCinemaId] = useState(0);
  const [genresId, setGenresId] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(null); // Thêm ngày chiếu
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      dispatch(layDanhSachPhimAction(page));
    }
  }, [page, isSearching, showTime]);

  useEffect(() => {
    dispatch(layDanhSachHeThongRapAction());
    dispatch(layDanhSachTheLoaiAction());
  }, []);

  const triggerSearch = (term, cinema, genres, date) => {
    const isCurrentlySearching =
      term.trim() !== "" || cinema !== 0 || genres.length > 0 || date !== null;
    setIsSearching(isCurrentlySearching);

    setPage(0);

    if (isCurrentlySearching) {
      dispatch(layDanhSachPhimTheoTitleAction(term, cinema, genres, date));
    } else {
      dispatch(layDanhSachPhimAction(0));
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    triggerSearch(term, cinemaId, genresId, selectedDate);
  };

  const handleCinemaChange = (e) => {
    const id = parseInt(e.target.value);
    setCinemaId(id);
    triggerSearch(searchTerm, id, genresId, selectedDate);
  };

  const handleTheLoaiChange = (values) => {
    setGenresId(values);
    triggerSearch(searchTerm, cinemaId, values, selectedDate);
  };

  const handleDateChange = (date, dateString) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    // console.log(formattedDate)
    // setSelectedDate(formattedDate);
    dispatch({
      type: "SET_SELECTED_DATE",
      selectedDate: formattedDate,
    });
    triggerSearch(searchTerm, cinemaId, genresId, formattedDate);
  };

  const handleStatusFilterChange = (value) => {
    if (showTime === value) {
      dispatch({ type: "SET_SHOW_TIME", showTime: 0 });
    } else {
      dispatch({ type: "SET_SHOW_TIME", showTime: value });
    }
  };

  return (
    <div>
      <HomeCarousel />

      {/* Search bar + phim */}
      <section className='text-gray-600 body-font' id='lich-chieu'>
        <div className='container px-5 pt-6 pb-24 mx-auto'>
          <div className='flex justify-center items-center h-16 rounded-4 shadow-md bg-white w-full max-w-[1200px] mx-auto border border-gray-300'>
            {/* Tìm kiếm tên phim */}
            <div className='flex-1 border-r border-gray-300 px-4'>
              <input
                type='text'
                placeholder='Tìm phim...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full px-2 py-3 focus:outline-none text-lg bg-transparent'
              />
            </div>

            {/* Chọn rạp */}
            <div className='flex-1 border-r border-gray-300 px-4'>
              <select
                className='w-full px-2 py-3 focus:outline-none text-lg bg-transparent'
                defaultValue={0}
                onChange={handleCinemaChange}
              >
                <option value={0}>Rạp</option>
                {heThongRapChieu?.map((rap) => (
                  <option key={rap.id} value={rap.id}>
                    {rap.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Chọn thể loại */}
            <div className='flex-1 border-r border-gray-300 px-4'>
              <Select
                mode='multiple'
                placeholder='Thể loại'
                className='w-full text-lg font-semibold text-gray-800 no-border-select'
                onChange={handleTheLoaiChange}
                allowClear
                style={{ width: "100%" }}
                options={theLoai?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </div>

            {/* DatePicker */}
            <div className='flex-1 px-4'>
              <DatePicker
                className='w-full text-lg font-semibold text-gray-800 no-border-select'
                placeholder='Ngày chiếu'
                format='YYYY-MM-DD'
                value={selectedDate ? dayjs(selectedDate, "YYYY-MM-DD") : null} // Hiển thị lại ngày
                onChange={handleDateChange}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Bộ lọc trạng thái phim */}
          <div className='flex justify-center gap-4 mt-4'>
            <button
              className={`px-4 py-2 rounded-full border text-lg ${
                showTime === 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => handleStatusFilterChange(1)}
            >
              Đang chiếu
            </button>
            <button
              className={`px-4 py-2 rounded-full border text-lg ${
                showTime === 2
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => handleStatusFilterChange(2)}
            >
              Sắp chiếu
            </button>
          </div>

          {/* Danh sách phim */}
          <MultipleRowSlick
            arrFilm={arrFilm}
            setPage={setPage}
            page={page}
            totalPage={totalPages}
            startDate={selectedDate}
          />
        </div>
      </section>

      {/* Rạp phim */}
      <div className='mx-36' id='cum-rap'>
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
