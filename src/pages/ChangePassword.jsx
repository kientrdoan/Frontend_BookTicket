"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { thayDoiMatKhauAction } from "@/redux/actions/QuanLyNguoiDungAction";
import { useDispatch } from "react-redux";

const EyeIcon = () => (
  <svg
    className='h-5 w-5'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
    />
  </svg>
);

const EyeSlashIcon = () => (
  <svg
    className='h-5 w-5'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
    />
  </svg>
);

export default function ChangePassword() {
  const [messageApi, contextHolder] = message.useMessage();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(
        "Mật khẩu hiện tại không được để trống"
      ),
      newPassword: Yup.string()
        .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
        .required("Mật khẩu mới không được để trống"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Xác nhận mật khẩu không khớp")
        .required("Xác nhận mật khẩu không được để trống"),
    }),
    onSubmit: (values) => {
     
        dispatch(thayDoiMatKhauAction(values))
        .then(() => {
          messageApi.success("Cập nhật thông tin thành công!");
        })
        .catch(() => {
          messageApi.error("Cập nhật thất bại!");
        });

    },
  });

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  return (
    <div className='min-h-screen bg-white px-4 sm:px-10'>
      {contextHolder}
      <div className='max-w-2xl mx-auto'>
        <form onSubmit={formik.handleSubmit}>
          <div className='px-12 sm:px-24 md:px-48 lg:px-12'>
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                Đổi mật khẩu
              </h2>
              <p className='text-gray-600'>
                Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
                khác
              </p>
            </div>

            {/* Current Password */}
            <div className='mb-6'>
              <div className='text-sm font-bold text-gray-700 tracking-wide mb-2'>
                Mật khẩu hiện tại
              </div>
              <div className='relative'>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name='currentPassword'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentPassword}
                  className='w-full text-lg py-3 pr-12 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                  placeholder='Nhập mật khẩu hiện tại'
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility("current")}
                  className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700'
                >
                  {showCurrentPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
              {formik.touched.currentPassword &&
                formik.errors.currentPassword && (
                  <div className='text-red-500 text-sm mt-1'>
                    {formik.errors.currentPassword}
                  </div>
                )}
            </div>

            {/* New Password */}
            <div className='mb-6'>
              <div className='text-sm font-bold text-gray-700 tracking-wide mb-2'>
                Mật khẩu mới
              </div>
              <div className='relative'>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name='newPassword'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  className='w-full text-lg py-3 pr-12 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                  placeholder='Nhập mật khẩu mới'
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility("new")}
                  className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700'
                >
                  {showNewPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className='text-red-500 text-sm mt-1'>
                  {formik.errors.newPassword}
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div className='mb-8'>
              <div className='text-sm font-bold text-gray-700 tracking-wide mb-2'>
                Xác nhận mật khẩu mới
              </div>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name='confirmPassword'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className='w-full text-lg py-3 pr-12 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                  placeholder='Nhập lại mật khẩu mới'
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility("confirm")}
                  className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700'
                >
                  {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className='text-red-500 text-sm mt-1'>
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            {/* Security Tips */}
            {/* <div className='mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200'>
              <h4 className='text-sm font-semibold text-blue-800 mb-2'>
                Gợi ý tạo mật khẩu mạnh:
              </h4>
              <ul className='text-sm text-blue-700 space-y-1'>
                <li>• Sử dụng ít nhất 8 ký tự</li>
                <li>• Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
                <li>• Không sử dụng thông tin cá nhân dễ đoán</li>
                <li>• Không sử dụng mật khẩu đã dùng ở nơi khác</li>
              </ul>
            </div> */}

            {/* Submit Button */}
            <div className='flex gap-4'>
              <button
                type='submit'
                // disabled={formik.isSubmitting}
                className='flex-1 bg-indigo-500 text-white p-4 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                  shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
              >
                Đổi mật khẩu
              </button>
              <button
                type='button'
                onClick={() => formik.resetForm()}
                className='px-8 py-4 border border-gray-300 text-gray-700 rounded-full tracking-wide
                  font-semibold hover:bg-gray-50 transition-all duration-200'
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
