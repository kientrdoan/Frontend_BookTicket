// pages/_app.js
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/configStore";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 👇 App được dynamic import và TẮT SSR
const App = dynamic(() => import("../App"), { ssr: false });

export default function MyApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
