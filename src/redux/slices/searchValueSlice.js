import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const searchValue = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const selectSearchValue = (state) => state.search.value;

export const { setSearchValue } = searchValue.actions;

export default searchValue.reducer;
