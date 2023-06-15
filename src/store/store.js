import { configureStore } from '@reduxjs/toolkit';
import onePostSlice from './slices/onePostSlice';
import userSlice from './slices/userSlice';
import postsSlice from './slices/postsSlice';
import profileSlice from './slices/profileSlice';

const store = configureStore({
    reducer: {
        posts: postsSlice,
        user: userSlice,
        onePost: onePostSlice,
        profile: profileSlice,
    },
});

export default store;
