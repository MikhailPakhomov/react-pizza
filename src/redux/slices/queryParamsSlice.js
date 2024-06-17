import { createSlice } from '@reduxjs/toolkit';
import qs from 'qs';

let initialState = qs.parse(window.location.search.substring(1));

if (Object.keys(initialState).length === 0) {
  initialState = {
    category: '',
    sortBy: 'rating',
    order: 'desc',
    search: '',
    limit: 4,
    page: 1,
  };
}

export const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState: initialState,
  reducers: {
    setParams: (state, action) => {
      state.category = action.payload.category;
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
      state.search = action.payload.search;
      state.page = action.payload.page;
    },
  },
});

export const selectQueryParams = (state) => state.queryParams
export const { setParams } = queryParamsSlice.actions;

export default queryParamsSlice.reducer;
