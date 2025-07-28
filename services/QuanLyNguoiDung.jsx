import { DOMAIN, TOKEN } from "../util/settings/config";
import { baseService } from "./BaseServices";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    // {taiKhoan:'',matKhau:''}
    return this.post("/auth/login", thongTinDangNhap);
  };

  dangKy = (thongTinDangKy) => {
    return this.post("/accounts/register", thongTinDangKy);
  };

  // layThongTinNguoiDung = () => {
  //   return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  // };

  layThongTinNguoiDung = () => {
    return this.get_token("/accounts/customer/profile")
  };


  layThongTinHoaDon = () => {
    return this.get_token("/bookings/my-bookings")
  }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
