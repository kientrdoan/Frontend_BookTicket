import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import './HomeCarousel.module.css';
import {useDispatch, useSelector} from 'react-redux'
import { getCarouselAction } from '../../../redux/actions/CarouselAction';



export default function HomeCarousel() {

    const {arrImg} = useSelector(state => state.CarouselReducer);
    // const dispath= useDispatch();

    useEffect(() => {
        // async function fetchData() {
        //    const action= getCarouselAction
        //    dispath(action);
        // }
        // fetchData();
    }, []);

    const contentStyle = {
    height: "600px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    };

    const rederImg = () => {
        return arrImg.map((item, index) => {
            return  <div key={index}>
                <div style={{ ...contentStyle }}>
                    <img src={item.hinhAnh} alt={item.maPhim} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                    {/* <h3>{index + 1}</h3> */}
                </div>
            </div>
        })
    }

    return (

        <Carousel effect="fade" style={{width:'100%',padding:0,margin:0}} >
            {/* <div>
                <div style={{ ...contentStyle, backgroundImage: `url(https://picsum.photos/id/1018/1000/600)` }}>
                    <h3>1</h3>
                </div>
            </div> */}
            {rederImg()}
        </Carousel>
   
    )
}