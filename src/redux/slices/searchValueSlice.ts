import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  value: '',
};

export const searchValue = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearchValue: (state, action:PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const selectSearchValue = (state:RootState) => state.search.value;

export const { setSearchValue } = searchValue.actions;

export default searchValue.reducer;
