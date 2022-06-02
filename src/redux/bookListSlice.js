import { createSlice } from "@reduxjs/toolkit";
const initialState = { books: {} };
const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books[action.payload.title] = JSON.parse(
        JSON.stringify(action.payload)
      ); //jsonify for ez deep copy
      console.warn(state.books);
    },
    removeBook: (state, action) => {
      delete state.books[action.payload];
    },
    clearBookList: (state) => {
      state.books = {};
    },
  },
});
export const selectBookList = (state) => state.booklist.books;
export const { addBook, removeBook, clearBookList } = bookListSlice.actions;
export default bookListSlice.reducer;
