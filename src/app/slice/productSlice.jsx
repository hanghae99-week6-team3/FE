import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from "./index";

export const addProduct = createAsyncThunk("addProduct", async (payload, thunkAPI) => {
  try {
    await axios.post(`${server_url}product`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
      }
    });
    console.log(payload)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const loadProduct = createAsyncThunk("loadProduct", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(`${server_url}product`);
    console.log(data)
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = [];

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},

  extraReducers: {
    [addProduct.fulfilled]: (state, { payload }) => console.log(payload),
    [loadProduct.fulfilled]: (state, { payload }) => (state = payload),
  },
});
export default productSlice;
