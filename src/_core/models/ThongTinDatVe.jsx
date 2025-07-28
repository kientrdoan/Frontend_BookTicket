export class ThongTinDatVe { 
    showtimeId = 0;
    seatIds = [];
    constructor (showtimeId, seatIds) {
        this.showtimeId = showtimeId,
        this.seatIds = seatIds
    }
}