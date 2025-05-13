import { createSlice } from '@reduxjs/toolkit';
import { reset } from './todoSlice';
import { setToLocal } from '../../local/local_storage';

export const postSlice = createSlice({
  name: 'postSlice',

  initialState: {
    posts: [
      { id: 1, title: 'Post Slice', detail: 'This is a post slice detail' },
    ],
  },
  extraReducers: (builder) => {
    builder.addCase(reset, (state, action) => {
      setToLocal((state.posts = []));
    });
  },
});

export const {} = postSlice.actions;
