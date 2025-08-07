"use client";

import React, { useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./Film_Flip.module.css";
import { USER_LOGIN } from "@/utils/settings/config";

export default function Film_Flip({ phim }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const showTrailer = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleDatVe = () => {
    // Kiểm tra user đăng nhập (dùng localStorage, hoặc Redux nếu bạn dùng)
    const userLogin = localStorage.getItem(USER_LOGIN);

    if (userLogin) {
      history.push(`/detail/${phim.id}`);
    } else {
      history.push("/login");
    }
  };

  return (
    <div className={`${styles["flip-card"]} mt-2`}>
      <div className={styles["flip-card-inner"]}>
        {/* FRONT */}
        <div className={styles["flip-card-front"]}>
          <img
            src={phim.poster}
            alt='Poster'
            style={{ width: 300, height: 200 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/300/300";
            }}
          />
        </div>

        {/* BACK */}
        <div className={styles["flip-card-back"]}>
          <div className='absolute top-0 left-0'>
            <img
              src={phim.poster}
              alt='Poster'
              style={{ width: 300, height: 200 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/300/300";
              }}
            />
          </div>

          <div
            className='absolute w-full h-full bg-black/50 flex justify-center items-center'
            onClick={showTrailer}
          >
            <div>
              <div className='rounded-full cursor-pointer'>
                <PlayCircleOutlined
                  style={{ fontSize: "50px", color: "white" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='block bg-green-300 text-center cursor-pointer py-2 text-white font-bold'>
        {phim.title}
      </div>
      {/* Đặt vé */}
      <div
        onClick={handleDatVe}
        className='block bg-orange-300 text-center cursor-pointer py-2 my-2 text-white font-bold'
      >
        ĐẶT VÉ
      </div>

      {/* Modal Trailer */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
        bodyStyle={{ padding: 0 }}
        destroyOnClose
      >
        <iframe
          width='100%'
          height='450'
          src={phim.trailer?.replace("watch?v=", "embed/")}
          title='Trailer'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
}
