import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type PizzaInCart = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  size: number;
  dough: string;
  count: number;
};
 type CartSliceState= {
pizzas:PizzaInCart[];
 }
const initialState:CartSliceState = {
  pizzas: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addPizza: (state, action:PayloadAction<PizzaInCart>) => {
      state.pizzas.push(action.payload);
    },
    increment: (state, action:PayloadAction<number>) => {
      state.pizzas[action.payload].count += 1;
    },
    decrement: (state, action:PayloadAction<number>) => {
      state.pizzas[action.payload].count -= 1;
      if (state.pizzas[action.payload].count === 0) {
        state.pizzas.splice(action.payload, 1);
      }
    },
    remove: (state, action:PayloadAction<number>) => {
      state.pizzas.splice(action.payload, 1);
    },
    clear: (state, action) => {
      state.pizzas = [];
    },
  },
});

export const selectCart = (state:RootState) => state.cart.pizzas;

export const { addPizza, increment, decrement, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
