import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from ".";
import jwt_decode from "jwt-decode";

const initialState = {
  users: {},
  error: null,
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const __postLogin = createAsyncThunk("/login", async (value, thunkAPI) => {
  try {
    // const { data } = await axios.post(`${server_url}/login`, value);
    const { data } = await axios.get(`${server_url}/login`);
    const token = data.token;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    // console.log(jwt_decode(token));
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
