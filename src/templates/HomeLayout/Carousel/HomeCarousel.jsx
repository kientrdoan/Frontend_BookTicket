import React from 'react'
import { Carousel } from 'antd';
import './HomeCarousel.css';

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    
};

export default function HomeCarousel() {



    return (

        <Carousel effect="fade" style={{width:'100%',padding:0,margin:0}} >
            <div>
                <div style={{ ...contentStyle, backgroundImage: `url(https://picsum.photos/id/1018/1000/600)` }}>
                    <h3>1</h3>
                </div>
            </div>
            <div>
                <div style={{ ...contentStyle, backgroundImage: `url(https://picsum.photos/id/1015/1000/600)` }}>
                    <h3>2</h3>
                </div>
            </div>
            <div>
                <div style={{ ...contentStyle, backgroundImage: `url(https://picsum.photos/id/1019/1000/600)` }}>
                    <h3>3</h3>
                </div>
            </div>
            <div>
                <div style={{ ...contentStyle, backgroundImage: `url(https://picsum.photos/id/1016/1000/600)` }}>
                    <h3>4</h3>
                </div>
            </div>

        </Carousel>
   
    )
}