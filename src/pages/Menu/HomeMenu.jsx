import React, { Fragment, useState } from 'react';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;

const HomeMenu = ({ heThongRapChieu }) => {
    const [tabPosition] = useState('left');
    console.log("rap", heThongRapChieu)

    const renderHeThongRap = () => {
        return heThongRapChieu?.map((heThongRap, index) => (
            <TabPane
                // tab={<img src={heThongRap.logo} className="rounded-full" width="50" alt={heThongRap.name} />}
                tab={<h2>{heThongRap.name}</h2>}
                key={index}
            >
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.rooms?.map((cumRap, idx) => (
                        <TabPane
                            tab={
                                <div style={{ width: '300px', display: 'flex' }}>
                                    <div className="text-left ml-2">
                                        {cumRap.name}
                                        <p className="text-red-200">Chi tiết</p>
                                    </div>
                                </div>
                            }
                            key={idx}
                        >
                            {/* {cumRap.danhSachPhim.slice(0, 4).map((phim, phimIdx) => (
                                <Fragment key={phimIdx}>
                                    <div className="my-5">
                                        <div style={{ display: 'flex' }}>
                                            <img
                                                style={{ height: 75, width: 75 }}
                                                src={phim.hinhAnh}
                                                alt={phim.tenPhim}
                                                onError={e => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://picsum.photos/75/75";
                                                }}
                                            />
                                            <div className="ml-2">
                                                <h1 className="text-2xl text-green-700">{phim.tenPhim}</h1>
                                                <p>{cumRap.diaChi}</p>
                                                <div className="grid grid-cols-6 gap-6">
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, lcIdx) => (
                                                        <NavLink
                                                            className="text-2xl text-green-400"
                                                            to={`/checkout/${lichChieu.maLichChieu}`}
                                                            key={lcIdx}
                                                        >
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))} */}
                        </TabPane>
                    ))}
                </Tabs>
            </TabPane>
        ));
    };

    return (
        <Tabs tabPosition={tabPosition}>
            {renderHeThongRap()}
        </Tabs>
    );
};

export default HomeMenu;
