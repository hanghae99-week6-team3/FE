import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from ".";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const __postLogin = createAsyncThunk("/login", async (value, thunkAPI) => {
  try {
    // const { data } = await axios.post(`${server_url}/login`, value);
    const { data } = await axios.get(`${server_url}/login`);
    return thunkAPI.fulfillWithValue(data.token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

export { __postLogin };
export default userSlice;
