/* eslint-disable no-unused-vars */
"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import Film_Flip from "../Film/Film_Flip";

const MultipleRowSlick = (props) => {
  const sliderRef = useRef();

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
      <button
        className='absolute left-[-50px] top-1/2 transform -translate-y-1/2 z-10
    bg-indigo-500 text-white px-3 py-2 rounded-full hover:bg-indigo-600 disabled:opacity-40'
        onClick={() => {
          if (props.page > 0) {
            sliderRef.current?.slickPrev();
            props.setPage(props.page - 1);
          }
        }}
        disabled={props.page <= 0}
      >
        ←
      </button>

      <button
        className='absolute right-[-50px] top-1/2 transform -translate-y-1/2 z-10
    bg-indigo-500 text-white px-3 py-2 rounded-full hover:bg-indigo-600 disabled:opacity-40'
        onClick={() => {
          if (props.page < props.totalPage) {
            sliderRef.current?.slickNext();
            props.setPage(props.page + 1);
          }
        }}
        disabled={props.page >= props.totalPage}
      >
        →
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
