import { GROUPID } from "../util/settings/config";
import { baseService } from "./BaseServices";

export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }

  layDanhSachHeThongRap = () => {
    return this.get(`/cinemas`);
  };

  layThongTinChiTietPhim = (id) => {
    return this.get(`/movies/${id}`);
  };

  layThongTinLichChieuPhim = (id) => {
    return this.get(`/cinemas/${id}`);
  };
}

export const quanLyRapService = new QuanLyRapService();
