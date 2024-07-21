import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import qs from 'qs';
import { RootState } from '../store';



let initialState = qs.parse(window.location.search.substring(1)) ;
console.log(initialState)
type QueryParams = {
    category?: string;
    sortBy?: string;
    order?: string;
    search?: string;
    limit?: string;
    page?: string;
}


if (Object.keys(initialState).length === 0) {
  initialState = {
    category: '',
    sortBy: 'rating',
    order: 'desc',
    search: '',
    limit: "4",
    page: "1",
  };
}

export const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState: initialState,
  reducers: {
    setParams: (state, action:PayloadAction<QueryParams>) => {
      if (Object.keys(action.payload).length === 0) {
        state.category = initialState.category;
        state.sortBy = initialState.sortBy;
        state.order = initialState.order;
        state.search = initialState.search;
        state.page = '1';
      } else {
        state.category = action.payload.category;
        state.sortBy = action.payload.sortBy;
        state.order = action.payload.order;
        state.search = action.payload.search;
        state.page = action.payload.page;
      }
    },
  },
});

export const selectQueryParams = (state:RootState) => state.queryParams;
export const { setParams } = queryParamsSlice.actions;

export default queryParamsSlice.reducer;
