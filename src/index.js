import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.min.css";
// import '../node_modules/antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/scss/app.scss";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
