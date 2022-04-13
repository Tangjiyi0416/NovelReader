import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { bookDataReducer } from "./bookDataReducer";
const reducer = combineReducers({
  bookData: bookDataReducer,
});
export default store = createStore(reducer, applyMiddleware(thunk));
