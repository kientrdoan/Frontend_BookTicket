import './App.css';

//Routing
import { BrowserRouter, Switch } from 'react-router-dom';
import { HomeTemplate } from './templates/HomeTemplate';
import Home from './pages/HomePage';
import Contact from './pages/Contact';
import News from './pages/News';


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <HomeTemplate exact path='/' Component={Home} />
          <HomeTemplate exact path='/contact' Component={Contact} />
          <HomeTemplate exact path='/news' Component={News} />
          
        </Switch>
    </BrowserRouter>
  );
}

export default App;