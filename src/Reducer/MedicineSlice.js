import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMedicine: null,
  history: [], // To store transaction history
};

const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    setSelectedMedicine(state, action) {
      state.selectedMedicine = action.payload;
    },
    clearSelectedMedicine(state) {
      state.selectedMedicine = null;
    },
    updateQuantity(state, action) {
      if (state.selectedMedicine) {
        const { newQuantity } = action.payload; // Expecting new quantity directly from action
        state.selectedMedicine.quantity = newQuantity; // Update quantity with new value
      }
    },
    updatePrice(state, action) {
      if (state.selectedMedicine) {
        const { newPrice } = action.payload; // Extract price from payload
        state.selectedMedicine.price = newPrice;
      }
    },
    addTransactionToHistory(state, action) {
      state.history.push(action.payload);
    },
    clearHistory(state) {
      state.history = [];
    },
  },
});

export const {
  setSelectedMedicine,
  clearSelectedMedicine,
  updateQuantity,
  updatePrice,
  addTransactionToHistory,
  clearHistory,
} = medicineSlice.actions;

export default medicineSlice.reducer;
