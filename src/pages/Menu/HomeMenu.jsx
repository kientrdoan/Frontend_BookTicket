import React, { Fragment, useEffect, useState } from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimTheoCinameAndRoomAction } from "../../redux/actions/QuanLyPhimAction";
const { TabPane } = Tabs;

// const HomeMenu = ({ heThongRapChieu }) => {
//   const [tabPosition] = useState("left");
//   // console.log("rap", heThongRapChieu)
//   const dispatch = useDispatch();
//   const { arrFilmByRoom } = useSelector((state) => state.QuanLyPhimReducer);

//   console.log("arrFilmByRoom", arrFilmByRoom);

//   const uniqueFilms = Array.from(
//     new Map(arrFilmByRoom.map((phim) => [phim.title, phim])).values()
//   );

//   useEffect(() => {
//     if (heThongRapChieu?.length > 0) {
//       const firstCinema = heThongRapChieu[0];
//       const firstRoom = firstCinema.rooms?.[0];
//       if (firstRoom?.id) {
//         dispatch(layDanhSachPhimTheoCinameAndRoomAction(firstRoom.id));
//       }
//     }
//   }, [heThongRapChieu]);

//   const renderHeThongRap = () => {
//     return heThongRapChieu?.map((heThongRap, index) => (
//       <TabPane
//         // tab={<img src={heThongRap.logo} className="rounded-full" width="50" alt={heThongRap.name} />}
//         tab={
//           <h2
//             onClick={() => {
//               const firstRoom = heThongRap.rooms?.[0];
//               if (firstRoom?.id) {
//                 dispatch(layDanhSachPhimTheoCinameAndRoomAction(firstRoom.id));
//               }
//             }}
//           >
//             {heThongRap.name}
//           </h2>
//         }
//         key={index}
//       >
//         <Tabs tabPosition={tabPosition}>
//           {heThongRap.rooms?.map((room, idx) => (
//             <TabPane
//               tab={
//                 <div style={{ width: "300px", display: "flex" }}>
//                   <div
//                     className='text-left ml-2'
//                     onClick={() => {
//                       dispatch(layDanhSachPhimTheoCinameAndRoomAction(room.id));
//                     }}
//                   >
//                     {room.name}
//                     <p className='text-red-200'>Chi tiết</p>
//                   </div>
//                 </div>
//               }
//               key={idx}
//             >
//               {uniqueFilms.map((phim, phimIdx) => (
//                 <Fragment key={phimIdx}>
//                   <div className='my-5'>
//                     <div style={{ display: "flex" }}>
//                       <img
//                         style={{ height: 75, width: 75 }}
//                         src={phim.poster}
//                         alt={phim.title}
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = "https://picsum.photos/75/75";
//                         }}
//                       />
//                       <div className='ml-2'>
//                         {/* <h1 className='text-2xl text-green-700'>
//                             {phim.title}
//                         </h1> */}

//                         <NavLink to={`/detail/${phim.id}`}>
//                           {phim.title}
//                         </NavLink>
//                       </div>
//                     </div>
//                   </div>
//                   <hr />
//                 </Fragment>
//               ))}
//             </TabPane>
//           ))}
//         </Tabs>
//       </TabPane>
//     ));
//   };

//   return <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>;
// };

const HomeMenu = ({ heThongRapChieu }) => {
  const [tabPosition] = useState("left");
  const [activeCinemaKey, setActiveCinemaKey] = useState("0");
  const [activeRoomKey, setActiveRoomKey] = useState("0");

  const dispatch = useDispatch();
  const { arrFilmByRoom } = useSelector((state) => state.QuanLyPhimReducer);

  const uniqueFilms = Array.from(
    new Map(arrFilmByRoom.map((phim) => [phim.title, phim])).values()
  );

  // Khi load lần đầu
  useEffect(() => {
    if (heThongRapChieu?.length > 0) {
      const firstCinema = heThongRapChieu[0];
      const firstRoom = firstCinema.rooms?.[0];
      if (firstRoom?.id) {
        dispatch(layDanhSachPhimTheoCinameAndRoomAction(firstRoom.id));
      }
    }
  }, [heThongRapChieu]);

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, cinemaIndex) => (
      <TabPane
        key={cinemaIndex}
        tab={
          <h2
            onClick={() => {
              const firstRoom = heThongRap.rooms?.[0];
              if (firstRoom?.id) {
                dispatch(layDanhSachPhimTheoCinameAndRoomAction(firstRoom.id));
              }
              setActiveCinemaKey(String(cinemaIndex));  // ✅ đổi cinema
              setActiveRoomKey("0");                    // ✅ reset về room đầu tiên
            }}
          >
            {heThongRap.name}
          </h2>
        }
      >
        <Tabs
          tabPosition={tabPosition}
          activeKey={activeCinemaKey === String(cinemaIndex) ? activeRoomKey : "0"}
          onChange={(roomKey) => {
            setActiveRoomKey(roomKey);
            const selectedRoom = heThongRap.rooms?.[roomKey];
            if (selectedRoom?.id) {
              dispatch(layDanhSachPhimTheoCinameAndRoomAction(selectedRoom.id));
            }
          }}
        >
          {heThongRap.rooms?.map((room, roomIdx) => (
            <TabPane
              tab={
                <div style={{ width: "300px", display: "flex" }}>
                  <div className="text-left ml-2">{room.name}</div>
                </div>
              }
              key={String(roomIdx)}
            >
              {uniqueFilms.map((phim, phimIdx) => (
                <Fragment key={phimIdx}>
                  <div className="my-5">
                    <div style={{ display: "flex" }}>
                      <img
                        style={{ height: 75, width: 75 }}
                        src={phim.poster}
                        alt={phim.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://picsum.photos/75/75";
                        }}
                      />
                      <div className="ml-2">
                        <NavLink to={`/detail/${phim.id}`}>{phim.title}</NavLink>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </TabPane>
          ))}
        </Tabs>
      </TabPane>
    ));
  };

  return (
    <Tabs
      tabPosition={tabPosition}
      activeKey={activeCinemaKey}
      onChange={(key) => {
        setActiveCinemaKey(key);
        setActiveRoomKey("0"); // khi đổi cinema thì reset về room đầu
        const cinema = heThongRapChieu[key];
        const firstRoom = cinema?.rooms?.[0];
        if (firstRoom?.id) {
          dispatch(layDanhSachPhimTheoCinameAndRoomAction(firstRoom.id));
        }
      }}
    >
      {renderHeThongRap()}
    </Tabs>
  );
};


export default HomeMenu;
