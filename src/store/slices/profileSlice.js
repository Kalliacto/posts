import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { forErrors, isLoadingData, showError } from '../../utils/utils';
import { userApi } from '../../api/userApi';

const initialState = {
    currentUser: {},
    isLoading: false,
    userPosts: [],
    userFavoritesPosts: [],
};

export const getUserInfoById = createAsyncThunk(
    'profileSlice/getUserInfoById',
    async function (id, { getState, fulfillWithValue, rejectWithValue }) {
        try {
            const state = getState();
            const userInfo = await userApi.getUserInfoById(id);
            return fulfillWithValue({ userInfo, state });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setNewUserData(state, action) {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfoById.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.currentUser = payload.userInfo;
            const allPosts = payload.state.posts.posts;
            state.userPosts = allPosts.filter((e) => e.author._id === payload.userInfo._id);
            state.userFavoritesPosts = allPosts.filter((e) =>
                e.likes.includes(payload.userInfo._id)
            );
        });
        // builder.addMatcher(isLoadingData, (state) => {
        //     state.isLoading = true;
        // });
        // builder.addMatcher(forErrors, (action) => {
        //     showError(action.error.message);
        // });
    },
});

export const { setNewUserData } = profileSlice.actions;
export default profileSlice.reducer;
