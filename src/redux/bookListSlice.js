import { createSlice } from "@reduxjs/toolkit";
const initialState = { books: {} };
const bookListSlice = createSlice({
  name: "bookList",
  reducers: {
    addBook: (state, action) => {
      state.books[action.payload.name] = action.payload;
    },
    removeBook: (state, action) => {
      delete state.books[action.payload];
    },
  },
});
export const selectBookList = (state) => state.booklist.books;
export const { addBook, removeBook } = bookListSlice.actions;
export default bookListSlice.reducer;
