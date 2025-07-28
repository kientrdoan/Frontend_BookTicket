import React, { useEffect } from "react";
import HomeMenu from "./Menu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
// import Film from "../components/film/Film";
import MultipleRowSlick from "../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../redux/actions/QuanLyRapAction";
import HomeCarousel from "../templates/HomeLayout/Carousel/HomeCarousel";

export default function Home() {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  
  // console.log("He Thong Rap", heThongRapChieu)
  // console.log("array film", arrFilm)

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layDanhSachPhimAction();

    dispatch(action);

    dispatch(layDanhSachHeThongRapAction());

  }, []);

  return (
    <div>
      <HomeCarousel />
      {/* Hien Thi Danh SACH PHIM DANG CHIEU - SAP CHIEU */}
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <MultipleRowSlick arrFilm={arrFilm} />
        </div>
      </section>

      {/* HIEN THI RAP PHIM */}
      <div className='mx-36'>
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
