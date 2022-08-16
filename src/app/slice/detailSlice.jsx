import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from ".";

export const __getDetail = createAsyncThunk("get/detail", async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(`${server_url}product/${id}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __updateDetail = createAsyncThunk("put/detail", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.patch(`${server_url}/article/${payload.postId}`, payload);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  extraReducers: {
    // 상세페이지 조회
    [__getDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__getDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default detailSlice.reducer;