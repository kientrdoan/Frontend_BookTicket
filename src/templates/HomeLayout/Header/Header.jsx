import React, { Fragment } from 'react'
import { Select } from "antd";
import { useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { TOKEN } from "../../../../util/settings/config";
import _ from "lodash";
import { USER_LOGIN } from "../../../utils/settings/config";
import { useHistory } from 'react-router-dom';

const { Option } = Select;

export default function Header() {
  const history = useHistory();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin", userLogin)

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push('/login');
            }}
            // to="/login"
            className='self-center px-8 py-3 rounded'
          >
            {"signin"}
          </button>
          {/* <button
            onClick={() => {
              history.push("/register");
            }}
            className='self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50'
          >
            {"register"}
          </button> */}
        </Fragment>
      );
    }

    return (
      <Fragment>
        {" "}
        <button
          onClick={() => {
            history.push("/profile");
          }}
          className='self-center px-8 py-3 rounded'
        >
        UserName ! {userLogin.userName}
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
    <header style={{backgroundColor: "#797979ff"}} className='p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10'>
      <div className='container flex justify-between h-16 mx-auto'>
        <NavLink
          to='/'
          aria-label='Back to homepage'
          className='flex items-center p-2'
        >
          <h1>HHK</h1>
          {/* <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" /> */}
        </NavLink>
        <ul className='items-stretch hidden space-x-3 lg:flex'>
          <li className='flex'>
            <NavLink
              to='/'
              className='flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white'
              // activeClassName='border-b-2 border-white'
            >
              Home
            </NavLink>
          </li>

          <li className='flex'>
            <NavLink
              to='/'
              className='flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white'
              // activeClassName='border-b-2 border-white'
            >
              Lịch chiếu
            </NavLink>
          </li>

          <li className='flex'>
            <NavLink
              to='/'
              className='flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white'
              // activeClassName='border-b-2 border-white'
            >
              Cụm rạp
            </NavLink>
          </li>

          {/* <li className='flex'>
            <NavLink
              to='/news'
              className='flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white'
              activeClassName='border-b-2 border-white'
            >
              News
            </NavLink>
          </li> */}
        </ul>

        <div className='items-center flex-shrink-0 hidden lg:flex'>
          {renderLogin()}

          {/* <Select
            defaultValue='en'
            style={{ width: 100 }}
            // onChange={handleChange}
          >
            <Option value='en'>Eng</Option>
            <Option value='chi'>Chi</Option>

            <Option value='vi'>Vi</Option>
          </Select> */}
        </div>
        <button className='p-4 lg:hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-6 h-6 text-coolGray-800'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>

        {/* {t('hello.2')} */}
      </div>
    </header>
  );
}
