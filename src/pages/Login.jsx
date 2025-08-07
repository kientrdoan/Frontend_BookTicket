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
import { AUTH_URI, CLIENT_ID, REDIRECT_URL } from "@/utils/settings/LoginConfig";

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

          <div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
            Bạn chưa có tài khoản?{" "}
            <Link
              to='register'
              className='cursor-pointer text-indigo-600 hover:text-indigo-800'
            >
              Đăng ký
            </Link>
          </div>

          <button
            type='button'
            variant='contained'
            color='secondary'
            size='large'
            onClick={handleClick}
            fullWidth
            sx={{ gap: "10px" }}
          >
            {/* <GoogleIcon /> */}
            Continue with Google
          </button>
        </div>
      </form>
    </>
  );
}
