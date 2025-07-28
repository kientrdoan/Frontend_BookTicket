import {
  SET_HE_THONG_RAP_CHIEU,
  SET_LICH_CHIEU_PHIM,
} from "../actions/types/QuanLyRap";

const stateDefault = {
  heThongRapChieu: [],
  lichChieuPhim: [],
};

export const QuanLyRapReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_HE_THONG_RAP_CHIEU: {
      state.heThongRapChieu = action.heThongRapChieu;
      return { ...state };
    }

    case SET_LICH_CHIEU_PHIM: {
      state.lichChieuPhim = action.lichChieuPhim;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
