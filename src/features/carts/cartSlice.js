import { createSlice } from '@reduxjs/toolkit';
import { getCartsFromLocal, setCartsToLocal } from '../local/local';

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cartSlice: getCartsFromLocal(),
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartSlice.push(action.payload);
      setCartsToLocal(state.carts);
    },

    updateCart: (state, action) => {
      state.carts = state.carts.map((cart) => cart._id === action.payload._id);
      setCartsToLocal(state.carts);
    },

    removeFromCart: (state, action) => {
      state.carts = state.carts.filter(
        (cart) => cart._id !== action.payload._id
      );
      setCartsToLocal(state.carts);
    },
  },
});
