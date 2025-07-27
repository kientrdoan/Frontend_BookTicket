import { quanLyPhimService } from "../../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = () => {
  return async (dispath) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim();
      // console.log(result)
      dispath({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.result,
      });
    } catch (error) {
        console.log(error)
    }
  };
};
