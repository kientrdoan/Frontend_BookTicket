import { quanLyRapService } from "../../../services/QuanLyRapService";
import {
  SET_CHI_TIET_PHIM,
  SET_HE_THONG_RAP_CHIEU,
  SET_LICH_CHIEU_PHIM,
} from "./types/QuanLyRap";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layDanhSachHeThongRap();
      console.log("result rap", result);

      if (result.status === 200) {
        dispatch({
          type: SET_HE_THONG_RAP_CHIEU,
          heThongRapChieu: result.data.result.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const layThongTinChiTietPhim = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinChiTietPhim(id);

      // console.log('chi tiet phim result', result);
      //Lấy được dữ liệu từ api về  => reducer

      dispatch({
        type: SET_CHI_TIET_PHIM,
        filmDetail: result.data.result,
      });
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layThongTinLichChieuPhim = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(id);
      //Lấy được dữ liệu từ api về  => reducer

      // if (result.status === 200) {
        dispatch({
          type: SET_LICH_CHIEU_PHIM,
          lichChieuPhim: result.data.result,
        });
      // }
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
