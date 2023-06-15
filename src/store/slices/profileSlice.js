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
    async (id, { getState, fulfillWithValue, rejectWithValue }) => {
        try {
            const state = getState();
            return await userApi.getUserInfoById(id);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(getUserInfoById, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });
        builder.addMatcher(isLoadingData, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(forErrors, (action) => {
            showError(action.error.message);
        });
    },
});

export default profileSlice.reducer;
