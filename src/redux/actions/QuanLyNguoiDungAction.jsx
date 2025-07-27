/* eslint-disable no-unused-vars */
import { quanLyNguoiDungService } from '../../../services/QuanLyNguoiDung';

import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";


export const dangNhapAction = (thongTinDangNhap, history) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

            if (result.status === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.result
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
        } catch (error) {
            console.log('error', error);
        }

    }

}


export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);

            console.log("Thong Tin Dang Ky: ", thongTinDangKy)

            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.result
                });
                //Chuyển hướng đăng nhập về trang trước đó
                // history.goBack();
            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error);
        }

    }

}


export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();


            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });

            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}