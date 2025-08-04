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

  layDanhSachPhimTheoTitle = (title, cinemaId) => {
    if (cinemaId !== 0 && title.trim() !== "") {
      return this.get(`/movies/search-by-title-and-cinema?title=${title}&cinemaId=${cinemaId}`);
    }
    else if (cinemaId === 0 && title.trim() !== "") {
      return this.get(`/movies/search-by-title-and-cinema?title=${title}`);
    }
    else if (cinemaId !== 0 && title.trim() === "") {
      // alert("Vui lòng nhập tên phim để tìm kiếm");
      return this.get(`/movies/search-by-title-and-cinema?cinemaId=${cinemaId}`);
    }
  };

  // layThongTinPhim = (maPhim) => {
  //     return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
  // }
}

export const quanLyPhimService = new QuanLyPhimService();
