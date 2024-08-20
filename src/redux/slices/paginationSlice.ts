import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type TPaginationSlice ={
//  currentPage: string
// }
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
