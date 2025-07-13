import { quanLyPhimService } from '../../../services/QuanLyPhimService';

export const getCarouselAction = async (dispath) => {
  try {
    var result = await quanLyPhimService.layDanhSachBanner();

    console.log("fetchData success", result);
    dispath({
      type: "SET_CAROUSEL",
      arrImg: result.data.content,
    });
  } catch (error) {
    console.log("error", error);
  }
};
