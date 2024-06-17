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
    increment: (state, action) => {
      state.pizzas[action.payload].count += 1;
    },
    decrement: (state, action) => {
      state.pizzas[action.payload].count -= 1;
      if (state.pizzas[action.payload].count === 0) {
        state.pizzas.splice(action.payload, 1);
      }
    },
    remove: (state, action) => {
      state.pizzas.splice(action.payload, 1);
    },
    clear: (state, action) => {
      state.pizzas = [];
    },
  },
});

export const selectCart = (state) => state.cart.pizzas;

export const { addPizza, increment, decrement, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
