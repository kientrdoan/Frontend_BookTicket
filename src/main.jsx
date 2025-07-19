import { createRoot } from 'react-dom/client'
import './index.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/configStore.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
