"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../utils/settings/config";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { SET_THONG_TIN_NGUOI_DUNG } from "@/redux/actions/types/QuanLyNguoiDungType";
import { layThongTinNguoiDungAction } from "@/redux/actions/QuanLyNguoiDungAction";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { userLogin, thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    var action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  useEffect(() => {
    if (userLogin && userLogin.firstName) {
      dispatch({
        type: SET_THONG_TIN_NGUOI_DUNG,
        thongTinNguoiDung: userLogin,
      });
    }
  }, [dispatch, userLogin]);

  const handleLogout = () => {
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(TOKEN);
    setIsUserMenuOpen(false);
    history.push("/");
    window.location.reload();
  };

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => history.push("/login")}
            className="px-6 py-2 text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => history.push("/register")}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            Đăng ký
          </button>
        </div>
      );
    }

    return (
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {thongTinNguoiDung.firstName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <span className="text-white font-medium">
            {thongTinNguoiDung.lastName} {thongTinNguoiDung.firstName}
          </span>
          <svg
            className={`w-4 h-4 text-white transition-transform duration-200 ${
              isUserMenuOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            <button
              onClick={() => {
                history.push("/profile");
                setIsUserMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Thông tin tài khoản</span>
            </button>
            <hr className="my-2" />
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Đăng xuất</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="fixed w-full z-50 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HHK Cinema
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="#lich-chieu"
                className="text-white/80 hover:text-white font-medium transition-all duration-300 relative group"
              >
                Lịch chiếu
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#cum-rap"
                className="text-white/80 hover:text-white font-medium transition-all duration-300 relative group"
              >
                Cụm rạp
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* Desktop User Menu */}
            <div className="hidden lg:flex items-center">{renderLogin()}</div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gray-900/98 backdrop-blur-md border-t border-white/10">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a
                href="#lich-chieu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/80 hover:text-white font-medium py-2 transition-colors duration-200"
              >
                Lịch chiếu
              </a>
              <a
                href="#cum-rap"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/80 hover:text-white font-medium py-2 transition-colors duration-200"
              >
                Cụm rạp
              </a>

              {_.isEmpty(userLogin) ? (
                <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      history.push("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-6 py-2 text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      history.push("/register");
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Đăng ký
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center space-x-3 text-white">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {thongTinNguoiDung.firstName?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </div>
                    <span className="font-medium">
                      {thongTinNguoiDung.lastName} {thongTinNguoiDung.firstName}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      history.push("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-white/80 hover:text-white py-2 transition-colors duration-200"
                  >
                    Thông tin tài khoản
                  </button>
                  {/* <button
                    onClick={() => {
                      history.push("/history");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-white/80 hover:text-white py-2 transition-colors duration-200"
                  >
                    Lịch sử đặt vé
                  </button> */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-red-400 hover:text-red-300 py-2 transition-colors duration-200"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Click outside to close menus */}
      {(isUserMenuOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
}
