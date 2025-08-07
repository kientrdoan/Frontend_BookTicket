// pages/Authenticate.jsx
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { USER_LOGIN } from "@/utils/settings/config";
import { useDispatch } from "react-redux";
import { DANG_NHAP_ACTION } from "@/redux/actions/types/QuanLyNguoiDungType";

export default function Authenticate() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      axios
        .post(`http://localhost:8080/auth/google/login?code=${code}`)
        .then((res) => {
          // const { accessToken, user } = res.data;

          dispatch({
            type: DANG_NHAP_ACTION,
            thongTinDangNhap: res.data.result
          })

          history.push("/");
        })
        .catch((err) => {
          console.error("Google login failed", err);
        });
    }
  }, []);

  return <p>Đang xác thực với Google...</p>;
}
