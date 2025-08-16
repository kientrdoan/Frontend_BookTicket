"use client";
import { useEffect, useState } from "react";
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
import { Select, DatePicker } from "antd";
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
    const id = Number.parseInt(e.target.value);
    setCinemaId(id);
    triggerSearch(searchTerm, id, genresId, selectedDate);
  };

  const handleTheLoaiChange = (values) => {
    setGenresId(values);
    triggerSearch(searchTerm, cinemaId, values, selectedDate);
  };

  const handleDateChange = (date, dateString) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
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
      <section
        className="text-gray-600 body-font bg-gradient-to-br from-blue-50 to-indigo-100 py-12"
        id="lich-chieu"
      >
        <div className="container px-5 mx-auto">
          {/* Search Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Tìm Phim Yêu Thích
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá những bộ phim hot nhất đang chiếu và sắp chiếu tại rạp
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-2 w-full max-w-6xl mx-auto mb-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {/* Tìm kiếm tên phim */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm phim..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl text-lg bg-gray-50 border border-gray-200"
                />
              </div>

              {/* Chọn rạp */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <select
                  className="w-full pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl text-lg bg-gray-50 border border-gray-200 appearance-none"
                  defaultValue={0}
                  onChange={handleCinemaChange}
                >
                  <option value={0}>Chọn rạp</option>
                  {heThongRapChieu?.map((rap) => (
                    <option key={rap.id} value={rap.id}>
                      {rap.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chọn thể loại */}
              <div className="relative">
                <Select
                  mode="multiple"
                  placeholder="Chọn thể loại"
                  className="w-full text-lg font-semibold text-gray-800 custom-select"
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
              <div className="relative">
                <DatePicker
                  className="w-full text-lg font-semibold text-gray-800 custom-datepicker"
                  placeholder="Chọn ngày chiếu"
                  format="YYYY-MM-DD"
                  value={
                    selectedDate ? dayjs(selectedDate, "YYYY-MM-DD") : null
                  }
                  onChange={handleDateChange}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                  }}
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Filter Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                showTime === 1
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
              onClick={() => handleStatusFilterChange(1)}
            >
              🎬 Đang chiếu
            </button>
            <button
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                showTime === 2
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
              onClick={() => handleStatusFilterChange(2)}
            >
              🔜 Sắp chiếu
            </button>
          </div>

          {/* Movies List */}
          <MultipleRowSlick
            arrFilm={arrFilm}
            setPage={setPage}
            page={page}
            totalPage={totalPages/8}
            isSearching= {isSearching}
            startDate={selectedDate}
          />
        </div>
      </section>

      {/* Rạp phim - Updated styling */}
      <div
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-16"
        id="cum-rap"
      >
        <div className="container mx-auto px-4">
          <HomeMenu heThongRapChieu={heThongRapChieu} />
        </div>
      </div>
    </div>
  );
}
