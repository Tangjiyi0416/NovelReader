import { SET_BOOK_DATA } from "../constants";

const initialBookData = {
  bookData: {
    title: "",
    author: "",
    desc: "",
    tags: [],
    cover: "",
    chapterDisplay: {},
  },
};
export const bookDataReducer = (state = initialBookData, action) => {
  switch (action.type) {
    case SET_BOOK_DATA:
      return { bookData: { ...state.bookData, ...action.payload } };
    default:
      return state;
  }
};
