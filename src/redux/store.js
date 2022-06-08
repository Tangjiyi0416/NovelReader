import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import bookListReducer from "./bookListSlice";
import bookImportDataReducer from "./bookImportDataSlice";
import viewSettingReducer from "./viewSettingSlice";
import lastReadReducer from "./lastReadSlice";
import tagsReducer from "./tagsSlice";
export const store = configureStore({
  reducer: {
    bookList: persistReducer(
      {
        key: "root/list",
        storage: AsyncStorage,
      },
      bookListReducer
    ),
    lastRead: persistReducer(
      {
        key: "root/lastread",
        storage: AsyncStorage,
      },
      lastReadReducer
    ),
    tags: persistReducer(
      {
        key: "root/tags",
        storage: AsyncStorage,
      },
      tagsReducer
    ),
    settings: persistReducer(
      {
        key: "root/settings",
        storage: AsyncStorage,
      },
      viewSettingReducer
    ),
    bookImportData: bookImportDataReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
