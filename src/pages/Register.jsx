/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DatePicker, Radio, Modal, Input } from "antd";
import dayjs from "dayjs";
import * as Yup from "yup";
import {
  dangKyAction,
  verifyOtpAction,
} from "../redux/actions/QuanLyNguoiDungAction";
import { useHistory } from "react-router-dom";
import { message } from "antd";

export default function Register(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  // const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [otp, setOtp] = useState("");
  const [infoUserLogin, setInfoUserLogin] = useState();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      fullName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: null,
      gender: true,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Tài khoản không được để trống"),
      password: Yup.string().required("Mật khẩu không được để trống"),
      fullName: Yup.string().required("Họ và tên không được để trống"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      phoneNumber: Yup.string().required("Số điện thoại không được để trống"),
      address: Yup.string().required("Địa chỉ không được để trống"),
      dateOfBirth: Yup.string().required("Ngày sinh không được để trống"),
    }),
    onSubmit: async (values) => {
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

      setInfoUserLogin(finalValues);

      try {
        const result = await dispatch(dangKyAction(finalValues, history));

        if (result === true) {
          setIsModalVisible(true);
        } else {
          messageApi.error("Đăng ký thất bại. Vui lòng thử lại!");
        }
      } catch (errorMessage) {
        messageApi.error(errorMessage || "Đăng ký thất bại. Vui lòng thử lại!");
      }
    },
  });

  // Handler for OTP modal submission
  const handleOtpSubmit = async () => {
    console.log("OTP submitted:", otp);
    // setIsModalVisible(false);
    try {
      const result = await dispatch(verifyOtpAction(infoUserLogin, otp, history));

      if (result === true) {
        setIsModalVisible(false);
        setOtp("")
        history.goBack()
      } else {
        messageApi.error("OTP sai. Vui lòng thử lại!");
      }
    } catch (errorMessage) {
      messageApi.error(errorMessage || "Đăng ký thất bại. Vui lòng thử lại!");
    }
    setOtp("");

    // messageApi.success("Đăng ký thành công! Vui lòng đăng nhập.");
  };

  // Handler for closing the OTP modal
  const handleOtpCancel = () => {
    setIsModalVisible(false);
    setOtp("");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {contextHolder}
      <div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12'>
        <h2 className='text-center text-4xl text-indigo-900 font-display font-semibold'>
          Đăng Ký để được nhiều ưu đãi
        </h2>
        <div className='mt-6'>
          {/* Tài khoản */}
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

          {/* Mật khẩu */}
          <div className='mt-8'>
            <div className='text-sm font-bold text-gray-700 tracking-wide'>
              Mật khẩu
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

          {/* Họ và tên */}
          <div className='mt-8'>
            <div className='text-sm font-bold text-gray-700 tracking-wide'>
              Họ và tên
            </div>
            <input
              name='fullName'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
              placeholder='Nhập vào họ và tên'
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.fullName}
              </div>
            )}
          </div>

          {/* Email */}
          <div className='mt-8'>
            <div className='text-sm font-bold text-gray-700 tracking-wide'>
              Email
            </div>
            <input
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
              placeholder='Nhập vào email'
            />
            {formik.touched.email && formik.errors.email && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Số điện thoại */}
          <div className='mt-8'>
            <div className='text-sm font-bold text-gray-700 tracking-wide'>
              Số điện thoại
            </div>
            <input
              name='phoneNumber'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
              placeholder='Nhập số điện thoại'
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>

          {/* Địa chỉ */}
          <div className='mt-8'>
            <div className='text-sm font-bold text-gray-700 tracking-wide'>
              Địa chỉ
            </div>
            <input
              name='address'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
              placeholder='Nhập địa chỉ'
            />
            {formik.touched.address && formik.errors.address && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.address}
              </div>
            )}
          </div>

          {/* Ngày sinh */}
          <div className='mt-8'>
            <div className='text-sm font-bold text-gray-700 tracking-wide'>
              Ngày sinh
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
              onBlur={() => formik.setFieldTouched("dateOfBirth", true)}
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.dateOfBirth}
              </div>
            )}
          </div>

          {/* Giới tính */}
          <div className='mt-8'>
            <div className='text-sm font-bold text-gray-700 tracking-wide'>
              Giới tính
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

          {/* Nút đăng ký */}
          <div className='mt-10'>
            <button
              type='submit'
              className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
              font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
              shadow-lg'
            >
              Đăng Ký
            </button>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <Modal
        title='Nhập mã OTP'
        open={isModalVisible}
        onOk={handleOtpSubmit}
        onCancel={handleOtpCancel}
        okText='Xác nhận'
        cancelText='Hủy'
      >
        <p>
          Mã OTP đã được gửi đến email của bạn. 
        </p>
        <p>
          Vui lòng nhập mã để hoàn tất đăng ký.
        </p>
        <Input
          placeholder='Mã OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{ marginTop: "20px" }}
        />
      </Modal>
    </form>
  );
}