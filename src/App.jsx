import "./App.css";

//Routing
import { BrowserRouter, Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate";
import Home from "./pages/HomePage";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";
import CheckoutTemplate from "./templates/CheckoutTemplate";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./pages/Login";
import { UserTemplate } from "./templates/UserTemplate";
// import { createBrowserHistory } from "history";
import Profile from "./pages/Profile";
import { ProfileTemplate } from "./templates/ProfileTemplate";
import BookingHistory from "./pages/history";
import Register from "./pages/Register";
import PaymentResult from "./pages/PaymentResult";
// import News from './pages/News';

// export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HomeTemplate exact path='/' Component={Home} />
        <HomeTemplate exact path='/contact' Component={Contact} />
        <HomeTemplate exact path='/detail/:id' Component={Detail} />

        <UserTemplate exact path='/login' Component={Login} />
        <UserTemplate exact path='/register' Component={Register} />

        <ProfileTemplate exact path='/profile' Component={Profile} />
        <ProfileTemplate exact path='/history' Component={BookingHistory} />

        <CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />

        <HomeTemplate exact path='/payment/success' Component={PaymentResult} />
        {/* <Route path='/payment/result' element={<PaymentResult />} /> */}

        {/* <HomeTemplate exact path='/news' Component={News} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
