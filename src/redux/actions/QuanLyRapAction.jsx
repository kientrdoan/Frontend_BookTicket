import { quanLyRapService } from "../../../services/QuanLyRapService"
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRap"




export const layDanhSachHeThongRapAction = () => {

    return async (dispatch) => {
        try{
            const result = await quanLyRapService.layDanhSachHeThongRap()
            console.log('result', result);
            
            if(result.status === 200) {
                dispatch(
                    {
                        type: SET_HE_THONG_RAP_CHIEU,
                        heThongRapChieu: result.data.result 
                    }
                )
            } 

        }catch(error){
            console.log(error)
        }
    }
}


export const layThongTinChiTietPhim = (id) => {
    return async dispatch => {
        try{
            const result = await quanLyRapService.layThongTinChiTietPhim(id);

            // console.log('chi tiet phim result', result);
            //Lấy được dữ liệu từ api về  => reducer

            dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: result.data.result
            })


        }
        catch(errors) {
            console.log('errors',errors.response?.data)

        }
    }
}

export const layThongTinLichChieuPhim = (id) => {
    return async dispatch => {
        try{
            const result = await quanLyRapService.layThongTinLichChieuPhim(id);

            console.log('Lich Chieu Phim', result);
            //Lấy được dữ liệu từ api về  => reducer

            dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: result.data.result
            })


        }
        catch(errors) {
            console.log('errors',errors.response?.data)

        }
    }
}