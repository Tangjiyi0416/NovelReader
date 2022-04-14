import { SET_BOOK_MAP } from "../constants";
import books from "../../test/books.json";
const initialBookMap = {
  bookMap: {
    ...books,
  },
};
export const bookMapReducer = (state = initialBookMap, action) => {
  switch (action.type) {
    case SET_BOOK_MAP:
      return { bookMap: { ...state.bookMap, ...action.payload } };
    default:
      return state;
  }
};
