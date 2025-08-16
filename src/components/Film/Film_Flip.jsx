"use client";

import { useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./Film_Flip.module.css";
import { TOKEN, USER_LOGIN } from "@/utils/settings/config";

export default function Film_Flip({ phim }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const history = useHistory();

  const showTrailer = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleDatVe = () => {
    const login = localStorage.getItem(TOKEN);

    if (login) {
      history.push(`/detail/${phim.id}`);
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="movie-card-wrapper">
      {/* Movie Card Container */}
      <div className="movie-card bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Flip Card */}
        <div className={`${styles["flip-card"]} relative`}>
          <div className={styles["flip-card-inner"]}>
            {/* FRONT */}
            <div className={styles["flip-card-front"]}>
              <div className="relative overflow-hidden rounded-t-2xl">
                {/* Loading placeholder */}
                {!imageLoaded && (
                  <div className="w-full h-64 bg-gray-200 animate-pulse flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
                <img
                  src={phim.poster || "/placeholder.svg"}
                  alt="Poster"
                  className={`movie-image w-full h-64 object-cover ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://picsum.photos/300/400";
                    setImageLoaded(true);
                  }}
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0" />
              </div>
            </div>

            {/* BACK */}
            <div className={styles["flip-card-back"]}>
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={phim.poster || "/placeholder.svg"}
                  alt="Poster"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://picsum.photos/300/400";
                  }}
                  loading="lazy"
                />
                {/* Play Button Overlay */}
                <div
                  className="play-overlay absolute inset-0 bg-black/60 flex justify-center items-center cursor-pointer backdrop-blur-sm"
                  onClick={showTrailer}
                >
                  <div className="play-button-container">
                    <div className="relative">
                      <div className="ping-animation absolute inset-0 bg-red-500 rounded-full opacity-75"></div>
                      <PlayCircleOutlined className="relative text-white text-6xl drop-shadow-lg" />
                    </div>
                    <p className="text-white text-sm mt-2 font-medium">
                      Xem Trailer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4 space-y-3">
          {/* Movie Title */}
          <div className="title-container bg-gradient-to-r from-green-400 to-green-600 text-white text-center py-3 rounded-xl shadow-md">
            <h3 className="font-bold text-lg truncate px-2">{phim.title}</h3>
          </div>

          {/* Book Ticket Button */}
          <button
            onClick={handleDatVe}
            className="book-button w-full bg-gradient-to-r from-orange-400 to-red-500 
                     text-white font-bold py-3 rounded-xl shadow-lg"
          >
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>ĐẶT VÉ</span>
            </span>
          </button>
        </div>

        {/* Status Badges */}
        <div className="status-badges absolute top-3 left-3 flex flex-col space-y-1">
          {phim.nowShowing && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
              Đang chiếu
            </span>
          )}
          {phim.upcoming && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
              Sắp chiếu
            </span>
          )}
        </div>
      </div>

      {/* Modal Trailer */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={900}
        bodyStyle={{ padding: 0 }}
        destroyOnClose
        className="trailer-modal"
      >
        <div className="relative">
          <iframe
            width="100%"
            height="500"
            src={phim.trailer?.replace("watch?v=", "embed/")}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </Modal>
    </div>
  );
}
