"use client";
import React, { useEffect, useState } from "react";
import HomeMenu from "./Menu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import MultipleRowSlick from "../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction, layDanhSachPhimTheoTitleAction } from "../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../redux/actions/QuanLyRapAction";
import HomeCarousel from "@/my_templates/HomeLayout/Carousel/HomeCarousel";

export default function Home() {
  const dispatch = useDispatch();
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(layDanhSachPhimTheoTitleAction(e.target.value));
  };

  // Lọc danh sách phim theo từ khóa
  // const filteredFilms = arrFilm.filter((film) =>
  //   film.title?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <HomeCarousel />

      {/* Search bar + phim */}
      <section className="text-gray-600 body-font" id="lich-chieu">
        <div className="container px-5 pt-10 pb-24 mx-auto">
          {/* Thanh tìm kiếm */}
          <div className="mb-10 flex justify-center">
            <input
              type="text"
              placeholder="Tìm phim theo tên..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full max-w-lg px-5 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            />
          </div>

          {/* Danh sách phim */}
          <MultipleRowSlick arrFilm={arrFilm} />
        </div>
      </section>

      {/* Rạp phim */}
      <div className="mx-36" id="cum-rap">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
