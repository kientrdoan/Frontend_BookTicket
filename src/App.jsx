import './App.css';

//Routing
import { BrowserRouter, Switch } from 'react-router-dom';
import { HomeTemplate } from './templates/HomeTemplate';
import Home from './pages/HomePage';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import Checkout from './pages/Checkout';
import CheckoutTemplate from './templates/CheckoutTemplate';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import { UserTemplate } from './templates/UserTemplate';
import { createBrowserHistory } from 'history';
// import News from './pages/News';

export const history = createBrowserHistory();


function App() {
  return (
    <BrowserRouter history= {history}>
        <Switch>
          <HomeTemplate exact path='/' Component={Home} />
          <HomeTemplate exact path='/contact' Component={Contact} />
           <HomeTemplate exact path='/detail/:id' Component={Detail} />

           <UserTemplate exact path="/login" component= {Login} />

           <CheckoutTemplate path="/checkout/:id" exact component={Checkout} />
          
          {/* <HomeTemplate exact path='/news' Component={News} /> */}
          
        </Switch>
    </BrowserRouter>
  );
}

export default App;