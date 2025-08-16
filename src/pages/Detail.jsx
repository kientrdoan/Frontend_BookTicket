"use client"

import { useEffect, useState } from "react"
import { Tabs, Modal } from "antd"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PlayCircleOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons"

import { layThongTinChiTietPhim, layThongTinLichChieuPhim } from "../redux/actions/QuanLyRapAction"

const { TabPane } = Tabs

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail)
  const lichChieuPhim = useSelector((state) => state.QuanLyRapReducer.lichChieuPhim)

  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCinema, setSelectedCinema] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const cinemaGroups = lichChieuPhim.reduce((groups, showtime) => {
    const cinemaName = showtime.cinemaName
    if (!groups[cinemaName]) {
      groups[cinemaName] = []
    }
    groups[cinemaName].push(showtime)
    return groups
  }, {})

  const uniqueDatesForCinema = selectedCinema
    ? [
        ...new Set(
          cinemaGroups[selectedCinema]?.map((showtime) => moment(showtime.startTime).format("YYYY-MM-DD")) || [],
        ),
      ].sort()
    : []

  const filteredShowtimes =
    selectedCinema && selectedDate
      ? cinemaGroups[selectedCinema]?.filter(
          (showtime) => moment(showtime.startTime).format("YYYY-MM-DD") === selectedDate,
        ) || []
      : []

  useEffect(() => {
    const { id } = props.match.params
    dispatch(layThongTinChiTietPhim(id))
    dispatch(layThongTinLichChieuPhim(id))
  }, [])

  useEffect(() => {
    const cinemaNames = Object.keys(cinemaGroups)
    if (cinemaNames.length > 0 && !selectedCinema) {
      setSelectedCinema(cinemaNames[0])
    }
  }, [lichChieuPhim])

  useEffect(() => {
    if (selectedCinema) {
      setSelectedDate(uniqueDatesForCinema[0])
    } else {
      setSelectedDate(null)
    }
  }, [selectedCinema])

  const showTrailer = () => setIsModalOpen(true)
  const handleCancel = () => setIsModalOpen(false)

  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.poster || "/placeholder.svg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-6 pt-20 pb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Movie Poster */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={filmDetail.poster || "/placeholder.svg"}
                  alt="poster"
                  className="w-80 h-[480px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={showTrailer}
                >
                  <PlayCircleOutlined className="text-6xl text-white drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white space-y-6">
              <div>
                <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">{filmDetail.title}</h1>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">{filmDetail.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CalendarOutlined className="text-blue-400 text-lg" />
                  <div>
                    <span className="text-gray-300">Ngày phát hành</span>
                    <p className="text-white font-medium">{moment(filmDetail.releaseDate).format("DD/MM/YYYY")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <span className="text-yellow-400 text-lg">🎬</span>
                  <div>
                    <span className="text-gray-300">Thể loại</span>
                    <p className="text-white font-medium">
                      {filmDetail.genres?.map((genre) => genre.name).join(", ") || "Đang cập nhật"}
                    </p>
                  </div>
                </div>
              </div>

              {filmDetail.actors && filmDetail.actors.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <span className="text-gray-300 text-sm">Diễn viên chính</span>
                  <p className="text-white font-medium mt-1">
                    {filmDetail.actors.map((actor) => `${actor.firstName} ${actor.lastName}`).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-t-3xl shadow-2xl mt-8">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center gap-3 mb-8">
              <ClockCircleOutlined className="text-2xl text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">Đặt vé xem phim</h2>
            </div>

            {Object.keys(cinemaGroups).length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    🏢 Chọn rạp chiếu
                  </h3>
                  <div className="space-y-3">
                    {Object.keys(cinemaGroups).map((cinemaName) => (
                      <button
                        key={cinemaName}
                        onClick={() => setSelectedCinema(cinemaName)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedCinema === cinemaName
                            ? "bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105"
                            : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md"
                        }`}
                      >
                        <div className="font-medium">{cinemaName}</div>
                        <div className="text-sm opacity-75 mt-1">{cinemaGroups[cinemaName].length} suất chiếu</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3">
                  {selectedCinema && uniqueDatesForCinema.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        📅 Chọn ngày chiếu
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {uniqueDatesForCinema.map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`px-6 py-3 rounded-xl border-2 transition-all duration-200 min-w-[120px] ${
                              selectedDate === date
                                ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                                : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md"
                            }`}
                          >
                            <div className="font-medium">{moment(date).format("DD/MM")}</div>
                            <div className="text-xs opacity-75">{moment(date).format("dddd")}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        🎬 Suất chiếu ngày {moment(selectedDate).format("DD/MM/YYYY")}
                      </h4>

                      {filteredShowtimes.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {filteredShowtimes.map((showtime) => (
                            <Link
                              key={showtime.id}
                              to={`/checkout/${showtime.id}`}
                              className="group block p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 mb-2">
                                  {moment(showtime.startTime).format("HH:mm")}
                                </div>
                                <div className="text-sm text-gray-600 bg-white rounded-lg py-1 px-3 inline-block">
                                  {showtime.roomName}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                          <div className="text-4xl mb-4">😔</div>
                          <p className="text-gray-500 text-lg">Không có suất chiếu nào trong ngày này</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">🎬</div>
                <p className="text-gray-500 text-lg">Đang tải thông tin lịch chiếu...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={900}
        bodyStyle={{ padding: 0 }}
        destroyOnClose
        className="trailer-modal"
      >
        <div className="rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="500"
            src={filmDetail.trailer?.replace("watch?v=", "embed/")}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </Modal>
    </div>
  )
}
