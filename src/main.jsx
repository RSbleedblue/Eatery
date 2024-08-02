import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import Store from './Redux/Store.js';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <ToastContainer/>
      <App />
    </Provider>
  </React.StrictMode>,
)
