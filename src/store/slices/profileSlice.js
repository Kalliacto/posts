import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { forErrors } from '../../utils/utils';
import { userApi } from '../../api/userApi';

const initialState = {
    currentUser: {},
    isProfileLoading: false,
    userPosts: [],
    userFavoritesPosts: [],
};

export const getUserInfoById = createAsyncThunk(
    'profileSlice/getUserInfoById',
    async function (userId, { getState, fulfillWithValue, rejectWithValue }) {
        try {
            const { posts } = getState();
            const user = await userApi.getUserInfoById(userId);
            return fulfillWithValue({ user, posts });
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
            state.isProfileLoading = false;
            state.currentUser = payload.user;
            const allPosts = payload.posts.posts;
            state.userPosts = allPosts.filter((e) => e.author._id === payload.user._id);
            state.userFavoritesPosts = allPosts.filter((e) => e.likes.includes(payload.user._id));
        });
        builder.addMatcher(isPending(getUserInfoById), (state) => {
            state.isProfileLoading = true;
        });
        builder.addMatcher(
            (action) => forErrors(action, 'profile'),
            (state, { payload }) => {
                alert(`${payload}`);
            }
        );
    },
});

export const { setNewUserData, updateProfileState, setMyProfile } = profileSlice.actions;
export default profileSlice.reducer;
