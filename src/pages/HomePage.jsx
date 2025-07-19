import React, { useEffect } from "react";
import HomeMenu from "./Menu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import Film from "../components/film/Film";
import MultipleRowSlick from "../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../redux/actions/QuanLyPhimAction";


export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);

  const dispath = useDispatch()

  // const renderFilms = () => {
  //   return arrFilm.map((film, index) => {
  //     return <Film key={index}></Film>
  //   });
  // };

  useEffect(()=>{
    const action = layDanhSachPhimAction()

    dispath(action)
    
  }, [])

  return (
    <div>
      <section class='text-gray-600 body-font'>
        <div class='container px-5 py-24 mx-auto'>
          {/* <div class='flex flex-wrap -m-4' style={{justifyContent: 'center'}}>
            {renderFilms()}
          </div> */}
          <MultipleRowSlick arrFilm= {arrFilm} />
        </div>
      </section>
      <HomeMenu></HomeMenu>
    </div>
  );
}
