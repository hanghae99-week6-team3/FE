import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from ".";
import jwt_decode from "jwt-decode"; //jwt토큰 decode를 해주는 패키지

//현재 로그인한 user를 관리하는 slice의 초기값
const initialState = {
  users: {},
  error: null,
};

//헤더에 jwtToken을 포함시키기
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

//userId와 password로 POST 요청하여 jwt토큰을 받아오는 함수
const __postLogin = createAsyncThunk("/login", async (value, thunkAPI) => {
  try {
    // const { data } = await axios.post(`${server_url}/login`, value); //최종에 사용할 코드
    const { data } = await axios.get(`${server_url}/login`); //url 받기 전 테스트 코드
    const token = data.token;
    localStorage.setItem("jwtToken", token); //받아온 jwt값을 jwtToken이라는 key값과 함께 로컬 스토리지에 저장
    setAuthToken(token); //HTTP 헤더에 받아온 jwt값 넘기기
    return thunkAPI.fulfillWithValue(jwt_decode(token));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__postLogin.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [__postLogin.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export { setAuthToken, __postLogin };
export default userSlice;
