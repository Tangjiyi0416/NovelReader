import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { bookDataReducer } from "./bookDataReducer";
import { bookMapReducer } from "./bookMapReducer";
const reducer = combineReducers({
  bookData: bookDataReducer,
  bookMap: bookMapReducer,
});
export default store = createStore(reducer, applyMiddleware(thunk));
