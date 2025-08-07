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
import { SET_DANH_SACH_PHIM } from "@/redux/actions/types/QuanLyPhimType";
import { Select } from "antd"; // Import Select từ antd

export default function Home() {
  const dispatch = useDispatch();
  const { arrFilm, totalPages, showTime, theLoai } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const [page, setPage] = useState(0);
  console.log("arrFilm", arrFilm);

  const [searchTerm, setSearchTerm] = useState("");
  const [cinemaId, setCinemaId] = useState(0);
  const [genresId, setGenresId] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Chỉ gọi API phân trang khi không có tìm kiếm
    if (!isSearching) {
      // alert("get all")
      dispatch(layDanhSachPhimAction(page));
    }
  }, [page, isSearching, showTime]);

  useEffect(() => {
    dispatch(layDanhSachHeThongRapAction());
    dispatch(layDanhSachTheLoaiAction());
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const isCurrentlySearching =
      searchTerm.trim() !== "" || cinemaId !== 0 || genresId.length > 0;
    setIsSearching(isCurrentlySearching);

    if (isCurrentlySearching) {
      setPage(0);
      dispatch(layDanhSachPhimTheoTitleAction(term, cinemaId, genresId));
    } else {
      setPage(0);
      dispatch(layDanhSachPhimAction(0));
    }
  };

  const handleCinemaChange = (e) => {
    const id = parseInt(e.target.value);
    setCinemaId(id);

    const isCurrentlySearching =
      searchTerm.trim() !== "" || cinemaId !== 0 || genresId.length > 0;
    setIsSearching(isCurrentlySearching);

    if (isCurrentlySearching) {
      setPage(0);
      dispatch(layDanhSachPhimTheoTitleAction(searchTerm, id, genresId));
    } else {
      setPage(0);
      dispatch(layDanhSachPhimAction(0));
    }
  };

  const handleTheLoaiChange = (values) => {
    setGenresId(values);

    console.log(values);

    const isCurrentlySearching =
      searchTerm.trim() !== "" || cinemaId !== 0 || values.length > 0;

    setIsSearching(isCurrentlySearching);
    setPage(0);

    if (isCurrentlySearching) {
      dispatch(layDanhSachPhimTheoTitleAction(searchTerm, cinemaId, values));
    } else {
      dispatch(layDanhSachPhimAction(0));
    }
  };

  const handleStatusFilterChange = (value) => {
    console.log(value)
    if(showTime === value) {
      dispatch({
        type: "SET_SHOW_TIME",
        showTime: 0
      })
    }else{
       dispatch({
        type: "SET_SHOW_TIME",
        showTime: value
      })
    }
  }

  return (
    <div>
      <HomeCarousel />

      {/* Search bar + phim */}
      <section className='text-gray-600 body-font' id='lich-chieu'>
        <div className='container px-5 pt-6 pb-24 mx-auto'>
          {/* Thanh tìm kiếm đã được làm rộng hơn */}
          <div className='flex justify-center items-center h-16 rounded-full shadow-md bg-white w-full max-w-7xl mx-auto border border-gray-300'>
            {/* Thanh tìm kiếm tên phim */}
            <div className='flex-1 border-r border-gray-300 px-4'>
              <input
                type='text'
                placeholder='Tìm phim...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full px-2 py-3 focus:outline-none text-lg bg-transparent'
              />
            </div>

            {/* Select chọn rạp */}
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

            {/* MultiSelect của Ant Design */}
            <div className='flex-1 px-4'>
              <Select
                mode='multiple'
                placeholder='Thể loại'
                onChange={handleTheLoaiChange}
                allowClear
                className='w-full text-lg font-semibold text-gray-800 no-border-select'
                style={{ width: "100%" }}
                options={theLoai?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              ></Select>
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
            isCurrentlySearching={isSearching}
            totalPage={totalPages}
            isSearching={isSearching}
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
