/* eslint-disable no-unused-vars */
// import {
//   Button,
// } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import * as Yup from "yup";

import {
  dangNhapAction,
  layThongTinNguoiDungAction,
} from "../redux/actions/QuanLyNguoiDungAction";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AUTH_URI,
  CLIENT_ID,
  REDIRECT_URL,
} from "@/utils/settings/LoginConfig";

export default function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Tài khoản không được để trống"),
      password: Yup.string().required("Mật khẩu không được để trống"),
    }),
    onSubmit: async (values) => {
      try {
        const action = await dangNhapAction(values, history);
        const result = await dispatch(action);

        if (result?.payload?.success || result?.type?.includes("fulfilled")) {
          messageApi.success("Đăng nhập thành công!");
          dispatch(layThongTinNguoiDungAction());
        } else {
          messageApi.error("Tài khoản hoặc mật khẩu không đúng!");
        }
      } catch (err) {
        messageApi.error("Đăng nhập thất bại!");
      }
    },
  });

  const handleClick = () => {
    const callbackUrl = REDIRECT_URL;
    const authUrl = AUTH_URI;
    const googleClientId = CLIENT_ID;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };

  return (
    <>
      {contextHolder}
      <form
        onSubmit={formik.handleSubmit}
        className='lg:w-1/2 xl:max-w-screen-sm'
      >
        <div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl'>
          <h2 className='text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold'>
            Đăng nhập
          </h2>

          <div className='mt-12'>
            <div>
              <div className='text-sm font-bold text-gray-700 tracking-wide'>
                Tài khoản
              </div>
              <input
                name='username'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                placeholder='Nhập vào tài khoản'
              />
              {formik.touched.username && formik.errors.username && (
                <div className='text-red-500 text-sm mt-1'>
                  {formik.errors.username}
                </div>
              )}
            </div>

            <div className='mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Mật khẩu
                </div>
                {/* <div>
                  <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Quên mật khẩu ?
                  </a>
                </div> */}
              </div>
              <input
                type='password'
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                placeholder='Nhập vào mật khẩu'
              />
              {formik.touched.password && formik.errors.password && (
                <div className='text-red-500 text-sm mt-1'>
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className='mt-10'>
              <button
                type='submit'
                className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                  shadow-lg'
              >
                Đăng nhập
              </button>
            </div>
          </div>

          <button
            type='button'
            onClick={handleClick}
            className='mt-8 flex items-center w-full px-4 py-2 bg-blue-400 rounded-full text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              viewBox='0 0 48 48'
              className='mr-3'
            >
              <path
                fill='#FFC107'
                d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
              />
              <path
                fill='#FF3D00'
                d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
              />
              <path
                fill='#4CAF50'
                d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
              />
              <path
                fill='#1976D2'
                d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
              />
            </svg>
            Sign in with Google
          </button>

          <div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
            Bạn chưa có tài khoản?{" "}
            <Link
              to='register'
              className='cursor-pointer text-indigo-600 hover:text-indigo-800'
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
