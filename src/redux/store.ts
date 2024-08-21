import { configureStore } from '@reduxjs/toolkit';
import queryParamsReducer from './slices/queryParamsSlice';
import cartReducer from './slices/cartSlice';
import searchValueReduser from './slices/searchValueSlice';

export const store = configureStore({
  reducer: {
    queryParams: queryParamsReducer,
    cart: cartReducer,
    search: searchValueReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>
