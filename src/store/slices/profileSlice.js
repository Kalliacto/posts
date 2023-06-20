import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { forErrors } from '../../utils/utils';
import { userApi } from '../../api/userApi';
import { toast } from 'react-toastify';

const initialState = {
    currentUser: {},
    isProfileLoading: true,
    userPosts: [],
    userFavoritesPosts: [],
    myProfile: false,
};

export const getUserInfoById = createAsyncThunk(
    'profileSlice/getUserInfoById',
    async function (userId, { getState, fulfillWithValue, rejectWithValue }) {
        const { posts, user, profile } = getState();
        try {
            if (profile.myProfile) {
                return fulfillWithValue({ user: user.user, posts });
            } else {
                const { posts } = getState();
                const user = await userApi.getUserInfoById(userId);
                return fulfillWithValue({ user, posts });
            }
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
        setMyProfile(state, { payload }) {
            state.myProfile = payload;
        },
        updateProfileLike(state, { payload }) {
            state.userPosts = state.userPosts.map((e) =>
                e._id === payload.post._id ? payload.post : e
            );
            if (state.myProfile && payload.wasLiked) {
                state.userFavoritesPosts = state.userFavoritesPosts.filter(
                    (e) => e._id !== payload.post._id
                );
            } else if (state.myProfile && !payload.wasLiked) {
                state.userFavoritesPosts.push(payload.post);
            } else {
                state.userFavoritesPosts = state.userFavoritesPosts.map((e) =>
                    e._id === payload.post._id ? payload.post : e
                );
            }
        },
        updateProfilePosts(state, { payload }) {
            state.userPosts = state.userPosts.filter((e) => e._id !== payload._id);
            state.userFavoritesPosts = state.userFavoritesPosts.filter(
                (e) => e._id !== payload._id
            );
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
                toast.error(payload);
            }
        );
    },
});

export const { setNewUserData, updateProfileLike, setMyProfile, updateProfilePosts } =
    profileSlice.actions;
export default profileSlice.reducer;
