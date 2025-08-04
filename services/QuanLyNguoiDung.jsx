import { baseService } from "./baseServices";

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

  layThongTinNguoiDung = () => {
    return this.get_token("/accounts/customer/profile")
  };

  capNhatTinNguoiDung = (thongTin) => {
    return this.put("/accounts/profile", thongTin)
  };


  layThongTinHoaDon = () => {
    return this.get_token("/bookings/my-bookings")
  }

  layThongTinChiTietHoaDon = (id) => {
    return this.get_token(`/bookings/${id}`);
  };

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
