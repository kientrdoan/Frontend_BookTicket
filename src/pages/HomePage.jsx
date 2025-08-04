"use client";
import React, { useEffect, useState } from "react";
import HomeMenu from "./Menu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import MultipleRowSlick from "../components/RSlick/MultipleRowSlick";
import {
  layDanhSachPhimAction,
  layDanhSachPhimTheoTitleAction,
} from "../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../redux/actions/QuanLyRapAction";
import HomeCarousel from "@/my_templates/HomeLayout/Carousel/HomeCarousel";

export default function Home() {
  const dispatch = useDispatch();
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [cinemaId, setCinemaId] = useState(0);

  useEffect(() => {
    dispatch(layDanhSachPhimAction(page));
  }, [page]);

  useEffect(() => {
    dispatch(layDanhSachHeThongRapAction());
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(layDanhSachPhimTheoTitleAction(e.target.value, cinemaId));
  };

  const handleCinemaChange = (e) => {
    const id = e.target.value;
    setCinemaId(id);
    // alert(`Bạn đã chọn rạp có ID: ${id}`);
    // Nếu muốn lọc phim theo rạp thì dispatch action lọc tại đây
    dispatch(layDanhSachPhimTheoTitleAction(searchTerm, id));
  };

  // Lọc danh sách phim theo từ khóa
  // const filteredFilms = arrFilm.filter((film) =>
  //   film.title?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <HomeCarousel />

      {/* Search bar + phim */}
      <section className='text-gray-600 body-font' id='lich-chieu'>
        <div className='container px-5 pt-10 pb-24 mx-auto'>
          {/* Thanh tìm kiếm */}
          <div className='mb-10 flex justify-center gap-x-4 flex-wrap'>
            {/* Thanh tìm kiếm */}
            <input
              type='text'
              placeholder='Tìm phim theo tên...'
              value={searchTerm}
              onChange={handleSearchChange}
              className='w-full max-w-md px-5 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg'
            />

            {/* Select chọn rạp */}
            <select
              className='w-full max-w-xs px-5 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg'
              defaultValue=''
              onChange={handleCinemaChange}
            >
              <option value='' disabled>
                Chọn rạp phim...
              </option>
              {heThongRapChieu?.map((rap) => (
                <option key={rap.id} value={rap.id}>
                  {rap.name}
                </option>
              ))}
            </select>
          </div>

          {/* Danh sách phim */}
          <MultipleRowSlick arrFilm={arrFilm} setPage={setPage} page={page} totalPage ={(parseInt)(arrFilm.length / 8)}/>
        </div>
      </section>

      {/* Rạp phim */}
      <div className='mx-36' id='cum-rap'>
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
