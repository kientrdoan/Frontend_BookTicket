import { baseService } from "./baseServices";

export class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }

  layDanhSachBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  layDanhSachPhim = (page) => {
    // if (tenPhim.trim() != "") {
    //   return this.get(`movies&tenPhim=${tenPhim}`);
    // }
    return this.get(`/movies?page=${page}&size=8`);
  };

  layDanhSachPhimTheoCinemaAndRoom = (idRoom) => {
    return this.get(`/movies/room/${idRoom}`);
  };

  layDanhSachPhimTheoTitle = (title) => {
    return this.get(`/movies/search?title=${title}`);
  };

  // layThongTinPhim = (maPhim) => {
  //     return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
  // }
}

export const quanLyPhimService = new QuanLyPhimService();
