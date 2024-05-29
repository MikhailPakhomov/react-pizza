import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setInputSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setInputSearch } = searchSlice.actions;

export default searchSlice.reducer;
