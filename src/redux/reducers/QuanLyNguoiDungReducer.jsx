
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { DANG_NHAP_ACTION, SET_THONG_TIN_HOA_DON, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"


let user = {};
if(localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    thongTinHoaDon: []
     
}



export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DANG_NHAP_ACTION : {
            const {thongTinDangNhap} = action;
           
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            
            localStorage.setItem(TOKEN,thongTinDangNhap.token);
           
            return {...state,userLogin:thongTinDangNhap}
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