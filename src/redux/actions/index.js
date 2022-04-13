import { SET_BOOK_DATA } from "../constants";

export const setBookData = (bookData) => (dispatch) => {
  dispatch({ type: SET_BOOK_DATA, payload: bookData });
};
