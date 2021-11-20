import React from 'react';
import ReactDOM from 'react-dom'
import './assets/css/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from './App';
import Login from "views/Login";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
