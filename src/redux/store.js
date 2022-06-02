import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import bookListReducer from "./bookListSlice";
import bookImportDataReducer from "./bookImportDataSlice";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
export const store = configureStore({
  reducer: {
    bookList: bookListReducer,
    bookImportData: persistReducer(persistConfig, bookImportDataReducer),
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
