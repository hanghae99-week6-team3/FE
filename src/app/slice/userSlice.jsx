import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from ".";
import jwt_decode from "jwt-decode"; //jwt토큰 decode를 해주는 패키지

//현재 로그인한 user를 관리하는 slice의 초기값
const initialState = {
  user: {},
  isAuth: false,
  isOk: true,
  isAuth: null,
  isIdOk: null,
  isNicknameOk: null,
  error: null,
};

//헤더에 jwtToken을 포함시키기
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

//userId와 password로 POST 요청하여 jwt토큰을 받아오는 함수
export const __postLogin = createAsyncThunk("/login", async (value, thunkAPI) => {
  try {
    const { data } = await axios.post(`${server_url}login`, value); //최종에 사용할 코드
    const token = data.token;
    localStorage.setItem("jwtToken", token); //받아온 jwt값을 jwtToken이라는 key값과 함께 로컬 스토리지에 저장
    setAuthToken(token); //HTTP 헤더에 받아온 jwt값 넘기기
    alert("로그인 성공");
    return thunkAPI.fulfillWithValue(jwt_decode(token));
  } catch (error) {
    alert("로그인 실패");
    return thunkAPI.rejectWithValue(error);
  }
});

//ID 중복확인 함수, 유저 ID값으로 POST 요청하여 중복이 아니면 true, 중복이면 false를 반환함
export const __checkId = createAsyncThunk("/checkId", async (value, thunkAPI) => {
  const { data } = await axios.post(`${server_url}auth`, { key: "userId", value });
  return thunkAPI.fulfillWithValue(data.ok);
});

//닉네임 중복확인 함수, 유저 닉네임값으로 POST 요청하여 중복이 아니면 true, 중복이면 false를 반환함
export const __checkNickname = createAsyncThunk("/checkNickname", async (value, thunkAPI) => {
  const { data } = await axios.post(`${server_url}auth`, { key: "nickname", value });
  return thunkAPI.fulfillWithValue(data.ok);
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    currentUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logoutUser: (state) => {
      localStorage.removeItem("jwtToken");
    logoutUser: (state, action) => {
      // state = { ...current(state), isAuth: action.payload.isAuth };
      state = initialState;
      console.log(state);
      localStorage.removeItem("jwtToken");
    },
  },
  extraReducers: {
    [__postLogin.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    [__postLogin.rejected]: (state, action) => {
      state.error = action.payload;
      state.isAuth = false;
    },

    [__checkId.fulfilled]: (state, action) => {
      state.isIdOk = action.payload;
    },
    [__checkNickname.fulfilled]: (state, action) => {
      state.isNicknameOk = action.payload;
    },
  },
});

export const { currentUser, logoutUser } = userSlice.actions;
export default userSlice;
