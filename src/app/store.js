import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from '../pages/todo/todoSlice';
import { postSlice } from '../pages/todo/postSlice';
import { counterSlice } from '../pages/todo/counterSlice';

export const store = configureStore({
  reducer: {
    [todoSlice.name]: todoSlice.reducer,
    [postSlice.name]: postSlice.reducer,
    [counterSlice.name]: counterSlice.reducer,
  },
});
