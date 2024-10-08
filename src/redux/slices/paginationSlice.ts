import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  currentPage: "1",
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, action:PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
