import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tags: [],
};
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTags: (state, action) => {
      state.tags = state.tags.concat(action.payload);
    },
  },
});
export const selectTags = (state) => state.tags.tags;
export const { addTags } = tagsSlice.actions;
export default tagsSlice.reducer;
