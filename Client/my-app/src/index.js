import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./App/redux/store/index.js";
import { Provider } from "react-redux";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

//* Add BaseURL to axios deploy
axios.defaults.baseURL = process.env.REACT_APP_APIHOST || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App className="min-h-screen" />
      <div id="portal"></div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
