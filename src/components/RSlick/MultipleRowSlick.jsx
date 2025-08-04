/* eslint-disable no-unused-vars */
"use client";
import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.css";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-10px" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();

  const renderFilms = () => {
    return props.arrFilm.map((item, index) => {
      return (
        <div className='mt-2' key={index} style={{ width: 200 }}>
          <Film_Flip phim={item}></Film_Flip>
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    infinite: props.arrFilm.length > 4,
    slidesToShow: props.arrFilm.length >= 4 ? 4 : props.arrFilm.length,
    slidesPerRow: 1,
    speed: 500,
    rows: props.arrFilm.length > 1 ? 2 : 1, 
    variableWidth: false,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className='max-w-7xl mx-auto px-4'>
      {props.arrFilm.length > 0 ? (
        <Slider {...settings}>{renderFilms()}</Slider>
      ) : (
        <div className='text-center text-gray-500 py-10 text-lg'>
          Không có kết quả tương ứng.
        </div>
      )}
    </div>
  );
};

export default MultipleRowSlick;
