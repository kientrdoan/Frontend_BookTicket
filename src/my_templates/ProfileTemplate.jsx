import React, { useState } from "react";
import { Route } from "react-router-dom";
import Header from "./HomeLayout/Header/Header";
import { Link } from "react-router-dom";

export const ProfileTemplate = (props) => {
  const { Component, ...restProps } = props;
  const [select, setSelect] = useState(0);

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <React.Fragment>
            <Header {...propsRoute} />
            <div className='mb-6 border-b pb-2 flex justify-center gap-10 text-sm font-semibold py-[150px]'>
              <Link
                to='/profile'
                onClick={() => {
                  setSelect(0);
                }}
                className={`cursor-pointer ${
                  select === 0 ? "bg-red-500" : "bg-gray-200"
                }`}
              >
                THÔNG TIN TÀI KHOẢN
              </Link>
               <Link
                to='/history'
                onClick={() => {
                  setSelect(1);
                }}
                className={`cursor-pointer ${
                  select === 1 ? "bg-red-500" : "bg-gray-200"
                }`}
              >
                LỊCH SỬ ĐẶT VÉ
              </Link>
            </div>
            <Component {...propsRoute} />
          </React.Fragment>
        );
      }}
    />
  );
};
