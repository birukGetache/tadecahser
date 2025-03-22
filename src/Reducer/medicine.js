import { createSlice } from '@reduxjs/toolkit';

const Medicine = createSlice({
  name: 'dashboard',
  initialState: {
    madicine: 0,
    group:0,
    shortage:0,
  },
  reducers: {
    Meds: (state, action) => {
      const { num, group, short } = action.payload;
      state.madicine = num;
      state.group = group;
      state.shortage = short;
    },
  },
  
});

export const { Meds } = Medicine.actions;

export default Medicine.reducer;