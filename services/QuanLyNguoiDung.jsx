import { baseService } from "./baseServices";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    return this.post("/auth/login", thongTinDangNhap);
  };

  verifyOtp = (thongTinDangNhap, otp) => {
    return this.post(`/accounts/complete-register?otp=${otp}`, thongTinDangNhap);
  };

  dangKy = (thongTinDangKy) => {
    return this.post("/accounts/send-otp", thongTinDangKy);
  };

  layThongTinNguoiDung = () => {
    return this.get_token("/accounts/customer/profile");
  };

  capNhatTinNguoiDung = (thongTin) => {
    return this.put("/accounts/profile", thongTin);
  };

  layThongTinHoaDon = () => {
    return this.get_token("/bookings/my-bookings");
  };

  layThongTinChiTietHoaDon = (id) => {
    return this.get_token(`/bookings/${id}`);
  };

  thayDoiMatKhau = (payload) => {
    return this.post_token(`/accounts/change-password${payload}`)
  }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
