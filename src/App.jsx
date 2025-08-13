//Routing
import { BrowserRouter, Router, Switch } from "react-router-dom";
import Home from "./pages/HomePage";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
// import { createBrowserHistory } from "history";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/history";
import Register from "./pages/Register";
import PaymentResult from "./pages/PaymentResult";
import { HomeTemplate } from "./my_templates/HomeTemplate";
import { UserTemplate } from "./my_templates/UserTemplate";
import { ProfileTemplate } from "./my_templates/ProfileTemplate";
import CheckoutTemplate from "./my_templates/CheckoutTemplate";
import Ticket from "./pages/Ticket";
import Authenticate from "./pages/Authenticate";
import ChangePassword from "./pages/ChangePassword";
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
        <CheckoutTemplate exact path='/authenticate' Component={Authenticate} />

        <ProfileTemplate exact path='/profile' Component={Profile} />
        <ProfileTemplate exact path='/history' Component={BookingHistory} />
        <ProfileTemplate exact path='/change-password' Component={ChangePassword} />
        <ProfileTemplate exact path='/tickets/:invoiceId' Component={Ticket} />

        <CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />

        <HomeTemplate exact path='/payment/success' Component={PaymentResult} />
        {/* <Route path='/payment/result' element={<PaymentResult />} /> */}

        {/* <HomeTemplate exact path='/news' Component={News} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
