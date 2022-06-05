import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bookTitle: "",
};
const lastReadSlice = createSlice({
  name: "lastRead",
  initialState,
  reducers: {
    setLastRead: (state, action) => {
      state.bookTitle = action.payload;
    },
  },
});
export const selectLastReadTitle = (state) => state.lastRead.bookTitle;
export const { setLastRead } = lastReadSlice.actions;
export default lastReadSlice.reducer;
