/* eslint-disable no-unused-vars */

// import { connection } from "../../index";

// import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";

import { quanLyDatVeService } from "../../../services/QuanLyDatVe";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { DOMAIN, TOKEN } from "../../utils/settings/config";
import {
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "./types/QuanLyDatVeReducer";

import Axios from "axios";

export const layChiTietPhongVeAction = (idLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(idLichChieu);
      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          infoShowtime: result.data.result,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const datVeAction = (thongTinDatVe) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(displayLoadingAction)
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      console.log("dat ve", result.data.result);

      try {
        const res = await Axios({
          url: `${DOMAIN}/payments/vnpay/create`,
          method: "POST",
          data: {
            invoiceId: result.data.result.invoiceId,
          },
          headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
        });

        console.log("res", res);

        if (res.data?.result) {
          window.location.href = res.data.result.paymentUrl;
        } else {
          alert("Không tạo được link thanh toán");
        }
      } catch (err) {
        console.error(err);
        alert("Lỗi khi xử lý thanh toán");
      }

      //Đặt vé thành công gọi api load lại phòng vé
      // await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
      // await dispatch({type:DAT_VE_HOAN_TAT})

      // await dispatch(hideLoadingAction);

      // let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
      //  connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu);

      dispatch({ type: CHUYEN_TAB });
    } catch (error) {
      // dispatch(hideLoadingAction)
      console.log(error);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    //Đưa thông tin ghế lên reducer
    await dispatch({
      type: DAT_VE,
      gheDuocChon: ghe,
    });

    //Call api về backend
    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

    console.log("danhSachGheDangDat", danhSachGheDangDat);
    console.log("taiKhoan", taiKhoan);
    console.log("maLichChieu", maLichChieu);
    //Biến mảng thành chuỗi
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    //Call api signalR
    // connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu);
  };
};

export const layThongTinTicketAction = (idLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layThongTinTicket(idLichChieu);
      console.log("ticket", result)
      if (result.status === 200) {
        dispatch({
          type: "SET_INFO_TICKET",
          infoTicket: result.data.result,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

