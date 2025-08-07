/* eslint-disable no-unused-vars */
"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import Film_Flip from "../Film/Film_Flip";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "@/redux/actions/types/QuanLyPhimType";
import { useDispatch } from "react-redux";

const MultipleRowSlick = (props) => {
  const sliderRef = useRef();
  const dispatch = useDispatch();

  const renderFilms = () => {
    return props.arrFilm.map((item, index) => (
      <div className='mt-2' key={index} style={{ width: 200 }}>
        <Film_Flip phim={item} />
      </div>
    ));
  };

  const settings = {
    className: "center variable-width",
    infinite: false,
    slidesToShow: props.arrFilm.length >= 4 ? 4 : props.arrFilm.length,
    slidesPerRow: 1,
    speed: 500,
    rows: props.arrFilm.length > 1 ? 2 : 1,
    variableWidth: false,
    arrows: false,
  };

  return (
    <div className='max-w-7xl mx-auto px-4 relative'>
      {/* <div className="flex justify-center">
        <button
          className={`px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2`}
          onClick={() => {
            const action = { type: SET_FILM_DANG_CHIEU };
            dispatch(action);
          }}
        >
          PHIM ĐANG CHIẾU
        </button>

        <button
          className={`px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`}
          onClick={() => {
            const action = { type: SET_FILM_SAP_CHIEU };
            dispatch(action);
          }}
        >
          PHIM SẮP CHIẾU
        </button>
      </div> */}

      <button
        style={{ cursor: "pointer" }}
        className='absolute left-[-35px] top-1/2 transform -translate-y-1/2 z-10
    bg-indigo-500 text-white px-3 py-2 rounded-full hover:bg-indigo-600 disabled:opacity-40'
        onClick={() => {
          if (props.page > 0) {
            sliderRef.current?.slickPrev();
            props.setPage(props.page - 1);
          }
        }}
        disabled={props.page <= 0}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>

      <button
        style={{ cursor: "pointer" }}
        className='absolute right-[-25px] top-1/2 transform -translate-y-1/2 z-10
    bg-indigo-500 text-white px-3 py-2 rounded-full hover:bg-indigo-600 disabled:opacity-40'
        onClick={() => {
          console.log("props.page", props.page);
          console.log("props.totalPage", props.totalPage);
          // Kiểm tra nếu trang hiện tại nhỏ hơn tổng số trang
          if (props.page < props.totalPage-1) {
            sliderRef.current?.slickNext();
            props.setPage(props.page + 1);
          }
        }}
        disabled={props.page >= props.totalPage -1}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>

      {/* Slider phim */}
      {props.arrFilm.length > 0 ? (
        <Slider ref={sliderRef} {...settings}>
          {renderFilms()}
        </Slider>
      ) : (
        <div className='text-center text-gray-500 py-10 text-lg'>
          Không có kết quả tương ứng.
        </div>
      )}
    </div>
  );
};

export default MultipleRowSlick;
