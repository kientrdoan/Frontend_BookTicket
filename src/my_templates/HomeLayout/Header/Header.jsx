"use client";
import React, { Fragment, useEffect } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../utils/settings/config";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { SET_THONG_TIN_NGUOI_DUNG } from "@/redux/actions/types/QuanLyNguoiDungType";
import { layThongTinNguoiDungAction } from "@/redux/actions/QuanLyNguoiDungAction";

const { Option } = Select;

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userLogin, thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    var action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  useEffect(() => {
    if (userLogin && userLogin.firstName) {
      dispatch({
        type: SET_THONG_TIN_NGUOI_DUNG,
        thongTinNguoiDung: userLogin,
      });
    }
  }, [dispatch, userLogin]);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className='self-center px-8 py-3 rounded'
          >
            Đăng nhập
          </button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <button
          onClick={() => {
            history.push("/profile");
          }}
          className='self-center px-8 py-3 rounded'
        >
          {thongTinNguoiDung.lastName} {thongTinNguoiDung.firstName}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push("/");
            window.location.reload();
          }}
          className='text-yellow-500 mr-5'
        >
          Đăng xuất
        </button>
      </Fragment>
    );
  };

  return (
    <header
      style={{ backgroundColor: "#797979ff" }}
      className='p-4 bg-opacity-40 bg-black text-white fixed w-full z-10'
    >
      <div className='container flex justify-between h-16 mx-auto'>
        <Link
          to='/'
          aria-label='Back to homepage'
          className='flex items-center p-2'
        >
          <h1>HHK</h1>
        </Link>

        <ul className='items-stretch hidden space-x-3 lg:flex'>
          <li className='flex'>
            <Link to='/' className='flex items-center p-2'>
              Trang chủ
            </Link>
          </li>
          <li className='flex'>
            <Link to='/' className='flex items-center px-4 text-white'>
              Lịch chiếu
            </Link>
          </li>
          <li className='flex'>
            <Link to='/' className='flex items-center px-4 text-white'>
              Cụm rạp
            </Link>
          </li>
        </ul>

        <div className='items-center flex-shrink-0 hidden lg:flex'>
          {renderLogin()}
        </div>

        <button className='p-4 lg:hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-6 h-6 text-white'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
