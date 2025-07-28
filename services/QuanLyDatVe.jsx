import { ThongTinDatVe } from "../src/_core/models/ThongTinDatVe";
import { baseService } from "./BaseServices";

export class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }

  layChiTietPhongVe = (idLichChieu) => {
    // mã lịch chiếu lấy từ url
    return this.get(`/showtimes/${idLichChieu}`);
  };

  /* thongTinDatVe =  {
        "maLichChieu": 0,
        "danhSachVe": [
          {
            "maGhe": 0,
            "giaVe": 0
          }
        ]
      }*/

  datVe = (thongTinDatVe) => {
    return this.post_token(`/bookings`, thongTinDatVe);
  };
  
  layThongTinTicket = (id) => {
    return this.get_token(`/tickets/showtime/${id}`);
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
