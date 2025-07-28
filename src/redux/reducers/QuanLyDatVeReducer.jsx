
import {ThongTinLichChieu} from '../../_core/models/ThongTinPhongVe'
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from '../actions/types/QuanLyDatVeReducer';


const stateDefault = {
    infoShowtime: {},
    // chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [], //danh sách ghế đang đặt

    danhSachIdGheDangDat: [], 

    infoTicket: [],
    
    // danhSachGheKhachDat: [],
    // [{maGhe:48041},{maGhe:48042}],
    tabActive: '1'
}

export const QuanLyDatVeReducer = (state=stateDefault,action)=> {

    switch (action.type) {
       
        case SET_CHI_TIET_PHONG_VE: {
            state.infoShowtime = action.infoShowtime;
            return {...state};
        }

        case "CHANGE_SELECT_SEAT": {
            console.log("reducer", state.danhSachGheDangDat)
            state.danhSachGheDangDat = action.danhSachGheDangDat;
            return {...state};
        }

        case "CHANGE_SELECT_ID_SEAT": {
            console.log("reducer", state.danhSachIdGheDangDat)
            state.danhSachIdGheDangDat = action.danhSachIdGheDangDat;
            return {...state};
        }

        case "SET_INFO_TICKET": {
            state.infoTicket = action.infoTicket;
            return {...state};
        }

        // case DAT_VE :{ 
        //     //Cập nhật danh sách ghế đang đặt
        //     let danhSachGheCapNhat = [...state.danhSachGheDangDat];

        //     let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
        //     if(index!=-1) {
        //         //Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xoá đi
        //         danhSachGheCapNhat.splice(index,1);
               
        //     }else {
        //         danhSachGheCapNhat.push(action.gheDuocChon);
        //     }
        //     return {...state,danhSachGheDangDat:danhSachGheCapNhat}
        // }


        // case DAT_VE_HOAN_TAT :{
        //     state.danhSachGheDangDat = [];
        //     return {...state}
        // }

        // case CHUYEN_TAB : {
        //     state.tabActive = '2';
        //     return {...state};
        // }

        // case 'CHANGE_TAB_ACTIVE' : {
        //     console.log('action',action)
        //     state.tabActive = action.number;
        //     return {...state};
        // }

        // case 'DAT_GHE' : {
        //     state.danhSachGheKhachDat = action.arrGheKhachDat;
        //     return {...state}
        // }

        default: return {...state}
    }

}