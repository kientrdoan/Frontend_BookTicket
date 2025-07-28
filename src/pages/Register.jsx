/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import { DatePicker, Radio } from "antd";
import dayjs from "dayjs";
import { dangKyAction } from "../redux/actions/QuanLyNguoiDungAction";

export default function Register(props) {
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  // console.log("userLogin", userLogin);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      fullName: "", // người dùng nhập vào ô này
      firstName: "", // sẽ được tách từ fullName khi submit
      lastName: "", // sẽ được tách từ fullName khi submit
      email: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: null,
      gender: true,
    },
    onSubmit: (values) => {
      const fullName = values.fullName?.trim() || "";
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      const finalValues = {
        ...values,
        firstName,
        lastName,
      };

      delete finalValues.fullName;

      const action = dangKyAction(finalValues);
      dispatch(action);

      // console.log("finalValues", finalValues);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className=''>
      <div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12'>
        <h2 className='text-center text-4xl text-indigo-900 font-display font-semibold'>
          Đăng Ký để được nhiều ưu đãi, mua vé và bảo mật thông tin
        </h2>
        <div className='mt-12 flex justify-center'>
          <div className='w-[50%]'>
            <div>
              <div className='text-sm font-bold text-gray-700 tracking-wide'>
                Tài khoản
              </div>
              <input
                name='username'
                onChange={formik.handleChange}
                className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                placeholder='Nhập vào tài khoản'
              />
            </div>

            <div className='mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Mật khẩu
                </div>
              </div>
              <input
                type='password'
                name='password'
                onChange={formik.handleChange}
                className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                placeholder='Nhập vào mật khẩu'
              />
            </div>

            <div className='mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Họ và tên
                </div>
              </div>
              <input
                name='fullName'
                onChange={formik.handleChange}
                className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                placeholder='Nhập vào họ và tên'
              />
            </div>

            <div className='mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Email
                </div>
              </div>
              <input
                name='email'
                onChange={formik.handleChange}
                className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                placeholder='Nhập vào email'
              />
            </div>

            <div className='mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Số điện thoại
                </div>
              </div>
              <input
                name='phoneNumber'
                onChange={formik.handleChange}
                className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                placeholder='Nhập số điện thoại'
              />
            </div>

             <div className='mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Địa chỉ
                </div>
              </div>
              <input
                name='address'
                onChange={formik.handleChange}
                className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                placeholder='Nhập số địa chỉ'
              />
            </div>

            <div className='mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Ngày sinh
                </div>
              </div>
              <DatePicker
                style={{ marginTop: "10px", padding: "8px 4px" }}
                className='w-full py-8 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                placeholder='Chọn ngày sinh'
                format='DD/MM/YYYY'
                value={
                  formik.values.dateOfBirth
                    ? dayjs(formik.values.dateOfBirth)
                    : null
                }
                onChange={(date) =>
                  formik.setFieldValue(
                    "dateOfBirth",
                    date ? date.toISOString() : null
                  )
                }
              />
            </div>

            <div className='mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Giới tính
                </div>
              </div>
              <Radio.Group
                className='mt-2'
                onChange={(e) => formik.setFieldValue("gender", e.target.value)}
                value={formik.values.gender}
              >
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </div>

            <div className='mt-10'>
              <button
                className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                  shadow-lg'
              >
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
