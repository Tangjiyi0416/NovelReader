import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bookData: {
    title: "",
    author: "",
    desc: "",
    tags: [],
    cover: "",
    chapterDisplay: {},
  },
};
const bookImportDataSlice = createSlice({
  name: "bookImportData",
  initialState,
  reducers: {
    setBookData: (state, action) => {
      state.bookData = { ...state.bookData, ...action.payload };
    },
  },
});
export const selectBookImportData = (state) => state.bookImportData.bookData;
export const { setBookData } = bookImportDataSlice.actions;
export default bookImportDataSlice.reducer;
