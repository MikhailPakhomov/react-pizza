import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './slices/paginationSlice';
import queryParamsReducer from './slices/queryParamsSlice';
import cartReducer from './slices/cartSlice';


export const store = configureStore({
  reducer: {
    queryParams: queryParamsReducer,
    cart: cartReducer,
    pagination: paginationReducer,
  },
});
