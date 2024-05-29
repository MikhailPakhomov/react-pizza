import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setFilterParams: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFilterParams } = filterSlice.actions;

export default filterSlice.reducer;
