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
  // 배포 환경일때, devTools가 false가 됩니다.
  devTools: process.env.NODE_ENV !== "production",
});
