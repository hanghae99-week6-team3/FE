import { createSlice } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { server_url } from "./index";

const initialState = []
export const addProduct = createAsyncThunk(
  "addProduct",
  async (payload, thunkAPI) => {
    try {
      await axios.post(`${server_url}product`, payload);
      console.log(payload);
      // const { data } = await axios.get(`${server_url}product`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
const initialState = [];

    }
})
const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},

export default productSlice;export default productSlice;export default productSlice;  extraReducers: {
    [addProduct.fulfilled]: (state, { payload }) => console.log(payload),
  },
});
export default productSlice;
