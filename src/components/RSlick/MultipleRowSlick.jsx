/* eslint-disable no-unused-vars */
"use client";
import { useRef } from "react";
import Slider from "react-slick";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch } from "react-redux";

const MultipleRowSlick = (props) => {
  const sliderRef = useRef();
  const dispatch = useDispatch();

  const renderFilms = () => {
    return props.arrFilm.map((item, index) => (
      <div className="px-3 py-4" key={index}>
        <Film_Flip phim={item} />
      </div>
    ));
  };

  const settings = {
    className: "center variable-width",
    infinite: false,
    slidesToShow: props.arrFilm.length >= 4 ? 4 : props.arrFilm.length,
    slidesPerRow: 1,
    speed: 300, // Giảm speed để mượt hơn
    rows: props.arrFilm.length > 1 ? 2 : 1,
    variableWidth: false,
    arrows: false,
    lazyLoad: "ondemand", // Lazy load images
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          rows: props.arrFilm.length > 1 ? 2 : 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          rows: props.arrFilm.length > 1 ? 2 : 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          rows: props.arrFilm.length > 1 ? 2 : 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 relative mt-8">
      {/* Navigation Buttons - Tối ưu animation */}
      <button
        style={{ cursor: "pointer" }}
        className="absolute left-[-50px] top-1/2 z-20 nav-button nav-button-left
          bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full 
          shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={() => {
          if (props.page > 0) {
            sliderRef.current?.slickPrev();
            props.setPage(props.page - 1);
          }
        }}
        disabled={props.page <= 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        style={{ cursor: "pointer" }}
        className="absolute right-[-50px] top-1/2 z-20 nav-button nav-button-right
          bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full 
          shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={() => {
          if (props.page < props.totalPage - 1) {
            sliderRef.current?.slickNext();
            props.setPage(props.page + 1);
          }
        }}
        disabled={props.page >= props.totalPage - 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Movie Slider */}
      <div className="slider-container bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg">
        {props.arrFilm.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
            {renderFilms()}
          </Slider>
        ) : (
          <div className="text-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
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
              <h3 className="text-xl font-semibold text-gray-600">
                Không có phim nào
              </h3>
              <p className="text-gray-500 max-w-md">
                Không tìm thấy phim nào phù hợp với tiêu chí tìm kiếm của bạn.
                Vui lòng thử lại với từ khóa khác.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Indicator - Tối ưu animation */}
      {props.totalPage > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: props.totalPage }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                props.setPage(index);
                if (index > props.page) {
                  sliderRef.current?.slickNext();
                } else if (index < props.page) {
                  sliderRef.current?.slickPrev();
                }
              }}
              className={`pagination-dot w-3 h-3 rounded-full ${
                index === props.page ? "active" : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleRowSlick;
