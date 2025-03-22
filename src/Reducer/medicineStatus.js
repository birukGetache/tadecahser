// src/slices/medicineStatus.js
import { createSlice } from '@reduxjs/toolkit';

const MedicineStatus = createSlice({
  name: 'dashboard',
  initialState: {
    warning: 'well done',
  },
  reducers: {
    Med: (state, action) => {
      state.warning = action.payload; // Set warning status based on dispatched value
    },
  },
});

export const { Med } = MedicineStatus.actions;

export default MedicineStatus.reducer;
