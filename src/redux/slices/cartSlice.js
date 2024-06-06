import { createSlice } from '@reduxjs/toolkit';


const initialState = {
pizzas:[],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addPizza: (state, action) => {
      state.pizzas.push(action.payload);

    },
    getTotalPrice: (state) => {
      state.reduce((sum, item) => {
        return sum + item.price;
      }, 0);
    },
  },
});

export const { addPizza } = cartSlice.actions;

export default cartSlice.reducer;
