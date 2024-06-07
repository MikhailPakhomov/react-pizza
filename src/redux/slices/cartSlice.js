import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addPizza: (state, action) => {
      state.pizzas.push(action.payload);
    },
    increment: () => {},
    decrement: () => {},
    remove: () => {},
    clear: () => {},
  },
});

export const { addPizza } = cartSlice.actions;

export default cartSlice.reducer;
