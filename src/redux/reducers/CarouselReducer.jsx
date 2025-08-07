const stateDefault = {
    arrImg: [
        {
            "maBanner": 1,
            "maPhim": 1328,
            // "hinhAnh": "https://picsum.photos/id/1018/1000/600",
            "hinhAnh": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRsTe3jSyyOB-hWVLngnOMbB9uGEj79zLNAUTQHMKitmxtMsFnYKCt8WCJcG0uz9shVrMEDW9_j59LueS8hbkx3e2-wN7dNuZrvzIlexit1",
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