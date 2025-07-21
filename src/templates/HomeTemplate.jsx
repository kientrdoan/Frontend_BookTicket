import React from "react";
import { Route } from "react-router-dom";
import Header from "./HomeLayout/Header/Header";
import HomeCarousel from "./HomeLayout/Carousel/HomeCarousel";
import Footer from "./HomeLayout/Footer/Footer";

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <React.Fragment>
            <Header {...propsRoute} />
            
            <Component {...propsRoute} />

            <Footer />
          </React.Fragment>
        );
      }}
    />
  );
};
