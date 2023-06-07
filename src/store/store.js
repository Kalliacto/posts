import { configureStore } from '@reduxjs/toolkit';
import onePostSlice from './slices/onePostSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer: {
        // posts: postsSlice,
        user: userSlice,
        onePost: onePostSlice,
    },
});

export default store;
