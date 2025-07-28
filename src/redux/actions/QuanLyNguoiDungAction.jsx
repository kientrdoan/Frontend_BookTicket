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

      if (result.status === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.result,
        });
        //Chuyển hướng đăng nhập về trang trước đó
        history.goBack();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const dangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);

      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.result,
        });
        //Chuyển hướng đăng nhập về trang trước đó
        // history.goBack();
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

      console.log("result", result);
    } catch (error) {
      console.log("error", error.response.data);
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
