import { SET_BOOK_DATA } from "../constants";
import { SET_BOOK_MAP } from "../constants";

export const setBookData = (bookData) => (dispatch) => {
  dispatch({ type: SET_BOOK_DATA, payload: bookData });
};
export const setBookMap = (bookMap) => (dispatch) => {
  dispatch({ type: SET_BOOK_MAP, payload: bookMap });
};
