// src/slices/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    clicked: 1,
  },
  reducers: {
    toggleClicked: (state,action) => {
      state.clicked = action.payload;
    },
  },
});

export const { toggleClicked } = dashboardSlice.actions;

export default dashboardSlice.reducer;
