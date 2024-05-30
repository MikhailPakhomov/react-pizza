import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import filterReducer from './slices/filterSlice';
import sortReduser from './slices/sortSlice';
import paginationReducer from './slices/paginationSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    sort: sortReduser,
    pagination: paginationReducer,
  },
});
