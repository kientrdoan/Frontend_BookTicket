import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatThongTinNguoiDungAction,
  layThongTinNguoiDungAction,
} from "../redux/actions/QuanLyNguoiDungAction";
import { useFormik } from "formik";
import { DatePicker, Radio } from "antd";
import dayjs from "dayjs";
import * as Yup from "yup";
import { message } from "antd";

export default function ProfilePage() {
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const [messageApi, contextHolder] = message.useMessage();

  console.log("thongTinNguoiDung", thongTinNguoiDung);

  const dispatch = useDispatch();

  useEffect(() => {
    var action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  useEffect(() => {
    if (thongTinNguoiDung) {
      const fullName = `${thongTinNguoiDung.firstName || ""} ${
        thongTinNguoiDung.lastName || ""
      }`.trim();

      formik.setValues({
        fullName,
        firstName: thongTinNguoiDung.firstName || "",
        lastName: thongTinNguoiDung.lastName || "",
        email: thongTinNguoiDung.email || "",
        phoneNumber: thongTinNguoiDung.phone || "",
        address: thongTinNguoiDung.address || "",
        dateOfBirth: thongTinNguoiDung.dateOfBirth || null,
        gender: thongTinNguoiDung.gender ?? true,
      });
    }
  }, [thongTinNguoiDung]);

  const formik = useFormik({
    initialValues: {
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
      fullName: Yup.string().required("Họ và tên không được để trống"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      phoneNumber: Yup.string().required("Số điện thoại không được để trống"),
      address: Yup.string().required("Địa chỉ không được để trống"),
      dateOfBirth: Yup.string().required("Ngày sinh không được để trống"),
    }),
    onSubmit: (values) => {
      const fullName = values.fullName?.trim() || "";
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      const finalValues = {
        firstName,
        lastName,
        email: values.email,
        phone: values.phoneNumber, // 👈 CHỈNH Ở ĐÂY
        address: values.address,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
      };

      console.log("Final Values:", finalValues);

      delete finalValues.fullName;

      dispatch(capNhatThongTinNguoiDungAction(finalValues))
        .then(() => {
          messageApi.success("Cập nhật thông tin thành công!");
        })
        .catch(() => {
          messageApi.error("Cập nhật thất bại!");
        });
    },
  });

  return (
    <div className='min-h-screen bg-white px-4 sm:px-10'>
      {contextHolder}
      <div className='max-w-5xl mx-auto flex flex-col lg:flex-row gap-8'>
        {/* Left Side: Avatar + Info */}
        <div className='w-full lg:w-1/3 flex flex-col items-center'>
          <img
            src='https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/small/avatar_hoat_hinh_db4e0e9cf4.jpg'
            alt='Avatar'
            className='w-40 h-40 rounded-full object-cover border-4 border-white shadow-md'
          />
          <h2 className='mt-4 text-xl font-semibold'>
            {thongTinNguoiDung.username}
          </h2>

          {/* <div className='mt-6 w-full bg-gray-50 rounded border'>
            <div className='p-3 border-b text-sm font-medium text-gray-600'>
              Hoạt động
            </div>
            <div className='divide-y text-sm text-gray-700'>
              <div className='flex justify-between px-3 py-2'>
                <span>Số lần thanh toán</span>
                <span>4</span>
              </div>
              <div className='flex justify-between px-3 py-2'>
                <span>Tổng tiền $</span>
                <span>425000</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Side: Form */}
        <div className='w-full lg:w-2/3'>
          <form onSubmit={formik.handleSubmit}>
            <div className='px-12 sm:px-24 md:px-48 lg:px-12'>
              <div className=''>
                {/* Họ và tên */}
                <div className=''>
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
                {/* <div className='mt-8'>
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
                </div> */}

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
                    onChange={(e) =>
                      formik.setFieldValue("gender", e.target.value)
                    }
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
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
