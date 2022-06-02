import { configureStore } from "@reduxjs/toolkit";
import bookListReducer from "./bookListSlice";
const store = configureStore({
  reducer: {
    bookList: bookListReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
