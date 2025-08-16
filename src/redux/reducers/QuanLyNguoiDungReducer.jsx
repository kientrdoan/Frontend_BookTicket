'use client'

import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { DANG_NHAP_ACTION, SET_THONG_TIN_HOA_DON, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"


// let user = {};
// if (typeof window !== "undefined") {
//     const userStorage = localStorage.getItem(USER_LOGIN);
//     if (userStorage) {
//         user = JSON.parse(userStorage);
//     }
// }

const stateDefault = {
    // userLogin: user,
    thongTinNguoiDung: {},
    thongTinHoaDon: []
     
}



export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DANG_NHAP_ACTION : {
            const {thongTinDangNhap} = action;
           
            // localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            
            localStorage.setItem(TOKEN,thongTinDangNhap.token);
           
            return {...state}
        }

        case SET_THONG_TIN_NGUOI_DUNG :{ 
            
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state};
        }

        case SET_THONG_TIN_HOA_DON :{ 
            console.log("reducer", action.thongTinHoaDon)
            state.thongTinHoaDon = action.thongTinHoaDon;
            return {...state};
        }



        default:
            return { ...state }
    }
}