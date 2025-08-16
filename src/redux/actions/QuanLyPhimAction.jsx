import { quanLyPhimService } from "../../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachTheLoaiAction = () => {
  return async (dispath) => {
    try {
      const result = await quanLyPhimService.layDanhSachTheLoai();
      // console.log("api", result.data.result.totalPages)
      dispath({
        type: "SET_DANH_SACH_THE_LOAI",
        theLoai: result.data.result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDanhSachPhimAction = (page) => {
  return async (dispath) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(page);
      // console.log("api", result.data.result.totalPages)
      dispath({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.result.content.filter((film) => film.upcoming === true || film.nowShowing === true),
      });

      dispath({
        type: "SET_TOTAL_PAGE",
        totalPages: result.data.result.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDanhSachPhimTheoCinameAndRoomAction = (idRoom) => {
  return async (dispath) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhimTheoCinemaAndRoom(
        idRoom
      );
      console.log("FILM BY ROOM", result);
      dispath({
        type: "SET_PHIM_BY_ROOM",
        arrFilmByRoom: result.data.result.filter((film) => film.upcoming === true || film.nowShowing === true),
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDanhSachPhimTheoTitleAction = (title, cinemaId, genresId, date) => {
  return async (dispath) => {
    try {
      if (cinemaId === 0 && title.trim() === "" && genresId.length === 0 && date.trim() === "") {
        const result = await quanLyPhimService.layDanhSachPhim(0);
        dispath({
          type: SET_DANH_SACH_PHIM,
          arrFilm: result.data.result.content.filter((film) => film.upcoming === true || film.nowShowing === true),
        });
      } else {
        const result = await quanLyPhimService.layDanhSachPhimTheoTitle(
          title,
          cinemaId,
          genresId,
          date
        );
        dispath({
          type: "SET_PHIM_BY_TITLE",
          arrFilm: result.data.result.filter((film) => film.upcoming === true || film.nowShowing === true),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
