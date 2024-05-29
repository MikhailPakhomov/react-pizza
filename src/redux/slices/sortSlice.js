import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'rating',
  order: 'desc',
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState: initialState,
  reducers: {
    setSortParams: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    },
  },
});

export const { setSortParams } = sortSlice.actions;

export default sortSlice.reducer;
