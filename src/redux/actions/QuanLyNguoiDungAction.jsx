/* eslint-disable no-unused-vars */
import { quanLyNguoiDungService } from "../../../services/QuanLyNguoiDung";
import { DOMAIN, TOKEN } from "../../utils/settings/config";

import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_HOA_DON,
  SET_THONG_TIN_NGUOI_DUNG,
} from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap, history) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

      console.log("result login", result.data.result);

      if (result.status === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.result,
        });
        history.goBack();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};


export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      console.log("Thong tin nguoi dung", result);
      if (result.status === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.result,
        });
      }
      
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

// export const dangKyAction = (thongTinDangKy, history) => {
//   return async (dispatch) => {
//     try {
//       const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);

//       if (result.status === 200) {
//         // dispatch({
//         //   type: DANG_NHAP_ACTION,
//         //   thongTinDangNhap: result.data.result,
//         // });
//         history.goBack()
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
// };


export const dangKyAction = (thongTinDangKy, history) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);

      if (result.status === 200) {
         return true;
        // history.goBack();
      }
      return false
    } catch (error) {
      // Ném lỗi ra để component Register có thể bắt
      throw error.response?.data?.message || "Đăng ký thất bại!";
    }
  };
};

export const verifyOtpAction = (thongTinDangKy, otp, history) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.verifyOtp(thongTinDangKy, otp);
      console.log("otp result", result)
      if (result.status === 200) {
        // history.goBack();
        return true;
      }
      return false
    } catch (error) {
      // Ném lỗi ra để component Register có thể bắt
      throw error.response?.data?.message || "Đăng ký thất bại!";
    }
  };
};


export const capNhatThongTinNguoiDungAction = (thongTin) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatTinNguoiDung(thongTin);

      if (result.status === 200) {
        // dispatch({
        //   type: SET_THONG_TIN_HOA_DON,
        //   thongTinHoaDon: result.data.result,
        // });

        return Promise.resolve(result.data.result);
      } else {
        return Promise.reject(new Error("Cập nhật thất bại"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
};


export const layThongTinHoaDonAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinHoaDon();

      if (result.status === 200) {
        dispatch({
          type: SET_THONG_TIN_HOA_DON,
          thongTinHoaDon: result.data.result,
        });
      }

    } catch (error) {
      console.log("error", error);
    }
  };
};


export const layThongTinChiTietHoaDonAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinChiTietHoaDon(id);
      if (result.status === 200) {
        return result.data.result;
      }

    } catch (error) {
      console.log("error", error);
    }
  };
};


export const thayDoiMatKhauAction = (thongTin) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.thayDoiMatKhau(thongTin);
      console.log("change pass", result)

      if (result.status === 200) {
        // dispatch({
        //   type: SET_THONG_TIN_HOA_DON,
        //   thongTinHoaDon: result.data.result,
        // });

        return Promise.resolve(result.data.result);
      } else {
        return Promise.reject(new Error("Cập nhật thất bại"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
};