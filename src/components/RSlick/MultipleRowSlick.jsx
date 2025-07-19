import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film from "../film/Film";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-next']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
    </div>

  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}

      style={{ ...style, display: "block", left: '-10px' }}
      onClick={onClick}
    >
    </div>
  );
}

const MultipleRowSlick = (props) => {
 
  const renderFilms = () => {

    return props.arrFilm.map((item, index) => {
      return <div className={`${styleSlick["width-item"]}`} key={index}>
        <Film phim={item}></Film>
      </div>
    })
  }
  
  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };



  return (
    <div>
      <Slider {...settings}>
        {renderFilms()}
        {renderFilms()}
        {renderFilms()}
        {renderFilms()}
        {renderFilms()}
        {renderFilms()}
        {renderFilms()}
      </Slider>
    </div>
  );
}


export default MultipleRowSlick;