import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./slice/commentSlice";
import productSlice from "./slice/productSlice";
import userSlice from "./slice/userSlice";
import detail from "./slice/detailSlice";

export const store = configureStore({
  reducer: {
    comment: commentSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer,
    detail,
  },
});
