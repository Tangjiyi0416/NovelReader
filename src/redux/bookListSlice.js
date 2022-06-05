import { createSlice } from "@reduxjs/toolkit";
const initialState = { books: {} };
const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books[action.payload.title] = {
        ...state.books[action.payload.title],
        ...action.payload,
      };
      // state.books[action.payload.title] = JSON.parse(
      //   JSON.stringify(action.payload)
      // ); //jsonify for ez deep copy
      // console.log(state.books);
    },
    removeBook: (state, action) => {
      delete state.books[action.payload];
    },
    clearBookList: (state) => {
      state.books = {};
    },
  },
});
export const selectBookList = (state) => state.bookList.books;
export const { addBook, removeBook, clearBookList } = bookListSlice.actions;
export default bookListSlice.reducer;
