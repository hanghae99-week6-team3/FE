import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { setAuthToken, __postLogin } from "./app/slice/userSlice";
import jwt_decode from "jwt-decode";

//리로드 시에 스토어에 값을 넣어준다
//만약 토큰이 존재한다면 실행되는 함수
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
