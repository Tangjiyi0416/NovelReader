import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tags: [],
};
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTags: (state, action) => {
      action.payload.forEach((element) => {
        if (state.tags.find(({ value }) => value === element) === undefined) {
          state.tags.push(element);
        }
      });
    },
    clearTags: (state, action) => {
      state.tags = [];
    },
  },
});
export const selectTags = (state) => state.tags.tags;
export const { addTags, clearTags } = tagsSlice.actions;
export default tagsSlice.reducer;
