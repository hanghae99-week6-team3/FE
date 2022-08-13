import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { setAuthToken, __postLogin } from "./app/slice/userSlice";
import jwt_decode from "jwt-decode";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(__postLogin(jwt_decode(localStorage.jwtToken)));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
