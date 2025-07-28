// import { SET_DANH_SACH_PHIM, SET_FILM_SAP_CHIEU,SET_FILM_DANG_CHIEU, SET_THONG_TIN_PHIM } from "../actions/types/QuanLyPhimType"
// import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

import {
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../actions/types/QuanLyPhimType";
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRap";

const stateDefault = {
  //   arrFilm: [
  //     {
  //       maPhim: 1282,
  //       tenPhim: "Ban tay diet quy",
  //       biDanh: "ban-tay-diet-quy",
  //       trailer: "https://www.youtube.com/embed/uqJ9u7GSaYM",
  //       hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
  //       moTa: "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
  //       maNhom: "GP00",
  //       ngayKhoiChieu: "2019-07-29T00:00:00",
  //       danhGia: 5,
  //       hot: true,
  //       dangChieu: false,
  //       sapChieu: true,
  //     },
  //     {
  //       maPhim: 1282,
  //       tenPhim: "Ban tay diet quy",
  //       biDanh: "ban-tay-diet-quy",
  //       trailer: "https://www.youtube.com/embed/uqJ9u7GSaYM",
  //       hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
  //       moTa: "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
  //       maNhom: "GP00",
  //       ngayKhoiChieu: "2019-07-29T00:00:00",
  //       danhGia: 5,
  //       hot: true,
  //       dangChieu: false,
  //       sapChieu: true,
  //     },
  //   ],

  arrFilm: [
    {
      id: 1282,
      title: "Ban tay diet quy",
      trailer: "https://www.youtube.com/embed/uqJ9u7GSaYM",
      poster: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
      description: "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
      releaseDate: "2019-07-29",
      actors: [],
      genres: [],
      dangChieu: false,
      sapChieu: true,
    },
  ],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],

  arrFilmByRoom: [],

  filmDetail: {},

  thongTinPhim: {},
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm;
      return { ...state };
    }
    case SET_FILM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;

      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case SET_FILM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }

    case SET_CHI_TIET_PHIM: {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }

    case "SET_PHIM_BY_ROOM": {
      console.log("reducer", action.arrFilmByRoom)
      state.arrFilmByRoom = action.arrFilmByRoom;
      return { ...state };
    }

    // case SET_THONG_TIN_PHIM: {
    //     state.thongTinPhim = action.thongTinPhim;
    //     return {...state}
    // }

    default:
      return { ...state };
  }
};
