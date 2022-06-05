import { createSlice } from "@reduxjs/toolkit";
const initialState = { settings: { px: 16 } };
const viewSettingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    resetSettings: (state) => {
      state.settings = { px: 16 };
    },
  },
});
export const selectSettings = (state) => state.settings.settings;
export const { setSettings, resetSettings } = viewSettingSlice.actions;
export default viewSettingSlice.reducer;
