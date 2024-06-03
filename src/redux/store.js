import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import filterReducer from './slices/filterSlice';
import sortReduser from './slices/sortSlice';
import paginationReducer from './slices/paginationSlice';
import queryParamsReducer from './slices/queryParamsSlice';

export const store = configureStore({
  reducer: {
    queryParams: queryParamsReducer,
    search: searchReducer,
    filter: filterReducer,
    sort: sortReduser,
    pagination: paginationReducer,
  },
});
