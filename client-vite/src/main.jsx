import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.MODE === "Production" ? import.meta.env.BASE_URL : import.meta.env.VITE_BASE_URL;
//axios.defaults.baseURL = 'http://127.0.0.1:3001/'

console.log(axios.defaults.baseURL)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
