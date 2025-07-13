const stateDefault = {
    arrImg: [
        {
            "maBanner": 1,
            "maPhim": 1328,
            // "hinhAnh": "https://picsum.photos/id/1018/1000/600",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
        }
    ]
}

export const CarouselReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'SET_CAROUSEL':
            state.arrImg = action.arrImg;
            return {...state};
        default:
            return {...state};
    }
}