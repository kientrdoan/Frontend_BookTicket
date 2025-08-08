import { baseService } from "./baseServices";

export class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }

  layDanhSachBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  layDanhSachTheLoai = () => {
    return this.get(`/genres`);
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

  // layDanhSachPhimTheoTitle = (title, cinemaId, genresId) => {
  //   if (cinemaId !== 0 && title.trim() !== "" && genresId.lenght > 0) {
  //     return this.get(
  //       `/movies/search-advanced?query=${title}&cinemaId=${cinemaId}&genreIds=${genresId}`
  //     );
  //   } else if (cinemaId === 0 && genresId.lenght === 0 && title.trim() !== "") {
  //     return this.get(`/movies/search-advanced?query=${title}`);
  //   } else if (cinemaId !== 0 && title.trim() === "" && genresId.lenght === 0)  {
  //     // alert("Vui lòng nhập tên phim để tìm kiếm");
  //     return this.get(`/movies/search-advanced?cinemaId=${cinemaId}`);
  //   }
  //   // else if (cinemaId === 0 && title.trim() === "") {
  //   //   return this.get(`/movies?page=0&size=8`);
  //   // }
  // };

  // layThongTinPhim = (maPhim) => {
  //     return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
  // }

  layDanhSachPhimTheoTitle = (title, cinemaId, genresId, date) => {
    const params = new URLSearchParams();

    if (title && title.trim() !== "") {
      params.append("query", title.trim());
    }

    if (cinemaId && cinemaId !== 0) {
      params.append("cinemaId", cinemaId);
    }

    if (Array.isArray(genresId) && genresId.length > 0) {
      params.append("genreIds", genresId.join(","));
    }

    if (date && date !== "") {
      params.append("date", date.trim());
    }

    // Trường hợp không có param nào → trả về mặc định 8 phim đầu
    const queryString = params.toString();
    // if (queryString === "") {
    //   return this.get("/movies?page=0&size=8");
    // }

    return this.get(`/movies/search-advanced?${queryString}`);
  };
}

export const quanLyPhimService = new QuanLyPhimService();
