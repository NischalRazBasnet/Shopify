import { createSlice } from '@reduxjs/toolkit';
import {
  addUserToLocal,
  getUserFromLocal,
  removeUserFromLocal,
} from '../local/local';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: getUserFromLocal,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      addUserToLocal(state.user);
    },
    removeUser: (state, action) => {
      state.user = null;
      removeUserFromLocal();
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
