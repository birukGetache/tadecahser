import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'dashboard',
  initialState: {
    selectedGroupId: null,
  },
  reducers: {
    setSelectedGroupId(state, action) {
      state.selectedGroupId = action.payload;
    },
  },
});

export const { setSelectedGroupId } = slice.actions;
export default slice.reducer;
