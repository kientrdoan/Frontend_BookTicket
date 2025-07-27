import { GROUPID } from "../util/settings/config";
import { baseService } from "./BaseServices";


export class QuanLyPhimService  extends baseService{

    constructor() {
        super();
    }

    layDanhSachBanner = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
    }
    
    layDanhSachPhim = (tenPhim='') => {
        if(tenPhim.trim()!=''){
            return this.get(`movies&tenPhim=${tenPhim}`)
        }
        return this.get(`/movies`)

    }

    // layThongTinPhim = (maPhim) => {
    //     return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    // }
    
}



export const quanLyPhimService = new QuanLyPhimService();